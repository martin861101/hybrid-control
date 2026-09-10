import { ArrowRight, ArrowUpRight, BrainCircuit, Database, Network, TrendingUp, ShieldCheck, Building2, Users, Award } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { capabilities, digitalSolutions, industries, products, projects, partners } from '../data/site'
import ProjectVisual from '../components/projects/ProjectVisual'
import VisualDiagramFrame from '../components/ui/VisualDiagramFrame'

const pageMap: Record<string, { eyebrow: string; title: string; intro: string }> = {
  company: { eyebrow: 'Who we are', title: 'Engineering with purpose.\nTechnology with consequence.', intro: 'Hybrid Control Corporation has delivered electrical, automation and telemetry projects since 2008, combining specialist engineering with a practical understanding of operations.' },
  capabilities: { eyebrow: 'What we do', title: 'Integrated engineering,\nfrom concept to operation.', intro: 'Five connected business units bring design, build, commissioning and lifecycle support together around the client’s operational requirement.' },
  industries: { eyebrow: 'Where we work', title: 'Experience across\ncritical industries.', intro: 'Our team and technology partners support infrastructure and production environments across Southern Africa and beyond.' },
  experience: { eyebrow: 'Evidence in operation', title: 'Projects that move\nfrom scope to outcome.', intro: 'Our experience spans the full delivery cycle—from detailed design and manufacture through integration, commissioning and operational support.' },
  products: { eyebrow: 'Industrial technology', title: 'Connected products for\nremote infrastructure.', intro: 'Field-proven data logging, radio, cellular and wireless technology selected to become part of a complete engineered system.' },
  insights: { eyebrow: 'News & thinking', title: 'Intelligence from\nthe operational edge.', intro: 'Practical perspectives on telemetry, infrastructure, automation and the technology shaping connected industry.' },
  contact: { eyebrow: 'Contact Hybrid Control', title: 'Bring us your\nengineering challenge.', intro: 'Speak with our team about automation, telemetry, electrical engineering and infrastructure requirements.' },
}

const capabilityDetail: Record<string, { problem: string; provides: string[]; applications: string; lifecycle: string }> = {
  engineering: {
    problem: 'Complex operating environments demand electrical and control systems that are safe, maintainable and matched to the process.',
    provides: ['Electrical design and control architecture', 'Instrumentation and field interface definition', 'Panel and system design aligned to site conditions'],
    applications: 'Applicable wherever power, control and measurement must operate reliably—from water treatment and energy to manufacturing and municipal infrastructure.',
    lifecycle: 'Carried through integration, factory testing, installation and commissioning with operational support.'
  },
  'system-integration': {
    problem: 'Isolated assets, control systems and data sources limit visibility and coordinated operational response.',
    provides: ['PLC, DCS and SCADA integration', 'Industrial networks and telemetry (including radio, fibre and cellular where appropriate)', 'Edge-to-cloud data contextualization for reporting and analytics'],
    applications: 'From single-plant automation (Midmar-type architectures) to multi-site telemetry programmes such as the 146-site eThekwini estate.',
    lifecycle: 'Designed, integrated and validated against operational requirements, then supported in the field.'
  },
  maintenance: {
    problem: 'Critical systems must remain available, with clear paths for upgrade, fault response and optimisation.',
    provides: ['Operations support and fault response', 'System upgrades and obsolescence mitigation', 'Preventive and lifecycle maintenance planning'],
    applications: 'Water, wastewater and energy assets where uptime and supportability are non-negotiable.',
    lifecycle: 'Extends deployed systems through structured support rather than isolated break-fix interventions.'
  },
  manufacturing: {
    problem: 'Field infrastructure requires assemblies that are built, tested and documented before site deployment.',
    provides: ['Control panel design and manufacture', 'Factory acceptance testing', 'Site-ready integration and documentation'],
    applications: 'MCCs, control assemblies and networked systems destined for plant and remote infrastructure.',
    lifecycle: 'Links engineering design to dependable site installation and commissioning.'
  },
  'project-management': {
    problem: 'Multi-disciplinary projects need single-point accountability across engineering, procurement and delivery.',
    provides: ['Procurement and contract administration', 'Construction and installation coordination', 'Commissioning and start-up support'],
    applications: 'Turnkey and integrated projects where electrical, automation, telemetry and civil interfaces converge.',
    lifecycle: 'From initiation and planning through close-out and handover to operations.'
  },
}

