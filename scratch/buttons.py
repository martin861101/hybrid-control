import re

with open('src/App.css', 'r') as f:
    content = f.read()

pattern = r":is\(\.button, \.nav-cta, \.menu-toggle, \.mobile-top button, \.topology-domain, \.delivered-ledger button, \.erwat-mute-toggle\) \{.*?\}"

replacement = """
:is(.button, .nav-cta, .menu-toggle, .mobile-top button, .topology-domain, .delivered-ledger button, .erwat-mute-toggle) {
  border-radius: 999px !important;
  border-color: rgba(110, 216, 255, 0.34) !important;
  backdrop-filter: blur(12px) saturate(135%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(135%) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 5px 18px rgba(0, 0, 0, 0.2) !important;
}
"""

content = re.sub(pattern, replacement.strip(), content, flags=re.DOTALL)

with open('src/App.css', 'w') as f:
    f.write(content)
