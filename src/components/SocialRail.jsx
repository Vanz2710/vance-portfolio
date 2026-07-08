import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

export default function SocialRail() {
  return (
    <div className="social-rail">
      <div className="rail-line" />
      <a href="https://github.com/Vanz2710" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rail-link">
        <GithubIcon />
      </a>
      <a href="https://linkedin.com/in/vancetindoc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rail-link">
        <LinkedinIcon />
      </a>
      <a href="mailto:vancetindoc@gmail.com" aria-label="Email" className="rail-link">
        <MailIcon />
      </a>
    </div>
  )
}
