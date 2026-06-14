import { useInView } from '../hooks/useInView'

const columns = [
  {
    title: 'Frontend',
    items: ['JavaScript', 'HTML / CSS', 'Vue 3', 'Angular', 'React', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Laravel', 'Django', 'Node.js', 'Java', 'REST APIs', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Tools & Infra',
    items: ['Git', 'VS Code', 'Postman', 'AWS', 'Tableau', 'Jupyter Notebook', 'Splunk'],
  },
  {
    title: 'Design & Other',
    items: ['Figma', 'UI/UX Principles', 'Agile', 'System Design', 'Data Analysis', 'OOP', 'QA'],
  },
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills">
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="sec-label">03 / Skills</div>
        <h2 className="sec-title">What I Work With.</h2>
      </div>

      <div className="skills-cols">
        {columns.map((col, i) => (
          <div key={col.title} className="skill-col">
            <div className="skill-col-title">{col.title}</div>
            <ul className="skill-list">
              {col.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
