# HYBRID CONTROL — PHASE 2A
## Image-Led Diagram System — Telemetry Network Pilot

You are working inside the existing Hybrid Control website repository.

Phase 1 has already established the dark-theme foundation and mapped the new visual assets.

THIS IS A CONTROLLED IMPLEMENTATION PASS.

Your task is to implement ONE diagram only:

# 09 — TELEMETRY NETWORK

Do not implement diagrams 01–08 or 10–16.

The purpose of this task is to establish the production architecture and visual language that will later be reused across the remaining Hybrid Control diagrams.

---

# 1. INSPECT BEFORE EDITING

First inspect the repository and Phase 1 changes.

Locate:

- current Telemetry Network page/section/component
- existing React/SVG telemetry diagram
- production Telemetry Network image
- reference Telemetry Network image
- shared diagram components introduced or identified in Phase 1
- relevant styles/tokens
- existing animation libraries
- responsive layout implementation

Do not assume filenames or paths.

Use the actual repository structure.

Before changing code, understand what the existing Telemetry Network diagram currently does.

---

# 2. REFERENCE VS PRODUCTION IMAGE

There should be TWO conceptually different assets.

## Reference asset

Expected to resemble:

`09_telemetry-network.webp`

This is REFERENCE ONLY.

It shows the intended complete visual communication, including elements such as:

- telemetry geography
- reservoir
- pump station
- treatment works
- control centre
- network relationships
- section heading/subtitle
- bottom process steps

DO NOT display this reference asset on the production website.

Use it to understand the intended information architecture.

---

## Production asset

Expected to resemble:

`diagram_telemetry-network.webp`

This is the actual website visual.

The production image intentionally contains some IN-DIAGRAM information.

For example, it may already contain labels/data such as:

- Reservoir 01
- level/status
- Pump Station 03
- flow/status
- Treatment Works
- flow/status
- Control Centre
- SCADA / real-time data

These elements are intentionally baked into the production visual.

# DO NOT DUPLICATE THEM IN HTML.

This rule is critical.

---

# 3. INFORMATION OWNERSHIP

Use this model:

IMAGE = the industrial world + in-diagram telemetry information

CODE = surrounding editorial information

ANIMATION = subtle behaviour

For Telemetry Network specifically:

## IMAGE owns:

- physical infrastructure
- geography
- reservoir
- pump station
- treatment works
- communications/network visual
- control centre
- telemetry nodes
- telemetry connections already visible in artwork
- operational/data cards already visible inside artwork

## CODE owns:

- section number `09`
- heading `TELEMETRY NETWORK`
- subtitle/copy
- bottom process/lifecycle row
- accessibility
- responsive layout

Do not recreate information already present in the image.

---

# 4. TARGET VISUAL STRUCTURE

The final component should conceptually resemble:

┌───────────────────────────────────────────────┐
│ 09                                            │
│ TELEMETRY NETWORK                             │
│ Connecting infrastructure across regions.    │
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │                                           │ │
│ │       PRODUCTION TELEMETRY IMAGE          │ │
│ │                                           │ │
│ │ Reservoir        Pump Station             │ │
│ │       \              /                    │ │
│ │        \ Treatment /                      │ │
│ │           \      /                        │ │
│ │          Control Centre                   │ │
│ │                                           │ │
│ └───────────────────────────────────────────┘ │
│                                               │
│  ● CONNECT    ● ENABLE    ● IMPROVE    ● ... │
└───────────────────────────────────────────────┘

The ASCII above describes hierarchy only.

DO NOT literally reproduce it.

Follow the existing Hybrid Control design system.

---

# 5. PRESERVE THE EXISTING COPY

Use the existing site's real Telemetry Network:

- heading
- subtitle
- process labels
- supporting descriptions

Do not invent replacement marketing copy.

If the reference asset and repository differ, prefer the repository's current approved textual content unless Phase 1 explicitly documented otherwise.

---

