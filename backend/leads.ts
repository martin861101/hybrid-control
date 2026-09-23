import type { Lead, Message } from './chat.js'

export type LeadSubmission = { lead: Lead; summary: string; route: string; idempotencyKey: string }

const oneLine = (value: string): string => value.replace(/\p{Cc}+/gu, ' ').replace(/\s+/g, ' ').trim()

export function summarizeConversation(lead: Lead, messages: Message[]): string {
  const details = messages
    .filter(message => message.type === 'user' && !(message.text.length <= 120 && /^(?:yes|sure|okay|ok|retry|try again|go ahead|please\s+(?:send|submit|retry|try again))\b/i.test(message.text.trim())))
    .map(message => oneLine(message.text))
    .slice(-4).join(' ').slice(0, 1000)
  return oneLine(`${lead.name}${lead.company ? ` at ${lead.company}` : ''} is enquiring about ${lead.requirement}. Visitor's own words: ${details}`)
}

export async function notifyLead(submission: LeadSubmission, apiKey: string, from: string, requestFetch: typeof fetch = fetch): Promise<boolean> {
  if (!apiKey || !from) return false
  const { lead, route, summary, idempotencyKey } = submission
  try {
    const response = await requestFetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({
        from,
        to: ['web@hybridcontrol.co.za'],
        subject: 'New Hybrid Control website enquiry',
        text: [
          `Name: ${oneLine(lead.name)}`,
          `Company: ${oneLine(lead.company) || 'Not supplied'}`,
          `Email: ${lead.email || 'Not supplied'}`,
          `Phone: ${lead.phone || 'Not supplied'}`,
          `Requirements: ${oneLine(lead.requirement)}`,
          `Conversation summary: ${oneLine(summary)}`,
          `Originating page: ${route}`,
        ].join('\n'),
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return false
    const data = await response.json() as { id?: unknown }
    return typeof data.id === 'string' && data.id.length > 0
  } catch { return false }
}
