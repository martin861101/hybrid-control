import re

with open('src/App.css', 'r') as f:
    content = f.read()

# Make sure buttons are perfectly fixed FIRST (they were already in the file but let's append at the very end to be 100% sure)
append_css = """

/* === FORCED FIXES FOR CENTRALIZATION AND BUTTONS === */

/* 1. Global Button Styles */
.button, .nav-cta, .menu-toggle, .mobile-top button, .topology-domain, .delivered-ledger button, .erwat-mute-toggle {
  border-radius: 999px !important;
  border-color: rgba(110, 216, 255, 0.34) !important;
  -webkit-backdrop-filter: blur(12px) saturate(135%) !important;
  backdrop-filter: blur(12px) saturate(135%) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 5px 18px rgba(0, 0, 0, 0.2) !important;
}

@media (prefers-reduced-motion: reduce) {
  .button, .nav-cta, .menu-toggle, .mobile-top button, .topology-domain, .delivered-ledger button, .erwat-mute-toggle {
    transition: none !important;
  }
}

/* 2. Global Section Centralization */
.section-head, .section-title-row, .evidence-heading, .evidence-heading > div, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading, .products-ecosystem, .inner-cta, .capability-digital-head, .capability-digital-head > div, .contact-layout Reveal {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  justify-content: center !important;
}

.section-head > *, .section-title-row > *, .evidence-heading > *, .digital-heading > *, .eim-section-heading > *, .archive-head > *, .finale-heading > *, .certifications-heading > *, .products-ecosystem > *, .inner-cta > *, .capability-digital-head > * {
  width: 100%;
}

.section-head h2, .section-title-row h2, .evidence-heading h2, .digital-heading h2, .eim-section-heading h2, .archive-head h2, .finale-heading h2, .certifications-heading h2, .products-ecosystem h2, .inner-cta h2, .capability-digital-head h2, .contact-layout h2 {
  text-align: center !important;
  font-size: clamp(38px,4vw,54px) !important;
  letter-spacing: -.03em !important;
  line-height: 1.05 !important;
  margin: 0 auto 20px !important;
  max-width: 800px !important;
}

.section-head p, .section-title-row p, .evidence-heading p, .digital-heading p, .eim-section-heading p, .archive-head p, .finale-heading p, .certifications-heading p, .products-ecosystem p, .inner-cta p, .capability-digital-head p, .contact-layout p {
  text-align: center !important;
  margin-inline: auto !important;
  max-width: 600px !important;
}

/* 3. Eyebrow Matching "INDUSTRIES WE SERVE" */
.eyebrow {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 16px !important;
  color: var(--cyan) !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  line-height: 1 !important;
  letter-spacing: .22em !important;
  text-transform: uppercase !important;
  margin-bottom: 20px !important;
  width: 100% !important;
}
.eyebrow i, .eyebrow::after {
  content: '' !important;
  flex: none !important;
  width: 32px !important;
  height: 1px !important;
  background: var(--cyan) !important;
  opacity: 0.6 !important;
  display: block !important;
}

"""

with open('src/App.css', 'w') as f:
    f.write(content + append_css)