const industryCapabilities: Record<string, string[]> = {
  'Water & Wastewater': ['Telemetry & remote monitoring', 'Instrumentation & flow measurement', 'PLC & SCADA', 'Process automation', 'Electrical control & MCCs'],
  'Power Generation': ['Substation automation', 'Protection & local SCADA', 'Generator systems integration', 'Energy metering'],
  'Renewable Energy': ['Energy metering & reporting', 'SCADA & remote monitoring', 'Electrical integration'],
  'Energy': ['Substation automation', 'Energy intelligence & metering', 'Control-centre visibility', 'Industrial networks'],
  'Chemical': ['Process control & instrumentation', 'Telemetry & system integration', 'Operational reporting'],
  'Oil & Gas': ['Remote telemetry', 'Hazard-aware instrumentation', 'System integration & lifecycle support'],
  'Mining': ['Process automation', 'Industrial networks', 'Instrumentation & control', 'Operational reporting'],
  'Manufacturing': ['Control panels & factory testing', 'PLC/SCADA integration', 'Industrial networks & HMI'],
  'FMCG & Packaging': ['End-of-line automation', 'Production optimization data', 'Availability and reporting'],
}

const capabilityImages: Record<string, { src: string; alt: string }> = {
  engineering: { src: '/diagrams/diagram_engineering-process.webp', alt: 'Engineering design and control architecture process' },
  'system-integration': { src: '/diagrams/diagram_system-integration.webp', alt: 'System integration and industrial networking field infrastructure' },
  maintenance: { src: '/diagrams/diagram_maintenance.webp', alt: 'Lifecycle maintenance and instrumentation diagnostics' },
  manufacturing: { src: '/diagrams/manufacturing.webp', alt: 'Industrial control panel and MCC manufacturing assembly' },
  'project-management': { src: '/diagrams/project-management.webp', alt: 'Engineering project management and site commissioning operations' },
}

const industryImages: Record<string, { src: string; alt: string }> = {
  'Water & Wastewater': { src: '/img/img-006.png', alt: 'Water treatment clarifier basin' },
  'Power Generation': { src: '/img/img-050.png', alt: 'Electrical switchgear line in a power control room' },
  'Renewable Energy': { src: '/img/img-007.png', alt: 'Solar thermal panels' },
  'Energy': { src: '/img/img-045.png', alt: 'Industrial electrical drive equipment' },
  Chemical: { src: '/img/img-005.png', alt: 'Industrial chemical processing plant' },
  'Oil & Gas': { src: '/img/img-005.png', alt: 'Industrial process infrastructure and pipework' },
  Mining: { src: '/img/img-028.png', alt: 'Large mining haul truck in operation' },
  Manufacturing: { src: '/img/img-004.png', alt: 'Automated manufacturing production line' },
  'FMCG & Packaging': { src: '/img/img-051.png', alt: 'Bottling production line with industrial flow measurement equipment' },
}

const projectDiagramImages: Record<string, { src: string; alt: string; aspect: string }> = {
  'water-loss-management': { src: '/diagrams/diagram_water-loss-management.webp', alt: 'Water loss management telemetry network with pressure regulation and flow monitoring across the distribution system', aspect: '1085 / 362' },
  'ethekwini-telemetry-upgrade': { src: '/diagrams/diagram_ethekweni-telementry-upgrade.webp', alt: 'eThekwini wastewater telemetry upgrade across 146 pump stations with DNP3 interoperability', aspect: '1039 / 378' },
  'nsezi-process-automation': { src: '/diagrams/diagram_nsezi-process-automation.webp', alt: 'Nsezi Water Treatment Works process automation and control architecture', aspect: '1039 / 378' },
  'erwat-network-control': { src: '/diagrams/diagram_derwat-network-control.webp', alt: 'ERWAT remote pump station monitoring and control network with Adroit SCADA', aspect: '1040 / 378' },
  'joe-gqabi-telemetry': { src: '/diagrams/diagram_joe-gqabi-telementry.webp', alt: 'Joe Gqabi District telemetry and SCADA system for distributed water assets', aspect: '1040 / 378' },
  'energy-management': { src: '/diagrams/diagram_energy-management.webp', alt: 'Royal Swazi Sugar energy management system with power monitoring and web reporting', aspect: '1085 / 363' },
}

