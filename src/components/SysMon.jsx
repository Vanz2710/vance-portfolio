import { useEffect, useRef, useState } from 'react'

/* Live client readout for the footer — fps and the session clock only
   run while the widget is actually on screen (IntersectionObserver). */

function browserName() {
  const ua = navigator.userAgent
  if (ua.includes('Edg/')) return 'edge'
  if (ua.includes('Firefox/')) return 'firefox'
  if (ua.includes('Chrome/')) return 'chrome'
  if (ua.includes('Safari/')) return 'safari'
  return 'browser'
}

function osName() {
  const ua = navigator.userAgent
  if (ua.includes('Windows')) return 'windows'
  if (/iPhone|iPad/.test(ua)) return 'ios'
  if (ua.includes('Mac')) return 'macos'
  if (ua.includes('Android')) return 'android'
  if (ua.includes('Linux')) return 'linux'
  return 'os'
}

export default function SysMon() {
  const [vp, setVp] = useState(() => [window.innerWidth, window.innerHeight])
  const [fps, setFps] = useState('--')
  const [sess, setSess] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const onResize = () => setVp([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', onResize)
    const start = performance.now()
    let raf = null
    let iv = null
    let frames = 0
    let t0 = 0
    const loop = (now) => {
      frames++
      if (now - t0 >= 1000) {
        setFps(String(frames))
        frames = 0
        t0 = now
      }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        t0 = performance.now()
        frames = 0
        raf = requestAnimationFrame(loop)
        setSess(Math.floor((performance.now() - start) / 1000))
        iv = setInterval(() => setSess(Math.floor((performance.now() - start) / 1000)), 1000)
      } else {
        if (raf) cancelAnimationFrame(raf)
        if (iv) clearInterval(iv)
        raf = null
        iv = null
      }
    })
    if (ref.current) io.observe(ref.current)
    return () => {
      window.removeEventListener('resize', onResize)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (iv) clearInterval(iv)
    }
  }, [])

  const mm = String(Math.floor(sess / 60)).padStart(2, '0')
  const ss = String(sess % 60).padStart(2, '0')
  return (
    <div className="sysmon" ref={ref} aria-hidden="true">
      <span className="sys-dot" />
      <b className="white">sys.monitor</b>
      <i>·</i> {osName()} / {browserName()}
      <i>·</i> viewport {vp[0]}×{vp[1]} @{window.devicePixelRatio || 1}x
      <i>·</i> fps <b className="acc">{fps}</b>
      <i>·</i> session <b className="white">{mm}:{ss}</b>
      <i>·</i> status: <b className="ok">open to work</b>
    </div>
  )
}
