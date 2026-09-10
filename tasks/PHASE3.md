# HYBRID CONTROL — PHASE 3
## Focused Motion & Final Visual Polish

Phase 1 and Phase 2 are COMPLETE and APPROVED.

DO NOT perform another repository-wide architecture analysis.
DO NOT remap the diagrams.
DO NOT redesign the website.
DO NOT rewrite content.

Work from the implementation that exists now.

The goal is simply:

MAKE THE CURRENT IMAGE-LED DARK WEBSITE FEEL POLISHED, COHESIVE AND ALIVE.

---

# 1. PROTECTED FEATURE — CRITICAL

The site contains an intentional GSAP ScrollTrigger experience using a GLB 3D model.

This feature MUST remain.

Relevant code includes at least:

- ScrollPumpModel.tsx

and Three.js may also be required by:

- ErwatNetworkReveal.tsx

DO NOT:

- remove GSAP
- remove ScrollTrigger
- remove Three.js
- remove GLB assets
- replace the 3D experience with an image
- simplify it
- refactor it
- change its scroll sequence
- classify it as obsolete animation
- change pinning/timing without explicit need

This is a signature cinematic feature.

VERIFY THAT IT STILL WORKS after your changes.

If uncertain whether code belongs to this feature, leave it alone.

---

# 2. APPROVED DIAGRAM ARCHITECTURE

Do not change this:

IMAGE
= physical world + baked-in diagram information

HTML/CSS
= headings + numbers + editorial copy + process information

ANIMATION
= subtle behaviour only

TelemetryNetworkDiagram.tsx / VisualDiagramFrame.tsx establish the approved
image-led architecture.

Do not rebuild any diagram using SVG.

Do not add technical hotspots.

Do not duplicate information baked into images.

---

# 3. EXISTING LEGACY VISUALS — LEAVE THEM ALONE

The following intentionally remain pending future artwork:

- Cygnus Substation Architecture
- Field-to-Cloud Data Pipeline
- Capability Topology
- Delivered Engineering Workstreams

DO NOT redesign these.

DO NOT replace them.

DO NOT attempt to "finish Phase 2".

They are explicitly outside this task.

---

# 4. MOTION SYSTEM

Use the animation libraries ALREADY PRESENT.

Do not introduce another animation framework.

Create a restrained, consistent motion language.

### Editorial reveals

For headings/copy:

opacity: 0 → 1
translateY: approximately 12–20px → 0
duration: approximately 500–700ms

### Image reveals

For cinematic/diagram images:

opacity: 0 → 1
translateY: approximately 12px → 0

Optional subtle scale:

0.99 → 1

Do not use dramatic zooms.

### Process rows

Small stagger:

approximately 50–80ms

Do not animate every individual word/icon.

---

# 5. DO NOT ANIMATE EVERYTHING

Prioritise:

- major page headings
- major cinematic images
- production diagrams
- project visuals
- capability visuals
- important CTA sections

Simple paragraphs and small UI elements do not all require scroll animation.

The website should feel:

QUIETLY ALIVE

not:

CONSTANTLY MOVING.

---

# 6. PRODUCTION DIAGRAMS

The production diagrams are already integrated.

Do NOT change their architecture.

Apply only consistent entrance behaviour where required.

Network-oriented visuals MAY receive one extremely subtle activity effect if
there is already an obvious, simple implementation.

Do not create SVG topology overlays.

Do not trace every connection.

Do not create fake live telemetry.

If adding the effect requires significant complexity:

SKIP IT.

The production image already communicates the system.

---

# 7. CINEMATIC IMAGE TREATMENT

Review image transitions into the dark backgrounds.

Where appropriate, improve integration using:

- subtle edge feathering
- restrained dark gradient
- very subtle cyan ambient illumination
- clean spacing

Images should feel embedded in the page rather than pasted into cards.

Do NOT add large glowing borders.

Do NOT put every image inside glass panels.

---

# 8. OPTIONAL DEPTH

For selected LARGE cinematic images only:

A tiny scroll-linked depth effect is acceptable.

Maximum approximate movement:

10–20px

or scale:

1 → 1.015

Do not apply this to every image.

Do not use it on images containing small baked-in text if movement reduces
legibility.

Do not interfere with the existing GLB ScrollTrigger sequence.

---

# 9. CAPABILITY CARDS

The capability cards now use production imagery.

Polish their interaction consistently.

Desktop hover may use:

image scale:
1 → approximately 1.02

arrow:
translateX approximately 3px

border:
subtle accent transition

Keep it restrained.

Mobile must not rely on hover.

---

# 10. PROJECT / EXPERIENCE VISUALS

Treat project visuals more conservatively.

These represent engineering work.

Use:

- subtle entrance
- restrained image treatment
- clean typography

Do NOT add:

- fake SCADA activity
- invented telemetry
- flashing indicators
- futuristic HUD overlays

