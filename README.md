# Hybrid Control Corporation website

A premium React redesign for Hybrid Control Corporation, an industrial automation, telemetry and electrical engineering company based in South Africa.

The shared site header, mobile navigation and footer use the supplied Hybrid Control brand artwork. `public/logo-transparent.png` is the optimized transparent navigation version, while `public/logo.png` remains the original source.

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
