The actual panel should not be an SVG. Build it as a normal React/HTML component and use CSS + Motion for the sci-fi styling and animation. That gives you proper scrolling, selectable text, links, cards, inputs, accessibility, mobile sizing, and eventually your real chatbot backend.

For Hybrid I'd structure it roughly like this:

<HybridChat>
  <ChatHeader>
    <AnimatedOrb />
    <SystemStatus />
    <CloseButton />
  </ChatHeader>

  <ChatMessages>
    <AssistantMessage />
    <UserMessage />
    <AssistantMessage>
      <CapabilityCards />
    </AssistantMessage>
  </ChatMessages>

  <ChatSuggestions />

  <ChatInput />
</HybridChat>

The panel itself

We can get surprisingly close to the concept image with CSS rather than image assets:

<motion.div
  initial={{
    opacity: 0,
    scale: 0.1,
    clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
  }}
  animate={{
    opacity: 1,
    scale: 1,
    clipPath: "polygon(3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%, 0 3%)",
  }}
  transition={{
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="
    fixed bottom-6 right-6
    z-50
    flex h-[620px] w-[420px] flex-col
    overflow-hidden
    border border-cyan-400/40
    bg-[#04101c]/95
    shadow-[0_0_50px_rgba(0,180,255,0.15)]
    backdrop-blur-xl
  "
>

Then add the technical grid as a CSS background rather than baking it into an image:

.hybrid-chat-grid {
  background-image:
    linear-gradient(rgba(40, 180, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(40, 180, 255, 0.035) 1px, transparent 1px);

  background-size: 24px 24px;
}

The header can have your existing animated orb:

<header className="relative flex h-20 items-center border-b border-cyan-400/20 px-5">

  <motion.div layoutId="hybrid-chat-orb">
    <img
      src="/chat/hybrid-chat-orb.svg"
      className="h-12 w-12"
      alt=""
    />
  </motion.div>

  <div className="ml-3">
    <div className="tracking-[0.14em] text-white">
      HYBRID // CONTROL ASSIST
    </div>

    <div className="mt-1 flex items-center gap-2 text-xs tracking-widest text-cyan-400">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      SYSTEM ONLINE
    </div>
  </div>

</header>

Messages are HTML

This is important. Don't turn the chat content into part of the visual effect.

Assistant responses:

<div className="relative pl-5">
  <div className="absolute left-0 top-0 h-full w-[2px] bg-cyan-400" />

  <div className="mb-2 font-mono text-xs text-cyan-400">
    HC-AI&nbsp;&nbsp;18:42:31
  </div>

  <p className="leading-relaxed text-slate-200">
    Hybrid Control designs, supplies and integrates PLC systems
    for industrial and critical infrastructure environments.
  </p>
</div>

User messages remain conventional enough that people immediately understand the interface:

<div className="ml-auto max-w-[80%] border border-cyan-400/40 bg-cyan-950/50 px-4 py-3">
  Tell me about your PLC systems.
</div>

And then we can give the AI structured components instead of only text:

┌───────────────────────────────┐
│ HC-AI  18:42:31               │
│                               │
│ │ We provide complete control │
│ │ system integration...       │
│                               │
│ ┌────────┐ ┌────────┐         │
│ │ PLC &  │ │ SCADA  │         │
│ │ SCADA  │ │ DATA   │         │
│ │     →  │ │     →  │         │
│ └────────┘ └────────┘         │
│                               │
│ [Siemens] [Rockwell]          │
│ [Schneider]                   │
└───────────────────────────────┘

That opens up something much better than a normal website chatbot. If someone asks "What PLC systems do you work with?", the AI can answer and surface relevant capability cards. If they ask about a project, it could eventually show Contact Engineering →, View Automation →, View SCADA →, etc.

The SVG is therefore just the identity and animation layer. The actual product is:

React + Tailwind → panel/layout
Motion → opening/closing transition
Your animated SVG → launcher/header identity
AI/API → conversation
Structured React components → capabilities, links and CTAs

That approach will make the concept we generated genuinely functional rather than trying to fake a chat UI inside an SVG.
