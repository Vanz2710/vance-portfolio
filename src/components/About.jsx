const EXPLORING = [
  'Godot game dev',
  'Claude plugin development',
  'LLM apps · RAG & agents',
  'AWS & Docker',
  'TypeScript & system design',
]

export default function About() {
  return (
    <section id="about-me" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">about-me</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 300 }} />
      </div>
      <div className="about-grid">
        <div className="about-text" data-rv="up">
          <p>Hello, i'm Vance!</p>
          <p>
            I'm <span className="white">Vance Luke Evardo Tindoc</span>, an Information Technology student at{' '}
            <span className="white">HELP University</span> in Kuala Lumpur, with a strong foundation in software
            development, system design and problem-solving.
          </p>
          <p>
            I specialise in full-stack development — building RESTful APIs and backends with{' '}
            <span className="white">Laravel, Django and Node.js</span>, and crafting responsive frontends with{' '}
            <span className="white">Vue 3, Angular and React</span>.
          </p>
          <p>
            I care deeply about clean code, good architecture and continuous learning. Outside of tech I'm into{' '}
            <span className="white">basketball, tech communities and open-source.</span>
          </p>
          <div style={{ marginTop: 8 }}>
            <div className="mini-label exploring-label">// currently exploring</div>
            <div className="chips">
              {EXPLORING.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="about-right" data-rv="up" data-rvd="140">
          <div
            data-plx=".16"
            aria-hidden="true"
            style={{ position: 'absolute', right: -20, top: -30, width: 76, height: 76, backgroundImage: 'radial-gradient(rgba(171,178,191,.55) 1.2px,transparent 1.2px)', backgroundSize: '15px 15px' }}
          />
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-num" data-cnt="3.32" data-cnt-dec="2">3.32</div>
              <div className="stat-label">CGPA · May 2026 semester</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <span data-cnt="5">5</span>
                <span className="acc">+</span>
              </div>
              <div className="stat-label">Projects built</div>
            </div>
            <div className="stat">
              <div className="stat-num" data-cnt="2">2</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat">
              <div className="stat-num" data-cnt="3">2</div>
              <div className="stat-label">Languages spoken</div>
            </div>
          </div>
          <div className="now-box">
            <div className="now-label">currently at</div>
            <div className="now-role">Software Developer Intern</div>
            <div className="now-org">Bluedale Group of Companies · Kuala Lumpur</div>
          </div>
        </div>
      </div>
    </section>
  )
}
