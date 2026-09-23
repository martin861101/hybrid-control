import { allowedRoutes, businessContext, pageContext } from './knowledge.js'

export type Message = { type: 'user' | 'assistant'; text: string }
export type Lead = { name: string; company: string; email?: string; phone?: string; requirement: string }
export type Card = { id: string; title: string; icon: 'cpu' | 'integration' | 'data'; linkText: string; route: string }

const clean = (value: unknown, max: number): string | null =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null

export function validateRequest(value: unknown): { messages: Message[]; currentRoute: string } | null {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (!Array.isArray(input.messages) || input.messages.length < 1 || input.messages.length > 20) return null
  const messages: Message[] = []
  for (const message of input.messages) {
    if (!message || typeof message !== 'object') return null
    const item = message as Record<string, unknown>
    const text = clean(item.text, 2000)
    if ((item.type !== 'user' && item.type !== 'assistant') || !text) return null
    messages.push({ type: item.type, text })
  }
  if (messages.at(-1)?.type !== 'user') return null
  const currentRoute = typeof input.currentRoute === 'string' && allowedRoutes.has(input.currentRoute) ? input.currentRoute : '/'
  return { messages, currentRoute }
}

export function hasSubmissionConsent(messages: Message[]): boolean {
  const last = messages.at(-1)?.text.trim().toLowerCase() || ''
  if (/\b(?:do not|don't|never|no)\b.{0,30}\b(?:send|submit|email|contact)\b/.test(last)) return false
  if (/\b(?:please\s+(?:send|submit|email|contact)|send\s+(?:my|this|the)\s+enquiry|submit\s+(?:my|this|the)\s+enquiry|go ahead|retry|try again|i agree|you can send)\b/.test(last)) return true
  if (/^(?:yes|sure|okay|ok)\b/.test(last)) {
    const priorAssistant = [...messages].reverse().find(message => message.type === 'assistant')?.text || ''
    return /\b(?:send|submit|enquiry|contact)\b/i.test(priorAssistant)
  }
  return false
}

function validatedContact(candidate: Record<string, unknown>, userText: string): { email?: string; phone?: string } {
  const contact = [candidate.email, candidate.phone, candidate.contact].filter(value => typeof value === 'string').join(' ')
  const emailToken = contact.split(/[\s;,]+/).find(value => value.includes('@'))?.replace(/^[<("']+|[>)"'.]+$/g, '')
  const email = emailToken && /^[A-Z0-9](?:[A-Z0-9._%+-]*[A-Z0-9])?@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(emailToken) && !emailToken.split('@')[0].includes('..') ? emailToken : undefined
  const phoneSource = contact.replace(/\S+@\S+/g, ' ')
  const phoneCandidate = phoneSource.match(/(?:^|[^A-Za-z0-9])(\+?[0-9][0-9\s()-]{6,}[0-9])(?=$|[^A-Za-z0-9])/)?.[1]?.trim()
  const phoneDigits = phoneCandidate?.replace(/\D/g, '')
  const userDigits = userText.replace(/\D/g, '')
  return {
    ...(email && userText.toLowerCase().includes(email.toLowerCase()) ? { email } : {}),
    ...(phoneCandidate && phoneDigits && phoneDigits.length >= 7 && phoneDigits.length <= 15 && userDigits.includes(phoneDigits) ? { phone: phoneCandidate } : {}),
  }
}

export function parseModelReply(raw: string, messages: Message[]): { text: string; cards: Card[]; lead: Lead | null; attemptedLead: boolean } {
  const limited = raw.slice(0, 8000)
  const block = limited.match(/```json\s*([\s\S]*?)\s*```\s*$/)
  const bare = !block && limited.match(/(\{\s*"(?:cards|action)"[\s\S]*\})\s*$/)
  const matched = block || bare
  let text = matched ? limited.slice(0, matched.index).trim() : limited.trim()
  let cards: Card[] = []
  let lead: Lead | null = null
  let attemptedLead = false
  if (matched) {
    try {
      const parsed: unknown = JSON.parse(matched[1])
      if (parsed && typeof parsed === 'object') {
        const action = parsed as Record<string, unknown>
        if (Array.isArray(action.cards)) {
          cards = action.cards.slice(0, 3).flatMap((entry: unknown, index: number) => {
            if (!entry || typeof entry !== 'object') return []
            const card = entry as Record<string, unknown>
            const title = clean(card.title, 100)
            const linkText = clean(card.linkText, 30)
            if (!title || !linkText || typeof card.route !== 'string' || !allowedRoutes.has(card.route)) return []
            const icon = card.icon === 'integration' || card.icon === 'data' ? card.icon : 'cpu'
            return [{ id: `card-${index}`, title, linkText, route: card.route, icon }]
          })
        }
        if (action.action === 'submit_lead') {
          attemptedLead = true
          if (action.lead && typeof action.lead === 'object' && hasSubmissionConsent(messages)) {
            const candidate = action.lead as Record<string, unknown>
            const name = clean(candidate.name, 120)
            const company = candidate.company === '' || candidate.company == null ? '' : clean(candidate.company, 120)
            const requirement = clean(candidate.requirement, 2000)
            const userText = messages.filter(item => item.type === 'user').map(item => item.text).join(' ')
            const contact = validatedContact(candidate, userText)
            if (name && userText.toLowerCase().includes(name.toLowerCase()) && company !== null && requirement && (contact.email || contact.phone)) {
              lead = { name, company: company && userText.toLowerCase().includes(company.toLowerCase()) ? company : '', ...contact, requirement }
            }
          }
        }
      }
    } catch { /* Invalid model actions are ignored. */ }
  }
  if (!text) text = 'How can I help with your engineering requirements?'
  return { text, cards, lead, attemptedLead }
}

export async function askGemini(messages: Message[], route: string, apiKey: string, model: string, requestFetch: typeof fetch = fetch): Promise<string> {
  const response = await requestFetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: `${businessContext}\n${pageContext(route)}` }] },
      contents: messages.map(item => ({ role: item.type === 'assistant' ? 'model' : 'user', parts: [{ text: item.text }] })),
      generationConfig: { maxOutputTokens: 1000 },
    }),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('provider_failed')
  const data = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('provider_failed')
  return text
}
