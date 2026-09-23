# Hybrid Control UI Map

This document maps where the website's UI structure, styles, visual assets, backgrounds, animations, and reusable components live.

## At a glance

- **Runtime:** React 19 + TypeScript + Vite.
- **Routing:** React Router, assembled in `src/App.tsx`.
- **Global styling:** `src/index.css` (tokens/reset) and `src/App.css` (the main site stylesheet, currently about 2,000 lines).
- **Industry landing styling:** `src/styles/industries-landing.css`.
- **Light theme styling:** `src/styles/light-theme.css`.
- **Chat styling:** `src/components/chat/HybridChat.css`.
- **Shared shell:** `Header`, optional home-only `LogoIntro`, `Footer`, `Seo`, and `HybridChat`, all mounted by `src/App.tsx`.
- **Page modules:** `src/pages/Home.tsx`, `src/pages/ProjectsPage.tsx`, and `src/pages/InnerPage.tsx`.
- **Content/data source:** `src/data/site.ts`; SEO metadata is in `src/data/seo.ts`.
- **Animation libraries:** Motion for React (`motion/react`), GSAP/ScrollTrigger, Three.js, and Cobe.

## Application shell and route ownership

`src/main.tsx` loads the global reset/tokens and mounts `<App />`.

`src/App.tsx` is the application composition root:

1. Imports `src/App.css`.
2. Creates the `BrowserRouter`.
3. Resolves SEO by pathname.
4. Handles hash scrolling and scroll-to-top behavior after route changes.
5. Mounts the shared `Header`, `Footer`, and `HybridChat` around every route.
6. Mounts `LogoIntro` only when `location.pathname === '/'`.
7. Wraps lazy pages in `AnimatePresence`, `motion.div`, `ErrorBoundary`, and `Suspense`.

### Route table

| URL | Rendered page | Source | Notes |
|---|---|---|---|
| `/` | Home | `src/pages/Home.tsx` | Also shows the logo intro overlay. |
| `/experience` | Engineering in Motion | `src/pages/ProjectsPage.tsx` | Main project experience page. |
| `/projects` | Engineering in Motion | `src/pages/ProjectsPage.tsx` | Alias for `/experience`. |
| `/capabilities/:capability` | Capability detail or capabilities overview | `src/pages/InnerPage.tsx` | Known capability slugs come from `src/data/site.ts`. |
| `/experience/:project` | Project detail | `src/pages/InnerPage.tsx` | Project is selected by slug from `src/data/site.ts`. |
| `/company` | Company page | `src/pages/InnerPage.tsx` | `CompanyPage` subview. |
| `/industries` | Industries page | `src/pages/InnerPage.tsx` | `IndustriesPage` subview. |
| `/products` | Products page | `src/pages/InnerPage.tsx` | `ProductsPage` subview. |
| `/insights` | Insights page | `src/pages/InnerPage.tsx` | `InsightsPage` subview; currently future/content-placeholder oriented. |
| `/contact` | Contact page | `src/pages/InnerPage.tsx` | `ContactPage` subview. |
| Any unmatched path | Inner-page fallback | `src/pages/InnerPage.tsx` | Falls back to the company-style page data. |

## Page-level UI maps

### Home — `src/pages/Home.tsx`

The homepage owns the composition and content of the main marketing experience. Most visual styling is in `src/App.css`; the industry section also uses `src/styles/industries-landing.css`.

