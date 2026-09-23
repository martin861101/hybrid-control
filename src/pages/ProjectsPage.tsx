import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import EngineeringDiagram from '../components/projects/EngineeringDiagram'
import { engineeringFlagships, projects, completedProjects, deliveredEngineering } from '../data/site'
import infrastructureImage from '../assets/industrial-hero1.png'
import BlurText from '../components/BlurText'
import LightTunnel from '../components/ui/LightTunnel'


const flagshipImages: Record<string, { src: string; alt: string; aspect: string }> = {
  midmar: { src: '/diagrams/diagram_process-automation.webp', alt: 'Midmar Water Treatment Works process automation architecture from field actuators to SCADA operations', aspect: '1085 / 363' },
  nsezi: { src: '/diagrams/diagram_nsezi-process-automation.webp', alt: 'Nsezi Water Treatment Works complete plant automation and control environment', aspect: '1039 / 378' },
}

const architecture = ['FIELD', 'MEASUREMENT', 'COMMUNICATION', 'CONTROL', 'AUTOMATION', 'ANALYTICS', 'OPERATIONS']
const capabilityStrip = ['Process automation', 'PLC engineering', 'SCADA', 'AS-i', 'Industrial networks', 'Instrumentation', 'Electrical engineering', 'Telemetry', 'Analytics', 'Reporting', 'Control systems', 'System integration']

