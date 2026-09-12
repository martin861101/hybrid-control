 ### Changes Implemented
  1. Background Replacement:
      • Copied about.png into the project assets and public
      directory.
      • Updated the .intro section in App.css:114-148 with
      background-image: url('/img/about.png'), background-
      size: cover, background-position: center center, and
      seamless top/bottom edge gradient fades.
  2. 3D Model Alignment Inside the Circular Portal:
      • In ScrollPumpModel.tsx:96-165, implemented responsive
      coordinate tracking that calculates the exact position
      and diameter of the circular glowing ring in the
      background image across all viewports.
      • Centered and scaled the 3D gear model (gearanimated.
      glb) to sit comfortably floating inside the circular
      portal ring with a natural margin.
      • Adjusted desktop layout styles in App.css:1005-1022 to
      keep the 3D stage and heading centered over the stage
      rather than pushed to a half-width column.
  3. Floor Reflection Below the Moving Model:
      • Added a mirrored reflection group in
      ScrollPumpModel.tsx:48-68 that tracks the exact position
      and orientation of the main moving model across the
      stage floor plane.
      • Configured realistic reflective surface materials:
      double-sided rendering, blue/cyan reflection tint
      (#38bdf8), soft transparency (opacity: 0.42), an
      additive circular floor contact glow, and a floor
      clipping plane to keep the reflection confined beneath
      the pedestal surface.
      • Synchronized continuous idle rotation and GSAP
      ScrollTrigger scrubbing across both the main model and
      its reflection.
