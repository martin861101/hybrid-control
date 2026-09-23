Update Hybrid Control to run on Render's Free Web Service.

Inspect the existing backend, render.yaml, environment configuration and tests first.

Remove the persistent file-based lead storage, LEADS_FILE dependency and Render persistent disk configuration. Do not introduce Supabase or another database.

Keep the existing standalone Node API, Gemini integration, static React frontend and Resend HTTPS email integration.

When a visitor has supplied sufficient contact details and agreed to submit an enquiry, send an email directly through Resend to web@hybridcontrol.co.za. Include their name, company if available, validated email and/or phone, enquiry requirements, conversation summary and originating page. Use RESEND_FROM for the verified sender and the visitor's email as Reply-To when valid.

Only return leadCaptured: true after Resend accepts the request successfully. If email submission fails, return a controlled error and allow the visitor to retry. Do not falsely acknowledge submission or unnecessarily send duplicates.

Preserve input validation, safe HTML/email formatting, CORS restrictions, payload limits and reasonable abuse protection for the public chat API. Keep Gemini and Resend keys server-side.

Update render.yaml to use a Free Web Service without a disk. Remove obsolete storage configuration from environment examples and deployment documentation. Preserve the existing backend build/start commands and health endpoint.

Run the backend tests, frontend build and backend build. Fix any regressions and report all changes and required Render settings. Do not deploy, change DNS or modify the live website.