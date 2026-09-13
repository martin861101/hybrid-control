import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import {
  Cpu,
  Settings2,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Send,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import './HybridChat.css'

interface ChatMessage {
  id: string
  type: 'assistant' | 'user'
  time: string
  author: string
  text?: string
  subtext?: string
  cards?: {
    id: string
    title: string
    icon: 'cpu' | 'integration' | 'data'
    linkText: string
    route: string
  }[]
  followUp?: string
  chips?: string[]
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    type: 'assistant',
    time: '18:42:07',
    author: 'HC-AI',
    text: "Hello! I'm the Hybrid Control Assistant. How can I help with your control, automation or integration requirements today?",
  },
  {
    id: 'msg-2',
    type: 'user',
    time: '18:42:15',
    author: 'You',
    text: 'Tell me about PLC systems and how you integrate them.',
  },
  {
    id: 'msg-3',
    type: 'assistant',
    time: '18:42:31',
    author: 'HC-AI',
    text: 'Hybrid Control designs, supplies and integrates PLC systems for industrial, commercial and critical infrastructure environments.',
    subtext: 'Our PLC solutions include:',
    cards: [
      {
        id: 'card-1',
        title: 'PLC & SCADA\nSOLUTIONS',
        icon: 'cpu',
        linkText: 'LEARN MORE',
        route: '/capabilities/engineering',
      },
      {
        id: 'card-2',
        title: 'SYSTEM\nINTEGRATION',
        icon: 'integration',
        linkText: 'LEARN MORE',
        route: '/capabilities/system-integration',
      },
      {
        id: 'card-3',
        title: 'MONITORING\n& DATA',
        icon: 'data',
        linkText: 'LEARN MORE',
        route: '/capabilities/system-integration#digital-intelligence',
      },
    ],
    followUp: 'Would you like more details on a specific manufacturer or application?',
    chips: ['Siemens', 'Allen-Bradley', 'Schneider'],
  },
]

function HudCorners() {
  return (
    <>
      {/* Top Left Corner */}
      <svg className="hybrid-hud-corner top-left" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M 0,22 L 0,14 L 14,0 L 22,0" stroke="#7debff" strokeWidth="1.5" />
        <path d="M 0,10 L 10,0" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
        <rect x="2" y="2" width="2" height="2" fill="#7debff" />
      </svg>

      {/* Top Right Corner */}
      <svg className="hybrid-hud-corner top-right" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M 6,0 L 14,0 L 28,14 L 28,22" stroke="#7debff" strokeWidth="1.5" />
        <path d="M 18,0 L 28,10" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
        <rect x="24" y="2" width="2" height="2" fill="#7debff" />
      </svg>

      {/* Bottom Left Corner */}
      <svg className="hybrid-hud-corner bottom-left" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M 0,6 L 0,14 L 14,28 L 22,28" stroke="#7debff" strokeWidth="1.5" />
        <path d="M 0,18 L 10,28" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
        <rect x="2" y="24" width="2" height="2" fill="#7debff" />
      </svg>

      {/* Bottom Right Corner */}
      <svg className="hybrid-hud-corner bottom-right" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M 6,28 L 14,28 L 28,14 L 28,6" stroke="#7debff" strokeWidth="1.5" />
        <path d="M 18,28 L 28,18" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
        <rect x="24" y="24" width="2" height="2" fill="#7debff" />
      </svg>

      {/* Top HUD notch accents */}
      <div className="hybrid-hud-top-notches" aria-hidden="true">
        <span className="hybrid-hud-notch-tab" />
        <span className="hybrid-hud-notch-tab" />
      </div>
    </>
  )
}

