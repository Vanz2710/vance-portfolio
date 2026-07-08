import { LogoMark } from './Icons'

const LINKS = ['home', 'projects', 'skills', 'about-me', 'experience', 'contacts']

export default function Navbar({ menuOpen, onToggleMenu, onOpenPalette }) {
  return (
    <nav className={`nav${menuOpen ? ' nav--raised' : ''}`} data-nav="" aria-label="Main">
      <a href="#home" className="logo">
        <LogoMark />
        <span className="logo-text">
          vance<span className="logo-cursor">_</span>
        </span>
      </a>
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
      <button className="burger" onClick={onToggleMenu} aria-label="Toggle menu">
        {menuOpen ? '✕' : '≡'}
      </button>
    </nav>
  )
}
