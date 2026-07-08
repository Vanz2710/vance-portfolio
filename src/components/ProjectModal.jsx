export default function ProjectModal({ project, onClose }) {
  const p = project
  return (
    <div className="modal-ov" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project case study"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="term-bar">
          <span className="term-dot term-dot--r" />
          <span className="term-dot term-dot--y" />
          <span className="term-dot term-dot--g" />
          <span className="term-title">vance@portfolio:~/projects/{p.slug}</span>
          <button className="modal-x" onClick={onClose} aria-label="Close case study">✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-toprow">
            <h3 className="modal-name">{p.name}</h3>
            <span className="badge">{p.status}</span>
            <span className="modal-type">{p.type}</span>
          </div>
          <div className="modal-meta">
            <div>
              <span className="meta-key">role&nbsp; </span>
              <span className="meta-val">{p.role}</span>
            </div>
            <div>
              <span className="meta-key">duration&nbsp; </span>
              <span className="meta-val">{p.duration}</span>
            </div>
          </div>

          <div className="cmdline cmdline--first">
            <span className="acc">$</span> <span className="white">cat</span> <span className="cmd-arg">overview.md</span>
          </div>
          <p className="modal-p">{p.longDesc}</p>

          {p.problem && (
            <>
              <div className="cmdline">
                <span className="acc">$</span> <span className="white">cat</span> <span className="cmd-arg">problem.md</span>
              </div>
              <p className="modal-p">{p.problem}</p>
            </>
          )}

          {p.metrics.length > 0 && (
            <>
              <div className="cmdline">
                <span className="acc">$</span> <span className="white">./metrics</span>{' '}
                <span className="cmd-arg">--report</span>
              </div>
              <div className="metrics">
                {p.metrics.map((mt) => (
                  <div key={mt.label} className="metric">
                    <div className="metric-num">{mt.value}</div>
                    <div className="metric-label">{mt.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="cmdline">
            <span className="acc">$</span> <span className="white">ls</span> <span className="cmd-arg">execution/</span>
          </div>
          <div className="modal-list">
            {p.bullets.map((b) => (
              <div key={b} className="modal-li">
                <span className="acc">→</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="modal-tags">
            {p.tags.map((tg) => (
              <span key={tg} className="mtag">{tg}</span>
            ))}
          </div>

          <div className="modal-actions">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" data-mag="" className="btn-src">
                view source ↗
              </a>
            )}
            <button className="btn-close" onClick={onClose}>close [esc]</button>
          </div>
        </div>
      </div>
    </div>
  )
}
