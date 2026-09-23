# Static website and Render Free API

## Build and run

The root Vite app is the static website. `npm ci && npm run build` produces `dist/`, including prerendered route HTML. Upload **the contents of `dist/`** to the existing webserver's document root. Configure the webserver to serve existing files and directories first, then fall back to `/index.html` for React routes. Keep the generated `/company/index.html`, `/capabilities/.../index.html`, `/experience/.../index.html`, and `.html` variants. `VITE_API_BASE_URL` is a public build-time setting. Build the production upload with `VITE_API_BASE_URL=https://api.hybridcontrol.co.za npm run build`.

The backend uses the repo root to share `src/data/site.ts` as the single source of business data. Build it with `npm ci && npm run build:backend`, then run `npm run start:backend`. It binds to `0.0.0.0:$PORT` and exposes `GET /health`. For local development, copy `backend/.env.example` to `backend/.env.local`, set local secrets, and add `http://localhost:5173` to `ALLOWED_ORIGINS`. Start it with `node --env-file=backend/.env.local backend/dist/backend/main.js`, then run `npm run dev`. Vite proxies `/api/chat` to localhost:3001 in development only.

## Render Free Web Service

[render.yaml](render.yaml) configures one Free Node Web Service without a disk. In the Render Dashboard, connect this repository, leave **Root Directory blank**, choose the **Free** plan, set build command `npm ci && npm run build:backend`, start command `npm run start:backend`, and health check `/health`. Render supplies `PORT`. Free services spin down after inactivity, so the next chat request can have a cold start. The browser allows up to 90 seconds for the API response. No local file or database is used for lead storage; an enquiry is acknowledged only when Resend accepts the email request.

Render environment variables:

| Name | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Secret Gemini API key; Render only. |
| `RESEND_API_KEY` | Secret Resend API key; Render only. |
| `AI_MODEL` | Server model name; defaults to `gemini-3.1-flash-lite`. |
| `RESEND_FROM` | Verified sender, e.g. `leads@notify.hybridcontrol.co.za`. |
| `ALLOWED_ORIGINS` | Exact comma-separated browser origins, initially `https://hybridcontrol.co.za,https://www.hybridcontrol.co.za`. Add staging only if used. No trailing slashes. |

Use uppercase names with underscores. Only the frontend's `VITE_API_BASE_URL` has a `VITE_` prefix. Never add `GEMINI_API_KEY` or `RESEND_API_KEY` to the frontend host's public build environment.

After Render creates its `onrender.com` URL, test `/health` there. Add `api.hybridcontrol.co.za` as a custom domain in Render, then follow the DNS record and HTTPS verification shown by Render. Build/upload the frontend with that API URL after HTTPS works. Verify the exact UI origin shown by the browser and include it in `ALLOWED_ORIGINS`. Keep the mailbox and its MX records unchanged. Verify the sender subdomain (`notify.hybridcontrol.co.za`) using the DNS records provided by Resend; then set `RESEND_FROM`. The notification destination is `web@hybridcontrol.co.za`.

## API and lead behavior

`POST /api/chat` accepts JSON `{ "messages": [{ "type": "user", "text": "..." }], "currentRoute": "/contact" }`. It returns `{ "text": "...", "cards": [], "leadCaptured": false }` for ordinary replies. When the visitor explicitly agrees to submit and has supplied a name, validated email and/or phone, and requirements, the API sends a plain-text notification with company (if supplied), a conversation summary, and the originating route. Only a successful Resend response with an email ID returns `leadCaptured: true`. A failed Resend call returns HTTP 502 with `code: "lead_delivery_failed"`; the chat tells the visitor to retry. No enquiry is stored by this service. Resend's `Idempotency-Key` is derived from the validated enquiry and route to reduce duplicate emails on retries; Resend's idempotency window is limited, and a materially changed enquiry is a new submission.

The server limits body size, history length, route/card values, request rate, and provider call time. It accepts only exact origins for browser requests. CORS is a browser boundary, not authentication. Resend API acceptance is not proof of final inbox delivery; monitor Resend delivery events after launch.

## Verification

Run `npm test`, `npm run build`, `npm run build:backend`, and `npm run lint`. For a static integration check, set `VITE_API_BASE_URL=http://localhost:3001` during the frontend build, allow `http://localhost:4173` in the backend, serve `dist/` with a static webserver on 4173, and start the compiled backend on 3001. Check a prerendered route, `/health`, CORS, chat errors, and that no backend code or secrets appear in `dist/`. Real Gemini and Resend requests require configured credentials and a verified sender.
