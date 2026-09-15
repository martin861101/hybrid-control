import { loadEnv } from 'vite';
import type { Plugin } from 'vite';
import { capabilities, industries, projects } from '../data/site.js';

const getApiKey = () => { const env = loadEnv('', process.cwd(), ''); return env.GEMINI_API_KEY || process.env.GEMINI_API_KEY; };
const getModel = () => { const env = loadEnv('', process.cwd(), ''); return env.AI_MODEL || process.env.AI_MODEL || 'gemini-3.1-flash-lite'; }; // fallback

// Build a small, maintainable source of truth
const hybridContext = `
Hybrid Control Corporation is an engineering company specializing in electrical, automation, and telemetry projects.
We provide the following capabilities:
${capabilities.map(c => `- ${c.title}: ${c.short}`).join('\n')}

We work in these industries:
${industries.map(i => `- ${i.name}: ${i.copy}`).join('\n')}

Some of our key projects:
${projects.map(p => `- ${p.title} (${p.client}, ${p.location}): ${p.copy}`).join('\n')}

Valid website routes you can direct users to:
- /capabilities (or /capabilities/engineering, /capabilities/system-integration, /capabilities/maintenance, /capabilities/manufacturing, /capabilities/project-management)
- /industries
- /experience or /projects
- /products
- /insights
- /contact

You are the Hybrid Control Assistant.
Your goal is to help visitors understand our services, direct them to relevant pages, and capture leads (name, company, email/phone, requirements) naturally in conversation.
When a user shows intent to contact us or start a project, gently gather their details. Once you have enough information, you may say something like "I will submit this enquiry for you" and output a special JSON block at the very end of your response to trigger the system to save the lead. The format must be exactly:
\`\`\`json
{ "action": "submit_lead", "lead": { "name": "...", "company": "...", "contact": "...", "requirement": "..." } }
\`\`\`
If you want to suggest a navigation card, use this format at the end of your response:
\`\`\`json
{ "cards": [ { "id": "c1", "title": "...", "icon": "cpu", "linkText": "LEARN MORE", "route": "/capabilities" } ] }
\`\`\`
If the user asks for the company profile or documentation, provide a download card:
\`\`\`json
{ "cards": [ { "id": "pdf1", "title": "Hybrid Control\nCompany Profile", "icon": "data", "linkText": "DOWNLOAD PDF", "route": "/pdf/hybrid-control.pdf" } ] }
\`\`\`
Do not interrogate the visitor. Be conversational, professional, and concise. Do not invent facts about Hybrid.
IMPORTANT: Do not use any Markdown formatting in your conversational text (e.g. no **bold**, no *italics*). Output plain text only for your conversational response. However, you MUST STILL wrap your JSON action blocks at the very end in standard \`\`\`json ... \`\`\` tags so the system can parse them.
`;

export function chatApiPlugin(): Plugin {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', handleChatRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/chat', handleChatRequest);
    }
  };
}

async function handleChatRequest(req: any, res: any, next: any) {
  if (req.method !== 'POST') return next();
  
  let body = '';
  req.on('data', (chunk: any) => { body += chunk.toString(); });
  
  req.on('end', async () => {
    try {
      const { messages, currentRoute, pageTitle } = JSON.parse(body);
      
      const systemInstruction = `${hybridContext}\n\nCurrent Page: ${pageTitle} (Route: ${currentRoute})`;
      
      const geminiMessages = messages.map((m: any) => ({
        role: m.type === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${getModel()}:generateContent?key=${getApiKey()}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: geminiMessages,
        })
      });
      
      const data: any = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Gemini API Error');
      }
      
      const text = data.candidates[0].content.parts[0].text;
      
      // Parse for any JSON actions in the response
      let finalText = text;
      let actionData = null;
      let cardsData = null;
      
      let parsedJsonStr = null;
      const jsonRegex = /```json\n?([\s\S]*?)\n?```/;
      const match = text.match(jsonRegex);
      
      let replaceTarget = '';
      if (match) {
        parsedJsonStr = match[1];
        replaceTarget = match[0];
      } else {
        const fallbackRegex = /(\{[\s\n]*"(?:cards|action)"[\s\S]*\})$/;
        const fallbackMatch = text.match(fallbackRegex);
        if (fallbackMatch) {
          parsedJsonStr = fallbackMatch[1];
          replaceTarget = fallbackMatch[0];
        }
      }

      if (parsedJsonStr) {
        try {
          const parsed = JSON.parse(parsedJsonStr);
          if (parsed.action === 'submit_lead') {
            actionData = parsed.lead;
            console.log('--- NEW LEAD CAPTURED ---', parsed.lead);
          }
          if (parsed.cards) {
            cardsData = parsed.cards;
          }
          finalText = text.replace(replaceTarget, '').trim();
        } catch (e) {
          // ignore parsing error
        }
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ text: finalText, leadCaptured: !!actionData, cards: cardsData }));
      
    } catch (err: any) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}
