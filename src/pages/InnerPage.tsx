import { useState } from 'react'
import { ArrowRight, ArrowUpRight, BrainCircuit, Database, Network, TrendingUp, ShieldCheck, Building2, Users, Award, Download } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { capabilities, digitalSolutions, industries, products, projects, partners } from '../data/site'
import ProjectVisual from '../components/projects/ProjectVisual'
import VisualDiagramFrame from '../components/ui/VisualDiagramFrame'
import BlurText from '../components/BlurText'

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
  'Water & Wastewater': { src: '/industries/water.png', alt: 'Water and wastewater treatment infrastructure' },
  'Power Generation': { src: '/industries/power.png', alt: 'Power generation infrastructure' },
  'Renewable Energy': { src: '/industries/renewable_energy.png', alt: 'Renewable energy infrastructure' },
  Energy: { src: '/industries/energy.png', alt: 'Industrial energy infrastructure' },
  Chemical: { src: '/industries/chemical.png', alt: 'Chemical processing infrastructure' },
  'Oil & Gas': { src: '/industries/oil_gass.png', alt: 'Oil and gas processing infrastructure' },
  Mining: { src: '/industries/mining.png', alt: 'Mining infrastructure and operations' },
  Manufacturing: { src: '/industries/manufacturing.png', alt: 'Industrial manufacturing operations' },
  'FMCG & Packaging': { src: '/industries/fmcg_packaging.png', alt: 'FMCG and packaging production operations' },
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
              <h2><BlurText text={`${cap.title} in practice.`} /></h2>
              <p className="lead">{cap.short}</p>
            </div>
            <div>
              <h3><BlurText text="The operational challenge" /></h3>
              <p>{detail.problem}</p>
              <h3><BlurText text="Target environments" /></h3>
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
              <h2><BlurText text="What Hybrid Control provides." /></h2>
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
              <h3><BlurText text="Delivered disciplines" /></h3>
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
        <Reveal><div className="eyebrow"><i />Related capability</div><h2><BlurText text="Explore {root}." /></h2></Reveal>
      </section>
    )}

    {capability === 'system-integration' && <DigitalCapability />}
    <section className="inner-cta"><h2><BlurText text="Let’s engineer the next move." /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Talk to an engineer <ArrowRight /></button></section>
  </main>
}

function CompanyPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / COMPANY / 2026</div></section>

    <section className="company-intro section">
      <Reveal className="company-stat-grid">
        <div><strong>2008</strong><span>Established</span><p>Hybrid Control Corporation was established in 2008 focusing on design, integration and project management for electrical, telemetry, process control and automation systems.</p></div>
        <div><strong>10+</strong><span>Years Experience</span><p>Over 10 years of delivering business solutions to various industries and clients through technology and engineering.</p></div>
        <div><strong>10+</strong><span>Certified Engineers</span><p>We have over 10 full time employees who are certified specialists for design and integration of various telemetry and automation solutions.</p></div>
      </Reveal>
    </section>

    <section className="company-business-units section" style={{ padding: '80px max(5vw, calc((100vw - 1200px) / 2))', background: 'var(--slate-surface)' }}>
      <Reveal className="section-title-row">
        <div>
          <div className="eyebrow"><i />Business Units</div>
          <h2><BlurText text="Five connected business units," /><br/><em><BlurText text="one integrated system." delay={300} /></em></h2>
        </div>
        <p>Creative minds from our 5 business units always come together to solve the most difficult industry challenges.</p>
      </Reveal>
      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '40px' }}>
        {[
          {
            title: 'Engineering Unit',
            content: 'We seek to address complex and interdependent systems across industrial plants. We focus on understanding customer requirements and adopting clear processes through the design and implementation of engineering solutions. We implement protocols like DNP3 to ensure direct interoperability between outstations and SCADA systems.'
          },
          {
            title: 'System Integration Unit',
            content: 'After the engineering or design phase, the system integration phase covering implementation is crucial. Our engineers carry out technical studies, develop technical standards, programming, technical diagrams, choice of equipment to meet requirements, and full site installation.'
          },
          {
            title: 'Maintenance Unit',
            content: 'We offer maintenance services ranging from all-inclusive to tailored contracts. We focus on ensuring your production demands do not exceed what your assets can produce by implementing suitable, proactive maintenance strategies tailored to asset conditions.'
          },
          {
            title: 'Manufacturing Unit',
            content: 'The installation process is fast-tracked through our capability to build telemetry and other electrical panels in-house. We are ISO9001 and ISO14001 certified, always following the highest quality and safety standards during our manufacturing process.'
          },
          {
            title: 'Project Management Unit',
            content: 'All our projects are headed by a project manager serving as the main interface with the client. Clients enjoy the benefits of having access to a pool of experienced resources who understand the full project cycle from the initiating to closing phase.'
          }
        ].map((unit, i) => (
          <Reveal key={unit.title}>
            <div style={{ background: 'var(--card-surface)', padding: '30px', borderRadius: '12px', borderTop: '2px solid var(--cyan)' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>0{i+1} / BUSINESS UNIT</span>
              <h3 style={{ margin: '15px 0', fontSize: '1.4rem' }}>{unit.title}</h3>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>{unit.content}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="why-choose-us section dark-section" style={{ padding: '80px max(5vw, calc((100vw - 1200px) / 2))' }}>
      <Reveal className="section-title-row">
        <div><div className="eyebrow"><i />Why Choose Us</div><h2><BlurText text="A Complete Solutions" /><br/><em><BlurText text="Provider." delay={300} /></em></h2></div>
        <p>Our market coverage, experience and capability allows us to deliver full turnkey solutions to our clients, saving costs and time.</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: '40px' }}>
        <Reveal>
          <h3 style={{ color: 'var(--cyan)' }}>Social Responsibility</h3>
          <p>We work together with our clients to bring change within the community that we work in through youth and small business development initiatives.</p>
        </Reveal>
        <Reveal>
          <h3 style={{ color: 'var(--cyan)' }}>Certified System Integrator</h3>
          <p>HCC is a certified system integrator for various telemetry and automation systems from OEMs such as ELPRO, Adroit and others.</p>
        </Reveal>
        <Reveal>
          <h3 style={{ color: 'var(--cyan)' }}>Multiple Industries</h3>
          <p>Our expertise span various industries including water, sanitation, Oil & Gas, energy, packaging, mining, FMCG and others.</p>
        </Reveal>
      </div>
    </section>

    <section className="company-credentials section dark-section">
      <Reveal><div className="eyebrow"><i />Credibility</div><h2><BlurText text="Certified systems." /><br/><em><BlurText text="Proven ecosystems." delay={300} /></em></h2></Reveal>
      <div className="credentials-grid">
        <div><ShieldCheck aria-hidden="true"/><h3><BlurText text="ISO 9001 · 45001 · 14001" /></h3><p>Quality, occupational health &amp; safety and environmental management systems supporting consistent delivery and continual improvement.</p></div>
        <div>
          <Award aria-hidden="true"/><h3><BlurText text="Accreditations &amp; affiliations" /></h3>
          <p>SACPCMP, SAIMC and Saiosh affiliations reflect professional standards supporting engineering quality and safety. Marks below link to the respective organisations; ISO standards are shown as typographic badges without reproducing restricted logos.</p>
          <div className="company-accreditations">
            <a href="https://sacpcmp.org.za/" target="_blank" rel="noreferrer" aria-label="Visit SACPCMP website"><img src="/accreditations/sacpcmp-transparent.png?v=2" alt="SACPCMP" loading="lazy" /></a>
            <a href="https://www.saiosh.co.za/" target="_blank" rel="noreferrer" aria-label="Visit Saiosh website"><img src="/accreditations/saiosh-transparent.png" alt="Saiosh — South African Institute of Occupational Safety and Health" loading="lazy" /></a>
            <a href="https://saimc.co.za/" target="_blank" rel="noreferrer" aria-label="Visit SAIMC website"><img src="/accreditations/saimc-transparent.png" alt="SAIMC — Inspiring Automation" loading="lazy" /></a>
          </div>
        </div>
        <div><Building2 aria-hidden="true"/><h3><BlurText text="Technology ecosystem" /></h3><p>Core integrations include the Rockwell Automation ecosystem, ELPRO Technologies and Adroit Technologies — applied as part of a complete engineered solution and not represented as proprietary Hybrid Control products. Additional OEM technologies are selected to suit client requirements and system architecture.</p></div>
        <div><Users aria-hidden="true"/><h3><BlurText text="Broad-Based Black Economic Empowerment" /></h3><p>Hybrid Control participates in youth development, graduate training and emerging-business support in the communities where we operate.</p></div>
      </div>
      <p className="platform-note">Capabilities are presented in clear engineering terms, with detailed project scope available in our Experience portfolio.</p>
    </section>

    <section className="inner-cta"><h2><BlurText text="Discuss a requirement with an engineer." /></h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Contact Hybrid Control <ArrowRight /></button>
        <a className="button button-dark" href="/pdf/hybrid-control.pdf" download>Download Company Profile <Download size={15}/></a>
      </div>
    </section>
  </main>
}

function CapabilitiesOverview({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / CAPABILITIES / 2026</div></section>
    <section className="capability-groups section">
      <Reveal><div className="eyebrow"><i />Grouped for clarity</div><h2><BlurText text="Understand what each capability does," /><br/><em><BlurText text="when it applies and how it connects." delay={300} /></em></h2></Reveal>
      <div className="capability-cards">
        {capabilities.map(c => <Link key={c.slug} to={`/capabilities/${c.slug}`} className="capability-card">
          <img className="capability-card-image" src={capabilityImages[c.slug].src} alt={capabilityImages[c.slug].alt} loading="lazy" />
          <span>{c.id}</span><h3><BlurText text={c.title} /></h3><p>{c.short}</p><ul>{c.points.map(p=><li key={p}>{p}</li>)}</ul><span className="cap-link">Explore {c.title} <ArrowUpRight size={14}/></span>
        </Link>)}
      </div>
      <Reveal className="capability-lifecycle-note"><p>Capabilities are delivered around a single accountable project team—from procurement and panel manufacture through network integration, SCADA and lifecycle support. Where Rockwell Automation technologies such as FactoryTalk DataMosaix apply, they are evaluated and integrated as part of the architecture.</p></Reveal>
    </section>
    <section className="inner-cta"><h2><BlurText text="Which capability maps to your requirement?" /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Talk to an engineer <ArrowRight /></button></section>
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
      <Reveal><div className="eyebrow"><i />Recognise your environment</div><h2><BlurText text="Hybrid Control understands" /><br/><em><BlurText text="your operating context." delay={300} /></em></h2></Reveal>
      <div className="industry-detail-grid">
        {industries.map(ind => <Reveal key={ind.name} className="industry-detail-card">
          <img className="industry-detail-image" src={industryImages[ind.name].src} alt={industryImages[ind.name].alt} loading="lazy" />
          <div className="industry-detail-head"><span>{ind.code}</span><h3><BlurText text={ind.name} /></h3></div>
          <p>{ind.copy}</p>
          <ul>{(industryCapabilities[ind.name] || ['Telemetry & system integration','Electrical control','SCADA & operational visibility']).map(cap => <li key={cap}>{cap}</li>)}</ul>
          <Link to="/experience" className="text-link dark">View related experience <ArrowUpRight size={14}/></Link>
        </Reveal>)}
      </div>
      <Reveal className="industry-note"><p>Explore the <Link to="/experience">Experience portfolio</Link> for detailed project scope, system architecture and the capabilities applied in each environment.</p></Reveal>
    </section>
    <section className="inner-cta"><h2><BlurText text="Find experience in your environment." /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Discuss system requirements <ArrowRight /></button></section>
  </main>
}

const productImagesData = [
  { category: 'Data Loggers', name: 'Data Logger', src: '/img/products/data_loggers.png' },
  { category: 'Industrial Wireless', name: 'Industrial Wireless', src: '/img/products/indus_wireless.png' },
  { category: 'Radio & Cellular Modems', name: 'Cellular Modem 1', src: '/img/products/radio_cel_modems.png' },
  { category: 'Radio & Cellular Modems', name: 'Cellular Modem 2', src: '/img/products/radio_cel_modems2.png' },
  { category: 'Radio Telemetry', name: 'Radio Telemetry', src: '/img/products/radio_telementary.png' },
  { category: 'Wireless Gateways', name: 'Wireless Gateway', src: '/img/products/wireless_gateways.png' },
];

const productCategories = ['All', 'Data Loggers', 'Industrial Wireless', 'Radio & Cellular Modems', 'Radio Telemetry', 'Wireless Gateways'];

function ProductsPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = productImagesData.filter(img => activeCategory === 'All' || img.category === activeCategory);

  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / PRODUCTS / 2026</div></section>
    
    <section className="products-gallery section" style={{ padding: '60px max(5vw, calc((100vw - 1200px) / 2))' }}>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {productCategories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${activeCategory === cat ? 'var(--cyan)' : 'var(--border-subtle)'}`,
              background: activeCategory === cat ? 'rgba(22, 185, 255, 0.1)' : 'transparent',
              color: activeCategory === cat ? 'var(--cyan)' : 'var(--text-body)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {filteredImages.map((img, i) => (
          <Reveal key={`${img.name}-${i}`}>
            <div style={{ background: 'var(--card-surface)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#fff' }}>
                <img src={img.src} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'var(--navy-deep)', opacity: 0.4, pointerEvents: 'none' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: 'var(--text-heading)' }}>{img.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--cyan)' }}>{img.category}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="products-clarity section">
      <Reveal className="products-distinction">
        <div><span>Hybrid Control capabilities</span><p>Engineering, system integration, manufacturing, maintenance and project management delivered as an accountable lifecycle.</p></div>
        <div><i>→</i></div>
        <div><span>OEM products & technologies</span><p>Field-proven devices and platforms we can supply and integrate—not proprietary Hybrid Control products.</p></div>
      </Reveal>
      <Reveal><div className="eyebrow"><i />Technology assembled into solutions</div><h2><BlurText text="Products are components." /><br/><em><BlurText text="Systems are the outcome." delay={300} /></em></h2></Reveal>
      <div className="product-detail-grid">
        {products.map(([name, copy], i) => <Reveal key={name} className="product-detail-card">
          <span>0{i+1}</span><h3><BlurText text={name} /></h3><p>{copy}</p><small>Integrated where it fits the architecture and business case</small>
        </Reveal>)}
      </div>
      <Reveal className="products-ecosystem"><p>Technology partnerships include {partners.join(', ')}. Selection depends on operational requirements, interoperability and supportability—not on catalogue promotion. Our role is to evaluate, integrate and support the appropriate platform within a complete engineered system.</p><button className="button button-dark" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Discuss system requirements <ArrowRight/></button></Reveal>
    </section>
    <section className="inner-cta"><h2><BlurText text="Specify requirements with an engineer." /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Request a consultation <ArrowRight /></button></section>
  </main>
}

function InsightsPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page" id="main-content">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / INSIGHTS / 2026</div></section>
    <section className="insights-content section">
      <Reveal><div className="eyebrow"><i />Professional. Useful. No filler.</div><h2><BlurText text="Insights from the" /><br/><em><BlurText text="operational edge." delay={300} /></em></h2></Reveal>
      <Reveal className="insights-empty">
        <p>Our Insights platform will share project perspectives, technical notes on telemetry, SCADA and industrial data, and articles on plant and network operations as new material is published.</p>
        <div className="insights-future">
          <div><span>01</span><h3><BlurText text="Project notes" /></h3><p>Updates linked to the Experience portfolio, highlighting system scope and operational context.</p></div>
          <div><span>02</span><h3><BlurText text="Technical perspectives" /></h3><p>Practical guidance on telemetry, industrial networks, instrumentation and operational intelligence.</p></div>
          <div><span>03</span><h3><BlurText text="Ecosystem updates" /></h3><p>How platforms such as the Rockwell Automation ecosystem are evaluated and applied in complete solutions.</p></div>
        </div>
        <p className="insights-cta-note">Explore <Link to="/experience">Engineering in Motion</Link> or <button onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>contact our team</button> for more information.</p>
      </Reveal>
    </section>
    <section className="inner-cta"><h2><BlurText text="Have insight to share or request?" /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Contact Hybrid Control <ArrowRight /></button></section>
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
          <h2><BlurText text="The challenge." /></h2>
          <p className="detail-lead">{project.challenge}</p>
        </div>
        <div>
          <div className="eyebrow"><i />System implementation</div>
          <h3><BlurText text="Delivered engineering" /></h3>
          <p>{project.copy}</p>
          <ul className="project-delivery-checklist">
            {project.delivery.map(item => <li key={item}>{item}</li>)}
          </ul>
          <Link className="button button-dark" to="/experience">All core projects <ArrowRight/></Link>
        </div>
      </Reveal>
    </section>

    <section className="inner-cta"><h2><BlurText text="Build the next operating system." /></h2><button className="button button-light" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Discuss a project <ArrowRight /></button></section>
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
    <Reveal className="capability-digital-head"><div><div className="eyebrow"><i />Beyond SCADA</div><h2><BlurText text="Industrial data," /><br/><em><BlurText text="made operational." delay={300} /></em></h2></div><div><p>SCADA remains essential for control and visualization. The next layer connects that OT foundation with other operational and enterprise data so teams can understand asset health, energy use, production performance and sustainability in context.</p><p>As a Rockwell Automation system integrator, Hybrid Control can incorporate FactoryTalk DataMosaix and aligned digital applications where they fit the client’s architecture and business case.</p></div></Reveal>
    <Reveal className="scada-visual">
      <img src="/diagrams/scada-and-operations.webp" alt="Industrial SCADA and operations control room with real-time process monitoring" loading="lazy" decoding="async" />
    </Reveal>
    <div className="intelligence-stages">{stages.map(([title, copy, Icon], i) => <Reveal key={title}><span>0{i + 1}</span><Icon/><h3><BlurText text={title} /></h3><p>{copy}</p></Reveal>)}</div>
    <div className="application-suite"><div className="suite-label"><span>Rockwell digital application layer</span><strong>Available as SaaS or on-premise, subject to solution design.</strong></div>{digitalSolutions.map(item => <div key={item.title}><h3><BlurText text={item.title} /></h3><p>{item.copy}</p></div>)}</div>
    <p className="platform-note">FactoryTalk DataMosaix and associated digital applications are Rockwell Automation technologies. Capabilities shown describe the solution ecosystem available for Hybrid Control to evaluate and integrate; they are not represented as proprietary Hybrid Control software.</p>
  </section>
}

function ContactPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page contact-page" id="main-content"><section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1><BlurText text="Bring us your" /><br /><BlurText text="engineering challenge" delay={300} /><em>.</em></h1><p>{page.intro}</p></Reveal></section><section className="contact-layout section"><Reveal><span className="contact-number">01 / General enquiries</span><h2><BlurText text="Start a conversation." /></h2><p>Share your operational requirement — including asset type, location and any existing control or telemetry systems — and your enquiry will be directed via the published contact channels to the appropriate capability owner.</p><a href="mailto:info@hybridcontrol.co.za" className="contact-email">info@hybridcontrol.co.za <ArrowUpRight /></a><div className="contact-ctas"><Link className="button button-dark" to="/experience">View projects first</Link><a className="text-link dark" href="tel:+27357891699">Or call +27 35 789 1699 <ArrowUpRight size={14}/></a></div></Reveal><div className="offices"><div><span>Richards Bay · Head office</span><p>Unit 2, 73 Dollar Drive<br/>Richards Bay, KwaZulu-Natal</p></div><div><span>Durban</span><p>Suite 2, 1 Forest Road<br/>Ashley, Pinetown, KwaZulu-Natal</p></div><div><span>Benoni</span><p>175 Elston Avenue<br/>Benoni, Gauteng</p></div><a href="tel:+27357891699">+27 35 789 1699 <ArrowUpRight /></a><p className="contact-note">Reach us directly via the channels above to discuss your requirements.</p></div></section></main>
}
