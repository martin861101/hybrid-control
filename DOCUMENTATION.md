# Hybrid Control: Technical Architecture & Feature Documentation

## 1. Executive Summary
This document provides a comprehensive overview of the technical architecture, interactive features, and Artificial Intelligence (AI) integrations for the Hybrid Control digital platform. Built using modern web technologies, the platform is designed to be highly performant, visually engaging, and intelligently responsive to user inquiries.

## 2. Technology Stack & Frameworks
The platform leverages a cutting-edge, React-based technology stack to ensure seamless performance, scalability, and maintainability.

* **Core Framework:** React 19 / TypeScript
* **Build Tool & Server:** Vite (Fast, optimized frontend tooling)
* **Routing:** React Router v7 (Client-side routing for seamless page transitions without reloading)
* **Animation Engines:** 
  * Motion (Framer Motion) - For declarative UI transitions and scroll animations
  * GSAP (GreenSock Animation Platform) - For complex, timeline-based sequencing
  * Three.js - For WebGL-based 3D rendering and interactive models
* **AI Integration:** Google Gemini AI (via custom backend API integration)
* **Iconography:** Lucide React

## 3. Site Architecture & Pages
The application is structured as a Single Page Application (SPA), meaning users navigate between views fluidly without traditional browser page loads. 

### Core Pages
* **Home (`/`):** The primary landing page featuring high-impact 3D animations, an interactive capability overview, industry breakdowns, and social responsibility highlights.
* **Company (`/company`):** Details the engineering philosophy, lifecycle approaches, technology ecosystems, and certification/credibility markers.
* **Capabilities (`/capabilities`):** An overview of core disciplines.
  * *Sub-routes (`/capabilities/:id`):* Detailed breakdowns of specific engineering capabilities (e.g., System Integration, Telemetry, Electrical Engineering).
* **Experience (`/experience`):** A portfolio of core project deliveries.
  * *Sub-routes (`/experience/:id`):* In-depth case studies with architectural diagrams and operational requirements.
* **Industries (`/industries`):** Highlights operational environments (e.g., Water, Mining, Energy).
  * *Sub-routes (`/industries/:id`):* Specific industry challenges and Hybrid Control's solutions.
* **Products (`/products`):** Overviews of physical technology offerings.
* **Insights (`/insights`):** News, telemetry perspectives, and operational edge thinking.
* **Contact (`/contact`):** Centralized communication hub with office locations and direct enquiry channels.

## 4. Animations & Visual Effects
The platform heavily utilizes motion design to communicate engineering precision and technological sophistication.

* **Scroll-Triggered Reveals:** Powered by Framer Motion, elements (headings, cards, paragraphs) seamlessly fade and slide into view as the user scrolls, creating a guided narrative experience.
* **3D Interactive Elements (Three.js):** 
  * The Hero section features an interactive WebGL sphere/topology model that responds to user interaction, symbolizing connectivity and network architecture.
* **Liquid Glass UI:** Critical interaction points (buttons, domain toggles) utilize advanced CSS `backdrop-filter` properties to create a frosted, liquid glass effect that blurs the underlying animated backgrounds.
* **Dynamic Backgrounds:** Custom CSS radial and linear gradients create grid-like "laser" patterns that simulate an engineering blueprint or digital telemetry network.
* **Thematic Consistency:** A rigid adherence to a dark "Navy" aesthetic with vibrant "Cyan" accents, mimicking industrial SCADA control interfaces.

## 5. Artificial Intelligence (AI) Assistant Integration
A standout feature of the platform is the **Hybrid Control Assistant**, an embedded, context-aware AI agent designed to guide users through the company's offerings.

### Key Capabilities
* **Intelligent Routing & UI Generation:** Instead of just outputting raw text, the AI is programmed to generate rich, interactive UI cards. For example, if a user asks about the company profile, the AI seamlessly injects a "Download PDF" UI card directly into the chat stream.
* **Context-Aware Responses:** Powered by Google's Gemini AI, the assistant understands the context of Hybrid Control's services (Water, Mining, SCADA, Telemetry) and provides tailored, professional engineering advice.
* **Seamless PDF Handling:** The chat interface intelligently parses document requests, rendering direct download links that bypass React Router to instantly open or download static assets (e.g., the Company Profile PDF) in a new tab.
* **Quick Action Chips:** The chat interface provides dynamically generated suggestion chips (e.g., "Schneider", "Telemetry") to guide users toward relevant capabilities without requiring manual typing.

### Technical Implementation
* **Backend:** A custom Vite plugin acts as a lightweight proxy server (`src/server/chatApi.ts`), securely authenticating with the Gemini API and injecting hidden system instructions to control the AI's persona and JSON output formatting.
* **Frontend:** The `HybridChat.tsx` component parses the AI's hybrid response (Text + JSON), strips out raw JSON data to protect the user experience, and maps the structured data to interactive React components.

## 6. Layout & Styling Architecture
* **Global Centralization:** Section headings (`Eyebrow` components and `h2` tags) are globally centralized across all pages using a master CSS override, ensuring a uniform, authoritative editorial layout.
* **Responsive Design:** The layout utilizes CSS Grid and Flexbox to gracefully degrade across mobile, tablet, and desktop viewports, ensuring complex capability diagrams remain legible on smaller screens.
* **Accessibility:** Animations are wrapped in `prefers-reduced-motion` media queries, ensuring that users with motion sensitivity receive a static, accessible version of the site without compromising usability.
