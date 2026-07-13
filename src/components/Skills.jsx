const GROUPS = [
  {
    title: 'Frontend',
    delay: null,
    items: ['JavaScript', 'HTML / CSS', 'Vue 3', 'Angular', 'React', 'Flutter', 'Bootstrap', 'Tailwind CSS', 'WordPress'],
  },
  {
    title: 'Backend',
    delay: '90',
    items: ['Laravel', 'Django', 'Node.js', 'PHP', 'Python', 'Java', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Tools & Infra',
    delay: '180',
    items: ['Git', 'VS Code', 'Postman', 'AWS', 'GCP', 'Docker', 'cPanel', 'Tableau', 'Jupyter', 'Splunk'],
  },
  {
    title: 'Design & Other',
    delay: '270',
    items: ['Figma', 'UI/UX', 'Agile', 'System Design', 'Data Analysis', 'OOP', 'QA'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">skills</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 260 }} />
      </div>
      <div className="skills-grid">
        <div className="skills-deco">
          <div data-plx=".14" style={{ position: 'absolute', left: 8, top: 10, width: 92, height: 92, backgroundImage: 'radial-gradient(rgba(var(--line),.6) 1.2px,transparent 1.2px)', backgroundSize: '16px 16px' }} />
          <div data-plx=".08" style={{ position: 'absolute', right: 26, top: 44, width: 86, height: 86, border: '1px solid rgba(var(--line),.5)', animation: 'floaty 7s ease-in-out infinite' }} />
          <div data-plx=".18" style={{ position: 'absolute', left: 120, top: 150, width: 70, height: 70, backgroundImage: 'radial-gradient(rgba(var(--line),.45) 1.2px,transparent 1.2px)', backgroundSize: '15px 15px' }} />
          <div data-plx=".1" style={{ position: 'absolute', left: 34, top: 196, width: 62, height: 62, border: '1px solid var(--ac,#C778DD)' }} />
          <div data-plx=".1" style={{ position: 'absolute', left: 66, top: 228, width: 62, height: 62, border: '1px solid color-mix(in oklab, var(--ac,#C778DD) 55%, transparent)' }} />
        </div>
        <div className="skills-cards">
          {GROUPS.map((g) => (
            <div key={g.title} className="skill-box" data-rv="up" data-rvd={g.delay ?? undefined}>
              <div className="skill-box-title">{g.title}</div>
              <div className="skill-box-body" data-chip-zone="">
                {g.items.map((it) => (
                  <span key={it} className="sk-item" data-chip="">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
