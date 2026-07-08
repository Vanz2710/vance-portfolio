import { useEffect, useRef } from 'react'

export default function CommandPalette({ commands, sel, onQuery, onSel, onRun, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [])

  const selIdx = Math.min(sel, Math.max(0, commands.length - 1))

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onSel(Math.min(selIdx + 1, commands.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onSel(Math.max(selIdx - 1, 0))
    } else if (e.key === 'Enter') {
      const c = commands[selIdx]
      if (c) onRun(c)
    }
  }

  return (
    <div className="pal-ov" onClick={onClose}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <div className="term-bar">
          <span className="term-dot term-dot--r" />
          <span className="term-dot term-dot--y" />
          <span className="term-dot term-dot--g" />
          <span className="term-title">vance@portfolio:~ — command palette</span>
        </div>
        <div className="pal-input-row">
          <span className="acc" style={{ fontSize: 14 }}>~$</span>
          <input
            ref={inputRef}
            type="text"
            className="pal-input"
            aria-label="Type a command"
            placeholder="try: cd projects · accent blue · sudo hire-me"
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="pal-caret" />
        </div>
        <div className="pal-list">
          {commands.map((c, i) => (
            <button
              key={c.cmd}
              className={`pal-item${i === selIdx ? ' pal-item--sel' : ''}`}
              onClick={() => onRun(c)}
            >
              <span className="pal-cmd">{c.cmd}</span>
              <span className="pal-desc">{c.desc}</span>
            </button>
          ))}
          {commands.length === 0 && <div className="pal-empty">command not found — try cd projects</div>}
        </div>
        <div className="pal-foot">
          <span>↑↓ select</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
