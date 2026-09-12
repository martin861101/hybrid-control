Implement the Hybrid Control chat widget frontend only. Do not add AI/backend/API logic yet.

Use the existing animated launcher asset:
"public/chat/chat-icon.svg"

Example chat panel: public/chat/chat_panel.png
Example code: public/chat/code.md
Build a polished floating chat experience matching Hybrid’s current visual language and the supplied SVG.

Requirements:

- Floating animated SVG launcher in the bottom-right.
- Clicking it opens a responsive chat panel.
- Use the same SVG inside the panel header so it feels like the launcher transforms into the interface.
- Use Motion/Framer Motion if already available; otherwise use the project's existing animation approach.
- Animate open: orb intensifies/scales briefly → panel unfolds outward from the launcher → header/content fade in.
- Animate close in reverse.
- Dark navy/glass panel with subtle cyan technical borders, corner details, glow and faint engineering/grid texture.
- Header: "HYBRID // CONTROL ASSIST" and small "SYSTEM ONLINE" status.
- Create static demo assistant/user messages to demonstrate the design.
- Assistant messages: technical presentation with cyan vertical accent and small "HC-AI" metadata.
- User messages: restrained dark-blue outlined bubbles.
- Include example capability cards such as "PLC & SCADA", "SYSTEM INTEGRATION", and "MONITORING & DATA".
- Add static quick-action chips.
- Build a styled "Ask Hybrid Control..." input and send button, but no actual submission/API behaviour yet.
- Proper scrolling for conversation content.
- Desktop panel approximately 400–430px wide and 580–620px high.
- Mobile should become an appropriately inset near-full-screen experience.
- Respect reduced-motion preferences.
- Keep all controls accessible and keyboard usable.
- Do not redesign unrelated site sections.

Inspect the existing Hybrid design system/components first and reuse its typography, spacing, colors and existing dependencies rather than introducing a competing style.

Implement the complete visual experience, run the relevant frontend checks, inspect for layering/responsive/animation issues, and fix them before finishing.
