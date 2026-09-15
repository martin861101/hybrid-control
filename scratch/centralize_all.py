import re

with open('src/App.css', 'r') as f:
    content = f.read()

# Make all .eyebrow look like the industries eyebrow
eyebrow_css = """
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

h2 {
  text-align: center !important;
}

p {
  text-align: center !important;
}

/* Fix any container that holds them to center align */
.section-head, .section-title-row, .evidence-heading, .evidence-heading div, .impact Reveal, .contact-layout Reveal, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading, .products-ecosystem, .inner-cta {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  justify-content: center !important;
  margin-inline: auto !important;
}

.section-title-row {
  max-width: 900px !important;
}
"""

content = content + "\n" + eyebrow_css

with open('src/App.css', 'w') as f:
    f.write(content)