| Section / UI | Main classes | Visuals/components |
|---|---|---|
| Hero | `.hero-section`, `.hero-content` | `src/assets/industrial-hero.png`, grid, laser rails, sparks, Motion entrance transitions. |
| Trust strip | `.trust-strip` | Four static credential/stat blocks. |
| Who we are / intro | `.intro`, `.intro-grid` | `ScrollPumpModel`, `Reveal`, `/img/about.png` background via CSS. |
| Integrated business units | `.business`, `.business-list`, `.business-row` | Capability links generated from `capabilities` data; hover-to-cyan rows. |
| Field / system / operation cards | `.field-image-grid`, `.field-image-card` | Three legacy photographs: panel integration, electrical verification, control infrastructure. |
| Telemetry | `.telemetry`, `.telemetry-stage` | `HybridTopologyBackground` with `variant="telemetry"`; `TelemetryNetworkDiagram`; gradient readability layer. |
| Digital intelligence | `.digital-intelligence`, `.data-architecture`, `.digital-card` | Four connected data layers and animated connector dots; `digitalSolutions` data. |
| Industries landing | `.industries-landing` | CSS background field, nine icon cards, `EarthHorizon` globe, Cobe canvas. |
| Core project evidence | `.home-evidence`, `.evidence-stage` | `ProjectVisual` feature/compact variants; project data drives links and capability strip. |
| Delivery process | `.process`, `.process-line`, `.process-step` | `HybridTopologyBackground` with `variant="process"`; five-step process timeline. |
| Products | `.products`, `.product-list` | Product links and signal icons generated from `products`. |
| Partners / social impact | `.partners`, `.partner-grid`, `.impact` | Partner names from data; `HybridControlSphere` canvas in impact graphic. |
| Certifications | `.certifications`, `.iso-certification-grid` | ISO text mark, accreditation images and animated logo marquee. |
| Final CTA | `.contact-cta` | Contact link and CTA treatment. |

### Engineering in Motion — `src/pages/ProjectsPage.tsx`

This is the `/experience` and `/projects` page. Its visual language is concentrated in the `eim-*`, `flagship-*`, `finale-*`, and ERWAT selectors in `src/App.css`.

- **Hero:** `.eim-hero` uses `src/assets/industrial-hero1.png`, an image shade, grid, and animated `.eim-signal-rail`.
- **Sequence intro:** `.eim-intro` and `.eim-sequence` link to the flagship chapter anchors.
- **Flagship chapters:** `.flagship-chapters`, `.flagship-chapter`, `.flagship-copy`, and `.flagship-system`. Midmar and Nsezi use diagram images; other visualisations use `EngineeringDiagram`.
- **Capability map:** `.capability-map-section` renders interactive `CapabilityTopology`.
- **Delivered engineering:** `.delivered-section` renders interactive `DeliveredEngineering`.
- **ERWAT evidence:** `.erwat-network-section` renders `ErwatNetworkReveal`, a scroll-scrubbed Three.js `VideoTexture` driven by GSAP ScrollTrigger.
- **Project archive:** `.project-archive`, `.archive-list` links to individual project detail routes.
- **Final composition:** `.engineering-finale`, `.finale-architecture`, `.finale-statement`, and `.capability-strip` complete the page.

### Inner pages — `src/pages/InnerPage.tsx`

`InnerPage.tsx` is a route dispatcher plus several page subviews. Shared inner-page styling begins at the `/* Inner pages */` section of `src/App.css`.

- **Shared hero:** `.inner-page`, `.page-hero`, `.page-grid`, `.page-index`.
- **Capability detail:** `.capability-intro`, `.capability-visual-stage`, `.capability-content`, `.capability-deliverables`, `.capability-disciplines`, `.capability-lifecycle-box`. Images are selected by `capabilityImages`.
- **Company:** `CompanyPage`; `.company-intro`, `.company-ecosystem`, `.company-philosophy`, `.company-lifecycle`, `.company-credentials`. Uses the ecosystem diagram and accreditation marks.
- **Capabilities overview:** `CapabilitiesOverview`; `.capability-overview`, `.capability-cards`, `.capability-card`, `.capability-lifecycle-note`.
- **Industries overview:** `IndustriesPage`; `.industries-overview`, `.industries-hero-visual`, `.industries-detail`, `.industry-detail-grid`, `.industry-detail-card`. Industry copy comes from `industryCapabilities`; imagery comes from `industryImages`.
- **Products:** `ProductsPage`; `.products-clarity`, `.products-distinction`, `.product-detail-grid`, `.product-detail-card`, `.products-ecosystem`.
- **Insights:** `InsightsPage`; `.insights-content`, `.insights-empty`, `.insights-future`, `.insights-cta-note`.
- **Project detail:** `ProjectDetail`; `.project-detail-hero`, `.project-diagram-section`, `.project-delivery-strip`, `.project-detail-story`, `.project-story-grid`, `.project-delivery-checklist`. Diagrams come from `projectDiagramImages`; `ProjectVisual` is also used.
- **Digital capability extension:** `DigitalCapability`; `.scada-visual` and digital intelligence content for `system-integration`.
- **Contact:** `ContactPage`; `.contact-layout`, `.contact-details`, `.contact-form`, `.contact-ctas`, `.contact-note`.
- **Global inner CTA:** `.inner-cta` closes most inner/capability pages.

