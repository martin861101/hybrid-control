Replace the existing large “Industry Experience” masonry/card section on the Hybrid Control LANDING PAGE ONLY with the compact icon-led Industries section from the supplied visual reference.

Do not modify the dedicated Industries page.

Use the supplied COBE globe implementation as the basis for the animated Earth horizon. Do not search for or substitute another globe library.

DEPENDENCY

Install if not already present:

npm install cobe

GLOBE COMPONENT

Create/reuse the project’s appropriate UI component location for:

globe.tsx

Base it on the supplied COBE component, but adapt it specifically for Hybrid Control rather than copying the generic demo styling/config.

Use COBE with approximately this visual direction:

const HYBRID_GLOBE_CONFIG: COBEOptions = {
  width: 1200,
  height: 1200,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.15,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 24000,
  mapBrightness: 4,
  baseColor: [0.015, 0.07, 0.12],
  markerColor: [0.0, 0.65, 1.0],
  glowColor: [0.0, 0.35, 0.65],
  markers: [
    { location: [-26.2041, 28.0473], size: 0.08 },
    { location: [-33.9249, 18.4241], size: 0.05 },
    { location: [25.2048, 55.2708], size: 0.05 },
    { location: [51.5072, -0.1276], size: 0.04 },
    { location: [1.3521, 103.8198], size: 0.04 },
  ],
  onRender: () => {},
}

Treat these values as starting points and visually tune them against the actual site.

Keep the COBE rotation extremely slow and elegant.

Remove/disable pointer dragging for this implementation. The globe is atmospheric background motion, not an interactive toy.

Respect prefers-reduced-motion.

LANDING PAGE SECTION

Remove the existing oversized masonry industry tiles shown in the current landing page section.

Replace them with:

EYEBROW
INDUSTRIES WE SERVE

HEADING
Built for the environments
that cannot stand still.

Preserve the cyan treatment on:
“cannot stand still.”

Add one short supporting line using existing Hybrid typography.

Then show the 9 industries as a compact horizontal icon presentation:

01 Water & Wastewater
02 Power Generation
03 Renewable Energy
04 Energy
05 Chemical
06 Oil & Gas
07 Mining
08 Manufacturing
09 FMCG & Packaging

IMPORTANT:
Reuse the exact industry icons already used in the project/current industry design.

The icons should be the dominant visual element.

Do NOT recreate the existing cards at a smaller size.

Use only extremely subtle containers:
- transparent/dark navy
- fine blue/cyan border
- restrained hover glow
- small industry label
- no images
- no large abbreviations
- no decorative diagonal/dot patterns

Desktop should preferably show all 9 in one clean row if the available width permits.

Tablet/mobile can wrap intelligently.

CTA

Below the icons:

Explore all industries →

Link this to the existing dedicated Industries page.

EARTH HORIZON

Immediately below the CTA, position the COBE globe.

This is critical:

DO NOT display a complete globe.

Make the globe dramatically larger than its visible container and push most of it below the section.

Only approximately the TOP 15–25% of the globe should be visible, creating the appearance of Earth rising over the bottom edge of the section.

Conceptually:

              Explore all industries →

          subtle atmospheric glow
     ______________________________
  .´                              `.
 /       ONLY THIS PART VISIBLE     \
/____________________________________\
       rest of globe clipped

Use:
- section/container overflow-hidden
- oversized globe
- absolute positioning
- negative/bottom translation as needed

The visible Earth horizon should span roughly 80–100% of the content width on desktop.

Do NOT put the globe inside a card.

Do NOT use the GlobeDemo border/background/text.

The COBE canvas itself should emerge naturally from the bottom of the section.

Add a subtle radial cyan/blue atmospheric glow immediately behind the horizon so the edge feels illuminated.

The globe should visually disappear/fade into the site's navy background rather than having an obvious square canvas boundary.

Keep markers subtle. This is an industrial/global footprint motif, not a network visualization dashboard.

SECTION HEIGHT

The current Industries section is much too tall.

The replacement should be significantly more compact.

Target desktop composition approximately:

eyebrow
↓ 20px
heading
↓ 20px
supporting copy
↓ 40px
industry icons
↓ 32px
CTA
↓
Earth horizon

The Earth can extend beyond/clipped by the section rather than requiring a huge amount of vertical space.

MOTION

Industry icons:
- subtle cyan illumination on hover
- optional 2–4px upward movement
- no exaggerated animation

Globe:
- extremely slow continuous rotation
- no aggressive movement
- no dragging
- no scroll-jacking

Atmospheric glow may breathe extremely subtly if it does not distract.

PERFORMANCE

COBE must not make the landing page feel heavy.

Lazy-load/dynamically import the globe where appropriate.

Ensure the canvas is destroyed correctly on unmount.

Avoid unnecessary React state updates per frame.

Do not render at excessive DPR on mobile.

VERIFICATION

Implement this fully rather than returning instructions.

Inspect the finished landing page in-browser at:
- desktop
- tablet
- mobile

Specifically verify:
- all 9 industries are present
- existing icons are reused
- dedicated Industries page remains unchanged
- CTA works
- globe is clipped to a HORIZON rather than appearing as a complete ball
- no canvas edges are visible
- no horizontal overflow
- section is materially shorter than the old masonry section
- globe animation remains smooth
- reduced-motion behaviour works

Iterate on CSS/layout after inspection until the result closely matches the supplied visual direction.

Do not redesign unrelated landing-page sections.