import re

with open('src/App.css', 'r') as f:
    content = f.read()

# Replace heading selectors
heading_sel = r":where\(\.section-title-row, \.digital-heading, \.eim-section-heading, \.archive-head, \.finale-heading, \.certifications-heading\)"
rep_heading = ".section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading"
content = content.replace(heading_sel, rep_heading)

# Add missing properties to the first heading block
content = content.replace(
    ".section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading {\n  text-align: center;\n  justify-items: center;\n}",
    ".section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  text-align: center !important;\n  justify-content: center !important;\n  margin-inline: auto !important;\n  max-width: 900px;\n}"
)

# Add missing properties to the p block
content = content.replace(
    ".section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading p {\n  margin-inline: auto;\n  text-align: center;\n}",
    ".section-title-row p, .digital-heading p, .eim-section-heading p, .archive-head p, .finale-heading p, .certifications-heading p {\n  margin-inline: auto !important;\n  text-align: center !important;\n  max-width: 600px;\n  margin-top: 1rem;\n}\n\n.section-title-row .eyebrow, .digital-heading .eyebrow, .eim-section-heading .eyebrow, .archive-head .eyebrow, .finale-heading .eyebrow, .certifications-heading .eyebrow {\n  justify-content: center;\n  gap: 16px;\n  letter-spacing: .22em;\n}\n.section-title-row .eyebrow i, .digital-heading .eyebrow i, .eim-section-heading .eyebrow i, .archive-head .eyebrow i, .finale-heading .eyebrow i, .certifications-heading .eyebrow i {\n  width: 32px !important;\n  opacity: 0.6;\n}\n.section-title-row .eyebrow::after, .digital-heading .eyebrow::after, .eim-section-heading .eyebrow::after, .archive-head .eyebrow::after, .finale-heading .eyebrow::after, .certifications-heading .eyebrow::after {\n  content: '';\n  width: 32px;\n  height: 1px;\n  background: currentColor;\n  opacity: 0.6;\n}"
)

with open('src/App.css', 'w') as f:
    f.write(content)
