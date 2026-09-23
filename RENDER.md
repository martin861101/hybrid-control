# Hybrid Control migration — Render agent prompt

Use the `frontend-backend-separation` skill and its `references/hybrid-control.md` reference on this local repository.

Separate Hybrid Control into a static React/Vite frontend for my existing webserver and a standalone Node.js API for **Render**. Inspect the current code and uncommitted work first. Preserve the existing website, animations, SEO-generated route pages, routes and chat UI.

Move the existing Vite `/api/chat` middleware into the standalone backend; make the frontend API base URL configurable (`VITE_API_BASE_URL=https://api.hybridcontrol.co.za`). Keep Gemini keys on the backend. Correct lead capture so it stores the enquiry durably and sends an email notification to `web@hybridcontrol.co.za`, not merely logs it. Prefer an HTTPS email API such as Resend using a verified subdomain sender, without changing existing mailbox/MX records. Set Reply-To to the visitor's validated email if available. Acknowledge receipt only after a confirmed durable save or successful delivery; distinguish notification failures. Implement server-side validation, allowed navigation routes, rate limiting, exact allowed-origin CORS and safe error handling. Keep business knowledge maintainable.

Implement independent build/start scripts, Render deployment configuration/docs (Web Service, `0.0.0.0:$PORT`, `/health`, root/build/start commands, paid always-on recommendation), environment examples, webserver upload instructions, and meaningful tests. Verify the built static frontend against the independently running backend and fix failures. Do not deploy, modify DNS, modify the live email account, or commit secrets. Report changed files, verification, Render settings, environment variables and manual steps.