export default function InnerPage() {
  const { pathname } = useLocation()
  const { capability } = useParams()
  const root = pathname.split('/')[1] || 'company'
  const cap = capabilities.find(item => item.slug === capability)
  const project = projects.find(item => item.slug === pathname.split('/')[2])
  if (project) return <ProjectDetail project={project} index={projects.indexOf(project)} />
  const page = cap ? { eyebrow: 'Capability', title: cap.title, intro: cap.short } : (pageMap[root] || pageMap.company)
  if (root === 'contact') return <ContactPage page={page} />
  if (root === 'company') return <CompanyPage page={page} />
  if (root === 'industries') return <IndustriesPage page={page} />
  if (root === 'products') return <ProductsPage page={page} />
  if (root === 'insights') return <InsightsPage page={page} />
  if (root === 'capabilities' && !cap) return <CapabilitiesOverview page={page} />

  // capability detail fallback
  const detail = cap ? capabilityDetail[cap.slug] : undefined
  const capImage = cap ? capabilityImages[cap.slug] : undefined

  return <main className="inner-page" id="main-content">
    <section className="page-hero">
      <div className="page-grid"/>
      <Reveal>
        <div className="eyebrow"><i />{cap ? `Capability · ${cap.title}` : page.eyebrow}</div>
        <h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1>
        <p>{page.intro}</p>
      </Reveal>
      <div className="page-index">HCC / {root.toUpperCase()} / 2026</div>
    </section>

    {cap && detail && (
      <>
        <section className="capability-intro section">
          <Reveal className="capability-intro-grid">
            <div>
              <div className="eyebrow"><i />Operational context</div>
              <h2>{cap.title} in practice.</h2>
              <p className="lead">{cap.short}</p>
            </div>
            <div>
              <h3>The operational challenge</h3>
              <p>{detail.problem}</p>
              <h3>Target environments</h3>
              <p>{detail.applications}</p>
            </div>
          </Reveal>
        </section>

        {capImage && (
          <section className="capability-visual-stage section">
            <Reveal className="capability-stage-frame">
              <img
                src={capImage.src}
                alt={capImage.alt}
                loading="eager"
                decoding="async"
              />
            </Reveal>
          </section>
        )}

        <section className="capability-content section">
          <Reveal className="capability-content-grid">
            <div>
              <div className="eyebrow"><i />Scope & deliverables</div>
              <h2>What Hybrid Control provides.</h2>
              <ul className="capability-deliverables">
                {detail.provides.map((item, i) => (
                  <li key={item}>
                    <span className="deliverable-index">0{i + 1}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow"><i />Integrated workstreams</div>
              <h3>Delivered disciplines</h3>
              <div className="capability-disciplines">
                {cap.points.map((pt, i) => (
                  <div key={pt} className="discipline-item">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <strong>{pt}</strong>
                  </div>
                ))}
              </div>
              <div className="capability-lifecycle-box">
                <h4>Lifecycle continuity</h4>
                <p>{detail.lifecycle}</p>
              </div>
            </div>
          </Reveal>
        </section>
      </>
    )}

    {!cap && (
      <section className="inner-content section">
        <Reveal><div className="eyebrow"><i />Related capability</div><h2>Explore {root}.</h2></Reveal>
      </section>
    )}

    {capability === 'system-integration' && <DigitalCapability />}
    <section className="inner-cta"><h2>Let’s engineer the next move.</h2><Link className="button button-light" to="/contact">Talk to an engineer <ArrowRight /></Link></section>
  </main>
}

function CompanyPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / COMPANY / 2026</div></section>

    <section className="company-intro section">
      <Reveal className="company-stat-grid">
        <div><strong>2008</strong><span>Established</span><p>Hybrid Control Corporation was formed to design, integrate and manage electrical and automation systems for infrastructure and industry.</p></div>
        <div><strong>System integrator</strong><span>Positioning</span><p>Not a product vendor—an engineering partner accountable for the complete system from field instrumentation to operational intelligence.</p></div>
        <div><strong>360°</strong><span>Lifecycle</span><p>Discover → Engineer → Integrate → Deploy → Support. One team across concept, build, commissioning and lifecycle operations.</p></div>
      </Reveal>
    </section>

    <section className="company-ecosystem section">
      <Reveal className="section-title-row">
        <div>
          <div className="eyebrow"><i />Hybrid Control ecosystem</div>
          <h2>Five connected business units,<br/><em>one integrated system.</em></h2>
        </div>
        <p>Engineering, system integration, manufacturing, maintenance and project management work as a single delivery model around the client's operational requirement.</p>
      </Reveal>
      <Reveal className="ecosystem-visual">
        <img src="/diagrams/diagram_hybrid-control-ecosystem.webp" alt="Hybrid Control integrated business ecosystem connecting engineering, manufacturing, integration, maintenance and project management" loading="lazy" decoding="async" />
      </Reveal>
    </section>

    <section className="company-philosophy section dark-section">
      <Reveal className="section-title-row"><div><div className="eyebrow"><i />Engineering philosophy</div><h2>Technology is only valuable<br/><em>when it solves the right problem.</em></h2></div><p>Our work starts from the operational requirement, not a catalogue. We bring electrical, automation, telemetry and data capabilities together around what the plant or network needs to do.</p></Reveal>
      <div className="philosophy-grid">
        <Reveal><h3>Mission</h3><p>To engineer reliable, maintainable automation and electrical systems that make critical infrastructure visible, controllable and ready for operations.</p></Reveal>
        <Reveal><h3>Vision</h3><p>To be a trusted systems-integrator for utilities and industry across Southern Africa—where integrated engineering and operational intelligence are delivered as one system.</p></Reveal>
        <Reveal><h3>How we work</h3><ul><li>Engineering-led decisions with field-proven implementation</li><li>Interoperability over proprietary lock-in (e.g., DNP3, open industrial protocols where appropriate)</li><li>Documentation, testing and handover that support long-term operations</li></ul></Reveal>
      </div>
    </section>

    <section className="company-lifecycle section">
      <Reveal className="section-title-row"><div><div className="eyebrow"><i />Complete lifecycle</div><h2>From field signal<br/><em>to operational decision.</em></h2></div><p>Each phase connects to the next without handover gaps—from measurement and control through communications, SCADA and reporting.</p></Reveal>
      <div className="lifecycle-steps">
        {[
          ['Discover','Operational requirements, constraints and existing infrastructure understood.'],
          ['Engineer','Electrical, automation, telemetry and network architecture designed.'],
          ['Integrate','Hardware, software and communications connected and validated.'],
          ['Deploy','Commissioned in the live environment with site testing and verification.'],
          ['Support','Maintained and optimised through lifecycle support and system upgrades.'],
        ].map(([t,c],i)=><Reveal key={t}><span>0{i+1}</span><h3>{t}</h3><p>{c}</p></Reveal>)}
      </div>
    </section>

    <section className="company-credentials section dark-section">
      <Reveal><div className="eyebrow"><i />Credibility</div><h2>Certified systems.<br/><em>Proven ecosystems.</em></h2></Reveal>
      <div className="credentials-grid">
        <div><ShieldCheck aria-hidden="true"/><h3>ISO 9001 · 45001 · 14001</h3><p>Quality, occupational health &amp; safety and environmental management systems supporting consistent delivery and continual improvement.</p></div>
        <div>
          <Award aria-hidden="true"/><h3>Accreditations &amp; affiliations</h3>
          <p>SACPCMP, SAIMC and Saiosh affiliations reflect professional standards supporting engineering quality and safety. Marks below link to the respective organisations; ISO standards are shown as typographic badges without reproducing restricted logos.</p>
          <div className="company-accreditations">
            <a href="https://sacpcmp.org.za/" target="_blank" rel="noreferrer" aria-label="Visit SACPCMP website"><img src="/accreditations/sacpcmp-transparent.png" alt="SACPCMP" loading="lazy" /></a>
            <a href="https://www.saiosh.co.za/" target="_blank" rel="noreferrer" aria-label="Visit Saiosh website"><img src="/accreditations/saiosh-transparent.png" alt="Saiosh — South African Institute of Occupational Safety and Health" loading="lazy" /></a>
            <a href="https://saimc.co.za/" target="_blank" rel="noreferrer" aria-label="Visit SAIMC website"><img src="/accreditations/saimc-transparent.png" alt="SAIMC — Inspiring Automation" loading="lazy" /></a>
          </div>
        </div>
        <div><Building2 aria-hidden="true"/><h3>Technology ecosystem</h3><p>Core integrations include the Rockwell Automation ecosystem, ELPRO Technologies and Adroit Technologies — applied as part of a complete engineered solution and not represented as proprietary Hybrid Control products. Additional OEM technologies are selected to suit client requirements and system architecture.</p></div>
        <div><Users aria-hidden="true"/><h3>Broad-Based Black Economic Empowerment</h3><p>Hybrid Control participates in youth development, graduate training and emerging-business support in the communities where we operate.</p></div>
      </div>
      <p className="platform-note">Capabilities are presented in clear engineering terms, with detailed project scope available in our Experience portfolio.</p>
    </section>

    <section className="inner-cta"><h2>Discuss a requirement with an engineer.</h2><Link className="button button-light" to="/contact">Contact Hybrid Control <ArrowRight /></Link></section>
  </main>
}

function CapabilitiesOverview({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / CAPABILITIES / 2026</div></section>
    <section className="capability-groups section">
      <Reveal><div className="eyebrow"><i />Grouped for clarity</div><h2>Understand what each capability does,<br/><em>when it applies and how it connects.</em></h2></Reveal>
      <div className="capability-cards">
        {capabilities.map(c => <Link key={c.slug} to={`/capabilities/${c.slug}`} className="capability-card">
          <img className="capability-card-image" src={capabilityImages[c.slug].src} alt={capabilityImages[c.slug].alt} loading="lazy" />
          <span>{c.id}</span><h3>{c.title}</h3><p>{c.short}</p><ul>{c.points.map(p=><li key={p}>{p}</li>)}</ul><span className="cap-link">Explore {c.title} <ArrowUpRight size={14}/></span>
        </Link>)}
      </div>
      <Reveal className="capability-lifecycle-note"><p>Capabilities are delivered around a single accountable project team—from procurement and panel manufacture through network integration, SCADA and lifecycle support. Where Rockwell Automation technologies such as FactoryTalk DataMosaix apply, they are evaluated and integrated as part of the architecture.</p></Reveal>
    </section>
    <section className="inner-cta"><h2>Which capability maps to your requirement?</h2><Link className="button button-light" to="/contact">Talk to an engineer <ArrowRight /></Link></section>
  </main>
}

function IndustriesPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / INDUSTRIES / 2026</div></section>
    
    <section className="industries-overview section">
      <Reveal className="industries-hero-visual">
        <img src="/diagrams/industries.webp" alt="Industrial infrastructure and water treatment environments served by Hybrid Control" loading="lazy" decoding="async" />
      </Reveal>
    </section>

    <section className="industries-detail section">
      <Reveal><div className="eyebrow"><i />Recognise your environment</div><h2>Hybrid Control understands<br/><em>your operating context.</em></h2></Reveal>
      <div className="industry-detail-grid">
        {industries.map(ind => <Reveal key={ind.name} className="industry-detail-card">
          <img className="industry-detail-image" src={industryImages[ind.name].src} alt={industryImages[ind.name].alt} loading="lazy" />
          <div className="industry-detail-head"><span>{ind.code}</span><h3>{ind.name}</h3></div>
          <p>{ind.copy}</p>
          <ul>{(industryCapabilities[ind.name] || ['Telemetry & system integration','Electrical control','SCADA & operational visibility']).map(cap => <li key={cap}>{cap}</li>)}</ul>
          <Link to="/experience" className="text-link dark">View related experience <ArrowUpRight size={14}/></Link>
        </Reveal>)}
      </div>
      <Reveal className="industry-note"><p>Explore the <Link to="/experience">Experience portfolio</Link> for detailed project scope, system architecture and the capabilities applied in each environment.</p></Reveal>
    </section>
    <section className="inner-cta"><h2>Find experience in your environment.</h2><Link className="button button-light" to="/contact">Discuss system requirements <ArrowRight /></Link></section>
  </main>
}

function ProductsPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / PRODUCTS / 2026</div></section>
    <section className="products-clarity section">
      <Reveal className="products-distinction">
        <div><span>Hybrid Control capabilities</span><p>Engineering, system integration, manufacturing, maintenance and project management delivered as an accountable lifecycle.</p></div>
        <div><i>→</i></div>
        <div><span>OEM products & technologies</span><p>Field-proven devices and platforms we can supply and integrate—not proprietary Hybrid Control products.</p></div>
      </Reveal>
      <Reveal><div className="eyebrow"><i />Technology assembled into solutions</div><h2>Products are components.<br/><em>Systems are the outcome.</em></h2></Reveal>
      <div className="product-detail-grid">
        {products.map(([name, copy], i) => <Reveal key={name} className="product-detail-card">
          <span>0{i+1}</span><h3>{name}</h3><p>{copy}</p><small>Integrated where it fits the architecture and business case</small>
        </Reveal>)}
      </div>
      <Reveal className="products-ecosystem"><p>Technology partnerships include {partners.join(', ')}. Selection depends on operational requirements, interoperability and supportability—not on catalogue promotion. Our role is to evaluate, integrate and support the appropriate platform within a complete engineered system.</p><Link className="button button-dark" to="/contact">Discuss system requirements <ArrowRight/></Link></Reveal>
    </section>
    <section className="inner-cta"><h2>Specify requirements with an engineer.</h2><Link className="button button-light" to="/contact">Request a consultation <ArrowRight /></Link></section>
  </main>
}

function InsightsPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / INSIGHTS / 2026</div></section>
    <section className="insights-content section">
      <Reveal><div className="eyebrow"><i />Professional. Useful. No filler.</div><h2>Insights from the<br/><em>operational edge.</em></h2></Reveal>
      <Reveal className="insights-empty">
        <p>Our Insights platform will share project perspectives, technical notes on telemetry, SCADA and industrial data, and articles on plant and network operations as new material is published.</p>
        <div className="insights-future">
          <div><span>01</span><h3>Project notes</h3><p>Updates linked to the Experience portfolio, highlighting system scope and operational context.</p></div>
          <div><span>02</span><h3>Technical perspectives</h3><p>Practical guidance on telemetry, industrial networks, instrumentation and operational intelligence.</p></div>
          <div><span>03</span><h3>Ecosystem updates</h3><p>How platforms such as the Rockwell Automation ecosystem are evaluated and applied in complete solutions.</p></div>
        </div>
        <p className="insights-cta-note">Explore <Link to="/experience">Engineering in Motion</Link> or <Link to="/contact">contact our team</Link> for more information.</p>
      </Reveal>
    </section>
    <section className="inner-cta"><h2>Have insight to share or request?</h2><Link className="button button-light" to="/contact">Contact Hybrid Control <ArrowRight /></Link></section>
  </main>
}

