# Intro-driven model loading — 2026-08-12

- Connected the animated brand intro to the sci-fi gear model loading lifecycle.
- The intro now remains visible until its minimum 2.8-second sequence has completed and Three.js has fully downloaded and parsed the GLB.
- Added one shared model-loading promise so the intro and viewer reuse the same loaded asset.
- The viewer clones the cached scene for safe mounting while retaining the embedded looping animations and GSAP scroll spin.
- Model load failures release the intro rather than trapping visitors on the loading screen.
