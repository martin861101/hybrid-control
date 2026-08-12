# Electric pump 3D integration — 2026-08-12

## Added

- Added the supplied `electric_pump.glb` model to the homepage “Who We Are” section.
- Added a responsive Three.js canvas viewer that automatically centres and scales the model.
- Added neutral key lighting, blue rim lighting and an engineering-grid presentation surface.
- Added GSAP ScrollTrigger rotation with smooth scroll scrubbing and a fixed slight X/Z viewing angle.
- Added model loading and failure states.
- Added a reduced-motion mode that presents the pump without scroll animation.

## Dependencies

- Added `three` and its TypeScript definitions for GLB rendering.
- Added `gsap` for the ScrollTrigger-driven animation.

## Verification

- `npm run lint`
- `npm run build`
