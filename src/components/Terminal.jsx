import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'
import { tick } from '../sound'

/* Interactive shell — the same verbs the command palette dispatches
   (via App's execAction) plus read-only fs flavor and easter eggs.
   Output lines: { t: 'in' | 'txt' | 'dim' | 'ok' | 'err' | 'acc', s } */

const PROMPT = 'visitor@vance:~$'

const HELP = [
  ['help', 'this list'],
  ['ls [projects|skills]', 'list contents'],
  ['cat about.txt', 'who is vance?'],
  ['cd <section>', 'jump — projects · skills · about-me · experience · education · resume · contacts'],
  ['theme dark|light', 'glitch the theme'],
  ['accent <color>', 'purple · blue · green · yellow'],
  ['tour', 'auto-tour every section'],
  ['cv', 'download the CV'],
  ['open github|linkedin', 'external links'],
  ['sudo hire-me', 'run with elevated privileges'],
  ['whoami · neofetch · history · clear', 'the usual suspects'],
]

const SECTIONS = ['home', 'projects', 'skills', 'about-me', 'experience', 'education', 'resume', 'ai-workflow', 'terminal', 'contacts']
const ACCENT_NAMES = ['purple', 'blue', 'green', 'yellow']

const NEOFETCH = [
  { t: 'acc', s: ' ┌─┐┌─┐' },
  { t: 'acc', s: ' └─┘└─┘   vance@portfolio' },
  { t: 'txt', s: '  os      one-dark linux v2.0' },
  { t: 'txt', s: '  role    full-stack developer · IT graduate' },
  { t: 'txt', s: '  stack   laravel · vue 3 · react · django · esp32' },
  { t: 'txt', s: '  base    kuala lumpur, malaysia' },
  { t: 'txt', s: '  now     software developer intern @ bluedale group' },
]

