import { useState } from 'react'
import { PROJECTS } from '../data/projects'

/* Screenshot slot: tries /projects/<slug>.png then .jpg from /public;
   falls back to a labelled placeholder until a file is dropped in. */
function Shot({ project }) {
  const [attempt, setAttempt] = useState(0)
  const exts = ['png', 'jpg']
  return (
    <div className="pcard-shot" aria-hidden="true">
      {attempt < exts.length ? (
        <img
          src={`/projects/${project.shot}.${exts[attempt]}`}
          alt=""
          style={project.shotPos ? { objectPosition: project.shotPos } : undefined}
          onError={() => setAttempt(attempt + 1)}
        />
      ) : (
        <span className="shot-ph">{project.shotLabel}</span>
      )}
    </div>
  )
}

function Card({ project, index, extraClass, delay, onOpen }) {
  return (
    <article
      className={`pcard${extraClass ? ` ${extraClass}` : ''}`}
      data-hov=""
      data-rv={extraClass ? undefined : 'up'}
      data-rvd={delay ?? undefined}
    >
      <Shot project={project} />
      <div className="pcard-tags">{project.cardTags.join('  ')}</div>
      <div className="pcard-body">
        <div className="pcard-titlerow">
          <h3 className="pcard-name">{project.cardName}</h3>
          <span className="pcard-year">{project.year}</span>
        </div>
        <p className="pcard-desc">{project.cardDesc}</p>
        <div className="pcard-actions">
          <button className="btn-case" onClick={() => onOpen(index)}>case-study ⟫</button>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-gh">
              github ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects({ showAll, onToggleAll, onOpen }) {
  return (
    <section id="projects" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">projects</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 340 }} />
        <div className="sec-spacer" />
        <button className="view-all" onClick={onToggleAll}>
          {showAll ? 'show-less <~' : 'view-all ~~>'}
        </button>
      </div>

      <div className="proj-grid">
        <Card project={PROJECTS[0]} index={0} onOpen={onOpen} />
        <Card project={PROJECTS[1]} index={1} delay="110" onOpen={onOpen} />
        <Card project={PROJECTS[2]} index={2} delay="220" onOpen={onOpen} />
      </div>

      {showAll && (
        <div className="proj-grid proj-grid--more">
          <Card project={PROJECTS[3]} index={3} extraClass="pcard--in1" onOpen={onOpen} />
          <Card project={PROJECTS[4]} index={4} extraClass="pcard--in2" onOpen={onOpen} />
          <Card project={PROJECTS[5]} index={5} extraClass="pcard--in3" onOpen={onOpen} />
        </div>
      )}
    </section>
  )
}
