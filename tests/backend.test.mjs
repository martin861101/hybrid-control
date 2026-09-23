import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createApp, configFromEnv } from '../backend/dist/backend/server.js'
import { notifyLead } from '../backend/dist/backend/leads.js'

const origin = 'https://hybridcontrol.co.za'
const config = {
  apiKey: 'test', model: 'test', allowedOrigins: new Set([origin]),
  resendKey: 'test', resendFrom: 'leads@notify.hybridcontrol.co.za', rateLimit: 100,
}
const userMessages = [
  { type: 'user', text: 'My name is Sam Lee. I work at Acme. Email sam@example.com or call +27 72 123 4567 about a PLC upgrade.' },
  { type: 'assistant', text: 'Would you like me to send your enquiry?' },
  { type: 'user', text: 'Yes, please send my enquiry.' },
]
const leadAction = 'I will send that now.\n```json\n{"action":"submit_lead","lead":{"name":"Sam Lee","company":"Acme","contact":"sam@example.com; +27 72 123 4567","requirement":"PLC upgrade","summary":"Sam Lee at Acme needs a PLC upgrade."}}\n```'
let server
let base
let raw = 'Hello, how can I help?'
let notifyResult = true
let providerFails = false
let submissions = []
const request = (messages = userMessages, extra = {}, options = {}) => fetch(`${base}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origin, ...options.headers },
  body: JSON.stringify({ messages, currentRoute: '/contact', ...extra }),
})

before(async () => {
  server = createApp(config, {
    ask: async () => { if (providerFails) throw Error('private provider detail'); return raw },
    notify: async submission => { submissions.push(submission); return notifyResult },
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => { await new Promise(resolve => server.close(resolve)) })

test('health and exact origin CORS', async () => {
  const health = await fetch(`${base}/health`)
  assert.equal(health.status, 200)
  assert.equal((await health.json()).status, 'ok')
  const denied = await request(userMessages, {}, { headers: { Origin: `${origin}.evil.test` } })
  assert.equal(denied.status, 403)
  assert.equal(denied.headers.get('access-control-allow-origin'), null)
  const allowed = await request()
  assert.equal(allowed.status, 200)
  assert.equal(allowed.headers.get('access-control-allow-origin'), origin)
})

test('invalid messages and oversized bodies are rejected', async () => {
  assert.equal((await request([{ type: 'user', text: '' }])).status, 400)
  assert.equal((await request(Array(21).fill(userMessages[0]))).status, 400)
  assert.equal((await request([{ type: 'user', text: 'a'.repeat(33_000) }])).status, 413)
})

test('navigation cards allow only site routes', async () => {
  raw = 'See this.\n```json\n{"cards":[{"title":"Safe","linkText":"OPEN","route":"/contact","icon":"cpu"},{"title":"Bad","linkText":"OPEN","route":"https://evil.test","icon":"data"}]}\n```'
  const body = await (await request()).json()
  assert.equal(body.cards.length, 1)
  assert.equal(body.cards[0].route, '/contact')
})

test('lead requires explicit visitor consent even when Gemini emits an action', async () => {
  raw = leadAction
  submissions = []
  const body = await (await request(userMessages.slice(0, 1))).json()
  assert.equal(body.leadCaptured, false)
  assert.equal(submissions.length, 0)
  assert.doesNotMatch(body.text, /sent|submitted|received/i)
  const refused = await (await request([...userMessages.slice(0, 2), { type: 'user', text: 'No, do not send it.' }])).json()
  assert.equal(refused.leadCaptured, false)
  assert.equal(submissions.length, 0)
})

test('Resend acceptance is the only successful capture and includes the enquiry context', async () => {
  raw = leadAction
  submissions = []
  notifyResult = true
  const body = await (await request()).json()
  assert.equal(body.leadCaptured, true)
  assert.equal(submissions.length, 1)
  assert.equal(submissions[0].lead.name, 'Sam Lee')
  assert.equal(submissions[0].lead.company, 'Acme')
  assert.equal(submissions[0].lead.email, 'sam@example.com')
  assert.equal(submissions[0].lead.phone, '+27 72 123 4567')
  assert.equal(submissions[0].lead.requirement, 'PLC upgrade')
  assert.match(submissions[0].summary, /Sam Lee at Acme is enquiring about PLC upgrade/)
  assert.match(submissions[0].summary, /Visitor's own words: My name is Sam Lee/)
  assert.equal(submissions[0].route, '/contact')
})

test('email failure is controlled and retry uses the same idempotency key', async () => {
  raw = leadAction
  submissions = []
  notifyResult = false
  const failed = await request()
  assert.equal(failed.status, 502)
  const error = await failed.json()
  assert.equal(error.code, 'lead_delivery_failed')
  assert.equal(error.leadCaptured, false)
  assert.doesNotMatch(JSON.stringify(error), /test-secret|sam@example.com/)
  notifyResult = true
  const retryMessages = [...userMessages, { type: 'assistant', text: 'Your enquiry could not be sent. Please try again.' }, { type: 'user', text: 'Please retry.' }]
  const retried = await request(retryMessages)
  assert.equal(retried.status, 200)
  assert.equal((await retried.json()).leadCaptured, true)
  assert.equal(submissions[0].idempotencyKey, submissions[1].idempotencyKey)
  assert.equal(submissions[0].summary, submissions[1].summary)
})

test('invented contact data is not submitted', async () => {
  raw = leadAction
  submissions = []
  const messages = [{ type: 'user', text: 'Please send my enquiry, I have not given any contact details.' }]
  const body = await (await request(messages)).json()
  assert.equal(body.leadCaptured, false)
  assert.equal(submissions.length, 0)
})

test('malformed visitor email cannot become Reply-To or qualify as contact', async () => {
  raw = 'Sending.\n```json\n{"action":"submit_lead","lead":{"name":"Sam Lee","contact":"sam..lee@example.com","requirement":"PLC upgrade"}}\n```'
  submissions = []
  const messages = [{ type: 'user', text: 'Sam Lee here. My email is sam..lee@example.com. Please send my enquiry about a PLC upgrade.' }]
  const body = await (await request(messages)).json()
  assert.equal(body.leadCaptured, false)
  assert.equal(submissions.length, 0)
})

test('a validated phone alone can submit without Reply-To', async () => {
  raw = 'Sending.\n```json\n{"action":"submit_lead","lead":{"name":"Sam Lee","contact":"+27 72 123 4567","requirement":"PLC upgrade"}}\n```'
  submissions = []
  notifyResult = true
  const messages = [{ type: 'user', text: 'Sam Lee here. Call +27 72 123 4567 about a PLC upgrade. Please send my enquiry.' }]
  const body = await (await request(messages)).json()
  assert.equal(body.leadCaptured, true)
  assert.equal(submissions[0].lead.phone, '+27 72 123 4567')
  assert.equal(submissions[0].lead.email, undefined)
})

test('email payload is plain text, addressed correctly, and uses validated Reply-To', async () => {
  let sent
  const accepted = await notifyLead({
    lead: { name: 'Sam Lee', company: 'Acme', email: 'sam@example.com', phone: '+27 72 123 4567', requirement: 'PLC upgrade' },
    summary: 'Needs a PLC upgrade.', route: '/contact', idempotencyKey: 'test-key',
  }, 'test-secret', 'leads@notify.hybridcontrol.co.za', async (_url, options) => {
    sent = { headers: options.headers, body: JSON.parse(options.body) }
    return new Response(JSON.stringify({ id: 'email-123' }), { status: 200 })
  })
  assert.equal(accepted, true)
  assert.deepEqual(sent.body.to, ['web@hybridcontrol.co.za'])
  assert.equal(sent.body.reply_to, 'sam@example.com')
  assert.equal(sent.headers['Idempotency-Key'], 'test-key')
  assert.equal(sent.body.html, undefined)
  assert.match(sent.body.text, /Sam Lee.*Acme/s)
  assert.match(sent.body.text, /\/contact/)
  assert.match(sent.body.text, /Needs a PLC upgrade/)
  const rejected = await notifyLead({
    lead: { name: 'Sam Lee', company: '', phone: '+27 72 123 4567', requirement: 'PLC upgrade' },
    summary: 'PLC upgrade request', route: '/contact', idempotencyKey: 'phone-only',
  }, 'test-secret', 'leads@notify.hybridcontrol.co.za', async (_url, options) => {
    assert.equal(JSON.parse(options.body).reply_to, undefined)
    return new Response('{}', { status: 200 })
  })
  assert.equal(rejected, false)
})

test('provider failure has a safe response', async () => {
  providerFails = true
  const response = await request()
  assert.equal(response.status, 502)
  assert.doesNotMatch(JSON.stringify(await response.json()), /private provider detail/)
  providerFails = false
})

test('startup requires secrets and exact origins, with no lead file', () => {
  assert.throws(() => configFromEnv({}), /GEMINI_API_KEY/)
  const valid = configFromEnv({ GEMINI_API_KEY: 'x', RESEND_API_KEY: 'y', RESEND_FROM: 'leads@notify.hybridcontrol.co.za', ALLOWED_ORIGINS: origin })
  assert.equal(valid.leadsFile, undefined)
  assert.equal(valid.allowedOrigins.has(origin), true)
})

test('rate limit blocks excess chat requests', async () => {
  const limited = createApp({ ...config, rateLimit: 1 }, { ask: async () => 'Hello' })
  await new Promise(resolve => limited.listen(0, '127.0.0.1', resolve))
  const prior = base
  base = `http://127.0.0.1:${limited.address().port}`
  assert.equal((await request()).status, 200)
  assert.equal((await request()).status, 429)
  await new Promise(resolve => limited.close(resolve))
  base = prior
})
