# Animated opening logo — 2026-08-12

- Added a full-screen opening treatment that plays `hybrid-control-logo-animated.svg` at a large, responsive size whenever the site is loaded.
- Timed the transition to begin when the SVG's 2.8-second animation completes, then moves the animated mark into the current header logo bounds.
- Kept the destination accurate across desktop and mobile layouts by measuring the rendered header logo before the docking movement begins.
- Prevented page scrolling during the opening, revealed the page behind the docking motion and restored the standard transparent header logo after completion.
- Skipped the cinematic sequence when `prefers-reduced-motion` is enabled and avoided replaying it during client-side route navigation.
- Added a staggered text reveal beneath the opening mark for “Hybrid Control Corporation” and the refined positioning line “Engineering · Automation · Operational Intelligence”.
- Cleared the brand lockup before the logo begins docking so the text remains an opening statement rather than moving into the navigation.
