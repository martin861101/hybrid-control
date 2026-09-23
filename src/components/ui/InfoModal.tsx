import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowRight } from 'lucide-react'

type ModalContent = 'faq' | 'partnership' | 'careers' | 'clients' | 'about' | null

export default function InfoModal() {
  const [content, setContent] = useState<ModalContent>(null)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const event = e as CustomEvent<{ type: ModalContent }>
      if (event.detail?.type) {
        setContent(event.detail.type)
      }
    }
    window.addEventListener('open-info-modal', handleOpen)
    return () => window.removeEventListener('open-info-modal', handleOpen)
  }, [])

  const close = () => setContent(null)

  return (
    <AnimatePresence>
      {content && (
        <div className="info-modal-backdrop" onClick={close}>
          <motion.div
            className="info-modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="info-modal-close" onClick={close} aria-label="Close modal">
              <X size={24} />
            </button>
            <div className="info-modal-content">
              {content === 'faq' && <FaqContent />}
              {content === 'partnership' && <PartnershipContent />}
              {content === 'careers' && <CareersContent />}
              {content === 'clients' && <ClientsContent />}
              {content === 'about' && <AboutContent />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function FaqContent() {
  return (
    <div className="modal-section">
      <div className="eyebrow"><i />FAQ</div>
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h4>Which OEM's are you certified with?</h4>
          <p>Hybrid Control Corporation (HCC) is certified with various Original Equipment Manufacturers for automation and electrical solutions including ELPRO Technologies, ADROIT Technologies, Rockwell Automation and others.</p>
        </div>
        <div className="faq-item">
          <h4>Who are your main clients?</h4>
          <p>Our main clients include various water and wastewater utilities such as Umgeni Water, Umhlathuze Water, Ekurhuleni Water Care Company, eThekwini Water and Sanitation as well as companies in other industries such as TRONOX, Rockwell Automation, Chevron, SOHAR Aluminium and others.</p>
        </div>
        <div className="faq-item">
          <h4>How do you give back to the communities?</h4>
          <p>We help young people from rural and disadvantaged backgrounds with the necessary requirements they need to complete their education as well as providing training to graduates in electrical and automation fields. We also work with our clients to target and develop emerging companies through sub-contracting and work exposure within the communities that we work at.</p>
        </div>
        <div className="faq-item">
          <h4>What is your view on the Fourth Industrial Revolution and the water industry?</h4>
          <p>Hybrid Control Corporation is highly focused on technology and innovation. Our view on the Fourth Industrial Revolution is that it will disrupt the water industry from the treatment process to the end customer. This will be achieved through the collection of data, processing the data and using the results to make predictions to assist management and operations team. This ranges from predicting leaks along the water distribution network, moving towards predictive maintenance to improve assets availability and others.</p>
        </div>
      </div>
    </div>
  )
}

function PartnershipContent() {
  return (
    <div className="modal-section">
      <div className="eyebrow"><i />Partnership Request</div>
      <h2>Partner with us</h2>
      <p className="lead">We believe that having partners who share the same vision with us can positively contribute to achieving our long term vision and providing better services and solutions to our customers and industries.</p>
      <p>We currently have access to various local and international industry leaders within our area of specialization in a form of being certified System Integrators, Distributors, Resellers and Solution Experts.</p>
      <p>We value partnerships and are always looking for new ways to expand our business while growing other businesses and meeting our customer's expectations and demands. If you would like to discuss a partnership, please reach out to us at <a href="mailto:info@hybridcontrol.co.za">info@hybridcontrol.co.za</a>.</p>
      
      <button className="button button-dark" onClick={() => { window.dispatchEvent(new Event('open-hybrid-chat')); document.querySelector('.info-modal-close')?.dispatchEvent(new Event('click', {bubbles:true})) }}>Send a message <ArrowRight /></button>
    </div>
  )
}

function CareersContent() {
  return (
    <div className="modal-section">
      <div className="eyebrow"><i />Recruitment</div>
      <h2>Join our team</h2>
      <p className="lead">Hybrid Control Corporation intends to be the system integrator of choice for electrical, process control, telemetry, and automation systems by providing best and accurate engineering services.</p>
      <p>We believe that the people that we employ play a significant role in achieving this vision. It is for this reason that we focus on nurturing our team and provide an environment which is conducive for creative thinking and personal development.</p>
      <div className="vacancies">
        <h4>Current Vacancies</h4>
        <div className="vacancy-card">
          <p><strong>No vacancies</strong></p>
          <span>Check back later for open positions.</span>
        </div>
      </div>
      <p style={{marginTop: '20px'}}>If you believe that you have what it takes to contribute to our vision and keeping our clients satisfied, feel free to send your CV to <a href="mailto:careers@hybridcontrol.co.za">careers@hybridcontrol.co.za</a>.</p>
    </div>
  )
}

function ClientsContent() {
  const clients = [
    { name: 'City of uMhlathuze', img: '/clients/cou.png', desc: 'The City of uMhlathuze comprises of the central business districts of Richards Bay, eMpangeni, Heatonville and Buchanana in Ntambanana.' },
    { name: 'Sohar Aluminium', img: '/clients/sohar.png', desc: 'Sohar Aluminium Company is the first Aluminium smelter in the Sultanate of Oman. Established in 2004.' },
    { name: 'Royal Swazi Sugar Corporation', img: '/clients/rss.png', desc: 'Located in the north-eastern Lowveld is one of the largest companies in Eswatini.' },
    { name: 'ERWAT', img: '/clients/erwat.png', desc: 'Provides bulk wastewater conveyance and treatment to thousands of industries and more than 3,5 million people.' },
    { name: 'TRONOX', img: '/clients/tronox.png', desc: 'An American worldwide chemical company involved in the titanium products industry with approximately 7,000 employees.' },
    { name: 'Joe Gqabi District Municipality', img: '/clients/joe_gqabi.png', desc: 'A Category C municipality located within the Eastern Cape. It borders the Free State Province and country of Lesotho to the north.' },
    { name: 'eThekwini Water and Sanitation', img: '/clients/ethekwini.jpg', desc: 'A unit of the eThekwini municipality and is responsible for the provision of water and sanitation services to all customers in the municipality.' },
    { name: 'Umgeni Water', img: '/clients/umgeni.png', desc: 'A state-owned entity, is one of Africa’s most successful organizations involved in water management and is the largest supplier of bulk potable water in the Province of KwaZulu-Natal.' },
    { name: 'Rockwell Automation', img: '/clients/rockwell.png', desc: 'An American provider of industrial automation and information technology. Brands include Allen-Bradley and FactoryTalk software.' },
    { name: 'Mhlathuze Water', img: '/clients/mhlathuze.png', desc: 'Based in KwaZulu- Natal, Mhlathuze Water\'s area of supply covers some 37 000km2.' },
  ]
  return (
    <div className="modal-section clients-section">
      <div className="eyebrow"><i />Clients & Partners</div>
      <h2>Our clients and partners</h2>
      <div className="clients-grid">
        {clients.map(c => (
          <div key={c.name} className="client-card">
            <div className="client-img-wrap">
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="client-img-overlay"></div>
            </div>
            <div className="client-info">
              <h4>{c.name}</h4>
              <p>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutContent() {
  return (
    <div className="modal-section">
      <div className="eyebrow"><i />About Us</div>
      <h2>Hybrid Control Corporation</h2>
      <p className="lead">Established in 2008 focusing on design, integration and project management for electrical, telemetry, process control and automation systems.</p>
      <p>The company was established as part of the Rockwell Automation Social Economic Development program of which Enterprise Development is part thereof. Rockwell Automation is a New York Stock Exchange listed company that is a world leader in the Automation business.</p>
      <p>Hybrid Control Corporation intends to provide accurate and reliable engineering service to our customers. We endeavour to involve the client in providing us with specific requirements or business issues they faced with in order to develop viable business solutions through technology and engineering. In this way we are able to provide more than a product but a solution that will help improve productivity and overall efficiency thus improving plants availability and assets optimisation.</p>
      
      <div className="stats-grid" style={{marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px'}}>
        <div><h3>10+</h3><span>Years Experience</span></div>
        <div><h3>0+</h3><span>Completed projects</span></div>
        <div><h3>0+</h3><span>Industry partners</span></div>
        <div><h3>0+</h3><span>Certified engineers</span></div>
      </div>
    </div>
  )
}