## Shared layout components

| Component | File | Responsibility | Styling |
|---|---|---|---|
| `Header` | `src/components/layout/Header.tsx` | Fixed desktop/mobile navigation, active routes, capability mega-menu, mobile drawer, CTA. | `src/App.css`: `.site-header` through `.mobile-contact`. |
| `Logo` | `src/components/layout/Header.tsx` | Shared logo lockup also imported by `Footer`. | `.logo`, `.logo-mark`, logo palette rules. |
| `LogoIntro` | `src/components/layout/LogoIntro.tsx` | Home-only opening logo animation; measures the header logo and animates the full-screen mark into position. | `.logo-intro*`; Motion. |
| `Footer` | `src/components/layout/Footer.tsx` | Footer navigation, contact information and shared logo. | `src/App.css` footer section. |
| `Seo` | `src/components/Seo.tsx` | Updates document title/meta/canonical data. | No visual styling. |
| `Reveal` | `src/components/ui/Reveal.tsx` | Reusable viewport reveal wrapper; respects reduced motion. | Receives page class; Motion implementation. |
| `ErrorBoundary` | `src/components/ui/ErrorBoundary.tsx` | Route-level render failure fallback. | Small inline utility styling plus global utility classes. |
| `HybridChat` | `src/components/chat/HybridChat.tsx` | Floating assistant launcher, expanded panel, messages, quick actions and route-aware capability links. | `src/components/chat/HybridChat.css` only; Motion; chat image/icon assets. |
| `ThemeToggle` | `src/components/ui/ThemeToggle.tsx` | Retained theme control, currently not mounted in the shared header. | `src/components/ui/ThemeToggle.css`; behavior in `src/lib/theme.ts`. |

## Visual and interaction components

| Component | File | What it renders | Motion / dependencies |
|---|---|---|---|
| `HybridTopologyBackground` | `src/components/ui/TopologyField.tsx` | Procedural animated topology/network field behind telemetry and process sections; supports `telemetry`, `industries`, `process`, and `default` variants. | Canvas/animation loop; inline gradients; seed, opacity, saturation, brightness and ball-position props. |
| Compatibility export | `src/components/ui/TopologyFiled.tsx` | Re-exports `TopologyField` and its types. The filename is misspelled; preserve it unless all imports are migrated. | None. |
| `TelemetryNetworkDiagram` | `src/components/ui/TelemetryNetworkDiagram.tsx` | Framed telemetry architecture visual with process steps and animated overlays. | Motion; `VisualDiagramFrame`; `/diagrams/diagram_telemetry-network.webp`. |
| `VisualDiagramFrame` | `src/components/ui/VisualDiagramFrame.tsx` | Reusable technical frame with header, status indicator, image canvas, scrim, overlays and footer slots. | CSS hover scale and status pulse. |
| `TelemetrySphere` | `src/components/ui/TelemetrySphere.tsx` | Standalone animated particle/signal sphere canvas. | Canvas animation; currently not imported by the page modules found in this inventory. |
| `HybridControlSphere` | `src/components/ui/HybridControlSphere.tsx` | Transparent branded particle sphere used in the homepage social-impact area. | Canvas animation; configurable visual props. |
| `EarthHorizon` | `src/components/ui/globe.tsx` | Globe horizon/canvas with SVG callouts and fallback. | Cobe canvas; styles from `src/styles/industries-landing.css`. |
| `ScrollPumpModel` | `src/components/ui/ScrollPumpModel.tsx` | Scroll-responsive 3D pump/gear visual in the homepage intro. | Three.js, GSAP ScrollTrigger, SkeletonUtils clone; model preloading via `src/lib/gearModel.ts`. |
| `ProjectVisual` | `src/components/projects/ProjectVisual.tsx` | Project evidence card illustration/visual with compact mode. | CSS-generated diagrams and Lucide icons; `.evidence-*` styles. |
| `EngineeringDiagram` | `src/components/projects/EngineeringDiagram.tsx` | Inline SVG technical architecture diagrams for project chapters. | SVG path animation classes; `.diagram-*` styles. |
| `CapabilityTopology` | `src/components/projects/CapabilityTopology.tsx` | Selectable capability-domain topology visual. | Local React state; CSS/SVG visual treatment. |
| `DeliveredEngineering` | `src/components/projects/DeliveredEngineering.tsx` | Interactive engineering workstream ledger/visual. | Local state and Motion; data from `deliveredEngineering`. |
| `ErwatNetworkReveal` | `src/components/projects/ErwatNetworkReveal.tsx` | Scroll-scrubbed ERWAT network footage with technical overlays and mute control. | Three.js `VideoTexture`, GSAP ScrollTrigger, reduced-motion handling. |

