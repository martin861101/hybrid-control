# HYBRID CONTROL — PHASE 3
## Motion, Interaction & Final Visual Polish

You are working inside the existing Hybrid Control website repository.

Phase 1 established:
- the dark tonal visual system
- image-led section rhythm
- production/reference asset mapping
- removal of disruptive light-theme sections

Phase 2 established:
- the new image-led diagram architecture
- production diagram imagery
- HTML-owned editorial information
- responsive diagram behaviour
- the approved implementation pattern

THIS IS PHASE 3.

Your job is to make the completed site feel alive, premium and engineered through restrained motion, interaction and visual polish.

This is NOT another redesign.

Do not substantially change layouts established in Phase 1 or Phase 2.

Do not replace the new image-led diagrams.

Do not reintroduce complex React/SVG technical diagrams.

Do not rewrite copy.

Do not modify routes, business logic, forms, APIs or navigation architecture.

---

# 1. INSPECT BEFORE EDITING

Inspect the current repository and understand the implementation produced by Phase 1 and Phase 2.

Locate:

- global animation system
- Motion / Framer Motion / GSAP usage if present
- intersection/viewport utilities
- image-led diagram components
- production diagram assets
- cinematic industrial imagery
- section components
- navigation
- hero
- CTA sections
- Experience/project sections
- reduced-motion handling
- responsive behaviour
- existing CSS transitions
- any old animations still present

Do not assume paths.

Do not immediately start adding animation.

First identify what already moves and what should remain static.

---

# 2. CORE MOTION PHILOSOPHY

Hybrid Control is an industrial engineering and automation company.

Motion should communicate:

- systems becoming active
- information travelling
- infrastructure connecting
- engineering precision
- operational awareness
- controlled energy

It should NOT communicate:

- gaming
- cyberpunk
- AI hype
- crypto
- futuristic fantasy
- generic tech startup behaviour

The desired feeling is:

QUIETLY ALIVE.

Not:

CONSTANTLY ANIMATED.

---

# 3. MOTION HIERARCHY

Use three levels of motion.

## LEVEL 1 — Editorial motion

Used throughout the site.

Examples:

- heading reveal
- copy reveal
- image entrance
- process item stagger
- subtle divider expansion

These should be extremely restrained.

Typical values:

translateY:
10–24px

opacity:
0 → 1

duration:
approximately 500–800ms

stagger:
approximately 50–100ms

Avoid large movement.

---

## LEVEL 2 — Industrial/environmental motion

Used selectively on major visual sections.

Examples:

- extremely slow image scale
- subtle parallax
- slight foreground/background separation
- gradient illumination shifting gently

Example:

scale:
1 → 1.015

NOT:

1 → 1.1

The user should almost not consciously notice this movement.

---

## LEVEL 3 — System behaviour

Used only where it communicates meaning.

Examples:

- telemetry pulse
- network activity
- monitoring status
- system connection
- data travelling from field to control

This should be used sparingly.

A diagram should normally contain no more than one or two meaningful animated behaviours.

---

# 4. IMAGE-LED DIAGRAMS

The new diagrams follow the architecture:

IMAGE = WORLD

CODE = INFORMATION

ANIMATION = BEHAVIOUR

Preserve this architecture.

Do not reconstruct image content in SVG.

Do not redraw:

- reservoirs
- pump stations
- control centres
- factories
- telemetry sites
- electrical panels
- pipelines
- process plants

The production images already provide these.

---

# 5. DIAGRAM ENTRANCE

When an image-led diagram enters the viewport:

1. heading/subtitle may reveal
2. image enters subtly
3. process row follows
4. optional system behaviour activates

Do not animate everything simultaneously.

Example sequence:

0ms
Heading

100ms
Subtitle

200ms
Image

400ms
Process items

700ms+
Optional system activity

This should feel composed rather than theatrical.

---

# 6. TELEMETRY / CONNECTION MOTION

For diagrams involving:

- telemetry
- system integration
- network control
- connected infrastructure

consider a SMALL coded enhancement.

For example:

●────────────●────────────●
      →

A small cyan pulse can travel along an existing logical path.

IMPORTANT:

Do not attempt to perfectly trace every connection already baked into the image.

Do not build an SVG network replica.

One subtle pulse is enough to imply that the network is live.

Potential implementation:

- absolutely positioned overlay
- simple SVG path
- CSS offset-path
- Motion path animation

Choose the simplest maintainable solution compatible with the existing stack.

---

# 7. TELEMETRY NETWORK — 09

Use the approved Phase 2 Telemetry Network implementation as the reference.

If Phase 2 already implemented motion:

DO NOT duplicate it.

Inspect it.

Only refine if necessary.

This component should establish the preferred motion language for other network-oriented diagrams.

---

# 8. WATER LOSS MANAGEMENT — 10

This visual contains a leak/anomaly condition.

Possible enhancement:

The leak/anomaly region may receive an extremely subtle periodic emphasis.

For example:

opacity/glow:
0.75 → 1 → 0.75

duration:
approximately 2.5–4 seconds

Do NOT create:

- flashing red warnings
- aggressive alarms
- shaking UI
- repeated attention-grabbing animation

