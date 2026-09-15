# AI Assistant Setup & UI Files

This document outlines the necessary UI files and components for the AI Assistant integration, in accordance with the `AI-ASSISTANT.md` specifications.

## 1. Core Chat Components

The conversational AI interface is contained within the `src/components/chat/` directory.

- **`src/components/chat/HybridChat.tsx`**
  - **Purpose:** The main React component for the AI assistant. Contains the UI layout, input fields, message list, launcher button, and local state management for the chat interface.
  - **Key Elements:** Chat window, `message` state array, user input field (`.hybrid-send-button`), and "Scroll to Bottom" mechanics.
  - **Integration Note:** API calls to Gemini should be triggered from here (via server-side or API endpoint) instead of hardcoding API keys in the browser.

- **`src/components/chat/HybridChat.css`**
  - **Purpose:** Styling for the AI assistant widget.
  - **Constraint:** Must not redesign the widget; preserve the existing visual design and styling exactly as requested in `AI-ASSISTANT.md`.

## 2. Main Application Integration

- **`src/App.tsx`**
  - **Purpose:** The root component where the AI assistant is mounted.
  - **Integration:** Contains the `<HybridChat />` element which makes it available across all routes in the application.

- **`src/App.css`**
  - **Purpose:** Provides global styles which affect the overall typography, buttons, and layout context within which the chat widget renders.

## 3. Data & Context Sources

To give the AI assistant the "KNOW HYBRID" capabilities, the following files should be used as sources of truth without introducing a vector DB:

- **`src/data/site.ts`** and **`src/data/seo.ts`**: Likely contain routing, terminology, and meta-information.
- **`src/pages/` (Home.tsx, InnerPage.tsx, ProjectsPage.tsx):** Provide the content source for capabilities and projects.
- **Route/Location Context:** The chat component uses `useLocation()` from `react-router-dom` to track the current page, which will need to be passed to the backend for page awareness.

## Next Steps for AI Setup (Backend)
Currently, all UI elements are present. To fulfill the requirements:
1. **Environment Variables:** Set up `.env` with `AI_PROVIDER`, `AI_MODEL`, and `GEMINI_API_KEY`.
2. **Server-Side API:** An API endpoint (e.g., via a Node/Express server or serverless function) must be created to handle calls to Gemini securely. Do not make direct calls from `HybridChat.tsx`.
3. **Knowledge Base:** Extract the text from `ProjectsPage.tsx` and `Home.tsx` into a simple, maintainable JSON or text blob on the server for Gemini's system prompt.
