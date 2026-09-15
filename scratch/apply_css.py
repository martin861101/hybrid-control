import re

with open('src/App.css', 'r') as f:
    content = f.read()

# 1. Headings
heading_pattern = r":where\(\.section-title-row, \.digital-heading, \.eim-section-heading, \.archive-head, \.finale-heading, \.certifications-heading\) \{.*?text-align: center;.*?\} \n\n:where\(\.section-title-row, \.digital-heading, \.eim-section-heading, \.archive-head, \.finale-heading, \.certifications-heading\) > \* \{\n  width: 100%;\n\}\n\n:where\(\.section-title-row, \.digital-heading, \.eim-section-heading, \.archive-head, \.finale-heading, \.certifications-heading\) p \{\n  margin-inline: auto;\n  text-align: center;\n\}"

heading_replacement = """
.section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  justify-content: center !important;
  margin-inline: auto !important;
  max-width: 900px;
}

.section-title-row > *, .digital-heading > *, .eim-section-heading > *, .archive-head > *, .finale-heading > *, .certifications-heading > * {
  width: 100%;
}

.section-title-row p, .digital-heading p, .eim-section-heading p, .archive-head p, .finale-heading p, .certifications-heading p {
  margin-inline: auto !important;
  text-align: center !important;
  max-width: 600px;
  margin-top: 1rem;
}

.section-title-row .eyebrow, .digital-heading .eyebrow, .eim-section-heading .eyebrow, .archive-head .eyebrow, .finale-heading .eyebrow, .certifications-heading .eyebrow {
  justify-content: center;
  gap: 16px;
  letter-spacing: .22em;
}

.section-title-row .eyebrow i, .digital-heading .eyebrow i, .eim-section-heading .eyebrow i, .archive-head .eyebrow i, .finale-heading .eyebrow i, .certifications-heading .eyebrow i {
  width: 32px !important;
  opacity: 0.6;
}

.section-title-row .eyebrow::after, .digital-heading .eyebrow::after, .eim-section-heading .eyebrow::after, .archive-head .eyebrow::after, .finale-heading .eyebrow::after, .certifications-heading .eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}
"""

content = re.sub(heading_pattern, heading_replacement.strip(), content, flags=re.DOTALL)

# 2. Buttons
button_pattern = r":where\(\.button, \.nav-cta, \.menu-toggle, \.mobile-top button, \.topology-domain, \.delivered-ledger button, \.erwat-mute-toggle\) \{(.*?)\}"

button_replacement = """
.button, .nav-cta, .menu-toggle, .mobile-top button, .topology-domain, .delivered-ledger button, .erwat-mute-toggle {
  border-radius: 999px !important;
  border-color: rgba(110, 216, 255, 0.34) !important;
  backdrop-filter: blur(12px) saturate(135%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(135%) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 5px 18px rgba(0, 0, 0, 0.2) !important;
}
"""

content = re.sub(button_pattern, button_replacement.strip(), content, flags=re.DOTALL)

button_color_pattern = r":where\(\.button-primary, \.button-dark, \.button-light\)"
button_color_replacement = ".button-primary, .button-dark, .button-light"
content = content.replace(button_color_pattern, button_color_replacement)

# Remove the override at line 2067
override_pattern = r"\.topology-domain,\n\.delivered-ledger button \{\n  border-radius: 12px;\n\}"
content = content.replace(override_pattern, "")


with open('src/App.css', 'w') as f:
    f.write(content)

