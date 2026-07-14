/*
 * Synthesized UI sound effects — WebAudio only, no audio assets.
 * Off by default; App owns the toggle (navbar speaker button +
 * `sound on|off` palette commands, persisted to localStorage['vt-sound']).
 * Every entry point no-ops while disabled, so callers never guard.
 *
 *   tick()      tiny key blip (boot/terminal typing, tour hops)
 *   click()     button/link press — pitch-drop blip + contact noise
 *   chime()     two-tone confirm (speaker toggle — must be unmissable)
 *   crackle(s)  static burst (theme glitch, meltdown)
 *   humStart()  low double-sine drone while the auto-tour runs
 *   stopHum()   fade the drone out
 */

let ctx = null
let enabled = false
let humNodes = null
let unlockBound = false

/* Autoplay policy: a resume() only sticks when it runs inside a real user
   gesture. Call sites driven by timers/rAF (boot typing, tour hops — hit
   when the saved preference re-enables sound on load) can't qualify, so
   resume on the first gesture anywhere instead. Listeners stay attached:
   they're no-ops while running, and iOS re-suspends the context after
   audio interruptions (calls, Siri). */
function bindUnlock() {
  if (unlockBound) return
  unlockBound = true
  const unlock = () => {
    if (enabled && ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
  }
  document.addEventListener('pointerdown', unlock, true)
  document.addEventListener('keydown', unlock, true)
}

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  bindUnlock()
  // gesture-driven call sites (speaker button, palette, terminal keys)
  // succeed here immediately; the rest wait for bindUnlock's listeners
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

/* Run fn(c) only when the context can actually render. Never schedule into
   a suspended context: Chrome parks resume() promises until a user gesture,
   so timer-driven SFX (boot typing when the saved preference re-enables
   sound on load) would pile up silently and all fire at once on the first
   click — anything that couldn't start within 150ms is dropped instead. */
function play(fn) {
  if (!enabled) return
  const c = ac()
  if (c.state === 'running') { fn(c); return }
  const asked = performance.now()
  c.resume().then(() => {
    if (enabled && performance.now() - asked < 150) fn(c)
  }).catch(() => {})
}

export function setSound(on) {
  enabled = !!on
  if (enabled) ac()
  else stopHum()
}

export function tick() {
  play((c) => {
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
  })
}

export function click() {
  play((c) => {
    const t = c.currentTime
    /* the press: a square blip that pitch-drops like a terminal keystroke */
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'square'
    o.frequency.setValueAtTime(520 + Math.random() * 160, t)
    o.frequency.exponentialRampToValueAtTime(150, t + 0.05)
    g.gain.setValueAtTime(0.032, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
    o.connect(g)
    g.connect(c.destination)
    o.start(t)
    o.stop(t + 0.08)
    /* the contact: a 15ms high-passed static tick layered on top */
    const n = Math.floor(c.sampleRate * 0.015)
    const buf = c.createBuffer(1, n, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n)
    const src = c.createBufferSource()
    src.buffer = buf
    const hp = c.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 2400
    const ng = c.createGain()
    ng.gain.value = 0.05
    src.connect(hp)
    hp.connect(ng)
    ng.connect(c.destination)
    src.start(t)
  })
}

export function chime() {
  play((c) => {
    const t0 = c.currentTime
    ;[660, 990].forEach((f, i) => {
      const t = t0 + i * 0.08
      const o = c.createOscillator()
      const g = c.createGain()
      o.type = 'triangle'
      o.frequency.value = f
      g.gain.setValueAtTime(0.055, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
      o.connect(g)
      g.connect(c.destination)
      o.start(t)
      o.stop(t + 0.13)
    })
  })
}

export function crackle(dur = 0.5) {
  play((c) => {
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
  })
}

export function humStart() {
  if (humNodes) return
  play((c) => {
    if (humNodes) return
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
  })
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
