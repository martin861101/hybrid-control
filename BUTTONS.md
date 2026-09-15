# Button Locations and Styles in UI

This document maps out the locations and CSS styles of all buttons across the application's UI.

## Global Button Styles
Located in `src/App.css`:
- **`.button`**: Base class. Properties include inline-flex, centered alignment, `min-height: 56px`, `padding: 0 24px`, uppercase Manrope font, and transition effects.
- **`.button-primary`**: Background `var(--cyan)`, color `#071923`.
- **`.button-dark`**: Background `var(--slate-surface)`, color `white`, border `1px solid var(--border-subtle)`.
- **`.button-light`**: Background `white`, color `var(--navy)`.
- **`.button:hover`**: Translates up, adds box shadow, changes background to `var(--blue)` and text to white.

## Component-Specific Buttons

### 1. Hybrid Chat (AI Assistant)
**Location:** `src/components/chat/HybridChat.tsx`
**Styles:** `src/components/chat/HybridChat.css`
- **Chat Launcher:** Button to open the chat widget.
- **Header Controls:** Close chat and clear chat buttons.
- **Scroll to Bottom:** Button to scroll to the latest message.
- **Suggestion Chips:** Buttons representing quick actions/prompts for the AI.
- **Send Button (`.hybrid-send-button`):** Sends the user's message. Styled in `HybridChat.css` with hover, active, and focus-visible states.

### 2. Layout Header
**Location:** `src/components/layout/Header.tsx`
- **Mobile Menu Toggle (`.menu-toggle`):** Opens the mobile navigation menu. Uses a simple icon style, transparent background.
- **Close Menu:** Closes the mobile navigation menu.

### 3. Capability Topology
**Location:** `src/components/projects/CapabilityTopology.tsx`
- **Domain Buttons (`.topology-domain`):** Interactive map buttons for different engineering domains. Uses active state classes (`.is-active`).

### 4. Delivered Engineering
**Location:** `src/components/projects/DeliveredEngineering.tsx`
- **Workstream Buttons:** Large, grid-layout buttons that toggle active visualizations. Structured with spans, small text, headings, and code blocks inside the button.

### 5. ERWAT Network Reveal
**Location:** `src/components/projects/ErwatNetworkReveal.tsx`
- **Reveal/Control Buttons:** Used to cycle through network map states or steps.
