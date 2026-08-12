# Hybrid Control Corporation website

A premium React redesign for Hybrid Control Corporation, an industrial automation, telemetry and electrical engineering company based in South Africa.

The shared site header, mobile navigation and footer use the supplied Hybrid Control brand artwork. `public/logo-transparent.png` is the optimized transparent navigation version, while `public/logo.png` remains the original source.

Selected engineering imagery from the previous Hybrid Control website is retained in the homepage capability section. The panel-integration, electrical-verification and control-infrastructure images are locally optimized, presented with a translucent blue technical treatment and used as capability context rather than evidence for a named project. The browser favicon uses a compact solid-blue rendering of the current Hybrid Control mark.

On each full site load, the animated Hybrid Control SVG plays at large scale in a centred, full-screen opening treatment. A staggered brand lockup reveals “Hybrid Control Corporation” and the positioning line “Engineering · Automation · Operational Intelligence” beneath the mark. When its 2.8-second sequence finishes, the text clears and the mark follows a responsive motion path into the live header logo position while the page is revealed. Client-side route changes do not replay the sequence, and visitors who prefer reduced motion go directly to the normal header logo.

The fixed navigation uses a dark rough-glass surface rather than a transparent or opaque overlay. It remains translucent after scrolling so the underlying page is visibly softened through backdrop blur. The open desktop mega menu and mobile hamburger menu use the same translucent navy glass, saturation, mottled texture, fine edge highlights and restrained shadow separation.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Architecture

- React 19, TypeScript and Vite
- React Router for homepage and inner-page routes
- Motion for entrance, navigation and page transitions
- Lucide React for accessible interface icons
- Content separated into `src/data/site.ts`
- Reusable layout and UI components in `src/components`
- Responsive layouts for mobile through ultrawide screens

## Routes

- `/` — editorial homepage
- `/company` — company overview and related company paths
- `/capabilities` and `/capabilities/:capability` — capability overview/detail templates
- `/industries` — industry explorer
- `/experience` and `/projects` — “Engineering in Motion” interactive project and capability narrative
- `/experience/:project` — individual project detail template
- `/products` — product categories
- `/insights` — insights index template
- `/contact` — office and contact information

## Content and imagery

Company facts, project names, client names, OEMs and contact information are based on the existing Hybrid Control website. The cinematic homepage hero is an AI-generated editorial visual and is not presented as a specific Hybrid Control project. Project evidence is represented with abstract technical graphics to avoid misrepresenting generated imagery as real work.

The business profile and Rockwell Automation digital-services material supplied with the project inform the expanded System Integration story. FactoryTalk DataMosaix, remote monitoring, asset analytics, energy management, production optimization and sustainability applications are explicitly presented as Rockwell Automation ecosystem technologies that Hybrid Control can evaluate and integrate—not as proprietary Hybrid Control products.

The project experience uses `PROJECTS_UPDATED.md` as its creative and information-architecture brief. It follows one reusable animated signal from field equipment through communication, control and operational intelligence. Midmar, Nsezi and Cygnus are presented as flagship engineering architectures using only the scope supplied in that brief. Broader engineering workstreams remain deliberately high-level where exact equipment, outcomes or delivery details are not documented.

The existing six-project public record remains available inside the experience as the “Evidence in operation” archive and through the individual `/experience/:project` detail routes. Its named claims continue to use `projects.md` together with previously verified published project material; unsupported values, dates, performance improvements and equipment models are not introduced.

## Engineering in Motion experience

The projects page is structured as four connected acts:

- A cinematic infrastructure introduction with restrained technical metadata and a travelling signal.
- Responsive SVG architectures for Midmar process automation, Nsezi complete-plant automation and the Cygnus electrical single-line/automation relationship.
- An interactive capability topology and a sticky delivered-engineering ledger whose visual state follows the selected or visible workstream.
- A final field-to-intelligence architecture, conversion CTA and compact engineering capability strip.

The experience uses CSS and SVG animation rather than a heavy 3D dependency. On small screens, the complete responsive SVG architectures remain visible—including branching field equipment, control nodes, network paths and feedback loops—while non-essential diagram chrome is removed. Each Delivered Engineering ledger item renders its corresponding process visual inline on mobile instead of relying on a detached sticky visual. Navigation remains native-scroll based, and global reduced-motion preferences remove travelling pulses and scans while preserving every label and system relationship.

The site-wide palette follows the supplied Hybrid Control logo: midnight navy environments, saturated royal-blue depth, electric azure signals, icy-blue highlights and cool silver-white content surfaces. Shared navigation, homepage sections, inner pages, project details, calls to action and the footer all use this same color system.

## Accessibility and performance

The site uses semantic page structure, keyboard-operable navigation, visible focus states, responsive type and layouts, high-contrast colors, and reduced-motion overrides. The generated hero has explicit alternative text and below-fold content avoids additional raster image requests.

The homepage hero grid includes ambient electrical pulses that travel along its horizontal and vertical engineering lines. These are decorative, non-interactive and automatically reduced by the global `prefers-reduced-motion` rules.

The Telemetry & system integration section uses a dependency-free canvas sphere built from Fibonacci-distributed points. Its dots transition from deep logo navy at the rear to royal blue and electric azure at the front, with bright blue depth glows. Business keywords move through the sphere on staggered paths, briefly flash in azure at its centre and alternate between its rear and front depth planes. The sphere remains panel-free, responds subtly to pointer movement, scales with its container and renders a static frame when reduced motion is requested.

The homepage “Who We Are” section includes the supplied `sci_fi_gear_animated.glb` as an animated Three.js model. The frameless viewer automatically centres and scales the asset over a transparent background, continuously loops all embedded animation clips, and uses GSAP ScrollTrigger to scrub an independent smooth rotation while preserving a slight technical viewing angle. The large GLB is preloaded from the initial HTML, then downloaded and parsed through a shared promise. The animated brand intro acts as its loading screen, shows a thin live model-loading bar, and only docks after both its minimum sequence and the parsed model are ready; the viewer reuses that cached scene data rather than requesting the asset again. It is responsive across desktop and mobile; reduced-motion preferences disable the scroll-driven spin while retaining the model’s authored animation.
