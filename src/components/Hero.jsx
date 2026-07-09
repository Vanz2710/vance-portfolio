export default function Hero() {
  return (
    <section id="home" className="hero">
      <div data-rv="up">
        <h1 className="hero-title">
          Vance is a <span data-gl="">full-stack developer</span> and <span data-gl="">IT graduate</span>
        </h1>
        <div className="hero-term">
          <span className="acc">~$</span>
          <span className="white">whoami:</span>
          <span data-typed="" />
          <span className="caret" />
        </div>
        <p className="hero-desc">
          He builds scalable, user-focused web applications — from clean system architecture to pixel-perfect UIs.
          Based in Kuala Lumpur, Malaysia.
        </p>
        <div className="hero-cta">
          <a href="#contacts" data-mag="" className="btn-acc">Contact me!!</a>
          <a href="#projects" className="link-plain">view projects ~~&gt;</a>
          <a href="/vance-tindoc-cv.pdf" download="Vance-Tindoc-CV.pdf" className="link-plain">download cv ↓</a>
        </div>
      </div>
      <div className="hero-right" data-rv="up" data-rvd="140">
        <div
          data-plx=".12"
          style={{ position: 'absolute', left: -34, top: 26, width: 88, height: 88, border: '1px solid var(--ac,#C778DD)', opacity: .9, zIndex: 2, animation: 'spin360 48s linear infinite' }}
        />
        <div
          data-plx=".2"
          style={{ position: 'absolute', right: -24, top: '54%', width: 92, height: 92, backgroundImage: 'radial-gradient(rgba(171,178,191,.75) 1.2px,transparent 1.2px)', backgroundSize: '16px 16px', zIndex: 2 }}
        />
        <div
          data-plx=".07"
          style={{ position: 'absolute', right: 34, top: -26, width: 60, height: 60, backgroundImage: 'radial-gradient(rgba(171,178,191,.45) 1.2px,transparent 1.2px)', backgroundSize: '15px 15px', zIndex: 0 }}
        />
        <img src="/vance.jpg" alt="Portrait of Vance Tindoc" className="hero-photo" />
        <div className="hero-chip">
          <span className="chip-sq" />
          <span>
            Currently interning at <span style={{ color: '#fff', fontWeight: 600 }}>Bluedale Group</span>
          </span>
        </div>
      </div>
    </section>
  )
}
