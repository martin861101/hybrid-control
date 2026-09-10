export type SeoProps = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export const seoConfig: Record<string, SeoProps> = {
  '/': {
    title: 'Hybrid Control Corporation | Engineering · Automation · Operational Intelligence',
    description: 'Hybrid Control Corporation integrates electrical, automation, telemetry and industrial data systems—from field control to analytics and operational intelligence.',
  },
  '/company': {
    title: 'Company | Hybrid Control Corporation',
    description: 'Hybrid Control Corporation since 2008: electrical, automation and telemetry engineering with system-integration lifecycle from design to operations and maintenance.',
  },
  '/capabilities': {
    title: 'Capabilities | Hybrid Control Corporation',
    description: 'Five integrated business units: Engineering, System Integration, Manufacturing, Maintenance and Project Management—from concept to commissioning and lifecycle support.',
  },
  '/capabilities/engineering': {
    title: 'Engineering Capability | Hybrid Control Corporation',
    description: 'Electrical, automation and control engineering for complex operational environments—design, architecture and instrumentation.',
  },
  '/capabilities/system-integration': {
    title: 'System Integration | Hybrid Control Corporation',
    description: 'PLC, DCS & SCADA, edge-to-cloud integration and industrial data. Rockwell FactoryTalk DataMosaix evaluated and integrated as part of a complete solution.',
  },
  '/capabilities/maintenance': {
    title: 'Maintenance & Lifecycle Support | Hybrid Control Corporation',
    description: 'Operations support, system upgrades and fault response to keep critical infrastructure available and maintainable.',
  },
  '/capabilities/manufacturing': {
    title: 'Panel Manufacturing | Hybrid Control Corporation',
    description: 'Purpose-built electrical and control assemblies, factory tested and site-ready for dependable field operation.',
  },
  '/capabilities/project-management': {
    title: 'Project Management | Hybrid Control Corporation',
    description: 'One accountable interface coordinating procurement, contract administration, installation and commissioning through close-out.',
  },
  '/industries': {
    title: 'Industries | Hybrid Control Corporation',
    description: 'Experience across Water & Wastewater, Power Generation, Renewable Energy, Chemical, Energy, Oil & Gas, Mining, Manufacturing and FMCG & Packaging — critical infrastructure that cannot stand still.',
  },
  '/experience': {
    title: 'Engineering in Motion | Projects & Capability | Hybrid Control',
    description: 'Explore flagship Midmar, Nsezi and Cygnus architectures and verified project record—from field equipment to operational intelligence.',
  },
  '/projects': {
    title: 'Engineering in Motion | Projects & Capability | Hybrid Control',
    description: 'Explore flagship Midmar, Nsezi and Cygnus architectures and verified project record—from field equipment to operational intelligence.',
    canonical: 'https://www.hybridcontrol.co.za/experience',
  },
  '/products': {
    title: 'Products & Technology | Hybrid Control Corporation',
    description: 'Field-ready data loggers, industrial wireless, modems, radio telemetry and gateways—engineered into complete monitoring and control systems.',
  },
  '/insights': {
    title: 'Insights | Hybrid Control Corporation',
    description: 'Intelligence from the operational edge. Practical perspectives on telemetry, automation and industrial data—future insights platform.',
  },
  '/contact': {
    title: 'Contact | Hybrid Control Corporation',
    description: 'Talk to our engineers about automation, telemetry or electrical infrastructure requirements. Richards Bay, Durban and Benoni offices.',
  },
}

import { projects } from './site'

export function resolveSeo(pathname: string): SeoProps {
  if (seoConfig[pathname]) return seoConfig[pathname]
  if (pathname.startsWith('/capabilities/')) return seoConfig['/capabilities']
  if (pathname.startsWith('/experience/')) {
    const slug = pathname.split('/')[2]
    const project = projects.find(p => p.slug === slug)
    if (project) {
      return {
        title: `${project.title} | Hybrid Control Corporation`,
        description: `${project.copy} Client: ${project.client}, ${project.location}.`,
      }
    }
    // fallback for /experience subpaths that are not projects (e.g. hash)
    return seoConfig['/experience'] ?? seoConfig['/']
  }
  return seoConfig['/']
}
