import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createApp } from '../backend/dist/backend/server.js'
import { notifyLead } from '../backend/dist/backend/leads.js'
import { configFromEnv } from '../backend/dist/backend/server.js'

let server
let base
let dir
let raw = 'Hello, how can I help?'
let notify = true
let providerFails = false
const config = {
  apiKey: 'test', model: 'test', allowedOrigins: new Set(['https://www.hybridcontrol.co.za']),
  leadsFile: '', resendKey: 'test', resendFrom: 'leads@notify.hybridcontrol.co.za', rateLimit: 100,
}
const userMessages = [{ type: 'user', text: 'My name is Sam. Email sam@example.com. We need a PLC upgrade.' }]
const request = (body, options = {}) => fetch(`${base}/api/chat`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.hybridcontrol.co.za', ...options.headers },
  body: JSON.stringify(body),
})

before(async () => {
  dir = await mkdtemp(join(tmpdir(), 'hybrid-api-test-'))
  config.leadsFile = join(dir, 'leads.jsonl')
  server = createApp(config, {
    ask: async () => { if (providerFails) throw Error('private provider detail'); return raw },
    notify: async () => notify,
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  await new Promise(resolve => server.close(resolve))
  await rm(dir, { recursive: true, force: true })
})

test('health and exact origin CORS', async () => {
  const health = await fetch(`${base}/health`)
  assert.equal(health.status, 200)
  assert.equal((await health.json()).status, 'ok')
  const denied = await request({ messages: userMessages }, { headers: { Origin: 'https://www.hybridcontrol.co.za.evil.test' } })
  assert.equal(denied.status, 403)
  assert.equal(denied.headers.get('access-control-allow-origin'), null)
  const allowed = await request({ messages: userMessages, currentRoute: '/capabilities' })
  assert.equal(allowed.status, 200)
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'https://www.hybridcontrol.co.za')
})

test('invalid messages and oversized bodies are rejected', async () => {
  assert.equal((await request({ messages: [{ type: 'user', text: '' }] })).status, 400)
  assert.equal((await request({ messages: Array(21).fill(userMessages[0]) })).status, 400)
  assert.equal((await request({ messages: [{ type: 'user', text: 'a'.repeat(33_000) }] })).status, 413)
})

test('navigation cards allow only site routes', async () => {
  raw = 'See this.\n```json\n{"cards":[{"title":"Safe","linkText":"OPEN","route":"/contact","icon":"cpu"},{"title":"Bad","linkText":"OPEN","route":"https://evil.test","icon":"data"}]}\n```'
  const response = await request({ messages: userMessages })
  const body = await response.json()
  assert.equal(body.cards.length, 1)
  assert.equal(body.cards[0].route, '/contact')
})

test('lead is saved before success and notification status is explicit', async () => {
  raw = 'I will submit this.\n```json\n{"action":"submit_lead","lead":{"name":"Sam","company":"Acme","contact":"sam@example.com","requirement":"PLC upgrade"}}\n```'
  notify = true
  const sent = await (await request({ messages: userMessages })).json()
  assert.equal(sent.leadCaptured, true)
  assert.equal(sent.notificationStatus, 'sent')
  const saved = (await readFile(config.leadsFile, 'utf8')).trim().split('\n').map(JSON.parse)
  assert.equal(saved.length, 1)
  assert.equal(saved[0].email, 'sam@example.com')
  notify = false
  const failed = await (await request({ messages: userMessages })).json()
  assert.equal(failed.leadCaptured, true)
  assert.equal(failed.notificationStatus, 'failed')
  assert.match(failed.text, /notification could not be delivered/)
})

test('unsaved and invented leads are never acknowledged', async () => {
  const failingServer = createApp(config, { ask: async () => raw, save: async () => { throw Error('disk failed') }, notify: async () => true })
  await new Promise(resolve => failingServer.listen(0, '127.0.0.1', resolve))
  const prior = base
  base = `http://127.0.0.1:${failingServer.address().port}`
  const failed = await request({ messages: userMessages })
  assert.equal(failed.status, 503)
  assert.equal((await failed.json()).leadCaptured, undefined)
  await new Promise(resolve => failingServer.close(resolve))
  base = prior
  const invented = await (await request({ messages: [{ type: 'user', text: 'Just browsing' }] })).json()
  assert.equal(invented.leadCaptured, false)
})

test('provider failure has a safe response', async () => {
  providerFails = true
  const response = await request({ messages: userMessages })
  assert.equal(response.status, 502)
  assert.doesNotMatch(JSON.stringify(await response.json()), /private provider detail/)
  providerFails = false
})

test('email request uses the validated visitor address as Reply-To', async () => {
  let sent
  const accepted = await notifyLead(
    { name: 'Sam', company: 'Acme', contact: 'sam@example.com', email: 'sam@example.com', requirement: 'PLC upgrade' },
    'test-secret', 'leads@notify.hybridcontrol.co.za',
    async (_url, options) => {
      sent = { headers: options.headers, body: JSON.parse(options.body) }
      return new Response(JSON.stringify({ id: 'email-123' }), { status: 200 })
    },
  )
  assert.equal(accepted, true)
  assert.equal(sent.body.to[0], 'web@hybridcontrol.co.za')
  assert.equal(sent.body.reply_to, 'sam@example.com')
  assert.equal(sent.headers.Authorization, 'Bearer test-secret')
  assert.equal(await notifyLead({ name: 'Sam', company: '', contact: '123456789', requirement: 'PLC' }, 'key', 'sender', async () => new Response('{}', { status: 500 })), false)
})

test('startup requires private credentials, origin, and durable lead path', () => {
  assert.throws(() => configFromEnv({}), /GEMINI_API_KEY/)
  assert.throws(() => configFromEnv({ GEMINI_API_KEY: 'x', LEADS_FILE: '/var/data/leads.jsonl', ALLOWED_ORIGINS: 'https:\/\/hybridcontrol.co.za' }), /RESEND_API_KEY/)
})

test('saved enquiries survive an API restart', async () => {
  const before = (await readFile(config.leadsFile, 'utf8')).trim().split('\n').length
  const restarted = createApp(config, { ask: async () => raw, notify: async () => true })
  await new Promise(resolve => restarted.listen(0, '127.0.0.1', resolve))
  const prior = base
  base = `http://127.0.0.1:${restarted.address().port}`
  const reply = await (await request({ messages: userMessages })).json()
  assert.equal(reply.leadCaptured, true)
  await new Promise(resolve => restarted.close(resolve))
  base = prior
  const afterRestart = (await readFile(config.leadsFile, 'utf8')).trim().split('\n').length
  assert.equal(afterRestart, before + 1)
})

test('rate limit blocks excess chat requests', async () => {
  const limited = createApp({ ...config, rateLimit: 1 }, { ask: async () => 'Hello' })
  await new Promise(resolve => limited.listen(0, '127.0.0.1', resolve))
  const prior = base
  base = `http://127.0.0.1:${limited.address().port}`
  assert.equal((await request({ messages: userMessages })).status, 200)
  assert.equal((await request({ messages: userMessages })).status, 429)
  await new Promise(resolve => limited.close(resolve))
  base = prior
})
