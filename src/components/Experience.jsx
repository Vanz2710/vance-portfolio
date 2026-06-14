import { useInView } from '../hooks/useInView'

const experience = [
  {
    period: '2024 — Present',
    role: 'Software Developer Intern',
    company: 'Bluedale Group of Companies',
    desc: 'Developed a full-stack multi-user CRM system from the ground up — designed database architecture, built RESTful APIs with Laravel, and created a Vue 3 SPA frontend with RBAC. Collaborated on feature planning and production deployment.',
  },
  {
    period: 'June 2024 — July 2024',
    role: 'Private Tutor',
    company: 'Self-Employed',
    desc: 'Developed and delivered customised lesson plans for Python programming and Microsoft Word. Guided students through Python logic and syntax, improving their digital literacy and software skills.',
  },
  {
    period: 'Nov 2022 — Apr 2023',
    role: 'Customer Service Associate',
    company: 'The Peranakan',
    desc: 'Delivered fast, client-focused service in a high-volume environment. Processed daily transactions accurately, managed POS operations, and provided team leadership during peak hours.',
  },
  {
    period: 'May 2023 — Present',
    role: "Bachelor's in Information Technology",
    company: 'HELP University  ·  CGPA 3.32',
    desc: 'Studying software development, system design, data analysis, and UI/UX principles. Built multiple academic and personal projects across Java, Python, JavaScript, Angular, Django, and Laravel. Active in tech communities and open-source development.',
  },
]

function ExpItem({ item }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className="exp-item reveal"
      style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div className="exp-period">{item.period}</div>
      <div>
        <div className="exp-role">{item.role}</div>
        <div className="exp-company"
          dangerouslySetInnerHTML={{ __html: item.company }}
        />
        <p className="exp-desc">{item.desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience">
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="sec-label">05 / Experience</div>
        <h2 className="sec-title">Where I've<br />Worked &amp; Learned</h2>
      </div>

      <div className="exp-list">
        {experience.map((item, i) => (
          <ExpItem key={i} item={item} />
        ))}
      </div>
    </section>
  )
}
