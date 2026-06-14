import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    id: 0, num: '01',
    name: 'DBM Bluedale — CRM',
    type: 'Web App  ·  2024–2025',
    desc: 'Full-stack multi-user CRM system built with Laravel 13 & Vue 3, featuring role-based access control, sales pipeline, and RESTful API.',
    tags: ['Laravel', 'Vue 3', 'MySQL', 'Sanctum', 'Vite'],
    github: 'https://github.com/Vanz1233/DBM_bluedale',
    problem: 'Bluedale needed a single system to run its entire sales workflow — from lead capture to deal closure — with every role seeing only the data and actions relevant to them.',
    longDesc: 'Built during my internship at Bluedale Group, this CRM manages the company\'s full sales workflow — from lead capture to deal closure. Multi-user roles (Admin, Manager, Staff) each see a different interface with different data access levels.',
    bullets: [
      'Role-based access: Admin, Manager, Staff levels',
      'Sales pipeline with drag-and-drop stage management',
      'RESTful API with Laravel Sanctum token authentication',
      'Vue 3 Composition API frontend with Vite build tooling',
      'Currently in live-environment testing on InfinityFree ahead of cPanel production deployment',
    ],
    metrics: [
      { value: '3', label: 'Role-based access levels' },
      { value: 'Pre-launch', label: 'Live testing on InfinityFree' },
    ],
    role: 'Full-Stack Developer', duration: '6 months', status: 'In Live Testing',
    color: '#E8622A',
  },
  {
    id: 1, num: '02',
    name: 'Fortiroom',
    type: 'FYP  ·  IoT  ·  2024–2025',
    desc: 'IoT-powered smart room booking system with face recognition door unlock via ESP32, real-time environment monitoring, and penalty alerts.',
    tags: ['PHP', 'ESP32', 'Face Recognition', 'PostgreSQL', 'IoT'],
    github: 'https://github.com/leshvinsk/Fortiroom',
    problem: 'Manual meeting-room booking offers no way to verify who actually enters a room or to enforce booking rules once a session ends. Fortiroom layers physical access control and live monitoring on top of the booking flow.',
    longDesc: 'My Final Year Project — a smart room booking system that integrates physical IoT hardware with a web platform. Rooms are unlocked via face verification using ESP32 camera modules, and movement after checkout triggers an automatic penalty.',
    bullets: [
      'Face verification via ESP32 camera modules at room entry',
      'Sensor suite: motion, smoke, magnetic door lock & environmental sensors',
      'Real-time environment monitoring dashboards',
      'Penalty system for unauthorised post-checkout movement',
      'PostgreSQL backend with PHP REST API',
      'Validated on a mini-scale physical model of a meeting room',
    ],
    metrics: [
      { value: '96%', label: 'Face-recognition accuracy' },
      { value: '3–5s', label: 'Door unlock response' },
      { value: '4+', label: 'Integrated sensor types' },
    ],
    role: 'Backend & IoT Developer', duration: '8 months', status: 'Completed (FYP)',
    color: '#4285F4',
  },
  {
    id: 2, num: '03',
    name: 'Service Day Dashboard',
    type: 'Web App  ·  2024',
    desc: 'Internal service-day analytics dashboard built with Django and Python, visualising customer data and service metrics.',
    tags: ['Django', 'Python', 'Chart.js', 'SQLite'],
    github: 'https://github.com/Vanz1233/BIT306_Assignment1',
    problem: 'A BIT306 course project in enterprise application development — taking raw service data and turning it into a clear, filterable analytics view for managers using Django\'s MVT pattern.',
    longDesc: 'Built for BIT306 — a service data visualisation dashboard using Django\'s MVT architecture. Gives managers a clear view of customer activity, service trends, and key metrics through interactive charts.',
    bullets: [
      'Django MVT architecture with custom templates',
      'Interactive charts with Chart.js',
      'Customer filtering, search, and date-range queries',
      'Export to PDF functionality',
    ],
    role: 'Full-Stack Developer', duration: '3 months', status: 'Academic Project',
    color: '#10a37f',
  },
  {
    id: 3, num: '04',
    name: 'Concert Ticket Booking',
    type: 'Web App  ·  2023',
    desc: 'Full-stack concert ticket booking platform with seat selection, user authentication, and order management.',
    tags: ['Angular', 'Node.js', 'MongoDB', 'Express'],
    github: null,
    problem: 'Concert-goers needed to browse events, choose exact seats, and book without the risk of double-booking — handled end to end across an Angular front end and a Node/Express API.',
    longDesc: 'A full-stack concert booking system with an Angular frontend and Node.js + Express backend. Users can browse events, select seats on an interactive map, and complete an order managed through MongoDB.',
    bullets: [
      'Interactive seat map with real-time availability',
      'JWT-based user authentication and session handling',
      'Node.js + Express REST API',
      'MongoDB for order and inventory management',
    ],
    role: 'Full-Stack Developer', duration: '2 months', status: 'Academic Project',
    color: '#6366f1',
  },
  {
    id: 4, num: '05',
    name: 'Library Book Rental System',
    type: 'Desktop App  ·  2023',
    desc: 'Java desktop application for library book rental management with borrower tracking and overdue notifications.',
    tags: ['Java', 'NetBeans', 'MySQL', 'Swing'],
    github: null,
    problem: 'Library staff needed one tool to manage inventory, borrower records, and overdue items instead of tracking them by hand — delivered as a Java Swing desktop app backed by MySQL.',
    longDesc: 'A Java Swing desktop application for managing library inventory, borrower records, and overdue tracking. Built with NetBeans and integrated with a MySQL database via JDBC.',
    bullets: [
      'Book inventory and rental tracking',
      'Borrower management with overdue alerts',
      'MySQL database integration via JDBC',
      'GUI built with Java Swing in NetBeans IDE',
    ],
    role: 'Developer', duration: '2 months', status: 'Academic Project',
    color: '#c94e1e',
  },
]

