export const capabilities = [
  {
    id: '01',
    slug: 'engineering',
    title: 'Engineering',
    short: 'Electrical, automation and control engineering designed for complex operational environments.',
    points: ['Electrical design', 'Control architecture', 'Instrumentation'],
  },
  {
    id: '02',
    slug: 'system-integration',
    title: 'System Integration',
    short: 'Connecting field assets, control systems and operational data from the edge to enterprise intelligence.',
    points: ['PLC, DCS & SCADA', 'Edge-to-cloud integration', 'Industrial data & analytics'],
  },
  {
    id: '03',
    slug: 'maintenance',
    title: 'Maintenance',
    short: 'Lifecycle support that keeps critical systems available, maintainable and ready for operations.',
    points: ['Operations support', 'System upgrades', 'Fault response'],
  },
  {
    id: '04',
    slug: 'manufacturing',
    title: 'Manufacturing',
    short: 'Purpose-built electrical and control assemblies engineered for the realities of the field.',
    points: ['Control panels', 'Factory testing', 'Site-ready systems'],
  },
  {
    id: '05',
    slug: 'project-management',
    title: 'Project Management',
    short: 'One accountable interface coordinating the complete project cycle from initiation to close-out.',
    points: ['Procurement', 'Contract administration', 'Commissioning'],
  },
]

export const industries = [
  { name: 'Water & Wastewater', code: 'H₂O', copy: 'Monitoring, control and automation across treatment and distribution networks.' },
  { name: 'Energy', code: 'MW', copy: 'Connected systems that make energy performance visible and actionable.' },
  { name: 'Oil & Gas', code: 'O&G', copy: 'Engineering support across design, build, operate and maintain phases.' },
  { name: 'Mining', code: 'MIN', copy: 'Automation and process insight for demanding mining and metals environments.' },
  { name: 'Manufacturing', code: 'MFG', copy: 'Integrated control from design through commissioning and maintenance.' },
  { name: 'FMCG & Packaging', code: 'PKG', copy: 'Reliable production control for fast-moving industrial operations.' },
]

export const projects = [
  {
    id: '01',
    slug: 'water-loss-management',
    title: 'Water loss management system',
    client: 'City of uMhlathuze',
    location: 'Richards Bay, KwaZulu-Natal',
    type: 'Water Infrastructure',
    copy: 'Pressure regulation and flow monitoring brought effective leakage management and intelligence to the water distribution network.',
    challenge: 'Give operations teams greater visibility of pressure, flow and leakage conditions across the distribution network.',
    delivery: ['PRV integration', 'Flow monitoring', 'Network intelligence'],
    signal: 'Pressure + flow',
    accent: 'cyan',
  },
  {
    id: '02',
    slug: 'ethekwini-telemetry-upgrade',
    title: 'Telemetry & SCADA upgrade',
    client: 'eThekwini Water and Sanitation',
    location: 'Durban, KwaZulu-Natal',
    type: 'Telemetry',
    copy: 'A telemetry upgrade across 146 wastewater pump stations using DNP3 interoperability between outstations and SCADA.',
    challenge: 'Modernise a large distributed wastewater telemetry estate while maintaining direct system interoperability.',
    delivery: ['146 pump stations', 'DNP3 protocol', 'ELPRO RTU + ClearSCADA'],
    signal: '146 remote sites',
    accent: 'blue',
  },
  {
    id: '03',
    slug: 'nsezi-process-automation',
    title: 'Nsezi Water Treatment Works automation',
    client: 'Mhlathuze Water',
    location: 'KwaZulu-Natal',
    type: 'Process Automation',
    copy: 'Detailed design, manufacture, integration and commissioning to automate critical treatment processes and pump stations.',
    challenge: 'Bring critical treatment processes, MCCs and remote pump stations into a centralized operational environment.',
    delivery: ['Electrical & MCC works', 'PLC + SCADA', 'Fibre network integration'],
    signal: 'Plant-wide control',
    accent: 'steel',
  },
  {
    id: '04',
    slug: 'erwat-network-control',
    title: 'Water & wastewater network control',
    client: 'ERWAT',
    location: 'Kempton Park, Gauteng',
    type: 'Remote Operations',
    copy: 'An upgraded monitoring and control environment for remote pump stations using Adroit SCADA and ELPRO RTUs.',
    challenge: 'Address system obsolescence and the inability to monitor and control distributed pump stations remotely.',
    delivery: ['Adroit SCADA', 'ELPRO RTUs', 'Operations support'],
    signal: 'Remote control',
    accent: 'cyan',
  },
  {
    id: '05',
    slug: 'joe-gqabi-telemetry',
    title: 'District telemetry & SCADA system',
    client: 'Joe Gqabi District Municipality',
    location: 'Eastern Cape',
    type: 'Municipal Infrastructure',
    copy: 'Design and implementation of telemetry and SCADA systems for remote monitoring and control of water distribution assets.',
    challenge: 'Connect geographically dispersed assets, including sites in mountainous terrain, to central operations.',
    delivery: ['Telemetry design', 'SCADA integration', 'Lifecycle support'],
    signal: 'Distributed assets',
    accent: 'blue',
  },
  {
    id: '06',
    slug: 'energy-management',
    title: 'Energy management system',
    client: 'Royal Swazi Sugar Corporation',
    location: 'Eswatini',
    type: 'Energy Intelligence',
    copy: 'Power monitors and a web-enabled EnergyMetrix platform made energy information accessible for analysis, reporting and production-cost management.',
    challenge: 'Capture, store and share reliable energy data with operational and management stakeholders through a standard browser.',
    delivery: ['Power monitoring', 'Web reporting', 'Energy analytics'],
    signal: 'Energy visibility',
    accent: 'steel',
  },
]

