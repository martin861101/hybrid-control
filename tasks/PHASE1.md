# HYBRID CONTROL — PHASE 1
## Dark Theme Foundation + Visual Asset Integration

You are working inside the existing Hybrid Control website repository.

This is a CONTROLLED REDESIGN PASS.

Do not reinterpret the website.
Do not perform a general redesign.
Do not rewrite copy unless technically necessary.
Do not change routes, navigation, page hierarchy, SEO structure, forms, business logic, or existing functionality.

The objective of this phase is to prepare the existing site for a new image-led visual system while preserving the current Hybrid Control identity.

---

# 1. FIRST: INSPECT THE REPOSITORY

Before editing anything, inspect the repository and identify:

- application framework
- routing structure
- page components
- shared section components
- existing diagram components
- SVG/React diagram implementations
- animation libraries
- theme/tokens/global CSS
- light-background sections
- existing image assets
- new diagram assets
- diagram reference assets
- reusable layout primitives

Do not assume paths.

Find the real implementation.

Produce a short internal implementation map before changing code.

---

# 2. UNDERSTAND THE NEW VISUAL STRATEGY

The current site is visually too technical and relies too heavily on:

- React/SVG technical diagrams
- schematic-looking interfaces
- light/white sections to create visual separation
- abstract technical presentation

The new direction is:

> Industrial first. Engineering depth second.

Hybrid Control should feel like a premium industrial engineering, automation, telemetry and infrastructure company.

The site remains DARK.

However:

DO NOT make every section the exact same dark navy.

Instead establish visual rhythm through:

1. deep navy sections
2. slightly lighter graphite/slate-blue sections
3. cinematic industrial imagery
4. image-led system visualisations
5. subtle gradients/textures where appropriate

The objective is to replace:

DARK → WHITE → DARK → WHITE

with something closer to:

DARK → SLATE → IMAGE → DARK → VISUAL → GRAPHITE → IMAGE → DARK

---

# 3. IMPORTANT: DO NOT REDESIGN THE DIAGRAMS YET

There are new diagram assets.

There may also be a directory containing reference diagrams.

Treat these differently.

## Reference diagrams

Likely filenames similar to:

01_hybrid-control-ecosystem.webp
02_engineering-process.webp
03_system-integration.webp
04_maintenance.webp
05_manufacturing.webp
06_project-management.webp
07_industries.webp
08_scada-operations.webp
09_telemetry-network.webp
10_water-loss-management.webp
11_energy-management.webp
12_process-automation.webp
13_ethekwini-telemetry-upgrade.webp
14_erwat-network-control.webp
15_nsezi-process-automation.webp
16_joe-gqabi-telemetry.webp

These are REFERENCE ONLY.

They demonstrate:

- intended information architecture
- relationship between image and information
- process steps
- topology
- labels
- visual hierarchy

DO NOT display these reference images on the production website.

DO NOT simply replace the existing diagrams with these images.

---

Reference images are located in ./tasks/images/diagram-reference
Usable images are located in: ./tasks/images/diagram-assets

# 4. PRODUCTION DIAGRAM ASSETS

Locate the newly generated production diagram images.

Expected naming may include assets similar to:

diagram_hybrid-control-ecosystem.webp
diagram_engineering-process.webp
diagram_system-integration.webp
diagram_maintenance.webp

diagram_manufacturing.webp
diagram_project-management.webp
diagram_industries.webp
diagram_scada-operations.webp

diagram_telemetry-network.webp
diagram_water-loss-management.webp
diagram_energy-management.webp
diagram_process-automation.webp

and project/experience imagery for:

eThekwini telemetry
ERWAT network control
Nsezi process automation
Joe Gqabi telemetry

DO NOT assume these exact paths.

Locate them.

These images are the VISUAL LAYER of the future diagrams.

Later phases will combine them with coded information overlays.

---

# 5. IMAGE / CODE RESPONSIBILITY

This architectural rule is critical.

## IMAGE = PHYSICAL WORLD

Images provide:

- industrial infrastructure
- engineers
- equipment
- control rooms
- reservoirs
- treatment works
- PLC panels
- telemetry environments
- energy infrastructure
- process plants
- physical context

## CODE = INFORMATION

HTML/CSS/React should eventually provide:

- section numbers
- headings
- subtitles
- process steps
- supporting copy
- accessible descriptions
- responsive information layout

Simple SVG may later be used for:

- precise connection paths
- telemetry paths
- small markers

But DO NOT build that in Phase 1.

## ANIMATION = BEHAVIOUR

Animation will eventually provide:

- subtle telemetry pulses
- restrained reveals
- very small parallax
- state changes

Again:

DO NOT implement that in Phase 1.

---

# 6. DARK THEME CORRECTION

Inspect every page for large light/white sections.

Replace the disruptive light-theme treatment with a coherent dark tonal system.

Do NOT simply change every white background to the same navy.

Create or reuse appropriate theme tokens.

Aim for approximately:

Primary deep navy:
#020817 / equivalent existing brand token

Secondary dark:
approximately #061321

Elevated/slate:
approximately #0A1A2A

Subtle surface:
approximately #0D2133

These are directional values.

Prefer existing Hybrid Control tokens where suitable rather than introducing unnecessary duplicates.

Maintain WCAG-conscious text contrast.

---

