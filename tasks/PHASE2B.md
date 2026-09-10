# HYBRID CONTROL — PHASE 2B
## Production Diagram Rollout

Phase 2A is APPROVED.

The implementation of Diagram 09 — Telemetry Network — is now the canonical
architecture for image-led diagrams throughout Hybrid Control.

Your task is to migrate the remaining CONFIRMED production diagrams using
that architecture.

This is NOT a redesign pass.

Do not modify the approved Diagram 09 architecture unless a genuine reusable
component issue must be fixed.

---

# 1. CANONICAL IMPLEMENTATION

Inspect these first:

- TelemetryNetworkDiagram.tsx
- VisualDiagramFrame.tsx
- Home.tsx
- relevant App.css diagram styles

Diagram 09 establishes the rule:

IMAGE
= physical world + infrastructure + baked-in diagram information

HTML/CSS
= number + heading + editorial copy + process/footer information

ANIMATION
= restrained behaviour only

This ownership model is mandatory.

---

# 2. DO NOT DUPLICATE IMAGE CONTENT

Production images may already contain:

- operational labels
- infrastructure labels
- telemetry values
- status cards
- monitoring information
- connection lines
- geographic relationships
- equipment
- engineers
- control rooms
- plant information

DO NOT recreate these in HTML.

DO NOT create hotspots over them.

DO NOT create fake status badges.

DO NOT redraw them with SVG.

DO NOT create technical node/edge diagrams.

The production artwork is the diagram.

---

# 3. CONFIRMED PRODUCTION ASSETS

Inspect public/diagrams/ and use the actual filenames present.

Expected production assets include:

- diagram_hybrid-control-ecosystem.webp
- diagram_engineering-process.webp
- diagram_system-integration.webp
- diagram_maintenance.webp
- manufacturing.webp
- project-management.webp
- industries.webp
- scada-and-operations.webp
- diagram_telemetry-network.webp [ALREADY COMPLETE]
- diagram_water-loss-management.webp
- diagram_energy-management.webp
- diagram_process-automation.webp
- diagram_ethekweni-telementry-upgrade.webp
- diagram_derwat-network-control.webp
- diagram_nsezi-process-automation.webp
- diagram_joe-gqabi-telementry.webp

Use repository reality rather than assuming these spellings are correct.

Do not rename assets unnecessarily during this pass.

---

# 4. REFERENCE ASSETS

Reference assets under:

tasks/images/diagram-reference/

are REFERENCE ONLY.

They may be used to determine:

- intended editorial hierarchy
- original process stages
- relationship to the surrounding section
- intended meaning of each visual

NEVER display them on the live website.

NEVER convert them into SVG.

NEVER attempt pixel reconstruction.

---

# 5. FIRST CREATE A MIGRATION MAP

Before editing, map every production image to the most appropriate existing
page/section/component.

For every production image identify:

- production asset
- reference asset
- existing page
- existing component
- existing visual being replaced
- editorial copy already associated with it

Use semantic meaning, not merely Phase 1 numbering.

IMPORTANT:

Phase 1's numbering/map is NOT authoritative where it conflicts with the
actual production/reference asset names.

The production/reference asset pair and existing page meaning take priority.

---

# 6. UNMATCHED LEGACY DIAGRAMS

Phase 1 identified legacy visuals such as:

- Field-to-Cloud Data Pipeline
- Substation Automation Architecture
- Pump Station Monitoring Network
- Smart Metering & IoT Telemetry

that may not have direct production image equivalents.

DO NOT rebuild these using SVG.

DO NOT fabricate new production images.

DO NOT force an unrelated production image into them.

Leave unmatched legacy diagrams unchanged for now.

Report them under:

"Production Asset Required"

We will create proper image assets separately if required.

---

# 7. MIGRATION TARGETS

Migrate confirmed image-backed concepts including, where their corresponding
existing sections are found:

- Hybrid Control Ecosystem
- Engineering Process
- System Integration
- Maintenance
- Manufacturing
- Project Management
- Industries
- SCADA & Operations

Diagram 09:
- Telemetry Network
- ALREADY COMPLETE
- DO NOT REBUILD

Then:

- Water Loss Management
- Energy Management
- Process Automation
- eThekwini Telemetry Upgrade
- ERWAT Network Control
- Nsezi Process Automation
- Joe Gqabi Telemetry

Only migrate a concept where you can establish a legitimate mapping to an
existing section/page.

---

# 8. USE THE EXISTING COMPONENT SYSTEM

Reuse VisualDiagramFrame where appropriate.

Do not create 15 completely independent diagram frameworks.

However:

Do NOT force every diagram into an identical composition.

The reusable component should provide shared visual behaviour while allowing
individual layouts.

For example:

NETWORK diagrams
may use panoramic imagery.

PROCESS diagrams
may use a more conventional image + process layout.

CAPABILITY diagrams
may integrate with existing capability content.

EXPERIENCE diagrams
may be more cinematic and project-led.

The architecture is shared.

The compositions do not need to be identical.

---

# 9. EDITORIAL CONTENT

Preserve existing approved website copy.

Where the original/reference diagram contains useful process stages that
belong outside the production image, render them as HTML.

Examples include conceptual stages such as:

DESIGN → BUILD → INTEGRATE → COMMISSION

or:

CONNECT → ENABLE → IMPROVE → BUILD

Use the actual existing/reference terminology where appropriate.

