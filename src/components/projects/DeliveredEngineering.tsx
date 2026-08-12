import { useState } from 'react'
import { motion } from 'motion/react'
import { deliveredEngineering } from '../../data/site'

function LedgerVisual({ item }: { item: (typeof deliveredEngineering)[number] }) {
  const labels = item.motif.split('→').map(label => label.trim())
  return <div className={`ledger-visual visual-${item.visualisation}`} key={item.id} aria-label={`${item.title}: ${item.motif}`} role="img">
    <div className="ledger-screen-head"><span>HCC / ENG-{item.id}</span><span>SEQUENCE ACTIVE</span></div>
    <div className="ledger-system">
      {labels.map((label, index) => <div className="ledger-node" key={label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong>{index < labels.length - 1 && <i aria-hidden="true"/>}</div>)}
    </div>
    <div className="ledger-wave"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="ledger-readout"><span>INPUT 24.6</span><span>LINK OK</span><span>OUTPUT 98.2</span></div>
  </div>
}

export default function DeliveredEngineering() {
  const [active, setActive] = useState(0)
  return <div className="delivered-layout">
    <div className="delivered-ledger">{deliveredEngineering.map((item, index) => <motion.article id={`delivered-${item.id}`} key={item.id} className={active === index ? 'is-active' : ''} onViewportEnter={() => setActive(index)} viewport={{ amount: .65 }} onMouseEnter={() => setActive(index)}>
      <button onClick={() => setActive(index)} aria-label={`Show ${item.title} visualisation`}><span>{item.id}</span><div><small>ENGINEERING WORKSTREAM</small><h3>{item.title}</h3><p>{item.copy}</p><code>{item.motif}</code></div></button>
      <div className="ledger-mobile-visual"><LedgerVisual item={item}/></div>
    </motion.article>)}</div>
    <aside className="delivered-sticky"><LedgerVisual item={deliveredEngineering[active]}/></aside>
  </div>
}