# 6. REMOVE THE OLD TECHNICAL VISUAL

Replace the existing React/SVG technical diagram visual for Telemetry Network with the production image-led visual.

Do not leave both versions visible.

However:

DO NOT delete reusable legacy components if they are still used elsewhere.

Only remove code that is provably specific to this Telemetry Network implementation and no longer required.

We are not cleaning up all diagrams in this phase.

---

# 7. IMAGE PRESENTATION

The production image is intentionally cinematic/wide.

Do not force it into a generic 16:9 card.

Preserve its intended composition.

Use:

- responsive width
- appropriate intrinsic aspect ratio
- minimal/no destructive cropping
- suitable object-fit behaviour
- existing framework image optimisation if appropriate

The image should feel like a major visual element, not a thumbnail inside a UI card.

Avoid excessive border radius.

This is industrial engineering, not generic SaaS.

---

# 8. VISUAL INTEGRATION

The image should feel integrated into the dark page.

Consider restrained techniques such as:

- dark gradient feathering at edges
- subtle bottom gradient into the surrounding section
- very restrained cyan edge illumination
- slight dark overlay if required for visual consistency

DO NOT:

- put it inside a giant glowing card
- add glassmorphism for decoration
- add thick neon borders
- add fake browser chrome
- add dashboard framing
- add excessive shadows

The industrial image should remain the hero of the diagram.

---

# 9. CODED PROCESS ROW

Rebuild/preserve the bottom process row using actual HTML/CSS.

For example, the existing reference may communicate stages similar to:

CONNECT
Remote infrastructure

ENABLE
Real-time monitoring

IMPROVE
Service delivery

BUILD
A more enabled district

BUT:

Use the repository's actual approved Telemetry Network process copy.

Do not blindly use this example if the current content differs.

Each process item should be semantic HTML.

Use existing icons where appropriate.

Do not bake this row into another image.

---

# 10. SECTION NUMBER + HEADING

Render:

09
TELEMETRY NETWORK

and its subtitle as real HTML.

Match the existing Hybrid Control typography.

The number can retain the cyan accent treatment.

The heading should remain clean, precise and editorial.

Do not make the number enormous.

Do not turn this into a generic marketing hero.

---

# 11. ANIMATION — VERY RESTRAINED

This phase may introduce the first SMALL amount of motion because we need to establish the diagram behaviour.

Animation must be subordinate to the image.

Acceptable:

### Entrance

When the diagram enters the viewport:

- image opacity 0 → 1
- translateY approximately 10–20px → 0
- duration approximately 500–800ms

### Process row

Process items may enter with a small stagger.

### Image depth

Optional extremely subtle scale:

1.00 → approximately 1.015

over a long duration or scroll relationship.

Only if it improves the visual.

### Telemetry enhancement

The production image already contains telemetry connections.

DO NOT redraw the entire network with SVG.

If there is an obvious and technically safe way to overlay ONE subtle travelling telemetry pulse along an existing major connection, it may be implemented.

But this is OPTIONAL.

Do not spend significant complexity on it.

---

# 12. DO NOT CREATE A NEW SVG DIAGRAM

This is extremely important.

DO NOT recreate:

- reservoir nodes
- pump station nodes
- communication towers
- network topology
- control centre
- telemetry paths

using React SVG.

Those exist visually in the production image.

SVG is allowed only for tiny optional enhancements that cannot reasonably be done with CSS.

---

# 13. REDUCED MOTION

Respect:

`prefers-reduced-motion`

When reduced motion is enabled:

- remove parallax
- remove travelling pulses
- remove continuous scale effects
- content must remain fully visible

The diagram must not depend on animation to communicate information.

---

# 14. MOBILE DESIGN

Do not simply shrink the desktop component.

At mobile widths:

- section number + heading remain readable
- subtitle remains readable
- image uses available width
- do not crop away important infrastructure
- process items may become 2×2 or stacked
- maintain comfortable spacing
- avoid horizontal scrolling

