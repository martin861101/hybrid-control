# Static website and Render API

## Build and run

The root Vite app is the static website. `npm ci && npm run build` produces `dist/`, including prerendered route HTML. Upload **the contents of `dist/`** to the existing webserver's document root. Configure the webserver to serve existing files and directories first, then fall back to `/index.html` for React routes. Keep the generated `/company/index.html`, `/capabilities/.../index.html`, `/experience/.../index.html`, and `.html` variants; do not replace them with a single SPA file. `VITE_API_BASE_URL` is a public build-time setting. Build the production upload with `VITE_API_BASE_URL=https://api.hybridcontrol.co.za npm run build`.

The backend uses the repo root to share `src/data/site.ts` as the single source of business data. Build only it with `npm ci && npm run build:backend`, then run `npm run start:backend`. It binds to `0.0.0.0:$PORT` and exposes `GET /health`. For local development, copy `backend/.env.example` to `backend/.env.local`, set real local secrets, add `http://localhost:5173` to `ALLOWED_ORIGINS`, and point `LEADS_FILE` to a local writable path. Start it with `node --env-file=backend/.env.local backend/dist/backend/main.js`, then run `npm run dev`. Vite proxies `/api/chat` to localhost:3001 in development only.

## Render Web Service

The optional `render.yaml` Blueprint provisions a paid Starter Node Web Service and 1 GB persistent disk. In the Dashboard, connect this repository, leave **Root Directory blank**, use build command `npm ci && npm run build:backend`, start command `npm run start:backend`, health check `/health`, and attach a disk at `/var/data` if you are not using the Blueprint. Render supplies `PORT`. A paid always-on plan is recommended for production enquiries. The persistent disk holds `leads.jsonl` across restarts and deploys; keep the service at one instance because the file is local to that instance. Plan backup and retention for the disk and restrict shell access to staff who handle enquiries.

Environment variables in Render:

| Name | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Secret Gemini API key; Render only. |
| `RESEND_API_KEY` | Secret Resend API key; Render only. |
| `AI_MODEL` | Server model name; defaults to `gemini-3.1-flash-lite`. |
| `RESEND_FROM` | Verified sender, e.g. `leads@notify.hybridcontrol.co.za`. |
| `ALLOWED_ORIGINS` | Exact comma-separated browser origins, initially `https://hybridcontrol.co.za,https://www.hybridcontrol.co.za`. Add staging only if it is used. No trailing slashes. |
| `LEADS_FILE` | `/var/data/leads.jsonl`, inside the mounted persistent disk. |

Use uppercase names with underscores. Only the frontend's `VITE_API_BASE_URL` has a `VITE_` prefix. Never add `GEMINI_API_KEY` or `RESEND_API_KEY` to the frontend host's public build environment.

After Render creates its `onrender.com` URL, test `/health` there. Add `api.hybridcontrol.co.za` as a custom domain in Render, then follow the DNS record and HTTPS verification shown by Render. Build/upload the frontend with that API URL after HTTPS works. Verify the exact UI origin shown by the browser and include it in `ALLOWED_ORIGINS`. Avoid editing the mailbox or its MX records. For Resend, verify the **sender subdomain** (`notify.hybridcontrol.co.za`) using the DNS records provided by Resend; configure `RESEND_FROM` only after verification. The notification destination is `web@hybridcontrol.co.za`.

## API and lead behavior

`POST /api/chat` accepts JSON `{ "messages": [{ "type": "user", "text": "..." }], "currentRoute": "/contact" }`. It returns `{ "text": "...", "cards": [], "leadCaptured": false }` for ordinary replies. A submitted lead returns `leadCaptured: true` only after the enquiry is written and synced to the persistent file. It also returns `notificationStatus: "sent" | "failed"`; a failed email notification is shown in the chat and logged without contact details. Failed persistence returns HTTP 503 and never acknowledges receipt. The server limits body size, history length, route/card values, request rate, and provider call time. It accepts only exact origins for browser requests. CORS is a browser boundary, not authentication.

The `leads.jsonl` file contains personal enquiry data. Treat it as private, back it up, and set an appropriate retention period. Resend's API acceptance is not proof of final inbox delivery; monitor provider delivery events and the backend's notification failure logs after launch.

## Verification

Run `npm test`, `npm run build`, `npm run build:backend`, and `npm run lint`. For a static integration check, set `VITE_API_BASE_URL=http://localhost:3001` during the frontend build, allow `http://localhost:4173` in the backend, serve `dist/` with a static webserver on 4173, and start the compiled backend on 3001. Check a prerendered route, `/health`, CORS, chat errors, and that no backend code or secrets appear in `dist/`. Real Gemini and Resend requests require configured credentials and a verified sender.
