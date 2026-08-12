import { useState } from 'react'
import { engineeringDomains } from '../../data/site'

export default function CapabilityTopology() {
  const [active, setActive] = useState(engineeringDomains[0].id)
  const domain = engineeringDomains.find(item => item.id === active) ?? engineeringDomains[0]
  return <div className="capability-topology">
    <div className="topology-map" aria-label="Hybrid Control engineering capability domains">
      <div className="topology-core"><small>INTEGRATOR</small><strong>HYBRID<br/>CONTROL</strong><i /></div>
      {engineeringDomains.map((item, index) => <button key={item.id} className={`topology-domain domain-${index + 1} ${active === item.id ? 'is-active' : ''}`} onClick={() => setActive(item.id)} onMouseEnter={() => setActive(item.id)} onFocus={() => setActive(item.id)}><span>{item.code}</span><strong>{item.name}</strong></button>)}
      <svg viewBox="0 0 800 520" aria-hidden="true"><path d="M400 260 L170 120 M400 260 L630 120 M400 260 L170 400 M400 260 L630 400"/><circle cx="400" cy="260" r="170"/></svg>
    </div>
    <div className="topology-detail" key={domain.id}>
      <div><span>{domain.code} / ACTIVE DOMAIN</span><h3>{domain.name}</h3><p>{domain.summary}</p></div>
      <div className="topology-flow">{domain.flow.map((item, index) => <div key={item}><i>{String(index + 1).padStart(2, '0')}</i><strong>{item}</strong>{index < domain.flow.length - 1 && <span>→</span>}</div>)}</div>
      <ul>{domain.items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  </div>
}

