/*
 * Synthesized UI sound effects — WebAudio only, no audio assets.
 * Off by default; App owns the toggle (navbar speaker button +
 * `sound on|off` palette commands, persisted to localStorage['vt-sound']).
 * Every entry point no-ops while disabled, so callers never guard.
 *
 *   tick()      tiny key blip (boot/terminal typing, tour hops)
 *   crackle(s)  static burst (theme glitch, meltdown)
 *   humStart()  low double-sine drone while the auto-tour runs
 *   stopHum()   fade the drone out
 */

let ctx = null
let enabled = false
let humNodes = null

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  // browsers keep the context suspended until a user gesture; most call
  // sites are gesture-driven so this usually succeeds immediately
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

export function setSound(on) {
  enabled = !!on
  if (enabled) ac()
  else stopHum()
}

export function tick() {
  if (!enabled) return
  const c = ac()
  const t = c.currentTime
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = 'square'
  o.frequency.value = 1700 + Math.random() * 600
  g.gain.setValueAtTime(0.014, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
  o.connect(g)
  g.connect(c.destination)
  o.start(t)
  o.stop(t + 0.035)
}

export function crackle(dur = 0.5) {
  if (!enabled) return
  const c = ac()
  const n = Math.floor(c.sampleRate * dur)
  const buf = c.createBuffer(1, n, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.6)
  const src = c.createBufferSource()
  src.buffer = buf
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 1200
  bp.Q.value = 0.8
  const g = c.createGain()
  g.gain.value = 0.06
  src.connect(bp)
  bp.connect(g)
  g.connect(c.destination)
  src.start()
}

export function humStart() {
  if (!enabled || humNodes) return
  const c = ac()
  const o1 = c.createOscillator()
  const o2 = c.createOscillator()
  const g = c.createGain()
  o1.type = 'sine'
  o1.frequency.value = 72
  o2.type = 'sine'
  o2.frequency.value = 108
  g.gain.setValueAtTime(0, c.currentTime)
  g.gain.linearRampToValueAtTime(0.022, c.currentTime + 0.6)
  o1.connect(g)
  o2.connect(g)
  g.connect(c.destination)
  o1.start()
  o2.start()
  humNodes = { o1, o2, g, c }
}

export function stopHum() {
  if (!humNodes) return
  const { o1, o2, g, c } = humNodes
  humNodes = null
  g.gain.cancelScheduledValues(c.currentTime)
  g.gain.setValueAtTime(g.gain.value, c.currentTime)
  g.gain.linearRampToValueAtTime(0, c.currentTime + 0.35)
  setTimeout(() => { o1.stop(); o2.stop() }, 420)
}
