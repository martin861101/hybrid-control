import { open } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import type { Lead } from './chat.js'

export async function saveLead(filePath: string, lead: Lead): Promise<void> {
  const file = await open(filePath, 'a', 0o600)
  try {
    await file.writeFile(`${JSON.stringify({ id: randomUUID(), receivedAt: new Date().toISOString(), ...lead })}\n`)
    await file.sync()
  } finally {
    await file.close()
  }
}

export async function notifyLead(lead: Lead, apiKey: string, from: string, requestFetch: typeof fetch = fetch): Promise<boolean> {
  if (!apiKey || !from) return false
  try {
    const response = await requestFetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: ['web@hybridcontrol.co.za'],
        subject: 'New Hybrid Control website enquiry',
        text: `Name: ${lead.name}\nCompany: ${lead.company}\nContact: ${lead.contact}\nRequirements: ${lead.requirement}`,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return false
    const data = await response.json() as { id?: unknown }
    return typeof data.id === 'string' && data.id.length > 0
  } catch { return false }
}