export default function ProjectsPage() {
  return <main className="engineering-page" id="main-content">
    <section className="eim-hero">
      <img src={infrastructureImage} alt="Editorial visual of water treatment infrastructure at dusk" loading="eager" decoding="async" />
      <div className="eim-hero-shade"/><div className="eim-grid"/>
      <div className="eim-signal-rail" aria-hidden="true"><i/></div>
      <Reveal className="eim-hero-content">
        <div className="eim-act"><span>ACT I</span><i/>ENGINEERING IN MOTION</div>
        <h1><BlurText text="Engineering" /><br/><em><BlurText text="in motion." delay={300} /></em></h1>
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
          {flagshipImages[project.slug] ? (
            <div className="flagship-image-wrap">
              <img
                src={flagshipImages[project.slug].src}
                alt={flagshipImages[project.slug].alt}
                style={{ aspectRatio: flagshipImages[project.slug].aspect }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <EngineeringDiagram kind={project.visualisation} label={`${project.title} ${project.subtitle} engineering architecture`} />
          )}
          <div className="chapter-capabilities">{project.capabilities.map((capability, capabilityIndex) => <div key={capability}><span>{String(capabilityIndex + 1).padStart(2, '0')}</span><strong>{capability}</strong></div>)}</div>
        </div>
        {index < engineeringFlagships.length - 1 && <div className="chapter-transition" aria-hidden="true"><i/><span>{index === 0 ? 'PROCESS AUTOMATION → COMPLETE PLANT AUTOMATION' : 'PROCESS SIGNAL → ELECTRICAL SINGLE-LINE'}</span></div>}
      </article>)}
    </section>

    <section className="delivered-section section" id="delivered-engineering">
      <Reveal className="eim-section-heading delivered-heading">
        <div><div className="eim-act"><span>03.2</span><i/>ENGINEERING WORKSTREAMS</div><h2>Not just capability.<br/><em>Delivered engineering.</em></h2></div>
        <div><p>A technical ledger of work spanning software, measurement, energy, process and remote communications.</p></div>
      </Reveal>
      <Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '0 max(5vw, calc((100vw - 1200px) / 2)) 80px', marginTop: '20px' }}>
          {deliveredEngineering.map((item) => (
            <span key={item.id} style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px', 
              background: 'var(--card-surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '30px', 
              fontSize: '0.85rem',
              color: 'var(--text-body)',
              fontWeight: 500
            }}>
              <span style={{ color: 'var(--cyan)' }}>{item.id}</span>
              {item.title}
            </span>
          ))}
        </div>
      </Reveal>
    </section>

    <section className="erwat-network-section" id="erwat-network" aria-labelledby="erwat-network-title">
      <Reveal className="erwat-network-heading">
        <div>
          <div className="eim-act"><span>FIELD EVIDENCE / ERWAT</span><i />REMOTE OPERATIONS</div>
          <h2 id="erwat-network-title"><BlurText text="ERWAT HQ network" /><br /><em><BlurText text="in motion." delay={300} /></em></h2>
        </div>
        <div>
          <p>Remote pump stations brought under central monitoring and control — Adroit SCADA and ELPRO RTUs extending visibility from the field to the operations room at ERWAT headquarters, Kempton Park.</p>
          <span>LIVE VIDEO FEED</span>
        </div>
      </Reveal>
      <Reveal>
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative', margin: '20px auto 40px auto', width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '800px', zIndex: -1, pointerEvents: 'none' }}>
            <LightTunnel
              cableColor="#16b9ff"
              pulseColor="#6ed8ff"
              tunnelColor="#087cf0"
              tunnelOpacity={0}
              speed={0.1}
              flowDirection="outward"
              pulseSpeed={2}
              pulseLength={0.28}
              pulseBlend={1}
              pulseWidth={1}
              cableCount={20}
              thickness={0.35}
              rimWidth={0.15}
              waviness={0.3}
              sway={0.5}
              size={1.5}
              centerX={0}
              centerY={0}
              glow={1}
              fadeNear={0.5}
              fadeFar={2}
              brightness={1}
              colorVariance
              grain
              grainIntensity={0.05}
              opacity={0.15}
              mouseInteraction
              mouseStrength={0.1}
            />
          </div>
          <video className="erwat-network-video" autoPlay loop muted playsInline src="/vid/hybrid_ani.mp4" style={{ display: 'block', width: '100%', height: 'auto', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }} />
        </div>
        <div className="erwat-network-meta" aria-label="Delivered capability for ERWAT">
          <div><span>01 / Supervision</span><strong>Adroit SCADA</strong></div>
          <div><span>02 / Telemetry</span><strong>ELPRO RTUs</strong></div>
          <div><span>03 / Lifecycle</span><strong>Operations support</strong></div>
        </div>
        </div>
      </Reveal>
    </section>

    <section className="project-archive section">
      <Reveal className="archive-head"><div><span>VERIFIED PROJECT RECORD / 06</span><h2>Evidence in<br/>operation.</h2></div><p>The existing public project record remains available as a direct, detailed index.</p></Reveal>
      <div className="archive-list">{projects.map(project => <Link key={project.slug} to={`/experience/${project.slug}`}><span>P{project.id}</span><div><small>{project.type} / {project.location}</small><h3><BlurText text={project.title} /></h3><p>{project.client}</p></div><ArrowUpRight/></Link>)}</div>
    </section>

    <section className="completed-projects section" style={{ padding: '80px max(5vw, calc((100vw - 1200px) / 2))', background: 'var(--slate-surface)' }}>
      <Reveal className="eim-section-heading">
        <div><div className="eim-act"><span>PROJECT RECORD</span><i/>ADDITIONAL WORK</div><h2>Completed<br/><em>Projects.</em></h2></div>
        <div><p>A broader look at key historical projects across telemetry, SCADA, and process automation.</p></div>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '60px' }}>
        {completedProjects.map((proj, idx) => (
          <Reveal key={idx}>
            <div style={{ padding: '30px', borderLeft: '2px solid var(--cyan)', background: 'var(--card-surface)', borderRadius: '0 12px 12px 0' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: 'var(--text-heading)' }}>{proj.title}</h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: 'var(--cyan)', fontWeight: 600 }}>{proj.location}</p>
              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-body)' }}>{proj.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="engineering-finale">
      <div className="finale-grid"/>
      <Reveal className="finale-heading"><div className="eim-act"><span>ACT IV</span><i/>FROM FIELD TO INTELLIGENCE</div><h2>Water.<br/>Energy.<br/>Infrastructure.</h2><p>Different processes. One engineering philosophy.</p></Reveal>
      <div className="finale-architecture">{architecture.map((item, index) => <div key={item} className={index === architecture.length - 1 ? 'is-final' : ''}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < architecture.length - 1 && <i><b/></i>}</div>)}</div>
      <Reveal className="finale-statement"><span>SIGNAL COMPLETE / OPERATIONS ONLINE</span><h3><BlurText text="From field to intelligence." /></h3><p>Hybrid Control engineers the connections between physical infrastructure, control systems and operational intelligence.</p><button className="button button-primary" onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}>Discuss your project <ArrowRight/></button></Reveal>
      <div className="capability-strip">{capabilityStrip.map(item => <span key={item}>{item}</span>)}</div>
    </section>
  </main>
}
