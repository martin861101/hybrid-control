# Update the Hybrid home page to use the existing `TopologyField` animation as a **section background effect for sections listed only.**

* Adapt it into a reusable `HybridTopologyBackground` component.
* Position it absolute/inset-0 behind section content with `pointer-events-none`.
* Match Hybrid’s existing dark navy visual language.
* Keep the topology subtle: ~70% opacity, reduced saturation/brightness.
* Randomise the animated vsisual layout accross the sections
* Add a soft radial/gradient mask so it blends into the section instead of looking like a rectangular iframe.
* Ensure section content remains readable and above the animation.
* Do not redesign the section or alter its existing content/layout.
* Preserve responsive behaviour and reduced-motion accessibility.
* Inspect the relevant Hybrid section/component, implement the change, then verify it visually and fix any layering, sizing, overflow, or contrast issues.

## Listed Sections to add the component to:

* Telemetry & system integration
* Industry experience
* How we deliver

## Scripts

TopologyField: src/components/ui/TopologyField.tsx

## Example Implimentation

tsx```
<section className="relative isolate overflow-hidden bg-[#07101a]">
  <HybridTopologyBackground
    opacity={0.7}
    saturation={0.75}
    brightness={0.72}
  />

  {/* Optional readability layer */}
  <div
    className="pointer-events-none absolute inset-0 z-[1]"
    style={{
      background:
        "linear-gradient(90deg, rgba(7,16,26,.88) 0%, rgba(7,16,26,.55) 42%, rgba(7,16,26,.20) 70%, rgba(7,16,26,.55) 100%)",
    }}
  />

  {/* Actual Hybrid section */}
  <div className="relative z-10">
    {/* existing section content */}
  </div>
</section>
```