## Style ownership

### `src/index.css` — foundation

- Google Fonts import: DM Sans and Manrope.
- Root typography, body color/background, smoothing and selection.
- Color tokens: `--navy`, `--navy-secondary`, `--slate-*`, `--card-surface`, `--blue`, `--cyan`, `--cyan-bright`.
- Border tokens and text hierarchy tokens.
- Global box sizing, image display, link/button defaults, focus-visible outline.
- Global reduced-motion policy; also disables the homepage laser grid.

### `src/App.css` — site-wide visual system

This is the main source of truth for nearly all site layout and component styling.

- **Lines 1–33:** accessibility, section spacing, typography, eyebrow, buttons, text links.
- **Lines 35–81:** logo intro, header, desktop navigation, mega-menu, mobile menu.
- **Lines 83–112:** homepage hero, image treatment, grid, laser animations, trust strip.
- **Lines 114–170:** intro/pump model, business units, field image cards.
- **Lines 186–244:** positioning utilities, telemetry section, data architecture, digital solution cards.
- **Lines 246–594:** industry landing, nine icon cards, CTA pill, Earth Horizon structure and breakpoints.
- **Lines 595–630:** project evidence visuals, orbit/chart/node decorations and evidence cards.
- **Lines 632–746:** process timeline, product list, partner section and homepage supporting UI.
- **Lines 748–840:** inner-page hero and shared inner-page structures.
- **Lines 841–1028:** capability detail page layout.
- **Lines 1029–1118:** contact layout and form/detail presentation.
- **Lines 1119–1161:** footer and responsive site rules.
- **Lines 1162–1287:** Engineering in Motion page, flagship chapters, SVG diagrams, finale, and related animations.
- **Lines 1288–1388:** logo-derived palette, company/industry/product/insights enhancements and responsive rules.
- **Lines 1389–1468:** ERWAT network visual, video overlays, metadata and responsive/reduced-motion rules.
- **Lines 1469–1543:** final composition corrections and image/diagram presentation helpers.
- **Lines 1544–1751:** `VisualDiagramFrame`, telemetry process row, diagram pulse and responsive rules.
- **Lines 1752 onward:** shared inner-route atmosphere for page heroes, section grids/glows, project chapters, CTA rings and reduced-motion handling.

### `src/styles/industries-landing.css` — industry visual system

Imported by `Home.tsx` and `globe.tsx`. It owns the industry landing background, header, nine cards, CTA pill, Earth Horizon canvas/fallback/SVG callouts, and responsive/reduced-motion behavior. `App.css` contains a duplicated/older version of much of this selector family; when changing industry landing UI, check both files and verify cascade order.

### `src/components/chat/HybridChat.css` — chat-only system

Owns the launcher aura/orb, expanded panel/chamfer frame, grid/glow overlays, HUD corners and notch tabs, header/status, messages, assistant capability cards, quick chips, input/footer, mobile layout, and reduced-motion behavior. The stylesheet contains `hybridStatusPulse` and references the chat color variables defined locally in that file.

### `src/styles/light-theme.css` — light palette

