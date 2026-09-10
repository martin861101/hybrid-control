/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function seoPrerenderPlugin(): any {
  return {
    name: 'seo-prerender',
    configurePreviewServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        if (!req.url) return next()
        const url = req.url.split('?')[0].split('#')[0]
        // normalize: /company → /company.html, /experience/foo → /experience/foo.html if flat file exists
        const dist = path.resolve('dist')
        const clean = url.endsWith('/') ? url.slice(0, -1) : url
        if (clean && clean !== '/') {
          const flat = path.join(dist, `${clean}.html`)
          const index = path.join(dist, clean.replace(/^\//, ''), 'index.html')
          if (fs.existsSync(flat) || fs.existsSync(index)) {
            // let sirv handle it by rewriting to .html or keeping as is for index fallback
            // If flat exists and url has no extension, rewrite to flat .html so sirv finds it
            if (fs.existsSync(flat) && !url.includes('.')) {
              req.url = `${clean}.html`
            }
          }
        }
        next()
      })
    },
    closeBundle() {
      const dist = path.resolve('dist')
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const html = fs.readFileSync(indexPath, 'utf8')
      const siteBase = 'https://www.hybridcontrol.co.za'
      const defaultImage = 'https://www.hybridcontrol.co.za/industrial-hero.png'
      const orgJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Hybrid Control Corporation',
        url: siteBase,
        logo: `${siteBase}/logo-transparent.png`,
        email: 'info@hybridcontrol.co.za',
        telephone: '+27 35 789 1699',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Unit 2, 73 Dollar Drive',
          addressLocality: 'Richards Bay',
          addressRegion: 'KwaZulu-Natal',
          addressCountry: 'ZA',
        },
        sameAs: [],
      })

      const projects = [
        { slug: 'water-loss-management', title: 'Water loss management system', client: 'City of uMhlathuze', location: 'Richards Bay, KwaZulu-Natal', type: 'Water Infrastructure', copy: 'Pressure regulation and flow monitoring brought effective leakage management and intelligence to the water distribution network.', challenge: 'Give operations teams greater visibility of pressure, flow and leakage conditions across the distribution network.', delivery: ['PRV integration', 'Flow monitoring', 'Network intelligence'] },
        { slug: 'ethekwini-telemetry-upgrade', title: 'Telemetry & SCADA upgrade', client: 'eThekwini Water and Sanitation', location: 'Durban, KwaZulu-Natal', type: 'Telemetry', copy: 'A telemetry upgrade across 146 wastewater pump stations using DNP3 interoperability between outstations and SCADA.', challenge: 'Modernise a large distributed wastewater telemetry estate while maintaining direct system interoperability.', delivery: ['146 pump stations', 'DNP3 protocol', 'ELPRO RTU + ClearSCADA'] },
        { slug: 'nsezi-process-automation', title: 'Nsezi Water Treatment Works automation', client: 'Mhlathuze Water', location: 'KwaZulu-Natal', type: 'Process Automation', copy: 'Detailed design, manufacture, integration and commissioning to automate critical treatment processes and pump stations.', challenge: 'Bring critical treatment processes, MCCs and remote pump stations into a centralized operational environment.', delivery: ['Electrical & MCC works', 'PLC + SCADA', 'Fibre network integration'] },
        { slug: 'erwat-network-control', title: 'Water & wastewater network control', client: 'ERWAT', location: 'Kempton Park, Gauteng', type: 'Remote Operations', copy: 'An upgraded monitoring and control environment for remote pump stations using Adroit SCADA and ELPRO RTUs.', challenge: 'Address system obsolescence and the inability to monitor and control distributed pump stations remotely.', delivery: ['Adroit SCADA', 'ELPRO RTUs', 'Operations support'] },
        { slug: 'joe-gqabi-telemetry', title: 'District telemetry & SCADA system', client: 'Joe Gqabi District Municipality', location: 'Eastern Cape', type: 'Municipal Infrastructure', copy: 'Design and implementation of telemetry and SCADA systems for remote monitoring and control of water distribution assets.', challenge: 'Connect geographically dispersed assets, including sites in mountainous terrain, to central operations.', delivery: ['Telemetry design', 'SCADA integration', 'Lifecycle support'] },
        { slug: 'energy-management', title: 'Energy management system', client: 'Royal Swazi Sugar Corporation', location: 'Eswatini', type: 'Energy Intelligence', copy: 'Power monitors and a web-enabled EnergyMetrix platform made energy information accessible for analysis, reporting and production-cost management.', challenge: 'Capture, store and share reliable energy data with operational and management stakeholders through a standard browser.', delivery: ['Power monitoring', 'Web reporting', 'Energy analytics'] },
      ]

      const seoEntries: Record<string, { title: string; description: string; canonical?: string }> = {
        '/company': { title: 'Company | Hybrid Control Corporation', description: 'Hybrid Control Corporation since 2008: electrical, automation and telemetry engineering with system-integration lifecycle from design to operations and maintenance.' },
        '/capabilities': { title: 'Capabilities | Hybrid Control Corporation', description: 'Five integrated business units: Engineering, System Integration, Manufacturing, Maintenance and Project Management—from concept to commissioning and lifecycle support.' },
        '/capabilities/engineering': { title: 'Engineering Capability | Hybrid Control Corporation', description: 'Electrical, automation and control engineering for complex operational environments—design, architecture and instrumentation.' },
        '/capabilities/system-integration': { title: 'System Integration | Hybrid Control Corporation', description: 'PLC, DCS & SCADA, edge-to-cloud integration and industrial data. Rockwell FactoryTalk DataMosaix evaluated and integrated as part of a complete solution.' },
        '/capabilities/maintenance': { title: 'Maintenance & Lifecycle Support | Hybrid Control Corporation', description: 'Operations support, system upgrades and fault response to keep critical infrastructure available and maintainable.' },
        '/capabilities/manufacturing': { title: 'Panel Manufacturing | Hybrid Control Corporation', description: 'Purpose-built electrical and control assemblies, factory tested and site-ready for dependable field operation.' },
        '/capabilities/project-management': { title: 'Project Management | Hybrid Control Corporation', description: 'One accountable interface coordinating procurement, contract administration, installation and commissioning through close-out.' },
        '/industries': { title: 'Industries | Hybrid Control Corporation', description: 'Experience across Water & Wastewater, Power Generation, Renewable Energy, Chemical, Energy, Oil & Gas, Mining, Manufacturing and FMCG & Packaging — critical infrastructure that cannot stand still.' },
        '/experience': { title: 'Engineering in Motion | Projects & Capability | Hybrid Control', description: 'Explore flagship Midmar, Nsezi and Cygnus architectures and verified project record—from field equipment to operational intelligence.' },
        '/projects': { title: 'Engineering in Motion | Projects & Capability | Hybrid Control', description: 'Explore flagship Midmar, Nsezi and Cygnus architectures and verified project record—from field equipment to operational intelligence.', canonical: `${siteBase}/experience` },
        '/products': { title: 'Products & Technology | Hybrid Control Corporation', description: 'Field-ready data loggers, industrial wireless, modems, radio telemetry and gateways—engineered into complete monitoring and control systems.' },
        '/insights': { title: 'Insights | Hybrid Control Corporation', description: 'Intelligence from the operational edge. Practical perspectives on telemetry, automation and industrial data—future insights platform.' },
        '/contact': { title: 'Contact | Hybrid Control Corporation', description: 'Talk to our engineers about automation, telemetry or electrical infrastructure requirements. Richards Bay, Durban and Benoni offices.' },
      }

      projects.forEach(p => {
        const key = `/experience/${p.slug}`
        seoEntries[key] = {
          title: `${p.title} | Hybrid Control Corporation`,
          description: `${p.copy} Client: ${p.client}, ${p.location}.`,
        }
      })

      const crawlable: Record<string, string> = {
        '/': `<main><h1>Engineering intelligence into critical infrastructure</h1><p>Hybrid Control Corporation integrates electrical, automation, telemetry and industrial data systems from field control to operational intelligence.</p><section><h2>Five units. One system.</h2><p>Engineering, System Integration, Manufacturing, Maintenance and Project Management.</p></section><section><h2>Industry experience</h2><p>Water &amp; Wastewater, Power Generation, Renewable Energy, Chemical, Energy, Oil &amp; Gas, Mining, Manufacturing, FMCG &amp; Packaging</p></section></main>`,
        '/company': `<main><h1>Engineering with purpose. Technology with consequence.</h1><p>Hybrid Control Corporation since 2008 delivers electrical, automation and telemetry projects across Southern Africa.</p><section><h2>System integrator positioning</h2><p>Complete lifecycle from Discover and Engineer through Integrate, Deploy and Support.</p></section><section><h2>Certified systems</h2><p>ISO 9001, ISO 45001, ISO 14001. Accreditations: SACPCMP, Saiosh, SAIMC. Technology ecosystem: Rockwell Automation, ELPRO, Adroit Technologies.</p></section></main>`,
        '/capabilities': `<main><h1>Integrated engineering, from concept to operation</h1><p>Five connected business units: Engineering, System Integration, Manufacturing, Maintenance and Project Management.</p><section><h2>Engineering</h2><p>Electrical, automation and control engineering</p></section><section><h2>System Integration</h2><p>PLC, DCS, SCADA and industrial data integration</p></section></main>`,
        '/capabilities/engineering': `<main><h1>Engineering</h1><p>Electrical, automation and control engineering designed for complex operational environments.</p><h2>What we provide</h2><p>Electrical design, control architecture, instrumentation, panel and system design</p></main>`,
        '/capabilities/system-integration': `<main><h1>System Integration</h1><p>Connecting field assets, control systems and operational data from edge to enterprise intelligence. Includes Rockwell Automation FactoryTalk DataMosaix where appropriate.</p></main>`,
        '/capabilities/maintenance': `<main><h1>Maintenance</h1><p>Lifecycle support that keeps critical systems available, maintainable and ready for operations.</p></main>`,
        '/capabilities/manufacturing': `<main><h1>Manufacturing</h1><p>Purpose-built electrical and control assemblies engineered for the realities of the field.</p></main>`,
        '/capabilities/project-management': `<main><h1>Project Management</h1><p>One accountable interface coordinating procurement, contract administration and commissioning.</p></main>`,
        '/industries': `<main><h1>Experience across critical industries</h1><p>Water &amp; Wastewater, Power Generation, Renewable Energy, Chemical, Energy, Oil &amp; Gas, Mining, Manufacturing, FMCG &amp; Packaging. Each environment linked to telemetry, instrumentation, PLC, SCADA and electrical control capabilities.</p></main>`,
        '/experience': `<main><h1>Engineering in Motion</h1><p>Automation behind critical infrastructure. Flagships: Midmar Water Treatment Works (Umgeni Water), Nsezi Water Treatment Works (Mhlathuze Water), Cygnus 132/11kV Substation (City of uMhlathuze).</p><section><h2>Evidence in operation</h2><p>Six verified projects including Water loss management, Telemetry &amp; SCADA upgrade (146 sites), Nsezi automation, ERWAT, Joe Gqabi and Energy management.</p></section></main>`,
        '/projects': `<main><h1>Engineering in Motion</h1><p>Automation behind critical infrastructure. Flagships: Midmar, Nsezi, Cygnus. Six verified projects available.</p></main>`,
        '/products': `<main><h1>Connected products for remote infrastructure</h1><p>Data Loggers, Industrial Wireless, Modems, Radio Telemetry, Wireless Gateways — field-proven devices integrated into complete systems. Technology ecosystem: Rockwell Automation, ELPRO, Adroit Technologies.</p></main>`,
        '/insights': `<main><h1>Intelligence from the operational edge</h1><p>Project perspectives, technical notes on telemetry, SCADA and industrial data as published. Practical perspectives for plant and network operations.</p></main>`,
        '/contact': `<main><h1>Bring us your engineering challenge</h1><p>Contact Hybrid Control Corporation: Unit 2, 73 Dollar Drive, Richards Bay, KwaZulu-Natal; Suite 2, 1 Forest Road, Pinetown; 175 Elston Avenue, Benoni; +27 35 789 1699; info@hybridcontrol.co.za</p></main>`,
      }
      projects.forEach(p => {
        const key = `/experience/${p.slug}`
        crawlable[key] = `<main><h1>${p.title}</h1><p>${p.copy}</p><section><h2>${p.type} — ${p.client}</h2><p>${p.location}. Challenge: ${p.challenge}</p><h3>Delivered capability</h3><p>${p.delivery.join(', ')}</p></section></main>`
      })

      const applySeo = (raw: string, route: string, title: string, description: string, canonicalOverride?: string) => {
        const canonical = canonicalOverride || `${siteBase}${route === '/' ? '/' : route}`
        let out = raw
        out = out.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        out = out.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`)
        out = out.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`)
        out = out.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`)
        out = out.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
        out = out.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${defaultImage}" />`)
        out = out.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
        const body = crawlable[route] || `<main><h1>${title}</h1><p>${description}</p></main>`
        // inject crawlable content inside #root for non-JS crawlers
        out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        if (route === '/') {
          out = out.replace('</title>', `</title>\n    <script type="application/ld+json" id="org-jsonld">${orgJsonLd}</script>`)
        }
        return out
      }

      const homepageSeo = { title: 'Hybrid Control Corporation | Engineering · Automation · Operational Intelligence', description: 'Hybrid Control Corporation integrates electrical, automation, telemetry and industrial data systems—from field control to analytics and operational intelligence.' }
      const homeHtml = applySeo(html, '/', homepageSeo.title, homepageSeo.description)
      fs.writeFileSync(indexPath, homeHtml)

      Object.entries(seoEntries).forEach(([route, seo]) => {
        const routeHtml = applySeo(html, route, seo.title, seo.description, seo.canonical)
        const dir = path.join(dist, route.replace(/^\//, ''))
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), routeHtml)
        // also write flat .html for vite preview without trailing slash (/company → dist/company.html)
        const flatPath = `${dist}${route}.html`
        fs.writeFileSync(flatPath, routeHtml)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPrerenderPlugin()],
  server: {
    allowedHosts: ['hc.hygridtech.co.za'],
  },
  build: {
    chunkSizeWarningLimit: 850,
  }
})