export default function HybridChat() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isOpeningPulse, setIsOpeningPulse] = useState(false)

  // Only show the chat icon after the page intro is over
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    if (window.location.pathname !== '/') return true
    return false
  })

  const launcherRef = useRef<HTMLButtonElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const prefersReduced = useReducedMotion()

  // Track page intro completion on home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setIntroDone(true)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroDone(true)
      return
    }

    const checkIntro = () => {
      const isIntroActive = document.documentElement.classList.contains('logo-intro-active')
      const introEl = document.querySelector('.logo-intro')
      if (!isIntroActive && !introEl) {
        setIntroDone(true)
      } else {
        setIntroDone(false)
      }
    }

    checkIntro()

    const observer = new MutationObserver(() => {
      checkIntro()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    })

    const safetyTimer = window.setTimeout(() => {
      setIntroDone(true)
    }, 4500)

    return () => {
      observer.disconnect()
      window.clearTimeout(safetyTimer)
    }
  }, [location.pathname])

  // Manage keyboard accessibility (Escape to close, auto-focus)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        launcherRef.current?.focus()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      // Focus input when chat opens
      const timer = window.setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.clearTimeout(timer)
      }
    }
  }, [isOpen])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
    }
  }, [messages, isOpen, prefersReduced])

  // Open chat with launcher intensification animation
  const handleOpenChat = () => {
    if (prefersReduced) {
      setIsOpen(true)
      return
    }
    setIsOpeningPulse(true)
    window.setTimeout(() => {
      setIsOpeningPulse(false)
      setIsOpen(true)
    }, 140)
  }

  const handleCloseChat = () => {
    setIsOpen(false)
    window.setTimeout(() => {
      launcherRef.current?.focus()
    }, 150)
  }

  const handleChipClick = (chip: string) => {
    setInputValue(`Tell me more about ${chip} PLC integration`)
    inputRef.current?.focus()
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      time: timeStr,
      author: 'You',
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    // Static demo response to acknowledge message without calling external API
    window.setTimeout(() => {
      const respTime = new Date()
      const respTimeStr = `${String(respTime.getHours()).padStart(2, '0')}:${String(respTime.getMinutes()).padStart(2, '0')}:${String(respTime.getSeconds()).padStart(2, '0')}`
      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        time: respTimeStr,
        author: 'HC-AI',
        text: `Inquiry recorded regarding "${trimmed}". AI telemetry backend is offline in preview mode. For engineering specifications or project consultation, reach our team at info@hybridcontrol.co.za or call +27 35 789 1699.`,
      }
      setMessages((prev) => [...prev, botMsg])
    }, 450)
  }

  return (
    <>
      {/* Floating Animated Launcher (Bottom-Right) */}
      <AnimatePresence>
        {!isOpen && introDone && (
          <motion.div
            className="hybrid-launcher-container"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 15 }}
            animate={
              prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: isOpeningPulse ? 1.2 : 1,
                    y: 0,
                    filter: isOpeningPulse ? 'brightness(1.5) drop-shadow(0 0 25px #38bdf8)' : 'brightness(1)',
                  }
            }
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              mass: 0.8,
            }}
          >
            <button
              ref={launcherRef}
              type="button"
              className="hybrid-launcher-orb-btn"
              onClick={handleOpenChat}
              aria-label="Open Hybrid Control Assistant"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
            >
              <div className="hybrid-launcher-aura" aria-hidden="true" />
              <img
                src="/chat/chat-icon.svg"
                alt=""
                className="hybrid-launcher-icon-img"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Responsive Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="HYBRID // CONTROL ASSIST"
            className={`hybrid-chat-panel-outer ${isExpanded ? 'is-expanded' : ''}`}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.18,
                    y: 35,
                    x: 20,
                  }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: 0,
                  }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.18,
                    y: 35,
                    x: 20,
                  }
            }
            transition={{
              duration: prefersReduced ? 0.15 : 0.44,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="hybrid-chat-frame">
              <div className="hybrid-chat-inner">
                {/* Tech grid and background effects */}
                <div className="hybrid-chat-grid-overlay" aria-hidden="true" />
                <div className="hybrid-chat-glow-spot" aria-hidden="true" />
                <HudCorners />

                {/* Header */}
                <motion.header
                  className="hybrid-chat-header"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.1, duration: 0.28 }}
                >
                  <div className="hybrid-chat-header-left">
                    <div className="hybrid-header-orb-wrap">
                      <div className="hybrid-header-orb-ring" aria-hidden="true" />
                      <img
                        src="/chat/chat-icon.svg"
                        alt=""
                        className="hybrid-header-orb-icon"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="hybrid-header-info">
                      <h2 className="hybrid-header-title">HYBRID // CONTROL ASSIST</h2>
                      <div className="hybrid-header-status-row">
                        <span className="hybrid-status-dot" aria-hidden="true" />
                        <span className="hybrid-status-text">SYSTEM ONLINE</span>
                      </div>
                    </div>
                  </div>

                  <div className="hybrid-chat-header-right">
                    <div className="hybrid-header-tagline-col" aria-hidden="true">
                      <span>ENGINEERING TODAY</span>
                      <span>A SMARTER TOMORROW</span>
                    </div>

                    <button
                      type="button"
                      className="hybrid-header-btn"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      aria-label={isExpanded ? 'Restore panel size' : 'Expand panel'}
                      title={isExpanded ? 'Restore panel size' : 'Expand panel'}
                    >
                      {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>

                    <button
                      type="button"
                      className="hybrid-header-btn"
                      onClick={handleCloseChat}
                      aria-label="Close chat panel"
                      title="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.header>

                {/* Messages Body */}
                <motion.div
                  className="hybrid-chat-messages"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.18, duration: 0.32 }}
                >
                  {messages.map((msg) => {
                    if (msg.type === 'user') {
                      return (
                        <div key={msg.id} className="hybrid-msg-user">
                          <div className="hybrid-user-meta">
                            <span>{msg.author}</span>
                            <span>{msg.time}</span>
                          </div>
                          <div className="hybrid-user-bubble">
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      )
                    }

                    // Assistant message
                    return (
                      <div key={msg.id} className="hybrid-msg-assistant">
                        <div className="hybrid-msg-header">
                          <span className="hybrid-msg-indicator" aria-hidden="true" />
                          <span className="hybrid-msg-author">{msg.author}</span>
                          <span className="hybrid-msg-time">{msg.time}</span>
                        </div>

                        <div className="hybrid-assistant-body">
                          {msg.text && <p>{msg.text}</p>}
                          {msg.subtext && <p className="hybrid-sub-lead">{msg.subtext}</p>}

                          {/* Capability Cards */}
                          {msg.cards && (
                            <div className="hybrid-capability-grid">
                              {msg.cards.map((card) => {
                                const renderIcon = () => {
                                  if (card.icon === 'cpu') return <Cpu size={20} />
                                  if (card.icon === 'integration') return <Settings2 size={20} />
                                  return <BarChart3 size={20} />
                                }

                                return (
                                  <Link
                                    key={card.id}
                                    to={card.route}
                                    className="hybrid-capability-card"
                                    aria-label={`${card.title.replace('\n', ' ')} - Learn More`}
                                  >
                                    <div className="hybrid-card-top-icon">{renderIcon()}</div>
                                    <div className="hybrid-card-title">
                                      {card.title.split('\n').map((line, i) => (
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
                                )
                              })}
                            </div>
                          )}

                          {msg.followUp && <p className="hybrid-sub-lead">{msg.followUp}</p>}

                          {/* Quick Action Chips */}
                          {msg.chips && (
                            <div className="hybrid-chips-row">
                              {msg.chips.map((chip) => (
                                <button
                                  key={chip}
                                  type="button"
                                  className="hybrid-quick-chip"
                                  onClick={() => handleChipClick(chip)}
                                >
                                  {chip}
                                </button>
                              ))}
                              <button
                                type="button"
                                className="hybrid-quick-chip is-arrow"
                                aria-label="More options"
                                onClick={() => handleChipClick('Schneider')}
                              >
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </motion.div>

                {/* Footer Input Area */}
                <motion.div
                  className="hybrid-chat-footer"
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.24, duration: 0.28 }}
                >
                  <form className="hybrid-input-shell" onSubmit={handleSend}>
                    <input
                      ref={inputRef}
                      type="text"
                      className="hybrid-chat-input-field"
                      placeholder="Ask Hybrid Control..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      aria-label="Message Hybrid Control Assistant"
                    />
                    <button
                      type="submit"
                      className="hybrid-send-button"
                      aria-label="Send message"
                      disabled={!inputValue.trim()}
                    >
                      <Send size={15} />
                    </button>
                  </form>

                  <div className="hybrid-brand-tagline">
                    PEOPLE × SYSTEMS × A SMARTER TOMORROW
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
