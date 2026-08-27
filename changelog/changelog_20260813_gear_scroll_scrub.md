# Gear animation scroll scrubbing — 2026-08-13

- Removed autonomous looping from all embedded `gearanimated.glb` animation clips.
- Paused each Three.js animation action and mapped its full timeline directly to ScrollTrigger progress.
- Synchronized the embedded animation and outer model spin within one GSAP scroll timeline.
- Scrolling backward now reverses both the authored animation and rotation.
