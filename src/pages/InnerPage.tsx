import { ArrowRight, ArrowUpRight, BrainCircuit, Database, Network, TrendingUp } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { capabilities, digitalSolutions, industries, products, projects } from '../data/site'
import ProjectVisual from '../components/projects/ProjectVisual'

const pageMap: Record<string, { eyebrow: string; title: string; intro: string }> = {
  company: { eyebrow: 'Who we are', title: 'Engineering with purpose.\nTechnology with consequence.', intro: 'Hybrid Control Corporation has delivered electrical, automation and telemetry projects since 2008, combining specialist engineering with a practical understanding of operations.' },
  capabilities: { eyebrow: 'What we do', title: 'Integrated engineering,\nfrom concept to operation.', intro: 'Five connected business units bring design, build, commissioning and lifecycle support together around the client’s operational requirement.' },
  industries: { eyebrow: 'Where we work', title: 'Experience across\ncritical industries.', intro: 'Our team and technology partners support infrastructure and production environments across Southern Africa and beyond.' },
  experience: { eyebrow: 'Evidence in operation', title: 'Projects that move\nfrom scope to outcome.', intro: 'Our experience spans the full delivery cycle—from detailed design and manufacture through integration, commissioning and operational support.' },
  products: { eyebrow: 'Industrial technology', title: 'Connected products for\nremote infrastructure.', intro: 'Field-proven data logging, radio, cellular and wireless technology selected to become part of a complete engineered system.' },
  insights: { eyebrow: 'News & thinking', title: 'Intelligence from\nthe operational edge.', intro: 'Practical perspectives on telemetry, infrastructure, automation and the technology shaping connected industry.' },
  contact: { eyebrow: 'Contact Hybrid Control', title: 'Bring us your\nengineering challenge.', intro: 'Speak with our team about automation, telemetry, electrical engineering and infrastructure requirements.' },
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

  const list = cap ? cap.points.map(x => ({ title: x, copy: 'Delivered as part of a coordinated, operationally focused engineering system.' }))
    : root === 'capabilities' ? capabilities.map(x => ({ title: x.title, copy: x.short }))
    : root === 'industries' ? industries.map(x => ({ title: x.name, copy: x.copy }))
      : root === 'products' ? products.map(x => ({ title: x[0], copy: x[1] }))
        : root === 'experience' ? projects.map(x => ({ title: x.title, copy: x.copy }))
          : [{ title: 'Engineering-led', copy: 'Solutions begin with the operational requirement, not a product catalogue.' }, { title: 'Technology-focused', copy: 'We combine proven platforms with integration expertise and field experience.' }, { title: 'Built for operations', copy: 'Every system is designed for reliability, maintainability and real-world use.' }]

  return <main className="inner-page">
    <section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i, all) => <span key={line}>{line}{i === all.length - 1 && <em>.</em>}</span>)}</h1><p>{page.intro}</p></Reveal><div className="page-index">HCC / {root.toUpperCase()} / 2026</div></section>
    <section className="inner-content section"><Reveal><div className="eyebrow"><i />Explore</div><h2>{cap ? `Inside ${cap.title.toLowerCase()}` : `A clearer view of ${root}.`}</h2></Reveal><div className="inner-list">{list.map((item, i) => <Link to={!cap && root === 'capabilities' ? `/capabilities/${capabilities[i].slug}` : '#'} key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight /></Link>)}</div></section>
    {capability === 'system-integration' && <DigitalCapability />}
    <section className="inner-cta"><h2>Let’s engineer the next move.</h2><Link className="button button-light" to="/contact">Talk to our team <ArrowRight /></Link></section>
  </main>
}

function ProjectDetail({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return <main className="project-detail-page">
    <section className="project-detail-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />Project {project.id} · {project.type}</div><h1>{project.title}<em>.</em></h1><div className="project-detail-meta"><span>{project.client}</span><span>{project.location}</span><span>{project.signal}</span></div></Reveal></section>
    <section className="project-detail-story section"><ProjectVisual project={project} index={index}/><Reveal><div className="eyebrow"><i />Operational requirement</div><h2>The challenge.</h2><p className="detail-lead">{project.challenge}</p><p>{project.copy}</p><h3>Delivered capability</h3><ul>{project.delivery.map(item => <li key={item}>{item}</li>)}</ul><Link className="button button-dark" to="/experience">All core projects <ArrowRight/></Link></Reveal></section>
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
    <div className="intelligence-stages">{stages.map(([title, copy, Icon], i) => <Reveal key={title}><span>0{i + 1}</span><Icon/><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
    <div className="application-suite"><div className="suite-label"><span>Rockwell digital application layer</span><strong>Available as SaaS or on-premise, subject to solution design.</strong></div>{digitalSolutions.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
    <p className="platform-note">FactoryTalk DataMosaix and associated digital applications are Rockwell Automation technologies. Capabilities shown describe the solution ecosystem available for Hybrid Control to evaluate and integrate; they are not represented as proprietary Hybrid Control software.</p>
  </section>
}

function ContactPage({ page }: { page: { eyebrow: string; title: string; intro: string } }) {
  return <main className="inner-page contact-page"><section className="page-hero"><div className="page-grid"/><Reveal><div className="eyebrow"><i />{page.eyebrow}</div><h1>Bring us your<br />engineering challenge<em>.</em></h1><p>{page.intro}</p></Reveal></section><section className="contact-layout section"><Reveal><span className="contact-number">01 / General enquiries</span><h2>Start a conversation.</h2><p>Tell us about your operational requirement and the right member of our engineering team will be in touch.</p><a href="mailto:info@hybridcontrol.co.za" className="contact-email">info@hybridcontrol.co.za <ArrowUpRight /></a></Reveal><div className="offices"><div><span>Richards Bay · Head office</span><p>Unit 2, 73 Dollar Drive<br/>Richards Bay, KwaZulu-Natal</p></div><div><span>Durban</span><p>Suite 2, 1 Forest Road<br/>Ashley, Pinetown, KwaZulu-Natal</p></div><div><span>Benoni</span><p>175 Elston Avenue<br/>Benoni, Gauteng</p></div><a href="tel:+27357891699">+27 35 789 1699 <ArrowUpRight /></a></div></section></main>
}
