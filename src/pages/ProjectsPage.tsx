import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import EngineeringDiagram from '../components/projects/EngineeringDiagram'
import CapabilityTopology from '../components/projects/CapabilityTopology'
import DeliveredEngineering from '../components/projects/DeliveredEngineering'
import { engineeringFlagships, projects } from '../data/site'
import infrastructureImage from '../assets/industrial-hero1.png'

const architecture = ['FIELD', 'MEASUREMENT', 'COMMUNICATION', 'CONTROL', 'AUTOMATION', 'ANALYTICS', 'OPERATIONS']
const capabilityStrip = ['Process automation', 'PLC engineering', 'SCADA', 'AS-i', 'Industrial networks', 'Instrumentation', 'Electrical engineering', 'Telemetry', 'Analytics', 'Reporting', 'Control systems', 'System integration']

export default function ProjectsPage() {
  return <main className="engineering-page">
    <section className="eim-hero">
      <img src={infrastructureImage} alt="Editorial visual of water treatment infrastructure at dusk" />
      <div className="eim-hero-shade"/><div className="eim-grid"/>
      <div className="eim-signal-rail" aria-hidden="true"><i/></div>
      <Reveal className="eim-hero-content">
        <div className="eim-act"><span>ACT I</span><i/>ENGINEERING IN MOTION</div>
        <h1>Engineering<br/><em>in motion.</em></h1>
        <p>Automation behind critical infrastructure.</p>
        <div className="eim-hero-meta"><span>PROCESS AUTOMATION</span><span>PLC</span><span>SCADA</span><span>INDUSTRIAL NETWORKS</span></div>
      </Reveal>
      <a className="eim-scroll" href="#infrastructure"><span>Follow the signal</span><ArrowDown/></a>
      <span className="eim-image-note">Editorial infrastructure visual / replaceable asset</span>
    </section>

    <section className="eim-intro section" id="infrastructure">
      <Reveal>
        <div className="eim-act eim-act-dark"><span>ACT II</span><i/>INFRASTRUCTURE IN MOTION</div>
        <h2>Three sites.<br/><em>Increasing complexity.</em></h2>
        <p>Follow a physical signal as it becomes communication, control and operational intelligence.</p>
      </Reveal>
      <div className="eim-sequence" aria-label="Flagship project sequence">{engineeringFlagships.map(item => <a href={`#${item.slug}`} key={item.id}><span>{item.id}</span>{item.title}<i/></a>)}</div>
    </section>

    <section className="flagship-chapters">
      {engineeringFlagships.map((project, index) => <article className={`flagship-chapter flagship-${project.visualisation}`} id={project.slug} key={project.slug}>
        <div className="flagship-copy">
          <Reveal>
            <div className="chapter-index"><span>FLAGSHIP / {project.id}</span><span>{project.client} / {project.category}</span></div>
            <h2><small>{project.title}</small>{project.subtitle}</h2>
            <p className="chapter-headline">{project.headline}</p>
            <p>{project.description}</p>
            <div className="chapter-systems">{project.systems.map((system, systemIndex) => <span key={system}><i>{String(systemIndex + 1).padStart(2, '0')}</i>{system}</span>)}</div>
          </Reveal>
        </div>
        <div className="flagship-system" id={`${project.slug}-system`}>
          <EngineeringDiagram kind={project.visualisation} label={`${project.title} ${project.subtitle} engineering architecture`} />
          <div className="chapter-capabilities">{project.capabilities.map((capability, capabilityIndex) => <div key={capability}><span>{String(capabilityIndex + 1).padStart(2, '0')}</span><strong>{capability}</strong></div>)}</div>
        </div>
        {index < engineeringFlagships.length - 1 && <div className="chapter-transition" aria-hidden="true"><i/><span>{index === 0 ? 'PROCESS AUTOMATION → COMPLETE PLANT AUTOMATION' : 'PROCESS SIGNAL → ELECTRICAL SINGLE-LINE'}</span></div>}
      </article>)}
    </section>

    <section className="capability-map-section section">
      <Reveal className="eim-section-heading">
        <div><div className="eim-act"><span>ACT III</span><i/>ENGINEERING CAPABILITY</div><h2>Beyond<br/><em>automation.</em></h2></div>
        <div><p>Engineering across process, energy, digital systems and infrastructure—connected by one integration philosophy.</p><span>SELECT A DOMAIN / TRACE THE SYSTEM</span></div>
      </Reveal>
      <CapabilityTopology/>
    </section>

    <section className="delivered-section section" id="delivered-engineering">
      <Reveal className="eim-section-heading delivered-heading">
        <div><div className="eim-act"><span>03.2</span><i/>ENGINEERING WORKSTREAMS</div><h2>Not just capability.<br/><em>Delivered engineering.</em></h2></div>
        <div><p>A technical ledger of work spanning software, measurement, energy, process and remote communications.</p><span>SCROLL / SYSTEM VISUAL UPDATES</span></div>
      </Reveal>
      <DeliveredEngineering/>
    </section>

    <section className="project-archive section">
      <Reveal className="archive-head"><div><span>VERIFIED PROJECT RECORD / 06</span><h2>Evidence in<br/>operation.</h2></div><p>The existing public project record remains available as a direct, detailed index.</p></Reveal>
      <div className="archive-list">{projects.map(project => <Link key={project.slug} to={`/experience/${project.slug}`}><span>P{project.id}</span><div><small>{project.type} / {project.location}</small><h3>{project.title}</h3><p>{project.client}</p></div><ArrowUpRight/></Link>)}</div>
    </section>

    <section className="engineering-finale">
      <div className="finale-grid"/>
      <Reveal className="finale-heading"><div className="eim-act"><span>ACT IV</span><i/>FROM FIELD TO INTELLIGENCE</div><h2>Water.<br/>Energy.<br/>Infrastructure.</h2><p>Different processes. One engineering philosophy.</p></Reveal>
      <div className="finale-architecture">{architecture.map((item, index) => <div key={item} className={index === architecture.length - 1 ? 'is-final' : ''}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < architecture.length - 1 && <i><b/></i>}</div>)}</div>
      <Reveal className="finale-statement"><span>SIGNAL COMPLETE / OPERATIONS ONLINE</span><h3>From field to intelligence.</h3><p>Hybrid Control engineers the connections between physical infrastructure, control systems and operational intelligence.</p><Link className="button button-primary" to="/contact">Discuss your project <ArrowRight/></Link></Reveal>
      <div className="capability-strip">{capabilityStrip.map(item => <span key={item}>{item}</span>)}</div>
    </section>
  </main>
}
