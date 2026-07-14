const ITEMS = [
  {
    date: '[2023 – present]',
    role: "Bachelor's Degree in Information Technology (Honours)",
    org: 'HELP University · CGPA 3.32',
    desc: 'Software development, system design, data analysis and UI/UX principles — with academic and personal projects across Java, Python, JavaScript, Angular, Django and Laravel.',
    delay: null,
    last: true,
  },
]

export default function Education() {
  return (
    <section id="education" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">education</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 280 }} />
      </div>
      <div className="exp-list">
        {ITEMS.map((it) => (
          <div key={it.role} className="exp-item" data-rv="left" data-rvd={it.delay ?? undefined}>
            <div className="exp-date">{it.date}</div>
            <div className={`exp-body${it.last ? ' exp-body--last' : ''}`}>
              <span className={`exp-dot${it.last ? ' exp-dot--fill' : ''}`} aria-hidden="true" />
              <div className="exp-role">{it.role}</div>
              <div className="exp-org">
                <span className="acc">@</span> {it.org}
              </div>
              <p className="exp-desc">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
