import { LogoMark, MoonIcon, PlayIcon, StopIcon, SunIcon } from './Icons'

const LINKS = ['home', 'projects', 'skills', 'about-me', 'experience', 'contacts']

export default function Navbar({ menuOpen, theme, touring, onToggleMenu, onOpenPalette, onToggleTheme, onToggleTour }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  return (
    <nav className={`nav${menuOpen ? ' nav--raised' : ''}`} data-nav="" aria-label="Main">
      <a href="#home" className="logo">
        <LogoMark />
        <span className="logo-text">
          vance<span className="logo-cursor">_</span>
        </span>
      </a>
      <div className="nav-right">
        <div className="nav-links">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} className="nav-link">
              <span className="acc">#</span>
              <span className="nl" data-nl-t={id}>{id}</span>
            </a>
          ))}
          <button className="ctrlk-btn" onClick={onOpenPalette} title="Command palette (Ctrl+K)">
            <span className="acc">&gt;_</span> ctrl+k
          </button>
        </div>
        <button
          className={`theme-btn tour-btn${touring ? ' tour-btn--on' : ''}`}
          data-tour-toggle=""
          onClick={onToggleTour}
          title={touring ? 'Stop the tour' : 'Auto-tour the site'}
          aria-label={touring ? 'Stop the auto-tour' : 'Start the auto-tour'}
          aria-pressed={touring}
        >
          {touring ? <StopIcon /> : <PlayIcon />}
        </button>
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          title={`Switch to ${nextTheme} mode`}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button className="burger" onClick={onToggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✕' : '≡'}
        </button>
      </div>
    </nav>
  )
}
