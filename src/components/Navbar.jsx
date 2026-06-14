import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeId, setActiveId]   = useState('')
  const [theme, setTheme]         = useState(() => localStorage.getItem('theme') || 'dark')

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active nav via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Theme persistence
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const links = [
    { label: 'About',      href: '#about' },
    { label: 'Work',       href: '#projects' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm"
          onClick={close}
        />
      )}

      <nav
        id="mainNav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: scrolled ? '14px 56px' : '20px 56px',
          background: 'var(--color-nav-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
          transition: 'padding 0.3s',
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800, fontSize: '1.1rem',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--color-cream)', textDecoration: 'none',
          }}
        >
          Vance Tindoc
        </a>

        {/* Desktop links */}
        <ul
          id="navLinks"
          className={menuOpen ? 'open' : ''}
          style={{
            display: 'flex', gap: 40, listStyle: 'none', alignItems: 'center',
          }}
        >
          {links.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeId === id
            return (
              <li key={link.label} className="max-[768px]:border-b max-[768px]:border-border">
                <a
                  href={link.href}
                  onClick={close}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  style={{
                    color: isActive ? 'var(--color-cream)' : 'var(--color-muted)',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    position: 'relative',
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href="mailto:vancetindoc@gmail.com"
              onClick={close}
              style={{
                border: '1.5px solid var(--color-orange)',
                color: 'var(--color-orange)',
                padding: '7px 18px',
                borderRadius: 2,
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-orange)'; e.currentTarget.style.color = 'var(--color-bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-orange)' }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            style={{
              background: 'none', border: '1px solid var(--color-border)',
              color: 'var(--color-muted)', borderRadius: 6,
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none', transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <ul
        id="navLinksMobile"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed', top: 0, bottom: 0,
          right: menuOpen ? 0 : -280,
          width: 280, zIndex: 200,
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          padding: '80px 32px 40px',
          gap: 0, listStyle: 'none',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'right 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
        className="md:hidden"
      >
        {links.map(link => (
          <li key={link.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <a
              href={link.href}
              onClick={close}
              style={{
                display: 'block', padding: '16px 0',
                fontSize: '1rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none',
                color: 'var(--color-cream)',
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li style={{ marginTop: 24 }}>
          <a
            href="mailto:vancetindoc@gmail.com"
            onClick={close}
            style={{
              display: 'block', textAlign: 'center',
              border: '1.5px solid var(--color-orange)',
              color: 'var(--color-orange)',
              padding: '12px', borderRadius: 2,
              fontSize: '0.9rem', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}
          >
            Hire Me
          </a>
        </li>
      </ul>
    </>
  )
}
