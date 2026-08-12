import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead"><Logo /><p>Engineering systems for a connected industrial world.</p></div>
      <div className="footer-grid">
        <div><span>Capabilities</span><Link to="/capabilities/engineering">Engineering</Link><Link to="/capabilities/system-integration">System Integration</Link><Link to="/capabilities/system-integration#digital-intelligence">Data & analytics</Link><Link to="/capabilities/maintenance">Lifecycle support</Link></div>
        <div><span>Company</span><Link to="/company">Who we are</Link><Link to="/company/clients-partners">Clients & partners</Link><Link to="/company/careers">Careers</Link><Link to="/insights">News</Link></div>
        <div><span>Experience</span><Link to="/experience">Core projects</Link><Link to="/experience#water-loss-management">Water infrastructure</Link><Link to="/experience#ethekwini-telemetry-upgrade">Telemetry at scale</Link><Link to="/experience#energy-management">Energy intelligence</Link></div>
        <div className="footer-contact"><span>Richards Bay</span><p>Unit 2, 73 Dollar Drive<br />Richards Bay, KZN</p><a href="tel:+27357891699">+27 35 789 1699</a><a href="mailto:info@hybridcontrol.co.za">info@hybridcontrol.co.za <ArrowUpRight size={14} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Hybrid Control Corporation</span><span>South Africa · Engineering at scale</span></div>
    </footer>
  )
}
