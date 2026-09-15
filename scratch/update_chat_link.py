with open('src/components/chat/HybridChat.tsx', 'r') as f:
    content = f.read()

import_pattern = "import { Cpu, Settings2, BarChart3, ArrowRight, ArrowUpRight, X } from 'lucide-react'"
# Add Download icon to import just in case
if "Download" not in import_pattern:
    new_import = "import { Cpu, Settings2, BarChart3, ArrowRight, ArrowUpRight, X, Download } from 'lucide-react'"
    content = content.replace(import_pattern, new_import)

old_block = """                                return (
                                  <Link
                                    key={card.id}
                                    to={card.route}
                                    className="hybrid-capability-card"
                                    aria-label={`${card.title.replace('\\n', ' ')} - Learn More`}
                                  >
                                    <div className="hybrid-card-top-icon">{renderIcon()}</div>
                                    <div className="hybrid-card-title">
                                      {card.title.split('\\n').map((line, i) => (
                                        <span key={i} style={{ display: 'block' }}>
                                          {line}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="hybrid-card-action">
                                      {card.linkText}
                                      <ArrowRight size={11} className="hybrid-card-arrow" />
                                    </div>
                                  </Link>
                                )"""

new_block = """                                const isFile = card.route.endsWith('.pdf')
                                const isExternal = isFile || card.route.startsWith('http')
                                const CardWrapper = isExternal ? 'a' as any : Link
                                const wrapperProps = isExternal 
                                  ? { href: card.route, target: isFile ? '_blank' : undefined, rel: 'noopener noreferrer' } 
                                  : { to: card.route }

                                return (
                                  <CardWrapper
                                    key={card.id}
                                    {...wrapperProps}
                                    className="hybrid-capability-card"
                                    aria-label={`${card.title.replace('\\n', ' ')} - Learn More`}
                                  >
                                    <div className="hybrid-card-top-icon">{renderIcon()}</div>
                                    <div className="hybrid-card-title">
                                      {card.title.split('\\n').map((line, i) => (
                                        <span key={i} style={{ display: 'block' }}>
                                          {line}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="hybrid-card-action">
                                      {card.linkText}
                                      {isFile ? <Download size={11} className="hybrid-card-arrow" /> : <ArrowRight size={11} className="hybrid-card-arrow" />}
                                    </div>
                                  </CardWrapper>
                                )"""

content = content.replace(old_block, new_block)

with open('src/components/chat/HybridChat.tsx', 'w') as f:
    f.write(content)
