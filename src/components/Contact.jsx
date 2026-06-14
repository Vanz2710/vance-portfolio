import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const links = [
  { label: 'Email',    value: 'vancetindoc@gmail.com',       href: 'mailto:vancetindoc@gmail.com' },
  { label: 'GitHub',   value: 'github.com/Vanz1233',         href: 'https://github.com/Vanz1233' },
  { label: 'LinkedIn', value: 'linkedin.com/in/vancetindoc', href: 'https://linkedin.com/in/vancetindoc/' },
  { label: 'Phone',    value: '+60 11 3162 2462',            href: 'tel:+601131622462' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const { ref, inView }   = useInView({ threshold: 0.1, triggerOnce: true })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    // TODO: wire to EmailJS or Formspree
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="sec-label reveal">06 / Contact</div>
      <div
        ref={ref}
        className="contact-grid"
        style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Left */}
        <div className="reveal">
          <h2 className="sec-title">Let's Build<br />Something.</h2>
          <p style={{ color: 'var(--color-muted)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, marginBottom: 8 }}>
            Whether you have a project in mind, want to chat about an opportunity, or just want to say hi — my inbox is always open.
          </p>
          <div className="contact-links">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-link-row"
              >
                <span className="contact-link-label">{link.label}</span>
                <span className="contact-link-val">{link.value} &nbsp;→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="form-field">
            <div className="form-label">Name</div>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <div className="form-label">Email</div>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <div className="form-label">Message</div>
            <textarea
              className="form-textarea"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className={`form-submit${sent ? ' sent' : ''}`}
            disabled={sent}
          >
            {sent ? 'Message Sent ✓' : 'Send Message  →'}
          </button>
        </form>
      </div>
    </section>
  )
}
