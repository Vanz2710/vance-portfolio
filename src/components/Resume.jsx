// Served from public/vance-tindoc-cv.pdf — update that file to refresh the CV.
const CV_FILE = '/vance-tindoc-cv.pdf'

export default function Resume() {
  return (
    <section id="resume" className="sec">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">resume</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 280 }} />
      </div>
      <div className="cv-term" data-rv="up">
        <div className="term-bar">
          <span className="term-dot term-dot--r" />
          <span className="term-dot term-dot--y" />
          <span className="term-dot term-dot--g" />
          <span className="term-title">vance@portfolio:~/resume</span>
        </div>
        <div className="cv-body">
          <div className="cv-cmd">
            <span className="acc">~$</span> <span className="white">ls</span> ./resume
          </div>
          <div className="cv-file">
            <span className="cv-name">vance-tindoc-cv.pdf</span>
            <span className="cv-meta">[pdf · 1 page · updated jul 2026]</span>
          </div>
          <p className="cv-desc">
            Education, experience, projects and the stack I work with — the full picture on a single page.
          </p>
          <div className="cv-actions">
            <a href={CV_FILE} download="Vance-Tindoc-CV.pdf" data-mag="" className="btn-acc">
              download cv ~~&gt;
            </a>
            <a href={CV_FILE} target="_blank" rel="noopener noreferrer" className="link-plain">
              open in new tab ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