function ProjectThumb({ project }) {
  return (
    <div
      className="proj-thumb"
      style={{
        width: 180, height: 120,
        border: '1px solid var(--color-border)',
        borderRadius: 2, flexShrink: 0,
        overflow: 'hidden',
        background: `${project.color}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} preview`}
          width="180" height="120"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <svg viewBox="0 0 180 120" width="180" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="120" fill={`${project.color}18`} />
          <rect x="12" y="12" width="156" height="8" rx="2" fill={`${project.color}40`} />
          <rect x="12" y="28" width="100" height="6" rx="2" fill={`${project.color}28`} />
          <rect x="12" y="42" width="130" height="6" rx="2" fill={`${project.color}28`} />
          <rect x="12" y="56" width="110" height="6" rx="2" fill={`${project.color}28`} />
          <rect x="12" y="78" width="60" height="24" rx="3" fill={project.color} opacity="0.7" />
          <rect x="82" y="78" width="40" height="24" rx="3" fill={`${project.color}40`} />
          <text x="42" y="94" textAnchor="middle" fill="white" fontSize="8" fontFamily="Barlow Condensed, sans-serif" fontWeight="bold">
            {project.num}
          </text>
        </svg>
      )}
    </div>
  )
}

function ProjectRow({ project, open, onToggle }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <div
      ref={ref}
      className="project-accordion reveal-left"
      style={{
        borderTop: '1px solid var(--color-border)',
        borderLeft: `3px solid ${open ? 'var(--color-orange)' : 'transparent'}`,
        transition: 'border-left-color 0.4s, opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-56px)',
      }}
    >
      {/* Row header */}
      <div
        className="project-row-header"
        onClick={onToggle}
        style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr 200px 32px',
          gap: 32, alignItems: 'center',
          padding: '36px 0 36px 16px',
          cursor: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,98,42,0.06)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '' }}
      >
        <span style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: '0.85rem', color: 'var(--color-muted2)',
          fontWeight: 700, letterSpacing: '0.05em',
        }}>
          {project.num}
        </span>

        <div className="project-info">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '1.8rem', fontWeight: 800,
              color: 'var(--color-orange)', letterSpacing: '-0.01em', lineHeight: 1,
            }}>
              {project.name}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
              {project.type}
            </span>
          </div>
          <p style={{
            color: 'var(--color-muted)', fontSize: '0.9rem', fontWeight: 300,
            lineHeight: 1.65, marginBottom: 14, maxWidth: 600,
          }}>
            {project.desc}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontSize: '0.72rem', padding: '4px 12px',
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)', letterSpacing: '0.06em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <ProjectThumb project={project} />

        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={open ? 'var(--color-orange)' : 'var(--color-muted)'}
          strokeWidth="2"
          style={{ transition: 'transform 0.3s ease, color 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Drawer */}
      <div style={{
        maxHeight: open ? 1200 : 0, overflow: 'hidden',
        transition: 'max-height 0.55s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div className="proj-drawer-inner" style={{
          display: 'grid', gridTemplateColumns: '1fr 260px',
          gap: 48, padding: '0 16px 40px 96px',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div>
            {project.problem && (
              <>
                <p className="cs-label" style={{ paddingTop: 32 }}>The Problem</p>
                <p className="cs-text" style={{ marginBottom: 28 }}>{project.problem}</p>
              </>
            )}

            {project.metrics && (
              <div className="cs-metrics">
                {project.metrics.map(m => (
                  <div key={m.label} className="cs-metric">
                    <span className="cs-metric-val">{m.value}</span>
                    <span className="cs-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="cs-label">Approach</p>
            <p className="cs-text" style={{ marginBottom: 26 }}>{project.longDesc}</p>

            <p className="cs-label">Execution</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              {project.bullets.map((b, i) => (
                <li key={i} style={{
                  fontSize: '0.88rem', color: 'var(--color-muted)', fontWeight: 300,
                  paddingLeft: 20, position: 'relative', lineHeight: 1.6,
                }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-orange)', fontSize: '0.8rem' }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    padding: '10px 20px', border: '1.5px solid var(--color-orange)',
                    color: 'var(--color-orange)', borderRadius: 2,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-orange)'; e.currentTarget.style.color = 'var(--color-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--color-orange)' }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          <div className="proj-drawer-meta" style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 36 }}>
            {[
              { label: 'Role',     val: project.role },
              { label: 'Duration', val: project.duration },
              { label: 'Status',   val: project.status },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 4 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cream)' }}>
                  {item.val}
                </p>
              </div>
            ))}
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 8 }}>
                Stack
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {project.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '0.72rem', padding: '2px 10px',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)', letterSpacing: '0.06em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="projects">
      <div
        className="projects-header"
        ref={ref}
        style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 60,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div>
          <div className="sec-label reveal">02 / Selected Work</div>
          <h2 className="sec-title reveal" style={{ marginBottom: 0 }}>Recent Projects</h2>
        </div>
      </div>

      <div>
        {projects.map(p => (
          <ProjectRow
            key={p.id}
            project={p}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
          />
        ))}
      </div>
    </section>
  )
}
