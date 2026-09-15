with open('src/App.css', 'r') as f:
    content = f.read()

old_eyebrow = """/* 3. Eyebrow Matching "INDUSTRIES WE SERVE" */
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
}"""

new_eyebrow = """/* 3. Eyebrow Matching "INDUSTRIES WE SERVE" */
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

.eyebrow i {
  content: '' !important;
  flex: none !important;
  width: 42px !important;
  height: 1px !important;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5)) !important;
  display: inline-block !important;
}

.eyebrow::after {
  content: '' !important;
  flex: none !important;
  width: 42px !important;
  height: 1px !important;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.5), transparent) !important;
  display: inline-block !important;
}"""

if old_eyebrow in content:
    content = content.replace(old_eyebrow, new_eyebrow)
    with open('src/App.css', 'w') as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Could not find the old eyebrow string.")