function ProjectDetail({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const diagram = projectDiagramImages[project.slug]
  return <main className="project-detail-page" id="main-content">
    <section className="project-detail-hero">
      <div className="page-grid"/>
      <Reveal>
        <div className="eyebrow"><i />Project {project.id} · {project.type}</div>
        <h1>{project.title}<em>.</em></h1>
        <div className="project-detail-meta">
          <span>{project.client}</span>
          <span>{project.location}</span>
          <span>{project.signal}</span>
        </div>
      </Reveal>
    </section>

    {diagram ? (
      <section className="project-diagram-section section">
        <Reveal>
          <div className="project-diagram-stage">
            <VisualDiagramFrame 
              number={project.id} 
              title={project.title} 
              imageSrc={diagram.src} 
              imageAlt={diagram.alt} 
              aspectRatio={diagram.aspect} 
              footer={
                <div className="project-delivery-strip">
                  <span>Delivered capability</span>
                  <div className="delivery-pills">
                    {project.delivery.map(item => <span key={item}>{item}</span>)}
                  </div>
                </div>
              }
            />
          </div>
        </Reveal>
      </section>
    ) : (
      <section className="project-diagram-section section">
        <ProjectVisual project={project} index={index}/>
      </section>
    )}

    <section className="project-detail-story section">
      <Reveal className="project-story-grid">
        <div>
          <div className="eyebrow"><i />Operational requirement</div>
          <h2>The challenge.</h2>
          <p className="detail-lead">{project.challenge}</p>
        </div>
        <div>
          <div className="eyebrow"><i />System implementation</div>
          <h3>Delivered engineering</h3>
          <p>{project.copy}</p>
          <ul className="project-delivery-checklist">
            {project.delivery.map(item => <li key={item}>{item}</li>)}
          </ul>
          <Link className="button button-dark" to="/experience">All core projects <ArrowRight/></Link>
        </div>
      </Reveal>
    </section>

    <section className="inner-cta"><h2>Build the next operating system.</h2><Link className="button button-light" to="/contact">Discuss a project <ArrowRight /></Link></section>
  </main>
}

function DigitalCapability() {
  const stages = [
    ['Connect', 'Securely bring together machines, control systems, historians and enterprise sources.', Network],
    ['Contextualize', 'Organize operational data around assets, processes and business meaning.', Database],
    ['Understand', 'Apply self-service analytics, models and anomaly detection to reveal performance.', BrainCircuit],
    ['Act', 'Deliver useful insight to operators, maintenance teams and decision-makers.', TrendingUp],
  ] as const

  return <section className="capability-digital section dark-section" id="digital-intelligence">
    <Reveal className="capability-digital-head"><div><div className="eyebrow"><i />Beyond SCADA</div><h2>Industrial data,<br/><em>made operational.</em></h2></div><div><p>SCADA remains essential for control and visualization. The next layer connects that OT foundation with other operational and enterprise data so teams can understand asset health, energy use, production performance and sustainability in context.</p><p>As a Rockwell Automation system integrator, Hybrid Control can incorporate FactoryTalk DataMosaix and aligned digital applications where they fit the client’s architecture and business case.</p></div></Reveal>
    <Reveal className="scada-visual">
      <img src="/diagrams/scada-and-operations.webp" alt="Industrial SCADA and operations control room with real-time process monitoring" loading="lazy" decoding="async" />
    </Reveal>
    <div className="intelligence-stages">{stages.map(([title, copy, Icon], i) => <Reveal key={title}><span>0{i + 1}</span><Icon/><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
    <div className="application-suite"><div className="suite-label"><span>Rockwell digital application layer</span><strong>Available as SaaS or on-premise, subject to solution design.</strong></div>{digitalSolutions.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
    <p className="platform-note">FactoryTalk DataMosaix and associated digital applications are Rockwell Automation technologies. Capabilities shown describe the solution ecosystem available for Hybrid Control to evaluate and integrate; they are not represented as proprietary Hybrid Control software.</p>
  </section>
}

function ContactPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page contact-page" id="main-content"><section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>Bring us your<br />engineering challenge<em>.</em></h1><p>{page.intro}</p></Reveal></section><section className="contact-layout section"><Reveal><span className="contact-number">01 / General enquiries</span><h2>Start a conversation.</h2><p>Share your operational requirement — including asset type, location and any existing control or telemetry systems — and your enquiry will be directed via the published contact channels to the appropriate capability owner.</p><a href="mailto:info@hybridcontrol.co.za" className="contact-email">info@hybridcontrol.co.za <ArrowUpRight /></a><div className="contact-ctas"><Link className="button button-dark" to="/experience">View projects first</Link><a className="text-link dark" href="tel:+27357891699">Or call +27 35 789 1699 <ArrowUpRight size={14}/></a></div></Reveal><div className="offices"><div><span>Richards Bay · Head office</span><p>Unit 2, 73 Dollar Drive<br/>Richards Bay, KwaZulu-Natal</p></div><div><span>Durban</span><p>Suite 2, 1 Forest Road<br/>Ashley, Pinetown, KwaZulu-Natal</p></div><div><span>Benoni</span><p>175 Elston Avenue<br/>Benoni, Gauteng</p></div><a href="tel:+27357891699">+27 35 789 1699 <ArrowUpRight /></a><p className="contact-note">Reach us directly via the channels above to discuss your requirements.</p></div></section></main>
}