export const projectCapabilities = [
  { name: 'Operational reporting', proof: 'Dashboards, alarms, trends and control-room visibility layered across SCADA and telemetry environments.', projects: ['01', '02', '04', '06'] },
  { name: 'Water operations analytics', proof: 'Flow, pressure, level, pump status and treatment-process signals made visible for faster operational response.', projects: ['01', '03', '04', '05'] },
  { name: 'Radio & remote telemetry', proof: 'Distributed infrastructure connected through RTUs, industrial communications and interoperable protocols.', projects: ['02', '04', '05'] },
  { name: 'Process automation', proof: 'Electrical, instrumentation, PLC and SCADA systems integrated around the complete operating process.', projects: ['03', '04'] },
  { name: 'Energy intelligence', proof: 'Power data captured, contextualized and reported for consumption, quality and production-cost decisions.', projects: ['06'] },
]

export const engineeringFlagships = [
  {
    id: '01',
    slug: 'midmar',
    title: 'Midmar',
    subtitle: 'Water Treatment Works',
    client: 'Umgeni Water',
    category: 'Process Automation',
    headline: 'A treatment process brought under intelligent control.',
    description: 'Field actuators, industrial communication, PLC control and SCADA supervision brought together as one operating architecture.',
    systems: ['ACTUATORS', 'AS-i NETWORK', 'PLC', 'SCADA', 'OPERATIONS'],
    capabilities: ['AS-i network', 'Actuator upgrade', 'PLC engineering', 'SCADA engineering'],
    visualisation: 'process' as const,
  },
  {
    id: '02',
    slug: 'nsezi',
    title: 'Nsezi',
    subtitle: 'Complete Plant Automation',
    client: 'Mhlathuze Water',
    category: 'Process Automation',
    headline: 'From field instrumentation to the control room.',
    description: 'A complete treatment-works control environment spanning process equipment, electrical systems, industrial networks and centralised supervision.',
    systems: ['FIELD', 'AS-i', 'PLC', 'FIBRE', 'SCADA', 'CONTROL ROOM'],
    capabilities: ['Filtration', 'Chemical dosing', 'Pump control', 'Instrumentation', 'MCC integration', 'UPS infrastructure'],
    visualisation: 'plant' as const,
  },
  {
    id: '03',
    slug: 'cygnus',
    title: 'Cygnus',
    subtitle: '132/11kV Substation',
    client: 'City of uMhlathuze',
    category: 'Substation Automation',
    headline: 'Automating critical power infrastructure.',
    description: 'Electrical infrastructure and its automation layer expressed as one system—from incoming supply and transformation to protection, local SCADA and control.',
    systems: ['132kV', 'TRANSFORMER', '11kV BUS', 'FEEDERS', 'PROTECTION', 'CONTROL'],
    capabilities: ['Electrical integration', 'Protection interface', 'Local SCADA', 'Control-centre visibility'],
    visualisation: 'power' as const,
  },
]

