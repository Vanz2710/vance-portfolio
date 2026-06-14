import { useInView } from '../hooks/useInView'

const tools = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    role: 'Primary engineering assistant',
    logoBg: '#1c110a',
    logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg',
    logoFilter: 'invert(58%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.1)',
    points: [
      'Draft boilerplate so I focus on the hard parts',
      'Pressure-test my architecture & refactor plans',
      'Debug by rubber-ducking, then verifying by hand',
      'Speed up technical writing & documentation',
    ],
  },
  {
    name: 'Google Gemini',
    maker: 'Google DeepMind',
    role: 'Research & second opinion',
    logoBg: '#1a1a2e',
    logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlegemini.svg',
    logoFilter: 'invert(60%) sepia(80%) saturate(400%) hue-rotate(180deg) brightness(1.2)',
    points: [
      'Research unfamiliar APIs & libraries quickly',
      'Cross-check solutions for a second opinion',
      'Summarise long docs & specs before I dive in',
      'Reason over screenshots, diagrams & images',
    ],
  },
]

export default function AITools() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="ai-tools">
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="sec-label">04 / Workflow</div>
        <h2 className="sec-title">How I Work<br />With AI</h2>
        <p className="ai-intro">
          AI accelerates my workflow — but I own the decisions. I treat every
          suggestion as a draft to review, not an answer to trust.
        </p>
      </div>

      <div className="ai-grid">
        {tools.map(tool => (
          <div key={tool.name} className="ai-card reveal">
            <div className="ai-logo-wrap" style={{ background: tool.logoBg }}>
              <img
                src={tool.logoSrc}
                width="30" height="30"
                style={{ filter: tool.logoFilter }}
                alt={tool.name}
              />
            </div>
            <div className="ai-name">{tool.name}</div>
            <div className="ai-maker">{tool.maker}</div>
            <div className="ai-role">{tool.role}</div>
            <ul className="ai-points">
              {tool.points.map(pt => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
