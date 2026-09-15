import re

with open('src/App.css', 'r') as f:
    content = f.read()

pattern = r":is\(\.section-title-row, \.digital-heading, \.eim-section-heading, \.archive-head, \.finale-heading, \.certifications-heading\) \.eyebrow::after \{.*?\}"

replacement = """
:is(.section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading) .eyebrow i {
  width: 32px !important;
  opacity: 0.6;
}
:is(.section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading) .eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}
"""

content = re.sub(pattern, replacement.strip(), content, flags=re.DOTALL)

with open('src/App.css', 'w') as f:
    f.write(content)
