with open('src/App.css', 'r') as f:
    content = f.read()

content = content.replace("  backdrop-filter: blur(12px) saturate(135%) !important;\n  -webkit-backdrop-filter: blur(12px) saturate(135%) !important;", "  -webkit-backdrop-filter: blur(12px) saturate(135%) !important;\n  backdrop-filter: blur(12px) saturate(135%) !important;")

with open('src/App.css', 'w') as f:
    f.write(content)
