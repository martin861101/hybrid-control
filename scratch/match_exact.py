with open('src/App.css', 'r') as f:
    content = f.read()

# Add margin-bottom and exact font sizes to match industries section
content = content.replace(".section-title-row .eyebrow, .digital-heading .eyebrow", ".section-title-row .eyebrow, .digital-heading .eyebrow")

new_css = """
.section-title-row h2, .digital-heading h2, .eim-section-heading h2, .archive-head h2, .finale-heading h2, .certifications-heading h2 {
  font-size: clamp(38px,4vw,54px) !important;
  letter-spacing: -.03em !important;
  line-height: 1.05 !important;
  margin: 0 0 20px !important;
  color: var(--text-heading) !important;
}

.section-title-row .eyebrow, .digital-heading .eyebrow, .eim-section-heading .eyebrow, .archive-head .eyebrow, .finale-heading .eyebrow, .certifications-heading .eyebrow {
  margin-bottom: 30px !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  line-height: 1 !important;
  text-transform: uppercase !important;
}

.section-title-row p, .digital-heading p, .eim-section-heading p, .archive-head p, .finale-heading p, .certifications-heading p {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: var(--text-body) !important;
}
"""

content = content + "\n" + new_css

with open('src/App.css', 'w') as f:
    f.write(content)
