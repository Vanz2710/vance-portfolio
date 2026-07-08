const TOOLS = [
  {
    name: 'Claude',
    vendor: 'Anthropic',
    tag: '// primary engineering assistant',
    delay: null,
    points: [
      'Draft boilerplate so I focus on the hard parts',
      'Pressure-test my architecture & refactor plans',
      'Debug by rubber-ducking, then verifying by hand',
      'Speed up technical writing & documentation',
    ],
  },
  {
    name: 'Google Gemini',
    vendor: 'Google DeepMind',
    tag: '// research & second opinion',
    delay: '120',
    points: [
      'Research unfamiliar APIs & libraries quickly',
      'Cross-check solutions for a second opinion',
      'Summarise long docs & specs before diving in',
      'Reason over screenshots, diagrams & images',
    ],
  },
]

export default function AIWorkflow() {
  return (
    <section id="ai-workflow" className="sec">
      <div className="sec-head sec-head--tight" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">ai-workflow</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 260 }} />
      </div>
      <p className="ai-intro" data-rv="up">
        AI accelerates my workflow — but I own the decisions. Every suggestion is a draft to review, not an answer to
        trust.
      </p>
      <div className="ai-grid">
        {TOOLS.map((tool) => (
          <div key={tool.name} className="ai-card" data-rv="up" data-rvd={tool.delay ?? undefined}>
            <div className="ai-head">
              <span className="ai-name">{tool.name}</span>
              <span className="ai-vendor">{tool.vendor}</span>
            </div>
            <div className="ai-tag">{tool.tag}</div>
            <div className="ai-list">
              {tool.points.map((p) => (
                <div key={p} className="ai-li">
                  <span className="acc">→</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