Loaded after the main application CSS and retained for future use. It remaps the shared design tokens and overrides hard-coded dark surfaces for navigation, homepage editorial sections, inner pages, Engineering in Motion, cards, CTAs, footer, and chat. Media-led heroes, diagrams, video, and 3D/canvas scenes retain a cinematic dark treatment. Theme resolution and persistence remain available in `src/lib/theme.ts`, but `src/main.tsx` currently forces `dark` and the toggle is not mounted.

## Backgrounds and visual layers

| Background/effect | Source | Used by |
|---|---|---|
| Global dark navy canvas | `src/index.css` tokens and body | Entire application. |
| Header glass/noise | `src/App.css` `.site-header`, `:before` | Shared header. |
| Logo intro radial/grid backdrop | `src/App.css` `.logo-intro-backdrop` | Home-only `LogoIntro`. |
| Hero photograph/shade/grid | `Home.tsx` + `src/App.css` `.hero-*` | Homepage hero. |
| Hero laser rails/sparks | `Home.tsx` markup + `src/App.css` keyframes | Homepage hero. |
| Intro portal photograph | `src/App.css` `.intro` background URL `/img/about.png` | Homepage intro. |
| Procedural topology field | `TopologyField.tsx` | Homepage telemetry and process sections; reusable elsewhere. |
| Industry background field | `industries-landing.css` `.industries-landing-bg` | Homepage industry section. |
| Earth/globe horizon | `globe.tsx` + industry CSS | Homepage industry section. |
| Data architecture cards | `Home.tsx` + `.data-*` CSS | Homepage digital intelligence. |
| Project evidence diagrams | `ProjectVisual.tsx` + `.evidence-*` CSS | Homepage project evidence and project details. |
| Page grid | `src/App.css` `.page-grid` | Inner pages and project visual framing. |
| Engineering in Motion image/grid | `ProjectsPage.tsx` + `.eim-*` CSS | Experience page. |
| ERWAT video/grid/scan/shade | `ErwatNetworkReveal.tsx` + `.erwat-network-*` CSS | Experience page ERWAT section. |
| Diagram frame scrim/grid | `VisualDiagramFrame.tsx` + `.diagram-frame-*` CSS | Telemetry and project diagrams. |
| Chat grid/glow/HUD | `HybridChat.tsx` + `HybridChat.css` | Persistent chat UI. |
| Shared inner-route atmosphere | `src/App.css` shared inner-route block | All inner pages, project details and Engineering in Motion sections. |

## Animation inventory

- **Route fade:** `src/App.tsx` uses Motion `AnimatePresence` and a keyed `motion.div` for a 0.25s route transition.
- **Home hero entrance:** Motion transitions on hero eyebrow, heading and bottom copy in `Home.tsx`.
- **Reveal-on-scroll:** `Reveal.tsx` provides the shared Motion viewport entrance wrapper.
- **Hero drift:** `heroDrift` slowly scales the hero image.
- **Hero telemetry rails:** `laserRunHorizontal`, `laserRunVertical`, and `gridSpark` animate grid signals and nodes.
- **Digital data flow:** `dataPulse` animates connector dots between data layers.
- **Evidence orbit:** `orbitTurn` rotates project visual rings.
- **Diagram status:** `diagramPulse` pulses `VisualDiagramFrame` status indicators.
- **Engineering in Motion:** `eimRail`, `diagramScan`, `eimSignal`, `detailIn`, and `finalePulse` drive project-page rails, scans, SVG signal paths, detail entry, and finale motion.
- **ERWAT status:** `erwatPulse` animates the live indicator; video playback is scrubbed by scroll rather than a CSS animation.
- **Chat status:** `hybridStatusPulse` animates the chat system status dot.
- **Inner-route signals:** `routeHeroSignal` sweeps across inner/project heroes and `sectionSignalSweep` adds a restrained signal pass to inner CTAs.
- **3D/canvas loops:** `ScrollPumpModel`, `TelemetrySphere`, `HybridControlSphere`, `TopologyField`, and `EarthHorizon` animate through canvas/WebGL or requestAnimationFrame-style loops.
- **Reduced motion:** `src/index.css`, `src/App.css`, `industries-landing.css`, and `HybridChat.css` all include reduced-motion rules. `Reveal`, topology, and 3D/video components also contain runtime handling.

