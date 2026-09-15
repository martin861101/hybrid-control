with open('src/App.css', 'r') as f:
    lines = f.readlines()

new_block = """
/* Shared centered editorial headings, matching the Industries We Serve section. */
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

@media (max-width: 800px) {
  .section-title-row, .digital-heading, .eim-section-heading, .archive-head, .finale-heading, .certifications-heading {
    text-align: center;
  }
}
"""

lines = lines[:1466] + [new_block] + lines[1485:]
with open('src/App.css', 'w') as f:
    f.writelines(lines)