export default function Terminal({ onAction }) {
  const [lines, setLines] = useState([
    { t: 'dim', s: "vance-portfolio shell — type 'help' to list commands" },
  ])
  const [value, setValue] = useState('')
  const [past, setPast] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const outRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight
  }, [lines])

  const run = (raw) => {
    const cmd = raw.trim()
    const [head, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(' ')
    const out = []
    let action = null

    if (cmd === '' ) return { out }
    if (head === 'clear') return { out, clear: true }
    else if (head === 'help') {
      out.push({ t: 'txt', s: 'available commands:' })
      HELP.forEach(([c, d]) => out.push({ t: 'dim', s: '  ' + c.padEnd(24) + d }))
    } else if (head === 'ls') {
      if (arg === 'projects') PROJECTS.forEach((p) => out.push({ t: 'txt', s: '  ' + p.slug + '/' }))
      else if (arg === 'skills') out.push({ t: 'txt', s: '  frontend/  backend/  tools-infra/  design/' })
      else out.push({ t: 'txt', s: '  projects/  skills/  about.txt  cv.pdf' })
    } else if (head === 'cat') {
      if (arg === 'about.txt') {
        out.push({ t: 'txt', s: "Vance Luke Tindoc — IT student at HELP University, Kuala Lumpur." })
        out.push({ t: 'txt', s: 'Full-stack developer: Laravel, Django and Node.js backends, Vue 3 /' })
        out.push({ t: 'txt', s: 'Angular / React frontends. Currently interning at Bluedale Group.' })
        out.push({ t: 'txt', s: 'Cares about clean code, good architecture and continuous learning.' })
      } else if (arg === 'cv.pdf') out.push({ t: 'err', s: "cat: cv.pdf is binary — try 'cv' to download it" })
      else out.push({ t: 'err', s: 'cat: ' + (arg || 'file') + ': no such file' })
    } else if (head === 'cd') {
      const target = arg === '~' || arg === '' ? 'home' : arg.replace(/^~\//, '')
      if (SECTIONS.includes(target)) {
        out.push({ t: 'ok', s: '→ ~/' + target })
        action = ['jump', target]
      } else out.push({ t: 'err', s: 'cd: no such section: ' + arg })
    } else if (head === 'pwd') {
      out.push({ t: 'txt', s: '/home/visitor/vance-portfolio' })
    } else if (head === 'whoami') {
      out.push({ t: 'txt', s: 'vance tindoc — full-stack developer · kuala lumpur' })
    } else if (head === 'neofetch') {
      out.push(...NEOFETCH)
    } else if (head === 'history') {
      past.forEach((p, i) => out.push({ t: 'dim', s: '  ' + String(i + 1).padStart(3) + '  ' + p }))
      if (!past.length) out.push({ t: 'dim', s: '  (empty)' })
    } else if (head === 'theme') {
      if (arg === 'dark' || arg === 'light') {
        out.push({ t: 'ok', s: 'glitching into ' + arg + ' mode…' })
        action = ['theme', arg]
      } else out.push({ t: 'err', s: 'usage: theme dark|light' })
    } else if (head === 'accent') {
      if (ACCENT_NAMES.includes(arg)) {
        out.push({ t: 'ok', s: 'accent → ' + arg })
        action = ['accent', arg]
      } else if (arg === 'crimson') {
        out.push({ t: 'err', s: 'accent: crimson is locked. try an old cheat code…' })
      } else out.push({ t: 'err', s: 'usage: accent purple|blue|green|yellow' })
    } else if (head === 'tour' || (head === 'run' && arg === 'tour')) {
      out.push({ t: 'ok', s: 'starting tour — any input exits' })
      action = ['tour']
    } else if (head === 'cv' || cmd === 'download cv') {
      out.push({ t: 'ok', s: 'downloading vance-tindoc-cv.pdf…' })
      action = ['cv']
    } else if (head === 'open') {
      if (arg === 'github') { out.push({ t: 'ok', s: '↗ github.com/Vanz2710' }); action = ['open', 'https://github.com/Vanz2710'] }
      else if (arg === 'linkedin') { out.push({ t: 'ok', s: '↗ linkedin.com/in/vancetindoc' }); action = ['open', 'https://linkedin.com/in/vancetindoc/'] }
      else out.push({ t: 'err', s: 'usage: open github|linkedin' })
    } else if (head === 'mail') {
      out.push({ t: 'ok', s: 'composing…' })
      action = ['mail', 'mailto:vancetindoc@gmail.com']
    } else if (head === 'sudo') {
      if (arg === 'hire-me') {
        out.push({ t: 'ok', s: 'permission granted — inbox unlocked' })
        action = ['hire']
      } else out.push({ t: 'err', s: 'visitor is not in the sudoers file. this incident will be reported.' })
    } else if (head === 'rm') {
      out.push({ t: 'err', s: 'rm: permission denied — nice try.' })
    } else if (head === 'echo') {
      out.push({ t: 'txt', s: arg })
    } else if (head === 'konami') {
      out.push({ t: 'dim', s: '↑ ↑ ↓ ↓ ← → ← → B A — somewhere outside this input.' })
    } else if (head === 'exit' || head === 'logout') {
      out.push({ t: 'err', s: 'there is no escape. try `sudo hire-me` instead.' })
    } else {
      out.push({ t: 'err', s: 'bash: ' + head + ": command not found — try 'help'" })
    }
    return { out, action }
  }

  const onKeyDown = (e) => {
    tick()
    if (e.key === 'Enter') {
      const raw = value
      setValue('')
      setHistIdx(-1)
      const { out, action, clear } = run(raw)
      if (raw.trim()) setPast((p) => [...p.slice(-40), raw.trim()])
      setLines((prev) => {
        if (clear) return []
        return [...prev, { t: 'in', s: raw }, ...out].slice(-160)
      })
      if (action) onAction(action)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!past.length) return
      const idx = histIdx < 0 ? past.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setValue(past[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const idx = histIdx + 1
      if (idx >= past.length) { setHistIdx(-1); setValue('') }
      else { setHistIdx(idx); setValue(past[idx]) }
    }
  }

  const focusInput = () => {
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed) return // don't steal an in-progress text selection
    inputRef.current?.focus()
  }

  return (
    <section id="terminal" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">terminal</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 300 }} />
      </div>
      <div className="term-win" data-rv="up" onClick={focusInput}>
        <div className="term-bar">
          <span className="term-dot term-dot--r" />
          <span className="term-dot term-dot--y" />
          <span className="term-dot term-dot--g" />
          <span className="term-title">visitor@vance — bash</span>
        </div>
        <div className="term-out" ref={outRef}>
          {lines.map((l, i) =>
            l.t === 'in' ? (
              <div key={i} className="tline">
                <span className="acc">{PROMPT}</span> <span className="white">{l.s}</span>
              </div>
            ) : (
              <div key={i} className={'tline tline--' + l.t}>{l.s}</div>
            )
          )}
        </div>
        <div className="term-in">
          <span className="term-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Portfolio terminal — type help for commands"
          />
        </div>
      </div>
    </section>
  )
}
