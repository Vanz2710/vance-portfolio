import { useRef, useState } from 'react'

// FormSubmit AJAX endpoint — delivers straight to the inbox, no backend needed.
// NOTE: the very first submission triggers a one-time activation email to this
// address; click the link in it and every submission after that is delivered.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/vancetindoc@gmail.com'

const ROWS = [
  { key: 'email', val: 'vancetindoc@gmail.com ↗', href: 'mailto:vancetindoc@gmail.com', external: false },
  { key: 'github', val: 'github.com/Vanz2710 ↗', href: 'https://github.com/Vanz2710', external: true },
  { key: 'linkedin', val: 'linkedin.com/in/vancetindoc ↗', href: 'https://linkedin.com/in/vancetindoc/', external: true },
  { key: 'phone', val: '+60 11 3162 2462 ↗', href: 'tel:+601131622462', external: false, last: true },
]

const SEND_LABELS = {
  idle: 'send message ~~>',
  sending: 'sending ...',
  sent: 'message sent ✓ — thanks!',
  error: 'retry ~~>',
}

export default function Contact() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const msgRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errs, setErrs] = useState({ name: '', email: '', msg: '' })

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return
    const n = nameRef.current?.value.trim() || ''
    const em = emailRef.current?.value.trim() || ''
    const ms = msgRef.current?.value.trim() || ''
    const okEm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
    const next = {
      name: n ? '' : '// name is required',
      email: em ? (okEm ? '' : '// enter a valid email') : '// email is required',
      msg: ms ? '' : '// message is required',
    }
    if (next.name || next.email || next.msg) {
      setErrs(next)
      return
    }
    setErrs({ name: '', email: '', msg: '' })
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: n,
          email: em,
          message: ms,
          _subject: `Portfolio contact — ${n}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      // FormSubmit replies 200 even when it can't deliver (e.g. form not yet
      // activated), so trust the JSON body rather than the status code alone.
      const data = await res.json().catch(() => null)
      const ok = res.ok && data && (data.success === true || data.success === 'true')
      if (!ok) throw new Error('delivery failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacts" className="sec sec--contacts">
      <div className="sec-head" data-rv="up">
        <h2 className="sec-title">
          <span className="acc">#</span>
          <span data-scr="">contacts</span>
        </h2>
        <div className="sec-line" data-line="" style={{ maxWidth: 280 }} />
      </div>
      <div className="contact-grid">
        <div data-rv="up">
          <p className="contact-desc">
            Whether you have a project in mind, want to chat about an opportunity, or just want to say hi — my inbox is
            always open.
          </p>
          <div className="contact-rows">
            {ROWS.map((r) => (
              <a
                key={r.key}
                href={r.href}
                className={`contact-row${r.last ? ' contact-row--last' : ''}`}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-key">{r.key}</span>
                <span className="contact-val">{r.val}</span>
              </a>
            ))}
          </div>
        </div>
        <form className="cform" data-rv="up" data-rvd="120" onSubmit={submit}>
          <div className="mini-label">// drop a message</div>
          <div className="field">
            <label htmlFor="f-name">
              name <span className="acc">*</span>
            </label>
            <input
              id="f-name"
              ref={nameRef}
              type="text"
              placeholder="Jane Doe"
              className={`inp${errs.name ? ' inp--bad' : ''}`}
            />
            <div className="ferr">{errs.name}</div>
          </div>
          <div className="field">
            <label htmlFor="f-email">
              email <span className="acc">*</span>
            </label>
            <input
              id="f-email"
              ref={emailRef}
              type="text"
              placeholder="jane@example.com"
              className={`inp${errs.email ? ' inp--bad' : ''}`}
            />
            <div className="ferr">{errs.email}</div>
          </div>
          <div className="field">
            <label htmlFor="f-msg">
              message <span className="acc">*</span>
            </label>
            <textarea
              id="f-msg"
              ref={msgRef}
              rows="4"
              placeholder="Tell me about your project..."
              className={`inp${errs.msg ? ' inp--bad' : ''}`}
            />
            <div className="ferr">{errs.msg}</div>
          </div>
          <button type="submit" data-mag="" disabled={status === 'sending' || status === 'sent'} className="btn-send">
            {SEND_LABELS[status]}
          </button>
          {status === 'error' && (
            <div className="ferr">// delivery failed — please retry, or email me directly</div>
          )}
        </form>
      </div>
    </section>
  )
}
