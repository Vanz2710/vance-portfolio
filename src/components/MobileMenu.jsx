const LINKS = ['home', 'projects', 'skills', 'about-me', 'experience', 'contacts']

export default function MobileMenu({ onClose }) {
  return (
    <div className="mmenu">
      <div className="mmenu-links">
        {LINKS.map((id) => (
          <a key={id} href={`#${id}`} onClick={onClose} className="mmenu-link">
            <span className="acc">#</span>
            {id}
          </a>
        ))}
      </div>
      <div className="mmenu-social">
        <a href="https://github.com/Vanz2710" target="_blank" rel="noopener noreferrer">github ↗</a>
        <a href="https://linkedin.com/in/vancetindoc/" target="_blank" rel="noopener noreferrer">linkedin ↗</a>
      </div>
    </div>
  )
}
