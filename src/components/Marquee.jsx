const STACK = [
  'Laravel', 'Vue 3', 'React', 'Angular', 'Django', 'Node.js', 'WordPress',
  'MySQL', 'PostgreSQL', 'MongoDB', 'ESP32', 'AWS', 'Docker', 'Figma', 'Git',
]

function Segment() {
  return (
    <span className="marquee-seg">
      {STACK.map((t) => (
        <span key={t}>
          {t}
          {'  '}
          <span className="acc">▪</span>
          {'  '}
        </span>
      ))}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" data-rv="up" aria-hidden="true">
      <div className="marquee-track">
        <Segment />
        <Segment />
      </div>
    </div>
  )
}
