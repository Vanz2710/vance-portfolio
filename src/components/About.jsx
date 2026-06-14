import { useInView } from '../hooks/useInView'

const exploring = [
  'Godot game dev',
  'Claude plugin development',
  'LLM apps · RAG & agents',
  'Cloud & DevOps · AWS, Docker',
  'TypeScript & system design',
]

function Reveal({ children, style = {} }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="sec-label">01 / About</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left — bio */}
        <Reveal>
          <div className="about-text">
            <h2 className="sec-title">Building things<br />that matter.</h2>
            <p>
              I'm <span>Vance Luke Evardo Tindoc</span>, an Information Technology student at{' '}
              <span>HELP University</span> with a strong foundation in software development, system
              design, and problem-solving.
            </p>
            <p>
              I specialise in full-stack development — building RESTful APIs and backends with{' '}
              <span>Laravel, Django, and Node.js</span>, and crafting responsive frontends with{' '}
              <span>Vue 3, Angular, and React</span>.
            </p>
            <p>
              I care deeply about clean code, good architecture, and continuous learning. Outside of
              tech, I'm into{' '}
              <span>basketball, tech communities, and open-source development.</span>
            </p>

            <div className="exploring">
              <div className="exploring-label">Currently exploring</div>
              <div className="exploring-chips">
                {exploring.map(item => (
                  <span key={item} className="explore-chip">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right — stats */}
        <Reveal>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-num">3.32</span>
              <span className="stat-label">CGPA · May 2026 Semester</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">5+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">2</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">3</span>
              <span className="stat-label">Languages Spoken</span>
            </div>
          </div>
          <div className="currently-box">
            <div className="currently-label">Currently At</div>
            <div className="currently-role">Software Developer Intern</div>
            <div className="currently-detail">
              Bluedale Group of Companies &nbsp;·&nbsp; Kuala Lumpur, Malaysia
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