Because the image contains in-diagram text, ensure it remains reasonably legible.

If necessary, allow the image to occupy more vertical space rather than aggressively cropping it.

Do not create a separate mobile image unless an appropriate supplied asset already exists.

---

# 15. ACCESSIBILITY

The production image needs meaningful alt text.

Do not use:

"Telemetry image"

Use something describing the purpose, for example:

"Connected water infrastructure showing reservoirs, pump stations, treatment works and a central SCADA control centre linked by telemetry."

Adjust wording to accurately reflect the actual production image.

Do not put the entire visible diagram copy into alt text.

Process items rendered in HTML must remain accessible independently.

---

# 16. REUSABLE ARCHITECTURE

We eventually need 16 image-led diagrams.

This pilot should establish a reusable architecture WITHOUT overengineering.

If Phase 1 already introduced something like:

VisualDiagramFrame

extend it.

Otherwise, if justified, create a lightweight reusable structure capable of accepting:

- number
- heading
- subtitle
- image
- alt
- process items
- optional className/layout variant
- optional overlay slot

Do NOT create:

- a diagram DSL
- schema engine
- complicated renderer
- universal graph system
- node/edge architecture
- generic SVG engine

We are replacing technical diagram complexity, not rebuilding it.

---

# 17. VISUAL TARGET

The desired emotional response is:

"This company understands and operates real infrastructure."

NOT:

"This company built a cool React animation."

The image should make the concept understandable immediately.

The coded information should clarify it.

Motion should simply make it feel alive.

---

# 18. PERFORMANCE

Do not unnecessarily preload this image globally.

Use appropriate lazy loading unless it is above the fold.

Do not duplicate the asset.

Do not convert the supplied WebP.

Avoid JavaScript animation loops where CSS/Motion can handle the requirement.

Avoid layout shift.

---

# 19. VERIFICATION

Test the implementation at minimum around:

1440px
1024px
768px
390px

Check:

- heading hierarchy
- image visibility
- in-image text legibility
- process row
- no horizontal overflow
- no severe cropping
- reduced motion
- dark-theme integration

Run existing:

- typecheck
- lint
- build
- relevant tests

Do not fix unrelated historical issues.

---

# 20. SCREENSHOT CHECKPOINT

If the repository already contains Playwright or another screenshot mechanism, use it to capture the completed Telemetry Network section at desktop width.

If no screenshot tooling exists, do not add a major dependency solely for this.

The screenshot should make it easy to compare:

REFERENCE
vs
NEW PRODUCTION IMPLEMENTATION

Do not attempt pixel matching.

We are matching information architecture and visual intent.

---

# 21. STOP CONDITION

STOP AFTER TELEMETRY NETWORK.

Do not think:

"This works, I'll migrate the other diagrams."

Do not modify:

01 Hybrid Control Ecosystem
02 Engineering Process
03 System Integration
04 Maintenance
05 Manufacturing
06 Project Management
07 Industries
08 SCADA & Operations
10 Water Loss Management
11 Energy Management
12 Process Automation
13 eThekwini Telemetry Upgrade
14 ERWAT Network Control
15 Nsezi Process Automation
16 Joe Gqabi Telemetry

Those belong to the next phase.

---

# 22. FINAL REPORT

Return:

## Telemetry Network

Explain:

- previous implementation
- new implementation
- production asset used
- reference asset used

## Information ownership

List what remains:

- in image
- in HTML
- animated

## Reusable architecture

Explain any reusable component introduced or modified.

## Responsive behaviour

Explain desktop/tablet/mobile behaviour.

## Animation

List exactly what motion was added.

## Files changed

List every file changed.

## Verification

Report:

- typecheck
- lint
- build
- tests
- screenshot if available

## Deferred

Explicitly confirm diagrams 01–08 and 10–16 were NOT migrated.

STOP.

Reference images are located in ./tasks/images/diagram-reference
Usable images are located in: ./tasks/images/diagram-assets