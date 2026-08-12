import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Check, CloudCog, Database, Signal, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import heroImage from '../assets/industrial-hero.png'
import controlInfrastructure from '../assets/legacy/control-infrastructure.jpeg'
import electricalVerification from '../assets/legacy/electrical-verification.jpeg'
import panelIntegration from '../assets/legacy/panel-integration.jpeg'
import Reveal from '../components/ui/Reveal'
import TelemetrySphere from '../components/ui/TelemetrySphere'
import ProjectVisual from '../components/projects/ProjectVisual'
import { capabilities, digitalSolutions, industries, partners, process, products, projects } from '../data/site'

const Eyebrow = ({ children }: { children: React.ReactNode }) => <div className="eyebrow"><i />{children}</div>

const fieldImages = [
  { image: panelIntegration, label: 'Build', title: 'Panel integration', copy: 'Control assemblies prepared for dependable field operation.', alt: 'Engineers integrating electrical and automation equipment inside control panels' },
  { image: electricalVerification, label: 'Verify', title: 'Electrical verification', copy: 'Measured, tested and supported across the operating lifecycle.', alt: 'Technician testing electrical control equipment with a multimeter' },
  { image: controlInfrastructure, label: 'Operate', title: 'Control infrastructure', copy: 'Installed systems connecting power, control and plant operations.', alt: 'Installed industrial motor control and electrical infrastructure' },
]

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <img className="hero-image" src={heroImage} alt="Industrial water infrastructure at blue hour" />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true">
          <div className="laser-grid">
            <i className="laser laser-h laser-h-1" />
            <i className="laser laser-h laser-h-2" />
            <i className="laser laser-v laser-v-1" />
            <i className="laser laser-v laser-v-2" />
            <span className="grid-spark spark-1" />
            <span className="grid-spark spark-2" />
            <span className="grid-spark spark-3" />
          </div>
        </div>
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><Eyebrow>Industrial automation & engineering</Eyebrow></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .75 }}>Engineering<br /><em>intelligence</em> into<br />critical infrastructure.</motion.h1>
          <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
            <p>We engineer connected industrial systems—from electrical control and telemetry to operational data, analytics and decision intelligence.</p>
            <div className="hero-actions"><Link className="button button-primary" to="/capabilities">Explore our capabilities <ArrowRight /></Link><Link className="text-link" to="/experience">View projects <ArrowUpRight /></Link></div>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#intro"><ArrowDown /> Scroll to explore</a>
        <div className="hero-status"><span><i /> Systems online</span><span>28°47′S · 32°03′E</span></div>
      </section>

      <section className="trust-strip" aria-label="Company credentials">
        <div><strong>2008</strong><span>Established</span></div>
        <div><strong>10+</strong><span>Certified specialists</span></div>
        <div><strong>05</strong><span>Integrated business units</span></div>
        <div><strong>360°</strong><span>Turnkey engineering</span></div>
      </section>

      <section className="intro section" id="intro">
        <Reveal className="section-head"><Eyebrow>Who we are</Eyebrow><h2>Technology is only valuable<br />when it solves the <em>right problem.</em></h2></Reveal>
        <div className="intro-grid">
          <Reveal className="intro-copy"><p>Hybrid Control Corporation was established in 2008 to design, integrate and manage electrical and automation systems. Today, our work connects real infrastructure to the intelligence needed to operate it better.</p><Link className="text-link dark" to="/company">Discover our company <ArrowUpRight /></Link></Reveal>
          <Reveal className="capability-sentence"><span>Engineering</span><i /><span>Integration</span><i /><span>Manufacturing</span><i /><span>Maintenance</span><i /><span>Project Management</span></Reveal>
        </div>
      </section>

      <section className="business section dark-section">
        <Reveal className="section-title-row"><div><Eyebrow>Five units. One system.</Eyebrow><h2>Integrated capability,<br /><em>from concept to operation.</em></h2></div><p>Specialist disciplines brought together around one accountable project team.</p></Reveal>
        <div className="business-list">
          {capabilities.map((unit) => (
            <Link className="business-row" to={`/capabilities/${unit.slug}`} key={unit.id}>
              <span className="unit-index">{unit.id}</span><h3>{unit.title}</h3><p>{unit.short}</p>
              <ul>{unit.points.map((point) => <li key={point}><Check />{point}</li>)}</ul><span className="round-arrow"><ArrowUpRight /></span>
            </Link>
          ))}
        </div>
        <Reveal className="field-image-heading"><span>FIELD / SYSTEM / OPERATION</span><p>Engineering is made real in the details: assembled, verified and ready to operate.</p></Reveal>
        <div className="field-image-grid">
          {fieldImages.map((item, index) => (
            <Reveal className={`field-image-card field-image-${index + 1}`} key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <div className="field-image-overlay" aria-hidden="true" />
              <div className="field-image-copy"><span>0{index + 1} / {item.label}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="telemetry section">
        <Reveal className="telemetry-copy"><Eyebrow>Telemetry & system integration</Eyebrow><h2>From remote assets<br />to <em>actionable intelligence.</em></h2><p>We connect isolated field infrastructure to control and information platforms, creating a dependable path from field signal to operational decision.</p><Link className="button button-dark" to="/capabilities/system-integration">Explore connected systems <ArrowRight /></Link></Reveal>
        <Reveal className="signal-system"><TelemetrySphere /></Reveal>
      </section>

      <section className="digital-intelligence section dark-section" id="digital-intelligence">
        <Reveal className="digital-heading">
          <div><Eyebrow>Digital intelligence · Rockwell Automation ecosystem</Eyebrow><h2>Control the process.<br /><em>Understand the business.</em></h2></div>
          <div className="digital-intro"><p>Hybrid Control’s system integration offering extends beyond hardware and SCADA. Through Rockwell Automation’s digital technology ecosystem—including FactoryTalk DataMosaix—we can connect OT and enterprise data, contextualize it, and turn it into applications that support operations, maintenance, energy and production decisions.</p><Link className="text-link" to="/capabilities/system-integration#digital-intelligence">Explore industrial data solutions <ArrowUpRight /></Link></div>
        </Reveal>

        <Reveal className="data-architecture">
          <div className="data-layer field-layer"><span>01 / Operational edge</span><strong>Assets · Sensors · PLC · DCS · SCADA</strong><Waves /></div>
          <div className="data-connector" aria-hidden="true"><i /><i /><i /></div>
          <div className="data-layer context-layer"><span>02 / Industrial data layer</span><strong>Connect · Contextualize · Govern</strong><Database /></div>
          <div className="data-connector" aria-hidden="true"><i /><i /><i /></div>
          <div className="data-layer intelligence-layer"><span>03 / Intelligence</span><strong>Analytics · AI · Digital applications</strong><BrainCircuit /></div>
          <div className="data-connector" aria-hidden="true"><i /><i /><i /></div>
          <div className="data-layer outcome-layer"><span>04 / Business outcomes</span><strong>Act · Optimize · Sustain</strong><CloudCog /></div>
        </Reveal>

        <div className="digital-solutions">{digitalSolutions.map((solution, i) => <Reveal className="digital-card" key={solution.title}><span>0{i + 1}</span><h3>{solution.title}</h3><p>{solution.copy}</p><small>{solution.outcome}</small></Reveal>)}</div>
        <p className="platform-note">FactoryTalk DataMosaix and the referenced digital applications are Rockwell Automation technologies. Hybrid Control’s role is to help clients evaluate, integrate and apply the appropriate capability within a complete industrial solution.</p>
      </section>

      <section className="industries section">
        <Reveal className="section-title-row"><div><Eyebrow>Industry experience</Eyebrow><h2>Built for the environments<br />that <em>cannot stand still.</em></h2></div><Link className="text-link dark" to="/industries">Explore all industries <ArrowUpRight /></Link></Reveal>
        <div className="industry-grid">{industries.map((item, index) => <Link to="/industries" className={`industry-card industry-${index + 1}`} key={item.name}><div className="industry-pattern"/><span>{item.code}</span><div><small>0{index + 1}</small><h3>{item.name}</h3><p>{item.copy}</p><ArrowUpRight /></div></Link>)}</div>
      </section>

      <section className="home-evidence section" id="core-projects">
        <Reveal className="evidence-heading"><div><Eyebrow>Core project experience</Eyebrow><h2>This is what integrated<br/><em>engineering looks like.</em></h2></div><div><p>From a single field signal to a 146-site telemetry programme, Hybrid Control’s project record shows how engineering, control, communications and operational intelligence work as one system.</p><Link className="button button-dark" to="/experience">Explore all core projects <ArrowRight/></Link></div></Reveal>
        <div className="evidence-stage">
          <Link to={`/experience#${projects[1].slug}`} className="evidence-feature"><ProjectVisual project={projects[1]} index={1}/><div className="evidence-feature-copy"><span>Flagship scale / P02</span><h3>{projects[1].title}</h3><strong>{projects[1].client}</strong><p>{projects[1].copy}</p><div>{projects[1].delivery.map(item => <i key={item}>{item}</i>)}</div><ArrowUpRight/></div></Link>
          <div className="evidence-side">{[projects[0], projects[2], projects[5]].map((project, i) => <Link to={`/experience#${project.slug}`} key={project.slug}><ProjectVisual project={project} index={i} compact/><div><span>{project.id} / {project.type}</span><h3>{project.title}</h3><p>{project.client}</p></div><ArrowUpRight/></Link>)}</div>
        </div>
        <div className="evidence-capabilities"><span>DELIVERED CAPABILITY</span>{['Operational reporting','Water operations analytics','Radio telemetry','Process automation','Energy intelligence'].map((item, i) => <div key={item}><b>0{i + 1}</b>{item}</div>)}</div>
      </section>

      <section className="process section dark-section">
        <Reveal><Eyebrow>How we deliver</Eyebrow><h2>One connected process.<br /><em>Zero handover gaps.</em></h2></Reveal>
        <div className="process-line">{process.map(([title, copy], i) => <Reveal className="process-step" key={title}><span>0{i + 1}</span><i /><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </section>

      <section className="products section">
        <Reveal className="section-title-row"><div><Eyebrow>Industrial technology</Eyebrow><h2>Field-ready products,<br /><em>engineered into solutions.</em></h2></div><p>Selected technology for resilient communications, monitoring and control.</p></Reveal>
        <div className="product-list">{products.map(([name, copy], i) => <Link to="/products" key={name}><span>0{i + 1}</span><div className="product-icon"><Signal /></div><h3>{name}</h3><p>{copy}</p><ArrowUpRight /></Link>)}</div>
      </section>

      <section className="partners section">
        <Reveal><Eyebrow>Technology ecosystem</Eyebrow><h2>Partnerships built around<br /><em>proven industrial platforms.</em></h2></Reveal>
        <div className="partner-grid">{partners.map(partner => <div key={partner}>{partner}</div>)}</div>
        <div className="impact"><div className="impact-graphic"><span>01</span><span>Next<br />generation</span></div><Reveal><Eyebrow>Social responsibility</Eyebrow><h3>Engineering progress<br />beyond infrastructure.</h3><p>We work with clients to support youth development, graduate training and emerging businesses in the communities where we operate.</p><Link className="text-link dark" to="/company">Our company story <ArrowUpRight /></Link></Reveal></div>
      </section>

      <section className="contact-cta">
        <div className="cta-grid" aria-hidden="true" />
        <Reveal><Eyebrow>Start a conversation</Eyebrow><h2>Have an engineering challenge?<br /><em>Let’s solve it.</em></h2><p>Talk to our engineering team about your automation, telemetry or electrical infrastructure requirements.</p><Link className="button button-light" to="/contact">Contact our team <ArrowUpRight /></Link></Reveal>
      </section>
    </main>
  )
}
