Implement the existing Hybrid Control website AI assistant as a simple, production-ready conversational business assistant.

First inspect the existing chat implementation and relevant site structure. Preserve the existing assistant UI/styling exactly — this task is functionality only. Do not redesign the widget.

Use Gemini through environment configuration. I will provide the API key, provider and model (Gemini 3.1 Flash Lite) in the env file. Do not hardcode credentials, provider names or model configuration where env values should be used.

The assistant only needs to do these things:

1. KNOW HYBRID

- Build a small, maintainable source of truth containing Hybrid Control's business information.
- Use the actual website/repo content to populate it.
- Include services, capabilities, industries, company information, relevant terminology, contact information and valid website routes.
- Keep this simple. Do NOT introduce a vector database, embeddings, RAG infrastructure, crawler or external knowledge platform.
- The assistant must not invent Hybrid capabilities, projects, clients, certifications or facts.

2. WEBSITE NAVIGATION

- Give the assistant knowledge of the site's real routes/pages.
- When relevant, it can return navigation actions such as "View Capabilities" or "See Our Projects".
- Only use routes that actually exist in the application.
- Never allow the model to invent URLs.
- Use the site's existing routing/navigation mechanism.

3. CONVERSATIONAL LEAD CAPTURE

- Replace the need for a traditional contact form inside the assistant.
- When a visitor shows genuine enquiry/project/contact intent, naturally gather useful information during the conversation:
  - name
  - company, if applicable
  - email and/or phone
  - project/enquiry requirement
- Do not interrogate the visitor or ask every field sequentially.
- Reuse details already supplied in the conversation.
- Once enough contact information and context exists, allow the assistant to submit the enquiry.
- Store the captured details plus a concise summary of what the visitor needs and the originating page.
- Use the project's existing database/backend patterns if available rather than introducing unnecessary infrastructure.
- Add a clean notification mechanism using existing project conventions if one already exists. Do not build a large notification system just for this.

4. PAGE AWARENESS
   Send lightweight page context to the assistant:

- current route
- page title

This should allow questions such as "What does this do?" to be understood based on the page the visitor is currently viewing.

ARCHITECTURE

Keep the implementation deliberately small:

Existing Chat UI
→ assistant API/backend
→ Gemini
→ Hybrid business context
→ controlled navigation / lead capture
→ existing database/backend

Do not introduce:

- autonomous agents
- agent frameworks
- vector databases
- embeddings
- complex long-term memory
- crawling infrastructure
- CRM systems
- unnecessary dependencies
- unnecessary abstractions

SECURITY

- Gemini API calls must happen server-side.
- Never expose API keys to the browser.
- Validate and sanitise assistant actions server-side.
- The model must not directly execute arbitrary URLs/actions.
- Only predefined application actions/routes are permitted.

ENVIRONMENT

Support environment-driven configuration along the lines of:

AI_PROVIDER=
AI_MODEL=
GEMINI_API_KEY=

Follow the repository's existing env/config conventions if equivalents already exist.

IMPORTANT

Inspect before changing anything. Reuse existing components, APIs, database patterns and utilities wherever practical.

Do not rewrite working parts of the application simply to fit a new architecture.

Do not modify the existing assistant visual design unless a tiny functional change is strictly necessary.

Implement the feature completely, inspect your changes, fix issues you find, and run the relevant build/typecheck/tests before considering the task complete.

At completion, report:

- files changed
- how Hybrid knowledge is supplied
- how navigation actions work
- how leads are stored/submitted
- required env variables
- verification performed