export const engineeringDomains = [
  { id: 'process', name: 'Process', code: 'P01', summary: 'Measurement and closed-loop control across water and industrial processes.', items: ['Chemical dosing', 'Water quality', 'Flow measurement', 'Instrumentation', 'Process control'], flow: ['ANALYSER', 'PLC', 'DOSING', 'PROCESS'] },
  { id: 'energy', name: 'Energy', code: 'E02', summary: 'Control and integration around generation, synchronisation and electrical infrastructure.', items: ['Generator synchronisation', 'Cogeneration', 'Protection', 'Electrical integration'], flow: ['GEN 01 + 02', 'SYNC BUS', 'CONTROL', 'LOAD'] },
  { id: 'digital', name: 'Digital', code: 'D03', summary: 'Operational data shaped into supervision, reporting and decision-ready intelligence.', items: ['Software reporting', 'Operational analytics', 'SCADA', 'Telemetry', 'Data visualisation'], flow: ['FIELD DATA', 'CONTROL DATA', 'ANALYTICS', 'OPERATIONS'] },
  { id: 'infrastructure', name: 'Infrastructure', code: 'I04', summary: 'Reliable communication and integration across remote and distributed assets.', items: ['Radio communication', 'Telemetry', 'Industrial networks', 'Asset separation', 'Remote sites'], flow: ['REMOTE SITE', 'RADIO', 'NETWORK', 'SCADA'] },
]

export const deliveredEngineering = [
  { id: '01', title: 'Software reporting', copy: 'Operational information and software-based reporting layered onto automation and telemetry systems.', motif: 'DATA → REPORTING → DECISION', visualisation: 'data' as const },
  { id: '02', title: 'Water operations analytics', copy: 'Water measurement, monitoring and analytical visibility for operators managing distributed infrastructure.', motif: 'SENSOR → DATA → ANALYTICS → OPERATOR', visualisation: 'analytics' as const },
  { id: '03', title: 'Generator synchronisation & cogeneration', copy: 'Generator control, synchronisation and integration within industrial energy systems.', motif: 'GEN 01 + GEN 02 → SYNCHRONISED BUS → LOAD', visualisation: 'generator' as const },
  { id: '04', title: 'Flow measurement', copy: 'Field installation, commissioning and calibration of industrial flow measurement.', motif: 'FLOW → FLOWMETER → MEASUREMENT', visualisation: 'flow' as const },
  { id: '05', title: 'Asset separation', copy: 'Separation of previously interconnected industrial systems into independently controlled assets.', motif: 'SHARED INFRASTRUCTURE → SYSTEM A + SYSTEM B', visualisation: 'separation' as const },
  { id: '06', title: 'Chemical dosing systems', copy: 'Measurement-led control of dosing equipment as part of a complete treatment process.', motif: 'MEASUREMENT → CONTROL → DOSING → PROCESS', visualisation: 'dosing' as const },
  { id: '07', title: 'Radio communication & telemetry', copy: 'Data transported between geographically separated assets and central operational systems.', motif: 'REMOTE ASSET → RADIO → TELEMETRY → SCADA', visualisation: 'telemetry' as const },
]

export const products = [
  ['Data Loggers', 'Remote monitoring for flow, pressure, level and environmental applications.'],
  ['Industrial Wireless', 'Secure, long-range connectivity for harsh and hard-to-reach environments.'],
  ['Modems', 'Industrial cellular and radio communications for distributed assets.'],
  ['Radio Telemetry', 'Field-proven communications connecting remote infrastructure to operations.'],
  ['Wireless Gateways', 'Flexible I/O and protocol integration between field devices, PLCs and SCADA.'],
]

export const digitalSolutions = [
  {
    title: 'Remote monitoring',
    copy: 'Connect industrial assets from edge to cloud, structure asset hierarchies and monitor KPIs, alerts and workflows remotely.',
    outcome: 'Visibility at scale',
  },
  {
    title: 'Asset analytics',
    copy: 'Use contextualized operational data, digital models and anomaly detection to understand asset efficiency and maintenance risk.',
    outcome: 'Higher availability',
  },
  {
    title: 'Energy intelligence',
    copy: 'Monitor consumption across sites and assets, identify energy losses and compare performance against historical operating profiles.',
    outcome: 'Reduced energy loss',
  },
  {
    title: 'Production optimization',
    copy: 'Turn process data into operator-facing insight for yield, quality and critical parameter optimization.',
    outcome: 'Better production decisions',
  },
  {
    title: 'Sustainability analytics',
    copy: 'Bring emissions, energy and production data together for environmental monitoring and sustainability reporting workflows.',
    outcome: 'Connected reporting',
  },
]

export const partners = ['Rockwell Automation', 'ELPRO Technologies', 'Adroit Technologies', 'Allen-Bradley', 'Honeywell', 'MOXA']

export const process = [
  ['Discover', 'Understand the operational requirement.'],
  ['Engineer', 'Design the electrical, automation and telemetry architecture.'],
  ['Integrate', 'Connect hardware, software and communication systems.'],
  ['Deploy', 'Commission the solution in the operational environment.'],
  ['Support', 'Maintain and optimise the system.'],
]
