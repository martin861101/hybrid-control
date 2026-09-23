import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { access, constants, open } from 'node:fs/promises'
import { dirname } from 'node:path'
import { askGemini, parseModelReply, validateRequest } from './chat.js'
import { notifyLead, saveLead } from './leads.js'

export type Config = {
  apiKey: string; model: string; allowedOrigins: Set<string>; leadsFile: string;
  resendKey: string; resendFrom: string; rateLimit: number;
}
export type Dependencies = {
  ask?: typeof askGemini; save?: typeof saveLead; notify?: typeof notifyLead;
}

const respond = (res: ServerResponse, status: number, data: object) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  res.end(JSON.stringify(data))
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  let size = 0
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > 32_768) throw new Error('too_large')
    chunks.push(chunk)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown }
  catch { throw new Error('bad_json') }
}

export function createApp(config: Config, deps: Dependencies = {}) {
  const attempts = new Map<string, { count: number; expires: number }>()
  return createServer(async (req, res) => {
    const origin = req.headers.origin
    if (origin && !config.allowedOrigins.has(origin)) return respond(res, 403, { error: 'Origin not allowed' })
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    }
    if (req.url === '/health' && req.method === 'GET') return respond(res, 200, { status: 'ok' })
    if (req.url !== '/api/chat') return respond(res, 404, { error: 'Not found' })
    if (req.method === 'OPTIONS') return respond(res, 204, {})
    if (req.method !== 'POST') return respond(res, 405, { error: 'Method not allowed' })
    if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) return respond(res, 415, { error: 'JSON required' })
    const forwarded = process.env.RENDER_SERVICE_ID ? req.headers['x-forwarded-for'] : undefined
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    const record = attempts.get(ip)
    const next = !record || record.expires <= now ? { count: 1, expires: now + 60_000 } : { count: record.count + 1, expires: record.expires }
    attempts.set(ip, next)
    if (attempts.size > 10_000) for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key)
    if (next.count > config.rateLimit) return respond(res, 429, { error: 'Please wait before sending another message.' })
    try {
      const input = validateRequest(await readJson(req))
      if (!input) return respond(res, 400, { error: 'Invalid chat request' })
      const raw = await (deps.ask || askGemini)(input.messages, input.currentRoute, config.apiKey, config.model)
      const result = parseModelReply(raw, input.messages)
      if (!result.lead) return respond(res, 200, { text: result.text, cards: result.cards, leadCaptured: false })
      try {
        await (deps.save || saveLead)(config.leadsFile, result.lead)
      } catch {
        console.error('Lead persistence failed')
        return respond(res, 503, { error: 'Your enquiry could not be saved. Please try again or contact us directly.' })
      }
      const notified = await (deps.notify || notifyLead)(result.lead, config.resendKey, config.resendFrom)
      if (!notified) console.error('Lead notification failed; enquiry saved')
      return respond(res, 200, {
        text: notified ? 'Thank you. Your enquiry has been received and our team has been notified.' : 'Thank you. Your enquiry has been saved, but the team notification could not be delivered. Please contact us directly if your request is urgent.',
        cards: result.cards, leadCaptured: true, notificationStatus: notified ? 'sent' : 'failed',
      })
    } catch (error) {
      if (error instanceof Error && (error.message === 'bad_json' || error.message === 'too_large')) {
        return respond(res, error.message === 'too_large' ? 413 : 400, { error: 'Invalid chat request' })
      }
      console.error('Chat request failed')
      return respond(res, 502, { error: 'The assistant is unavailable. Please try again later.' })
    }
  })
}

export function configFromEnv(env: NodeJS.ProcessEnv): Config {
  const allowedOrigins = new Set((env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean))
  const config: Config = {
    apiKey: env.GEMINI_API_KEY || '', model: env.AI_MODEL || 'gemini-3.1-flash-lite',
    allowedOrigins, leadsFile: env.LEADS_FILE || '', resendKey: env.RESEND_API_KEY || '',
    resendFrom: env.RESEND_FROM || '', rateLimit: 12,
  }
  if (!config.apiKey || !config.leadsFile || !allowedOrigins.size) throw new Error('GEMINI_API_KEY, LEADS_FILE and ALLOWED_ORIGINS are required')
  if (!config.resendKey || !config.resendFrom) throw new Error('RESEND_API_KEY and RESEND_FROM are required')
  for (const origin of allowedOrigins) if (new URL(origin).origin !== origin || !origin.startsWith('https://') && !origin.startsWith('http://localhost:')) throw new Error('Invalid ALLOWED_ORIGINS')
  return config
}

export async function verifyLeadStore(filePath: string): Promise<void> {
  await access(dirname(filePath), constants.W_OK)
  const file = await open(filePath, 'a', 0o600)
  await file.close()
}
