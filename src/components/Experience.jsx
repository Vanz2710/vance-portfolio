const ITEMS = [
  {
    date: '[April 2026 – present]',
    role: 'Software Developer Intern',
    org: 'Bluedale Group of Companies',
    desc: 'Developed a full-stack multi-user CRM from the ground up — designed the database architecture, built RESTful APIs with Laravel, and created a Vue 3 SPA frontend with role-based access control. Deployed it to production on cPanel and completed the handover — now building the KL The Guide mobile app with Flutter.',
    delay: null,
  },
  {
    date: '[jun – jul 2024]',
    role: 'Private Tutor',
    org: 'Self-employed',
    desc: 'Designed and delivered customised lesson plans for Python programming and Microsoft Word, guiding students through logic, syntax and digital literacy.',
    delay: '80',
  },
  {
    date: '[nov 22 – apr 23]',
    role: 'Customer Service Associate',
    org: 'The Peranakan',
    desc: 'Delivered fast, client-focused service in a high-volume environment — accurate daily transactions, POS operations and team leadership during peak hours.',
    delay: '160',
  },
  {
    date: '[2023 – present]',
    role: 'BSc Information Technology',
    org: 'HELP University · CGPA 3.32',
    desc: 'Software development, system design, data analysis and UI/UX principles — with academic and personal projects across Java, Python, JavaScript, Angular, Django and Laravel.',
    delay: '240',
    last: true,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">experience</span>
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