## Asset map

### Bundled/imported assets in `src/assets`

- `industrial-hero.png`: homepage hero.
- `industrial-hero1.png`: Engineering in Motion hero.
- `legacy/panel-integration.jpeg`: homepage field card.
- `legacy/electrical-verification.jpeg`: homepage field card.
- `legacy/control-infrastructure.jpeg`: homepage field card.
- `about.png`, `about_mobile.png`, `hero.png`: available source images; `about.png` is referenced by the intro CSS, while the others should be treated as available/legacy until imported.

### Public assets

- `public/industries/*.png`: the nine named Industries-page card images; mappings are declared in `industryImages` inside `InnerPage.tsx`.
- `public/img/img-003.png` through `img-051.png`: remaining project/source photography referenced elsewhere in `InnerPage.tsx`.
- `public/img/about.png`, `public/img/about_mobile.png`: intro imagery.
- `public/diagrams/*.webp`: capability, industry, project, ecosystem, telemetry and SCADA diagrams.
- `public/accreditations/*`: SACPCMP, Saiosh and SAIMC marks.
- `public/industries/*.png`: industry imagery available for future or alternate layouts.
- `public/vid/erwat-hq-network.mp4`: primary ERWAT network video.
- `public/vid/output (1).mp4`: fallback/source video referenced URL-encoded by `ErwatNetworkReveal`.
- `public/chat/chat-icon.svg`, `public/chat/chat_panel.png`: chat assets.
- `gearanimated.glb`, `electric_pump.glb`, `sci_fi_gear_animated.glb`: 3D model assets; `gearanimated.glb` is preloaded by `src/lib/gearModel.ts` and used by `ScrollPumpModel`.
- `hybrid-control-logo-animated.svg`: animated logo asset used by `LogoIntro`.

## Data and content ownership

`src/data/site.ts` is the canonical source for capabilities, industries, projects, project capabilities, engineering flagships/domains, delivered engineering, products, digital solutions, partners, and the delivery process.

`src/pages/InnerPage.tsx` currently owns several presentation-specific lookup maps alongside its components:

- `pageMap`: route-level hero copy.
- `capabilityDetail`: capability challenge, deliverables, applications and lifecycle copy.
- `industryCapabilities`: industry capability lists.
- `capabilityImages`, `industryImages`, `projectDiagramImages`: route/content-to-asset mapping.

If content becomes frequently edited, these maps are the first candidates to move into `src/data/site.ts` or dedicated content modules. Keep visual component code focused on rendering and interaction.

## Maintenance notes and current hazards

- `src/App.css` is the dominant style owner and has accumulated duplicate/phase-based selector blocks. Search by class name before adding new rules.
- Industry landing selectors exist in both `App.css` and `styles/industries-landing.css`; verify which declaration wins before changing them.
- `TopologyFiled.tsx` is a compatibility alias with a typo in its filename. Do not remove it without searching all imports.
- The Oil & Gas card maps to the repository's existing filename `/industries/oil_gass.png`; preserve that spelling unless the asset and reference are renamed together.
- The homepage links to `/capabilities`, which is intentionally handled by the catch-all inner route as the capabilities overview.
- The project page itself documents `ScrollPumpModel.tsx:91` as the analogous scroll-scrub implementation; keep the two Three.js/GSAP patterns aligned when changing either.
- The current worktree already contains a user modification in `src/components/ui/ScrollPumpModel.tsx`; avoid treating it as part of UI-map documentation changes.

## Recommended source-of-truth order for future UI work

1. Route/layout behavior: `src/App.tsx`.
2. Page composition/content presentation: `src/pages/*.tsx`.
3. Reusable behavior/visuals: `src/components/**`.
4. Site tokens and reset: `src/index.css`.
5. Shared visual styling: `src/App.css`.
6. Feature-scoped styling: `src/styles/industries-landing.css` or `src/components/chat/HybridChat.css`.
7. Structured content/data: `src/data/site.ts` and `src/data/seo.ts`.
8. Binary/media assets: `src/assets`, `public/img`, `public/diagrams`, `public/vid`, and root `.glb` files.
