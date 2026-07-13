const STACK = [
  'Laravel', 'Vue 3', 'React', 'Angular', 'Django', 'Node.js', 'WordPress',
  'MySQL', 'PostgreSQL', 'MongoDB', 'ESP32', 'AWS', 'Docker', 'Figma', 'Git',
]

function Segment({ items }) {
  return (
    <span className="mq-seg">
      {items.map((t) => (
        <span key={t} className="mq-cell">
          <span className="mq-item" data-mqi="">{t}</span>
          <span className="mq-dot acc">▪</span>
        </span>
      ))}
    </span>
  )
}

/* Two copies of the segment + translateX(-50%) = seamless loop.
   The ghost row runs the same animation in reverse. */
function Row({ items, ghost, dur }) {
  return (
    <div className={'mq-row' + (ghost ? ' mq-row--ghost' : '')} data-mq-row="">
      <div className={'mq-track' + (ghost ? ' mq-track--rev' : '')} style={{ '--mq-dur': dur }}>
        <Segment items={items} />
        <Segment items={items} />
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" data-rv="up" aria-hidden="true">
      <span className="mq-label"><span className="acc">$</span> ls ~/stack</span>
      <Row items={STACK} dur="52s" />
      <Row items={[...STACK].reverse()} ghost dur="70s" />
    </div>
  )
}