---

# 11. NAVIGATION & BUTTONS

Only polish existing interactions.

Buttons:

- subtle background transition
- approximately 1px movement if appropriate
- small arrow movement

Navigation:

- clean hover
- clean active indication
- smooth mobile menu behaviour

Do not redesign navigation.

---

# 12. SECTION TRANSITIONS

The site now uses:

DEEP NAVY
→ SLATE
→ IMAGE
→ DARK
→ VISUAL
→ GRAPHITE

Review the transitions.

Correct only obvious places where sections:

- visually collide
- lack separation
- still feel like disconnected cards
- have awkward spacing
- contain harsh image edges

Prefer:

- spacing
- tonal shifts
- subtle gradients
- image feathering

rather than additional UI decoration.

---

# 13. EXISTING GSAP/GLB EXPERIENCE

This deserves special verification.

Test the existing GLB ScrollTrigger section at desktop size.

Confirm:

- model loads
- ScrollTrigger activates
- pinned/scroll behaviour remains correct
- model animation remains smooth
- section height remains correct
- surrounding dark-theme changes do not break it
- no z-index issue hides the model
- no new reveal animation conflicts with ScrollTrigger

DO NOT apply generic Reveal/Motion animation to the GLB canvas/container if it
interferes with its existing animation lifecycle.

The existing 3D sequence wins.

---

# 14. REDUCED MOTION

Respect:

prefers-reduced-motion: reduce

Disable nonessential:

- parallax
- continuous scale
- repeated pulses
- decorative movement
- stagger where appropriate

Content must remain visible.

Do not break the existing GLB implementation attempting to retrofit reduced
motion if it already has its own behaviour.

If GLB reduced-motion handling requires architectural changes, REPORT IT
instead of rewriting the feature.

---

# 15. MOBILE

Keep mobile simpler than desktop.

At approximately 390px:

- remove parallax
- minimise stagger
- preserve diagram image readability
- preserve image aspect ratios
- no horizontal scrolling
- no expensive decorative animation

Do not crop production diagrams merely to make them taller.

---

# 16. PERFORMANCE

Do not add:

- WebGL effects
- particle systems
- another animation framework
- canvas backgrounds
- shader effects
- new Three.js scenes
- requestAnimationFrame loops

The existing GLB experience is grandfathered in.

Use existing Motion/CSS/GSAP infrastructure.

Do not preload every production image.

---

# 17. CLEANUP

Only remove animation code that becomes CLEARLY unused because of work
already completed in Phase 1/2.

Do not perform broad cleanup.

TelemetrySphere.tsx may remain dormant if deleting it risks dependency churn.

There is no requirement to remove it.

---

# 18. VISUAL QA

Inspect representative pages:

- Home
- Company
- Capabilities
- System Integration
- Industries
- Experience
- Water Loss Management
- Energy Management
- eThekwini
- ERWAT
- Nsezi
- Joe Gqabi

Do NOT deeply reanalyse their architecture.

Simply visually inspect the existing implementation.

---

# 19. VERIFY

Test approximately:

1440px
1024px
768px
390px

Check:

- production image quality
- diagram readability
- motion consistency
- section transitions
- hover behaviour
- mobile behaviour
- horizontal overflow
- reduced motion
- GLB ScrollTrigger feature

Run:

npm run lint
npm run build

Fix only regressions caused by this phase.

---

# 20. HARD GUARDRAILS

DO NOT:

- redo Phase 1
- redo Phase 2
- remap assets
- rebuild diagrams
- rebuild legacy diagrams
- replace the GLB
- remove GSAP
- remove ScrollTrigger
- remove Three.js
- introduce another animation framework
- rewrite copy
- change routes
- change business logic
- add generic dashboard UI
- add cyberpunk styling
- add excessive cyan glow
- add particles
- add animated grids
- add fake telemetry
- broadly refactor the repository

---

# 21. STOP CONDITION

Stop when:

1. existing image-led sections have consistent restrained motion
2. image-to-dark transitions feel polished
3. capability/project interactions feel refined
4. mobile remains smooth
5. reduced-motion is respected
6. GLB ScrollTrigger experience is confirmed working
7. lint/build pass

DO NOT continue into unrelated improvements.

---

# 22. FINAL REPORT

Return ONLY:

## Motion Added
List components/sections changed.

## Visual Polish
List image/section treatments changed.

## GLB / ScrollTrigger Verification
Explicitly report whether the existing 3D experience still works.

## Mobile / Reduced Motion
Report behaviour.

## Files Changed
List files.

## Verification
- lint
- TypeScript/build
- visual checks

## Deferred
Confirm these remain untouched:

- Cygnus Substation Architecture
- Field-to-Cloud Data Pipeline
- Capability Topology
- Delivered Engineering Workstreams

STOP.