It should feel like professional monitoring software identifying an exception.

---

# 9. ENERGY MANAGEMENT — 11

The visual already communicates monitored energy consumers.

Do not animate every metric.

Possible enhancement:

- subtle sequential activation of monitored areas
- tiny pulse around one energy node
- gentle appearance of coded supporting information

Avoid animated charts unless an existing real chart component already belongs there.

Do not invent live data.

---

# 10. PROCESS AUTOMATION — 12

Possible behaviour:

A subtle visual pulse may travel:

FIELD / PROCESS
      ↓
CONTROL
      ↓
MONITORING

But do not build a complex process simulation.

The visual should communicate:

"The plant is operating."

Not:

"Look at our animation."

---

# 11. EXPERIENCE DIAGRAMS — 13–16

These represent actual project experience.

Treat them more conservatively than conceptual diagrams.

The emphasis should be:

REAL PROJECT
+
REAL INFRASTRUCTURE
+
DELIVERED OUTCOME

Possible motion:

- image entrance
- site marker reveal
- subtle connection pulse
- process row reveal

Avoid making completed project visuals look fictional or overly futuristic.

---

# 12. CINEMATIC INDUSTRIAL IMAGERY

Phase 1 may have integrated larger industrial images as section breaks.

These are excellent candidates for restrained environmental motion.

Possible techniques:

### Slow scale

1 → 1.015

### Scroll parallax

Approximately 10–30px maximum.

### Gradient reveal

Dark overlay subtly changes as section enters viewport.

### Content separation

Foreground copy moves slightly differently from background image.

Use ONE technique where appropriate.

Do not stack all of them.

---

# 13. IMAGE SECTION TRANSITIONS

The site now uses imagery to help replace the old:

DARK → WHITE → DARK

rhythm.

Improve transitions between:

dark section
↓
cinematic image
↓
slate section

Consider:

- gradient feathering
- dark overlays
- edge fades
- subtle background continuation

Avoid obvious rectangular image cards where the image is intended to function as atmosphere.

Some images should feel like they emerge naturally from the dark page.

---

# 14. HERO

Inspect the current hero before changing anything.

Do NOT redesign it.

Only improve motion if it currently feels static or disconnected from the new visual language.

Potential improvements:

- restrained background movement
- slow image depth
- small copy entrance
- subtle illumination

Do NOT add:

- floating UI cards
- particle systems
- animated grids
- giant glowing circles
- random SVG networks
- fake dashboards

The hero should establish confidence, not visual noise.

---

# 15. NAVIGATION

Preserve navigation structure.

Polish only existing interactions.

Possible improvements:

- smooth hover transition
- active indicator movement
- subtle underline/line expansion
- controlled mobile menu transition

Avoid elaborate magnetic effects or playful physics.

This is an industrial corporate site.

---

# 16. BUTTONS / CTAs

Buttons should feel responsive but restrained.

Acceptable:

- approximately 1–2px translate
- subtle background transition
- subtle icon movement
- border/illumination transition

Avoid:

- bouncing
- large scaling
- neon glow explosions
- excessive gradients
- ripple effects everywhere

---

# 17. SECTION REVEALS

Do not apply identical scroll animation to every element.

This creates the generic "Framer Motion template" look.

Vary behaviour based on content type.

Examples:

Editorial text:
fade + slight rise

Industrial image:
fade + extremely small scale

Process row:
stagger

Project card:
fade + slight translation

Divider:
width expansion

Diagram:
structured sequence

---

# 18. SCROLL BEHAVIOUR

Do not hijack scrolling.

Do not introduce:

- smooth-scroll libraries unnecessarily
- scroll-jacking
- horizontal page scroll
- pinned sections everywhere
- long forced animation sequences

Normal browser scrolling should remain intact.

Scroll-linked animation should only enhance content already visible.

---

# 19. HOVER INTERACTIONS

Desktop hover should reveal small amounts of additional responsiveness.

For image-led capability/project cards:

possible:

image scale:
1 → approximately 1.02

overlay:
slight change

arrow:
translateX approximately 3–5px

border:
small cyan emphasis

Do not create large hover transformations.

Mobile must not depend on hover.

---

# 20. PERFORMANCE BUDGET

Motion must remain lightweight.

Prefer:

CSS transitions
↓
existing Motion library
↓
existing GSAP implementation if already justified

Do not introduce GSAP solely because it is powerful.

Do not introduce another animation framework if one already exists.

Avoid:

- constant requestAnimationFrame loops
- canvas effects
- WebGL backgrounds
- heavy shaders
- particle engines
- large animation libraries for tiny interactions

Industrial imagery is already visually rich.

The animation layer should remain cheap.

---

# 21. IMAGE PERFORMANCE

Preserve the supplied WebP assets.

Do not:

- convert them
- upscale them
- duplicate them
- preload all 16 diagrams
- load Experience images globally

Use responsive image behaviour supported by the existing framework.

Avoid layout shift.

Lazy-load below-the-fold visual assets where appropriate.

---

# 22. PREFERS-REDUCED-MOTION

This is mandatory.

Respect:

prefers-reduced-motion: reduce

