import { allowedRoutes, businessContext, pageContext } from './knowledge.js'

export type Message = { type: 'user' | 'assistant'; text: string }
export type Lead = { name: string; company: string; contact: string; requirement: string; email?: string }
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

export function parseModelReply(raw: string, messages: Message[]): { text: string; cards: Card[]; lead: Lead | null } {
  const limited = raw.slice(0, 8000)
  const block = limited.match(/```json\s*([\s\S]*?)\s*```\s*$/)
  const bare = !block && limited.match(/(\{\s*"(?:cards|action)"[\s\S]*\})\s*$/)
  const matched = block || bare
  let text = matched ? limited.slice(0, matched.index).trim() : limited.trim()
  let cards: Card[] = []
  let lead: Lead | null = null
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
        if (action.action === 'submit_lead' && action.lead && typeof action.lead === 'object') {
          const candidate = action.lead as Record<string, unknown>
          const name = clean(candidate.name, 120)
          const company = candidate.company === '' || candidate.company == null ? '' : clean(candidate.company, 120)
          const contact = clean(candidate.contact, 180)
          const requirement = clean(candidate.requirement, 2000)
          const userText = messages.filter(item => item.type === 'user').map(item => item.text).join(' ').toLowerCase()
          if (name && company !== null && contact && requirement && userText.includes(contact.toLowerCase())) {
            const email = contact.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0]
            const phone = /\+?[0-9][0-9\s()-]{6,}[0-9]/.test(contact)
            if (email || phone) lead = { name, company, contact, requirement, email }
          }
        }
      }
    } catch { /* Invalid model actions are ignored. */ }
  }
  if (!text) text = 'How can I help with your engineering requirements?'
  return { text, cards, lead }
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