Do not invent technical claims.

Do not invent project outcomes.

Do not invent statistics.

---

# 10. CAPABILITY DIAGRAMS

For capability-related visuals, preserve the relationship between the visual
and the capability explanation.

These should feel like:

REAL ENGINEERING ACTIVITY
+
CLEAR CAPABILITY EXPLANATION

not:

IMAGE INSIDE GENERIC CARD.

Allow production imagery sufficient visual prominence.

---

# 11. PROJECT / EXPERIENCE DIAGRAMS

For:

- eThekwini
- ERWAT
- Nsezi
- Joe Gqabi

be conservative with coded overlays.

These are project/experience visuals.

The production image should provide the physical/project context.

HTML should provide the real project heading and existing approved project
description.

Do not add fake technical telemetry details.

Do not invent performance metrics.

Do not make these look like fictional live SCADA dashboards.

---

# 12. ETHEKWINI GEOGRAPHIC CAUTION

Inspect the eThekwini production image carefully.

Do not add geographic labels, landmarks or claims that are not supported by
existing approved content.

If the visual itself appears geographically generic, treat it as a conceptual
project visual.

Do not attempt to "correct" geography in code.

Report any concern rather than fabricating detail.

---

# 13. RESPONSIVE DESIGN

Use Diagram 09 as the quality baseline.

Desktop:
- imagery receives strong visual prominence
- editorial hierarchy remains clean
- process information remains readable

Tablet:
- maintain image composition
- process grids may reduce columns

Mobile:
- do not severely crop production images
- preserve baked-in diagram readability where practical
- process items may stack
- no horizontal overflow

Do NOT replace production images with technical mobile SVG diagrams.

---

# 14. MOTION

Phase 3 owns final motion.

During Phase 2B only preserve the restrained behaviour established by
Diagram 09.

A simple entrance treatment is acceptable:

opacity 0 → 1
translateY ~16px → 0
~650ms

Do not introduce:

- new parallax systems
- complex telemetry animation
- animated node networks
- scrolling sequences
- particle systems
- Three.js replacements
- large animation abstractions

Phase 3 will polish motion globally.

---

# 15. LEGACY COMPONENT CLEANUP

When replacing an existing visual:

Determine whether its component is still used anywhere else.

If it becomes completely unused:

- remove the import
- remove the dead component if safe
- remove directly associated obsolete styling if safe

Do NOT perform broad cleanup.

Do NOT remove Three.js globally merely because TelemetrySphere was removed if
Three.js is used elsewhere.

---

# 16. VISUAL CONSISTENCY

All migrated diagrams should belong to the same Hybrid Control visual family:

- dark navy environment
- industrial imagery
- restrained cyan
- clean white typography
- subtle slate surfaces
- minimal framing
- strong photography/render prominence

Avoid:

- excessive border radius
- glowing dashboard cards
- glass panels everywhere
- HUD graphics
- sci-fi overlays
- excessive telemetry UI
- generic SaaS layouts

---

# 17. ACCESSIBILITY

Every production image must receive meaningful alt text appropriate to the
actual visual.

Do not repeat every baked-in label in alt text.

HTML process information must remain semantic.

Maintain keyboard/focus behaviour for interactive surrounding content.

Respect reduced-motion handling already established.

---

# 18. PERFORMANCE

Use WebP assets already supplied.

Do not:

- regenerate
- convert
- upscale
- base64 embed
- globally preload
- duplicate

Use existing framework image-loading behaviour.

Below-the-fold imagery should load appropriately.

Avoid layout shift.

---

# 19. VERIFICATION

Test representative pages at:

1440px
1024px
768px
390px

Specifically inspect:

- Home
- Company
- Capabilities
- Industries
- Products where applicable
- Experience/Projects
- individual project pages

Check:

- image quality
- baked-in text readability
- section spacing
- dark integration
- no duplicated information
- process rows
- no horizontal overflow
- no broken routes

Run:

npm run lint
npm run build

and existing tests where applicable.

---

# 20. SCREENSHOT REVIEW

If screenshot tooling already exists, capture representative screenshots of:

1. Diagram 09 — approved baseline
2. Engineering Process
3. System Integration
4. Water Loss Management
5. Process Automation
6. one Experience project

Use these to visually compare consistency.

Do not introduce a major screenshot dependency solely for this.

---

# 21. STOP CONDITION

Phase 2B is complete when:

- all legitimately matched production diagrams are integrated
- Diagram 09 remains intact
- image/code ownership remains correct
- unmatched legacy diagrams are identified
- no new SVG schematic diagrams were created
- no production imagery was fabricated
- responsive behaviour is correct
- build/lint pass

DO NOT BEGIN PHASE 3.

---

# 22. FINAL REPORT

Return:

## Migrated Diagrams

For each migrated visual provide:

- concept
- production asset
- page
- component replaced
- new component/implementation

## Diagram 09

Confirm whether the approved implementation remained unchanged.

## Unmatched Legacy Diagrams

List every existing technical diagram that still requires a production asset.

For each provide:

- page
- component
- purpose
- suggested image subject

DO NOT implement replacements.

## Removed Legacy Components

List anything safely removed because it became unused.

## Files Changed

List all files.

## Responsive Verification

Report desktop/tablet/mobile results.

## Build Verification

Report:

- lint
- TypeScript
- build
- tests

## Phase 3 Readiness

State any issues Phase 3 should know about.

STOP.
