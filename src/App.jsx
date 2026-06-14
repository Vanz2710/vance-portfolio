import { useEffect, useRef } from 'react'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Projects   from './components/Projects'
import Skills     from './components/Skills'
import AITools    from './components/AITools'
import Experience from './components/Experience'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

export default function App() {
  const cursorRef     = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = cursorRingRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let animId
    const anim = () => {
      if (cursor) { cursor.style.left = mx - 5 + 'px'; cursor.style.top = my - 5 + 'px' }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx - 16 + 'px'; ring.style.top = ry - 16 + 'px' }
      animId = requestAnimationFrame(anim)
    }
    anim()

    const addHover = () => { cursor?.classList.add('hover'); ring?.classList.add('hover') }
    const rmHover  = () => { cursor?.classList.remove('hover'); ring?.classList.remove('hover') }

    const attachHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }
    attachHover()

    // Re-attach when DOM changes
    const domObs = new MutationObserver(attachHover)
    domObs.observe(document.body, { childList: true, subtree: true })

    // Scroll reveal for .reveal and .reveal-left elements
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => revObs.observe(el))

    // Re-observe after DOM changes
    const revDomObs = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)').forEach(el => revObs.observe(el))
    })
    revDomObs.observe(document.body, { childList: true, subtree: true })

    if ('ontouchstart' in window) {
      if (cursor) cursor.style.display = 'none'
      if (ring)   ring.style.display   = 'none'
      document.body.style.cursor = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      domObs.disconnect()
      revObs.disconnect()
      revDomObs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef}     className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <AITools />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}
