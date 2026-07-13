import { GithubIcon, LinkedinIcon, LogoMark, MailIcon } from './Icons'
import SysMon from './SysMon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in pad-x">
        <div className="footer-top">
          <div>
            <div className="footer-id">
              <LogoMark />
              <span className="footer-name">vance</span>
              <a href="mailto:vancetindoc@gmail.com" className="footer-mail">vancetindoc@gmail.com</a>
            </div>
            <div className="footer-tag">Full-stack developer · Kuala Lumpur, Malaysia</div>
          </div>
          <div>
            <div className="footer-media-title">// media</div>
            <div className="footer-social">
              <a href="https://github.com/Vanz2710" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/in/vancetindoc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="mailto:vancetindoc@gmail.com" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
        <SysMon />
        <div className="footer-copy">© 2026 Vance Tindoc — built with too many terminal tabs open</div>
      </div>
    </footer>
  )
}
