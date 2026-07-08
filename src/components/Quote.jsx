export default function Quote() {
  return (
    <section className="quote-sec" data-rv="up">
      <div className="quote-wrap">
        <div className="quote-inner">
          <span className="quote-mark quote-mark--open" aria-hidden="true">"</span>
          <p className="quote-text">Talk is cheap. Show me the code.</p>
          <span className="quote-mark quote-mark--close" aria-hidden="true">"</span>
        </div>
        <div className="quote-author-row">
          <div className="quote-author">— Linus Torvalds</div>
        </div>
      </div>
    </section>
  )
}