When active:

REMOVE:

- parallax
- continuous scaling
- travelling telemetry pulses
- repeating glows
- nonessential motion

KEEP:

- content visible
- state understandable
- navigation usable
- diagrams understandable

Do not hide information behind animation.

---

# 23. MOBILE

Motion should become SIMPLER on mobile.

Do not try to preserve every desktop animation.

On mobile:

- remove or reduce parallax
- simplify stagger
- avoid expensive overlays
- preserve image composition
- preserve text readability
- preserve touch responsiveness

A 390px device should feel smooth.

---

# 24. ACCESSIBILITY

Animation must never:

- obscure text
- make content difficult to read
- repeatedly flash
- require precise timing
- prevent keyboard interaction
- interfere with focus states

Maintain semantic HTML established in Phase 2.

Preserve visible focus states.

---

# 25. REMOVE OBSOLETE ANIMATION

Inspect the old implementation.

If previous React/SVG diagrams or legacy sections left behind:

- animation hooks
- observers
- CSS keyframes
- Motion variants
- SVG animation utilities

that are now provably unused:

remove them carefully.

DO NOT perform broad speculative cleanup.

Only remove code that is clearly obsolete because of the new implementation.

---

# 26. CONSISTENCY PASS

Review the complete site.

Look specifically for places where:

- one section still feels like the old light design
- one animation is dramatically stronger than everything else
- a diagram still looks like software documentation
- images appear trapped inside unnecessary cards
- cyan glow is overused
- section spacing becomes inconsistent
- typography hierarchy changed accidentally
- old diagram remnants remain visible

Correct only issues directly related to the Phase 1–3 redesign.

---

# 27. VISUAL RHYTHM TARGET

The final site should broadly feel like:

DARK EDITORIAL
      ↓
INDUSTRIAL IMAGE
      ↓
DARK / SLATE CONTENT
      ↓
IMAGE-LED DIAGRAM
      ↓
DARK CONTENT
      ↓
PROJECT / INFRASTRUCTURE IMAGE
      ↓
DARK CTA

The visitor should experience alternating:

INFORMATION
↓
PHYSICAL WORLD
↓
ENGINEERING EXPLANATION
↓
PROOF

without needing white sections.

---

# 28. BRAND TEST

After implementation, evaluate each major page against these questions:

Does this feel like a real industrial engineering company?

Can a non-engineer understand roughly what they are looking at?

Would an engineer still recognise credible industrial systems?

Does the site feel technologically capable without looking like a software startup?

Do the people and infrastructure feel relevant to an African engineering context?

Does animation support meaning rather than compete with it?

If any answer is no, make the smallest appropriate correction.

---

# 29. VERIFICATION

Test at minimum:

1440px
1024px
768px
390px

Check:

- animation performance
- image loading
- responsive diagrams
- process rows
- navigation
- hover states
- touch behaviour
- reduced motion
- horizontal overflow
- layout shift
- text contrast

Run existing:

- typecheck
- lint
- build
- relevant tests

Fix regressions introduced by this phase.

Do not fix unrelated historical problems.

---

# 30. SCREENSHOTS

If existing screenshot tooling is available, capture representative views of:

1. homepage
2. one capability section
3. Telemetry Network
4. Water Loss Management
5. one Experience/project page
6. mobile view

Do not introduce a heavy screenshot dependency if none exists.

---

# 31. DO NOT DO THESE THINGS

DO NOT:

- redesign the site again
- change approved layouts
- rewrite marketing copy
- change routes
- replace production images
- regenerate assets
- recreate diagrams using React SVG
- introduce WebGL
- introduce Three.js
- introduce particle systems
- create fake live data
- create fake SCADA functionality
- add sound
- add cursor effects
- add scroll-jacking
- add generic SaaS dashboard elements
- add excessive glassmorphism
- add excessive cyan glow
- animate everything
- continue into unrelated cleanup

---

# 32. STOP CONDITION

Phase 3 is complete when:

1. the dark/image-led design feels visually cohesive
2. diagrams have restrained meaningful motion
3. cinematic images integrate naturally with dark sections
4. page transitions/reveals feel polished
5. mobile remains performant
6. reduced-motion is fully supported
7. obsolete diagram animation code directly superseded by this work is removed
8. existing functionality remains intact

STOP THERE.

Do not begin another redesign phase.

---

# 33. FINAL REPORT

Return:

## Motion system

Describe the final motion hierarchy.

## Diagram motion

For each diagram where motion was added, state exactly what moves.

## Image treatments

List sections receiving parallax, scale, gradients or other treatments.

## Interaction polish

List navigation/button/card improvements.

## Responsive changes

Explain desktop/tablet/mobile differences.

## Reduced motion

Explain exactly what is disabled.

## Performance

Mention any optimisations or obsolete animation code removed.

## Files changed

List every changed file.

## Verification

Report:

- typecheck
- lint
- build
- tests
- screenshots

## Guardrails confirmed

Explicitly confirm that:

- diagrams were NOT rebuilt with React/SVG
- production images were preserved
- no heavy animation framework was unnecessarily introduced
- no routes/copy/business logic were changed

STOP.