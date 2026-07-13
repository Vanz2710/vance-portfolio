import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from './data/projects'
import { initPageEffects, themeGlitch } from './fx'
import Boot from './components/Boot'
import Background from './components/Background'
import SocialRail from './components/SocialRail'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import Quote from './components/Quote'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Experience from './components/Experience'
import Resume from './components/Resume'
import AIWorkflow from './components/AIWorkflow'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ProjectModal from './components/ProjectModal'

// Site-level knobs (the design's configurable props).
const SETTINGS = {
  accent: 'purple', // options: purple · blue · green · yellow
  theme: 'dark', // default when no saved preference · options: dark · light — keep index.html's pre-paint fallback in sync
  cursorFx: true,
  showAiSection: true,
}

// Accent hex per theme: One Dark values on dark, One Light on light
// (the dark accents don't have enough contrast on a white background).
const ACCENTS = {
  purple: { dark: '#C778DD', light: '#A626A4' },
  blue: { dark: '#61AFEF', light: '#4078F2' },
  green: { dark: '#98C379', light: '#50A14F' },
  yellow: { dark: '#E5C07B', light: '#C18401' },
}

const THEME_BG = { dark: '#282C33', light: '#FAFAFA' }

function initialTheme() {
  try {
    const saved = localStorage.getItem('vt-theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch { /* storage unavailable */ }
  return SETTINGS.theme
}

// Command palette entries: [verb, arg] pairs dispatched in runCmd.
const COMMANDS = [
  { cmd: 'cd home', desc: 'jump to top', action: ['jump', 'home'] },
  { cmd: 'cd projects', desc: 'jump to projects', action: ['jump', 'projects'] },
  { cmd: 'cd skills', desc: 'jump to skills', action: ['jump', 'skills'] },
  { cmd: 'cd about-me', desc: 'jump to about', action: ['jump', 'about-me'] },
  { cmd: 'cd experience', desc: 'jump to experience', action: ['jump', 'experience'] },
  { cmd: 'cd resume', desc: 'jump to resume', action: ['jump', 'resume'] },
  { cmd: 'cd contacts', desc: 'jump to contacts', action: ['jump', 'contacts'] },
  { cmd: 'open github', desc: 'github.com/Vanz2710 ↗', action: ['open', 'https://github.com/Vanz2710'] },
  { cmd: 'open linkedin', desc: 'linkedin.com/in/vancetindoc ↗', action: ['open', 'https://linkedin.com/in/vancetindoc/'] },
  { cmd: 'mail vance', desc: 'compose an email', action: ['mail', 'mailto:vancetindoc@gmail.com'] },
  { cmd: 'download cv', desc: 'save vance-tindoc-cv.pdf', action: ['cv'] },
  { cmd: 'accent purple', desc: 'theme accent → purple', action: ['accent', 'purple'] },
  { cmd: 'accent blue', desc: 'theme accent → blue', action: ['accent', 'blue'] },
  { cmd: 'accent green', desc: 'theme accent → green', action: ['accent', 'green'] },
  { cmd: 'accent yellow', desc: 'theme accent → yellow', action: ['accent', 'yellow'] },
  { cmd: 'theme light', desc: 'glitch into light mode', action: ['theme', 'light'] },
  { cmd: 'theme dark', desc: 'glitch into dark mode', action: ['theme', 'dark'] },
  { cmd: 'whoami', desc: 'print identity', action: ['toast', 'vance tindoc — full-stack developer · kuala lumpur'] },
  { cmd: 'sudo hire-me', desc: 'run with elevated privileges', action: ['hire'] },
]

function jump(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' })
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalId, setModalId] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [palOpen, setPalOpen] = useState(false)
  const [palQuery, setPalQuery] = useState('')
  const [palSel, setPalSel] = useState(0)
  const [toast, setToast] = useState('')
  const [accentName, setAccentName] = useState(SETTINGS.accent)
  const [theme, setTheme] = useState(initialTheme)
  const toastTimer = useRef(null)

  const accent = (ACCENTS[accentName] ?? ACCENTS.purple)[theme]

  /* persistence lives here (not in the effect) so a first visit that never
     toggles doesn't freeze the site default into localStorage */
  const switchTheme = (next) => {
    const target = next ?? (theme === 'dark' ? 'light' : 'dark')
    if (target === theme) return
    themeGlitch(() => {
      setTheme(target)
      try { localStorage.setItem('vt-theme', target) } catch { /* storage unavailable */ }
    })
  }

  const openPalette = () => {
    setPalOpen(true)
    setPalQuery('')
    setPalSel(0)
  }
  const closePalette = () => setPalOpen(false)

  const showToast = (msg) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(''), 2800)
  }

  const runCmd = (c) => {
    closePalette()
    const [verb, arg] = c.action
    if (verb === 'jump') jump(arg)
    else if (verb === 'open') window.open(arg, '_blank')
    else if (verb === 'mail') window.location.assign(arg)
    else if (verb === 'accent') {
      setAccentName(arg)
      showToast('accent set to ' + arg)
    } else if (verb === 'theme') {
      if (arg === theme) showToast('already in ' + arg + ' mode')
      else switchTheme(arg)
    } else if (verb === 'toast') showToast(arg)
    else if (verb === 'cv') {
      const a = document.createElement('a')
      a.href = '/vance-tindoc-cv.pdf'
      a.download = 'Vance-Tindoc-CV.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      showToast('downloading vance-tindoc-cv.pdf')
    }
    else if (verb === 'hire') {
      jump('contacts')
      showToast('permission granted — inbox unlocked')
    }
  }

  const q = palQuery.trim().toLowerCase()
  const filteredCmds = q ? COMMANDS.filter((c) => (c.cmd + ' ' + c.desc).toLowerCase().includes(q)) : COMMANDS

  /* one-time imperative page effects (boot, reveals, cursor, parallax, ...) */
  useEffect(() => initPageEffects({ cursorFx: SETTINGS.cursorFx }), [])

  /* reflect theme on <html> (index.html pre-paint script sets the initial value) */
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_BG[theme])
  }, [theme])

  /* body scroll lock while any overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen || palOpen || modalId !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, palOpen, modalId])

  /* app-wide keyboard shortcuts */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        if (palOpen) {
          setPalOpen(false)
        } else {
          setPalOpen(true)
          setPalQuery('')
          setPalSel(0)
        }
        return
      }
      const t = e.target
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')
      if (e.key === '/' && !typing && !palOpen && modalId === null) {
        e.preventDefault()
        setPalOpen(true)
        setPalQuery('')
        setPalSel(0)
        return
      }
      if (e.key === 'Escape') {
        if (palOpen) { setPalOpen(false); return }
        if (modalId !== null) setModalId(null)
        if (menuOpen) setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [palOpen, modalId, menuOpen])

  return (
    <div className="site" data-cfx={SETTINGS.cursorFx ? '1' : '0'} style={{ '--ac': accent }}>
      <a href="#home" className="skip">skip to content ~~&gt;</a>

      <Boot />
      <Background />
      <div className="progress" data-prog="" />
      <div className="cursor-dot" data-cur-dot="" />
      <SocialRail />

      <Navbar
        menuOpen={menuOpen}
        theme={theme}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onOpenPalette={openPalette}
        onToggleTheme={() => switchTheme()}
      />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <main className="main pad-x">
        <Hero />
        <Quote />
        <Marquee />
        <Projects showAll={showAll} onToggleAll={() => setShowAll((v) => !v)} onOpen={setModalId} />
        <Skills />
        <About />
        <Experience />
        <Resume />
        {SETTINGS.showAiSection && <AIWorkflow />}
        <Contact />
      </main>

      <button
        className="top-btn"
        data-top=""
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        cd ~
      </button>

      <Footer />

      {palOpen && (
        <CommandPalette
          commands={filteredCmds}
          sel={palSel}
          onQuery={(v) => { setPalQuery(v); setPalSel(0) }}
          onSel={setPalSel}
          onRun={runCmd}
          onClose={closePalette}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="acc">✓</span> {toast}
        </div>
      )}

      {modalId !== null && <ProjectModal project={PROJECTS[modalId]} onClose={() => setModalId(null)} />}
    </div>
  )
}