# 7. SECTION RHYTHM

Sections must remain visually distinguishable.

Use combinations of:

- tonal background changes
- subtle radial gradients
- restrained blue illumination
- borders/dividers
- industrial imagery
- spacing
- typography hierarchy

Avoid solving separation with giant white/light blocks.

---

# 8. EXISTING CINEMATIC IMAGERY

Inspect the new image assets.

Some images may be cinematic industrial photographs/renders rather than diagrams.

These are valuable.

Identify appropriate existing sections where they could naturally replace:

- generic abstract graphics
- repeated logo graphics
- empty visual areas
- unnecessary technical decoration

BUT:

Do not aggressively place images everywhere.

Only integrate an image when the relationship to the surrounding content is obvious.

If uncertain, leave the section unchanged and report the candidate placement.

---

# 9. LOGO USAGE

The existing site overuses the Hybrid Control logo as a visual fallback.

Do not remove legitimate branding.

However, where a giant/repeated logo graphic exists purely because the section lacks a visual, prefer meaningful industrial imagery if an appropriate supplied asset exists.

The work should increasingly become the brand:

- infrastructure
- control systems
- telemetry
- engineers
- electrical panels
- water systems
- industrial environments

---

# 10. PRESERVE CURRENT SITE

DO NOT:

- delete existing content
- rewrite business copy
- alter navigation
- alter routes
- alter page URLs
- alter forms
- alter API behaviour
- alter authentication if present
- change SEO metadata unnecessarily
- replace working components without reason
- introduce a new UI framework
- introduce heavy dependencies
- globally rewrite typography
- globally rewrite spacing
- remove existing diagrams yet
- add new diagram animation
- create generic SaaS dashboard UI
- add cyberpunk effects

---

# 11. VISUAL STYLE GUARDRAILS

Hybrid Control is:

- industrial
- engineered
- precise
- established
- modern
- infrastructure-focused
- African
- operational

It is NOT:

- a crypto startup
- an AI startup
- a cyber-security dashboard
- a gaming interface
- a generic SaaS product
- a neon cyberpunk website

Avoid:

- excessive glow
- particle fields
- animated grids
- random floating cards
- glassmorphism everywhere
- excessive gradients
- glowing borders around everything
- meaningless HUD elements

Blue illumination should be restrained.

---

# 12. RESPONSIVE BEHAVIOUR

Ensure all changes remain correct across:

Desktop:
1440px+

Laptop:
1024–1439px

Tablet:
768–1023px

Mobile:
<768px

Images must:

- preserve useful composition
- avoid stretching
- avoid accidental severe cropping
- use appropriate aspect ratios
- load responsively

Do not force all diagram imagery into 16:9.

Some supplied assets are intentionally wider/cinematic.

---

# 13. PERFORMANCE

Use the supplied WebP assets directly where possible.

Do not:

- convert them unnecessarily
- upscale them
- embed them as base64
- duplicate them
- load every diagram globally

Use the framework's existing image-loading strategy where appropriate.

Preserve lazy loading where sensible.

Avoid layout shift.

---

# 14. PREPARE FOR PHASE 2

Create a clean reusable foundation for the future image-led diagrams.

If architecturally appropriate, introduce a lightweight reusable component such as:

VisualDiagramFrame

or equivalent.

It should be capable of eventually supporting:

- image
- heading
- section number
- subtitle
- overlay layer
- process/footer layer

BUT DO NOT prematurely build a complex abstraction.

If existing architecture already provides an appropriate component, extend/reuse it instead.

Do not create abstraction merely for the sake of abstraction.

---

# 15. IMPORTANT — TELEMETRY NETWORK CHECKPOINT

Diagram 09 — Telemetry Network — will be our first full implementation checkpoint in Phase 2.

Ensure its production image and reference image can be clearly located.

DO NOT rebuild it yet.

Document:

- existing component
- current page/section
- reference asset
- production asset
- existing diagram implementation
- what Phase 2 will need to replace

---

# 16. VERIFICATION

Before finishing:

Run the project's existing relevant:

- typecheck
- lint
- build
- tests where applicable

Fix regressions introduced by your changes.

Do not fix unrelated historical issues unless required for verification.

Inspect for:

- broken image paths
- missing assets
- text contrast regressions
- layout overflow
- mobile horizontal scrolling
- broken section spacing
- broken routes

---

# 17. STOP CONDITION

THIS IS PHASE 1 ONLY.

Do not continue into diagram reconstruction.

Do not implement diagram 09.

Do not implement animation.

Do not redesign additional components because they "could look better."

Stop when:

1. dark tonal system is established
2. disruptive light sections are corrected
3. obvious supplied cinematic imagery is integrated where appropriate
4. production/reference diagram assets are mapped
5. architecture is ready for Phase 2
6. existing site functionality remains intact

---

# 18. FINAL REPORT

Return:

## Files changed

List every file changed.

## Theme changes

Explain the dark tonal system implemented.

## Image placements

For every newly integrated image:

- asset
- page
- section
- reason

## Diagram asset map

Map diagrams 01–16 to:

- existing component/page
- reference asset
- production asset

Mark missing assets clearly.

## Telemetry Network checkpoint

Explain exactly where diagram 09 currently lives and what Phase 2 needs to change.

## Verification

Report:

- build
- typecheck
- lint
- tests

