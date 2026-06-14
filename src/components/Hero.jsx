const ICON = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons'

const socials = [
  { name: 'GitHub',   href: 'https://github.com/Vanz1233',            icon: `${ICON}/github.svg` },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/vancetindoc/',   icon: `${ICON}/linkedin.svg` },
  { name: 'Email',    href: 'mailto:vancetindoc@gmail.com',           icon: `${ICON}/gmail.svg` },
]

const skills = [
  { name: 'Laravel', icon: `${ICON}/laravel.svg` },
  { name: 'Vue.js',  icon: `${ICON}/vuedotjs.svg` },
  { name: 'React',   icon: `${ICON}/react.svg` },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Noise grain */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Orange glow */}
      <div
        style={{
          position: 'absolute', right: 0, top: 0,
          width: 600, height: 600, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top right, rgba(232,98,42,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Left — intro */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-welcome">Welcome to my world</div>

        <h1 className="hero-headline">
          Hi, I&rsquo;m <span className="orange">Vance Luke</span>
          <br />
          <span className="orange">an</span> IT Graduate.
          <span className="type-caret" />
        </h1>

        <p className="hero-desc">
          I build scalable, user-focused web applications — from clean system
          architecture to pixel-perfect UIs. IT graduate from HELP University,
          based in Kuala Lumpur.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="hero-btn hero-btn-primary">
            View Projects&nbsp;→
          </a>
          <a href="/vance-cv.pdf" download className="hero-btn hero-btn-ghost">
            Download Resume&nbsp;↓
          </a>
        </div>

        <div className="hero-meta">
          <div>
            <div className="hero-meta-label">Find with me</div>
            <div className="hero-icons">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hero-icon"
                  aria-label={s.name}
                >
                  <img src={s.icon} alt={s.name} width="20" height="20" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="hero-meta-label">Best skill on</div>
            <div className="hero-icons">
              {skills.map(s => (
                <div key={s.name} className="hero-icon" title={s.name}>
                  <img src={s.icon} alt={s.name} width="20" height="20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — profile photo */}
      <div className="hero-photo">
        <img src="/vance.jpg" alt="Vance Tindoc" />
      </div>
    </section>
  )
}
