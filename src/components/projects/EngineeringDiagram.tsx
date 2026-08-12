type DiagramKind = 'process' | 'plant' | 'power'

type NodeProps = { x: number; y: number; label: string; active?: boolean; width?: number }

function Node({ x, y, label, active = false, width = 112 }: NodeProps) {
  return <g className={`diagram-node ${active ? 'is-active' : ''}`} transform={`translate(${x - width / 2} ${y - 25})`}>
    <rect width={width} height="50" rx="1" />
    <circle cx="12" cy="12" r="3" />
    <text x={width / 2} y="31" textAnchor="middle">{label}</text>
  </g>
}

function Signal({ d, delay = 0 }: { d: string; delay?: number }) {
  return <g>
    <path className="diagram-path" d={d} />
    <path className="diagram-pulse" d={d} style={{ animationDelay: `${delay}s` }} />
  </g>
}

export default function EngineeringDiagram({ kind, label }: { kind: DiagramKind; label: string }) {
  return <div className={`engineering-diagram diagram-${kind}`} role="img" aria-label={label}>
    <div className="diagram-status"><span>SYS / ONLINE</span></div>
    <svg viewBox="0 0 760 430" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={`grid-${kind}`} width="34" height="34" patternUnits="userSpaceOnUse"><path d="M 34 0 L 0 0 0 34" /></pattern>
        <filter id={`glow-${kind}`}><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect className="diagram-grid" width="760" height="430" fill={`url(#grid-${kind})`} />
      {kind === 'process' && <>
        <text className="diagram-zone" x="52" y="65">FIELD</text><text className="diagram-zone" x="330" y="65">CONTROL</text><text className="diagram-zone" x="615" y="65">OPERATIONS</text>
        <Signal d="M105 215 H218 H355 H500 H652" />
        <Node x={105} y={215} label="ACTUATORS"/><Node x={235} y={215} label="AS-i NETWORK" active/><Node x={370} y={215} label="PLC" active/><Node x={510} y={215} label="SCADA" active/><Node x={655} y={215} label="OPERATIONS"/>
        <path className="diagram-feedback" d="M655 280 C520 365 245 365 105 280"/><text className="diagram-note" x="332" y="365">PROCESS FEEDBACK</text>
      </>}
      {kind === 'plant' && <>
        <text className="diagram-zone" x="45" y="45">FIELD</text><text className="diagram-zone" x="315" y="45">CONTROL</text><text className="diagram-zone" x="580" y="45">OPERATIONS</text>
        {[[95,100,'ACTUATORS'],[95,180,'PUMPS'],[95,260,'DOSING'],[95,340,'FILTERS']].map(([x,y,t], i) => <g key={String(t)}><Signal d={`M150 ${y} H250 Q280 ${y} 280 215 H330`} delay={i * .18}/><Node x={Number(x)} y={Number(y)} label={String(t)} width={108}/></g>)}
        <Node x={375} y={215} label="PLC" active width={120}/><Signal d="M435 215 H500" delay={.3}/><Node x={530} y={215} label="FIBRE" active width={100}/><Signal d="M580 215 H625" delay={.5}/><Node x={665} y={215} label="SCADA" active width={110}/>
        <path className="diagram-feedback" d="M665 280 V350 H375 V280"/><text className="diagram-note" x="480" y="375">ONE PLANT / ONE OPERATIONAL VIEW</text>
      </>}
      {kind === 'power' && <>
        <text className="diagram-zone" x="55" y="45">ELECTRICAL SINGLE-LINE</text><text className="diagram-zone" x="545" y="45">AUTOMATION LAYER</text>
        <Node x={260} y={85} label="132kV"/><Signal d="M260 110 V150"/><Node x={260} y={180} label="TRANSFORMER" active width={150}/><Signal d="M260 205 V255" delay={.2}/><Node x={260} y={278} label="11kV BUS" active width={300}/>
        <Signal d="M150 303 V365 M260 303 V365 M370 303 V365" delay={.4}/>{[150,260,370].map((x, i) => <Node key={x} x={x} y={385} label={`FEEDER 0${i + 1}`} width={95}/>)}
        <Signal d="M410 278 H485 V115 H565" delay={.5}/><Node x={630} y={115} label="PROTECTION" width={135}/><Signal d="M630 140 V215" delay={.65}/><Node x={630} y={240} label="LOCAL SCADA" active width={135}/><Signal d="M630 265 V340" delay={.8}/><Node x={630} y={365} label="CONTROL CENTRE" width={150}/>
      </>}
    </svg>
    <div className="diagram-scale">SIGNAL PATH / 001—{kind === 'process' ? '005' : '006'}</div>
  </div>
}
