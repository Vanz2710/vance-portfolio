/*
 * Global page effects (DOM-driven, hooked up once from App.jsx).
 * Everything works off data-attributes so components stay declarative:
 *   data-boot / data-bl / data-bt   boot sequence overlay, lines, typed spans
 *   data-gl               hero keyword glitch
 *   data-line             section divider draw-in
 *   data-hov              3D card tilt (pointer-fine only)
 *   data-mag              magnetic buttons
 *   data-rv / data-rvd    scroll reveals ("up" | "left", delay ms)
 *   data-scr              heading scramble-in
 *   data-cnt / -dec       animated counters
 *   data-typed            hero typing loop
 *   data-mqi / data-mq-row  marquee glitch pulses + scroll-velocity skew
 *   data-prog / data-nav / data-top   scroll progress, nav shrink, back-to-top
 *   data-grid / data-bgp / data-bgr / data-plx   background + section parallax
 *   data-spot / data-cur-dot          cursor spotlight + custom cursor
 *   data-nl-t             active nav-link highlighting + hover scramble
 *   data-chip / data-chip-zone   throwable skill chips (desktop only)
 *   data-glyph            section-aware background glyph swaps
 * Returns a cleanup function (safe under React StrictMode double-mount).
 */

import { crackle, humStart, stopHum, tick } from './sound'

const SCRAMBLE_CH = '#/<>[]{}=+*_\\'

/* Scramble an element's text back to itself. Reused by the scroll-in
   heading effect and the theme-glitch transition; keeps the original
   text on the node so overlapping runs can't garble it permanently. */
function scrambleEl(el, total = 20, step = 34) {
  if (el.__scr) clearInterval(el.__scr)
  const orig = el.__orig ?? (el.__orig = el.textContent)
  let f = 0
  const iv = setInterval(() => {
    f++
    const k = Math.floor((f / total) * orig.length)
    let out = orig.slice(0, k)
    for (let i = k; i < orig.length; i++) out += SCRAMBLE_CH[Math.floor(Math.random() * SCRAMBLE_CH.length)]
    el.textContent = out
    if (f >= total) { clearInterval(iv); el.__scr = null; el.textContent = orig }
  }, step)
  el.__scr = iv
  return iv
}

/* Full-page glitch used when switching between dark/light themes.
   Layers: two backdrop-filter slice bands (invert + hue-shift) jumping
   across the screen, a scanline/noise static flicker, a jitter on the
   page chrome, and a re-scramble of the headings currently in view.
   `apply` (the actual theme flip) fires mid-glitch, under the full-
   screen invert flash, so the swap itself reads as part of the effect. */
let glitchBusy = false
export function themeGlitch(apply) {
  if (glitchBusy || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply()
    return
  }
  glitchBusy = true
  const veil = document.createElement('div')
  veil.className = 'glitch-veil'
  veil.setAttribute('aria-hidden', 'true')
  veil.innerHTML = '<i class="gv-a"></i><i class="gv-b"></i><b class="gv-static"></b>'
  ;(document.querySelector('.site') || document.body).appendChild(veil)
  document.documentElement.classList.add('is-glitching')
  crackle(0.55)
  scrambleVisible(14, 28)
  setTimeout(apply, 230)
  setTimeout(() => {
    document.documentElement.classList.remove('is-glitching')
    veil.remove()
    glitchBusy = false
  }, 640)
}

/* scramble every heading / hero keyword / marquee item currently on screen */
function scrambleVisible(total, step) {
  const vh = window.innerHeight
  const vw = window.innerWidth
  document.querySelectorAll('[data-scr], [data-gl], [data-mqi]').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return
    scrambleEl(el, total, step)
  })
}

/* Konami-code "system meltdown" — a heavier, twice-as-long glitch storm
   than the theme transition. `apply` (the secret accent swap) fires under
   the mid-point flash. Shares the re-entry guard with themeGlitch. */
export function meltdown(apply) {
  if (glitchBusy || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply()
    return
  }
  glitchBusy = true
  const veil = document.createElement('div')
  veil.className = 'glitch-veil glitch-veil--melt'
  veil.setAttribute('aria-hidden', 'true')
  veil.innerHTML = '<i class="gv-a"></i><i class="gv-b"></i><b class="gv-static"></b>'
  ;(document.querySelector('.site') || document.body).appendChild(veil)
  document.documentElement.classList.add('is-glitching', 'is-melting')
  crackle(1.1)
  scrambleVisible(16, 30)
  setTimeout(() => scrambleVisible(14, 26), 560)
  setTimeout(apply, 460)
  setTimeout(() => {
    document.documentElement.classList.remove('is-glitching', 'is-melting')
    veil.remove()
    glitchBusy = false
  }, 1240)
}

/* Auto-tour: glitch-hops through every section in page order with a
   terminal HUD readout ("cd ~/projects [2/8]"). Each hop: the HUD path
   scrambles in, the page glides on an eased scroll, then a mini glitch
   veil + heading re-scramble fire on arrival. Any real user input
   (wheel / touch / pointer / key) exits the tour — except on the
   [data-tour-toggle] button, so its own click can stop it cleanly.
   Returns a stop(); onDone(completed) fires exactly once. */
export function runTour({ onDone } = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const stops = Array.from(document.querySelectorAll('section[id]'))
  if (!stops.length) {
    onDone?.(false)
    return () => {}
  }

  let done = false
  let raf = null
  const timers = []

  const hud = document.createElement('div')
  hud.className = 'tour-hud'
  hud.setAttribute('role', 'status')
  hud.innerHTML =
    '<span class="tour-run acc">▶</span><b class="tour-path"></b>' +
    '<span class="tour-idx"></span><span class="tour-exit">scroll or esc to exit</span>'
  ;(document.querySelector('.site') || document.body).appendChild(hud)
  const pathEl = hud.querySelector('.tour-path')
  const idxEl = hud.querySelector('.tour-idx')
  humStart()

  const INPUTS = ['wheel', 'touchstart', 'pointerdown', 'keydown']
  const onInput = (e) => {
    if (e.target && e.target.closest && e.target.closest('[data-tour-toggle]')) return
    stop(false)
  }
  INPUTS.forEach((t) => window.addEventListener(t, onInput, { passive: true }))

  const stop = (completed) => {
    if (done) return
    done = true
    if (raf) cancelAnimationFrame(raf)
    timers.forEach(clearTimeout)
    INPUTS.forEach((t) => window.removeEventListener(t, onInput))
    document.documentElement.classList.remove('is-glitching')
    hud.remove()
    stopHum()
    onDone?.(completed)
  }

  const glide = (toY, dur, cb) => {
    const from = window.scrollY
    const dist = toY - from
    if (reduce || dur <= 0 || Math.abs(dist) < 2) {
      window.scrollTo({ top: toY, behavior: 'instant' })
      cb()
      return
    }
    const t0 = performance.now()
    const tick = (now) => {
      if (done) return
      const t = Math.min(1, (now - t0) / dur)
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      window.scrollTo({ top: from + dist * e, behavior: 'instant' })
      if (t < 1) raf = requestAnimationFrame(tick)
      else { raf = null; cb() }
    }
    raf = requestAnimationFrame(tick)
  }

  const microGlitch = () => {
    if (reduce) return
    const veil = document.createElement('div')
    veil.className = 'glitch-veil glitch-veil--mini'
    veil.setAttribute('aria-hidden', 'true')
    veil.innerHTML = '<i class="gv-a"></i><b class="gv-static"></b>'
    ;(document.querySelector('.site') || document.body).appendChild(veil)
    document.documentElement.classList.add('is-glitching')
    tick()
    timers.push(setTimeout(() => {
      document.documentElement.classList.remove('is-glitching')
      veil.remove()
    }, 300))
  }

  let i = 0
  const next = () => {
    if (done) return
    if (i >= stops.length) {
      stop(true)
      return
    }
    const sec = stops[i]
    idxEl.textContent = '[' + (i + 1) + '/' + stops.length + ']'
    pathEl.textContent = 'cd ~/' + sec.id
    pathEl.__orig = null // label changes every stop — drop the scramble cache
    if (!reduce) scrambleEl(pathEl, 10, 22)
    timers.push(setTimeout(() => {
      if (done) return
      const y = Math.max(0, sec.getBoundingClientRect().top + window.scrollY - 76)
      const dur = Math.min(1500, Math.max(700, Math.abs(y - window.scrollY) * 0.55))
      glide(y, dur, () => {
        microGlitch()
        if (!reduce) {
          const vh = window.innerHeight
          const vw = window.innerWidth
          sec.querySelectorAll('[data-scr], [data-gl]').forEach((el) => {
            const r = el.getBoundingClientRect()
            if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return
            scrambleEl(el, 12, 26)
          })
        }
        i++
        timers.push(setTimeout(next, 2100))
      })
    }, 420))
  }
  next()
  return () => stop(false)
}

export function initPageEffects({ cursorFx = true } = {}) {
  const cleanups = []
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---- boot sequence ---- */
  const boot = document.querySelector('[data-boot]')
  if (boot) {
    const lines = boot.querySelectorAll('[data-bl]')
    const timers = []
    const done = () => {
      boot.style.transform = 'translateY(-101%)'
      boot.style.opacity = '.5'
      timers.push(setTimeout(() => { boot.style.display = 'none' }, 580))
    }
    if (reduce) {
      boot.style.display = 'none'
    } else {
      /* sequential timeline: plain lines fade in; [data-bt] spans type
         their value char-by-char (login/password), then the final
         access-granted line holds a beat before the overlay slides away */
      let at = 150
      lines.forEach((l) => {
        const bt = l.querySelector('[data-bt]')
        timers.push(setTimeout(() => { l.style.opacity = '1' }, at))
        if (bt) {
          const txt = bt.getAttribute('data-bt')
          at += 90
          for (let c = 1; c <= txt.length; c++) {
            const k = c
            timers.push(setTimeout(() => { bt.textContent = txt.slice(0, k); tick() }, at))
            at += 34
          }
          at += 150
        } else {
          at += 190
        }
      })
      timers.push(setTimeout(done, at + 400))
      const skip = () => { timers.forEach(clearTimeout); done() }
      boot.addEventListener('click', skip, { once: true })
      cleanups.push(() => boot.removeEventListener('click', skip))
    }
    cleanups.push(() => timers.forEach(clearTimeout))
  }

  /* ---- hero keyword glitch ---- */
  if (!reduce) {
    const gls = document.querySelectorAll('[data-gl]')
    const glitchTimers = []
    const glitch = () => {
      gls.forEach((el, i) => {
        glitchTimers.push(setTimeout(() => {
          el.style.textShadow = '2px 0 var(--glitch-a), -2px 0 var(--glitch-b)'
          el.style.transform = 'skewX(-4deg)'
          glitchTimers.push(setTimeout(() => {
            el.style.textShadow = '-2px 0 var(--glitch-a), 2px 0 var(--glitch-b)'
            el.style.transform = 'skewX(3deg) translateX(-1px)'
          }, 70))
          glitchTimers.push(setTimeout(() => {
            el.style.textShadow = 'none'
            el.style.transform = 'none'
          }, 150))
        }, i * 300))
      })
    }
    const gli = setInterval(glitch, 4700)
    glitchTimers.push(setTimeout(glitch, 2300))
    cleanups.push(() => { clearInterval(gli); glitchTimers.forEach(clearTimeout) })
  }

  /* ---- section divider line draw ---- */
  const lineEls = Array.from(document.querySelectorAll('[data-line]'))
  if (!reduce) {
    lineEls.forEach((el) => {
      el.style.transformOrigin = 'left center'
      el.style.transform = 'scaleX(0)'
    })
    const lnObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        lnObs.unobserve(en.target)
        en.target.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1) .2s'
        requestAnimationFrame(() => { en.target.style.transform = 'scaleX(1)' })
      })
    }, { threshold: 0.4 })
    lineEls.forEach((el) => lnObs.observe(el))
    cleanups.push(() => lnObs.disconnect())
  }

  /* ---- card tilt + magnetic buttons (delegated) ---- */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    let tiltEl = null
    let magEl = null
    let scrHovEl = null
    const onPOver = (e) => {
      const nl = e.target.closest ? e.target.closest('[data-nl-t]') : null
      if (nl && nl !== scrHovEl) scrambleEl(nl, 8, 22)
      scrHovEl = nl
      const c = e.target.closest ? e.target.closest('[data-hov]') : null
      if (c !== tiltEl) {
        if (tiltEl) {
          tiltEl.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), border-color .25s, box-shadow .25s'
          tiltEl.style.transform = 'none'
        }
        tiltEl = c
        if (tiltEl) tiltEl.style.transition = 'transform .12s ease-out, border-color .25s, box-shadow .25s'
      }
      const m = e.target.closest ? e.target.closest('[data-mag]') : null
      if (m !== magEl) {
        if (magEl) magEl.style.transform = ''
        magEl = m
        if (magEl) magEl.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1), background .2s, box-shadow .2s'
      }
    }
    const onPMove = (e) => {
      if (tiltEl) {
        const r = tiltEl.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        tiltEl.style.transform =
          'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 6).toFixed(2) + 'deg) translateY(-4px)'
      }
      if (magEl) {
        const r = magEl.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        magEl.style.transform = 'translate(' + (dx * 0.22).toFixed(1) + 'px,' + (dy * 0.3).toFixed(1) + 'px)'
      }
    }
    document.addEventListener('pointerover', onPOver)
    document.addEventListener('pointermove', onPMove)
    cleanups.push(() => {
      document.removeEventListener('pointerover', onPOver)
      document.removeEventListener('pointermove', onPMove)
    })
  }

  /* ---- throwable chips (desktop only): drag, toss, bounce inside the
     [data-chip-zone] box, then spring back home ---- */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    const flyRafs = new Set()
    const onChipDown = (e) => {
      const chip = e.target.closest ? e.target.closest('[data-chip]') : null
      if (!chip || e.button !== 0) return
      e.preventDefault()
      if (chip.__fly) { cancelAnimationFrame(chip.__fly); chip.__fly = null }
      const zone = chip.closest('[data-chip-zone]')
      chip.classList.add('chip-drag')
      chip.style.transition = 'none'
      let cx = 0
      let cy = 0
      const tr = getComputedStyle(chip).transform
      if (tr && tr !== 'none') {
        const m = tr.match(/matrix\(([^)]+)\)/)
        if (m) {
          const p = m[1].split(',')
          cx = parseFloat(p[4])
          cy = parseFloat(p[5])
        }
      }
      let px = e.clientX
      let py = e.clientY
      let vx = 0
      let vy = 0
      const onMove = (ev) => {
        vx = ev.clientX - px
        vy = ev.clientY - py
        px = ev.clientX
        py = ev.clientY
        cx += vx
        cy += vy
        chip.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'
      }
      const onUp = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
        chip.classList.remove('chip-drag')
        const rect = chip.getBoundingClientRect()
        const bx = rect.left - cx // untranslated viewport position
        const by = rect.top - cy
        const z = zone ? zone.getBoundingClientRect() : null
        const fly = () => {
          vx *= 0.94
          vy *= 0.94
          cx += vx
          cy += vy
          if (z) {
            if (bx + cx < z.left) { cx = z.left - bx; vx = Math.abs(vx) * 0.6 }
            if (bx + cx + rect.width > z.right) { cx = z.right - bx - rect.width; vx = -Math.abs(vx) * 0.6 }
            if (by + cy < z.top) { cy = z.top - by; vy = Math.abs(vy) * 0.6 }
            if (by + cy + rect.height > z.bottom) { cy = z.bottom - by - rect.height; vy = -Math.abs(vy) * 0.6 }
          }
          chip.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'
          if (Math.abs(vx) + Math.abs(vy) > 0.4) {
            chip.__fly = requestAnimationFrame(fly)
            flyRafs.add(chip.__fly)
          } else {
            chip.__fly = null
            chip.style.transition = 'transform .7s cubic-bezier(.34, 1.56, .64, 1)'
            chip.style.transform = 'none'
          }
        }
        chip.__fly = requestAnimationFrame(fly)
        flyRafs.add(chip.__fly)
      }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    }
    document.addEventListener('pointerdown', onChipDown)
    cleanups.push(() => {
      document.removeEventListener('pointerdown', onChipDown)
      flyRafs.forEach((r) => cancelAnimationFrame(r))
    })
  }

  /* ---- scroll reveals ---- */
  const rvEls = Array.from(document.querySelectorAll('[data-rv]'))
  const vh0 = window.innerHeight
  rvEls.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (reduce || r.top < vh0 * 0.92) return // already in view — leave visible
    el.__hidden = true
    el.style.opacity = '0'
    const dir = el.getAttribute('data-rv')
    el.style.transform = dir === 'left' ? 'translateX(-48px)' : 'translateY(32px)'
  })
  const rvObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target
      rvObs.unobserve(el)
      if (!el.__hidden) return
      const d = parseInt(el.getAttribute('data-rvd') || '0', 10)
      el.style.transition =
        'opacity .75s cubic-bezier(.22,1,.36,1) ' + d + 'ms, transform .75s cubic-bezier(.22,1,.36,1) ' + d + 'ms'
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'none' })
    })
  }, { threshold: 0.12 })
  rvEls.forEach((el) => rvObs.observe(el))
  cleanups.push(() => rvObs.disconnect())

  /* ---- heading scramble ---- */
  const scrIntervals = []
  const scrObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target
      scrObs.unobserve(el)
      if (reduce || el.__done) return
      el.__done = true
      scrIntervals.push(scrambleEl(el))
    })
  }, { threshold: 0.6 })
  document.querySelectorAll('[data-scr]').forEach((el) => scrObs.observe(el))
  cleanups.push(() => { scrObs.disconnect(); scrIntervals.forEach(clearInterval) })

  /* ---- marquee ambient glitch pulses ---- */
  const mqItems = Array.from(document.querySelectorAll('[data-mqi]'))
  if (mqItems.length && !reduce) {
    const mqTimers = []
    const pulse = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const vis = mqItems.filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < vh && r.bottom > 0 && r.left < vw && r.right > 0
      })
      if (!vis.length) return
      const el = vis[Math.floor(Math.random() * vis.length)]
      el.classList.add('is-glitch')
      scrambleEl(el, 8, 30)
      mqTimers.push(setTimeout(() => el.classList.remove('is-glitch'), 480))
    }
    const mqIv = setInterval(pulse, 1400)
    cleanups.push(() => { clearInterval(mqIv); mqTimers.forEach(clearTimeout) })
  }

  /* ---- animated counters ---- */
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target
      cntObs.unobserve(el)
      if (reduce || el.__done) return
      el.__done = true
      const target = parseFloat(el.getAttribute('data-cnt'))
      const dec = parseInt(el.getAttribute('data-cnt-dec') || '0', 10)
      const t0 = performance.now()
      const dur = 1100
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur)
        const ease = 1 - Math.pow(1 - t, 3)
        el.textContent = (target * ease).toFixed(dec)
        if (t < 1) requestAnimationFrame(step)
        else el.textContent = target.toFixed(dec)
      }
      requestAnimationFrame(step)
    })
  }, { threshold: 0.6 })
  document.querySelectorAll('[data-cnt]').forEach((el) => cntObs.observe(el))
  cleanups.push(() => cntObs.disconnect())

  /* ---- hero typing loop ---- */
  const typedEl = document.querySelector('[data-typed]')
  if (typedEl) {
    const roles = ['full-stack developer', 'Laravel + Vue 3 builder', 'IoT tinkerer', 'clean-code advocate']
    let ri = 0
    let ci = 0
    let del = false
    let tt
    const tick = () => {
      const w = roles[ri]
      if (!del) {
        ci++
        typedEl.textContent = w.slice(0, ci)
        if (ci === w.length) { del = true; tt = setTimeout(tick, 1700); return }
      } else {
        ci--
        typedEl.textContent = w.slice(0, ci)
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length }
      }
      tt = setTimeout(tick, del ? 36 : 74)
    }
    tt = setTimeout(tick, 700)
    cleanups.push(() => clearTimeout(tt))
  }

  /* ---- scroll: progress bar, nav shrink, back-to-top, parallax ---- */
  const prog = document.querySelector('[data-prog]')
  const nav = document.querySelector('[data-nav]')
  const topBtn = document.querySelector('[data-top]')
  const bgGrid = document.querySelector('[data-grid]')
  const bgp = Array.from(document.querySelectorAll('[data-bgp]'))
  const bgr = Array.from(document.querySelectorAll('[data-bgr]'))
  const plx = Array.from(document.querySelectorAll('[data-plx]'))
  plx.forEach((el) => {
    const r = el.getBoundingClientRect()
    el.__base = r.top + window.scrollY + r.height / 2
  })
  /* marquee rows lean with scroll velocity, then ease back upright */
  const mqRows = Array.from(document.querySelectorAll('[data-mq-row]'))
  let mqVel = 0
  let mqLast = window.scrollY
  let mqRaf = null
  const mqSettle = () => {
    mqVel *= 0.86
    if (Math.abs(mqVel) < 0.05) mqVel = 0
    mqRows.forEach((row) => { row.style.transform = mqVel ? 'skewX(' + (-mqVel).toFixed(2) + 'deg)' : 'none' })
    mqRaf = mqVel ? requestAnimationFrame(mqSettle) : null
  }
  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      const sc = window.scrollY
      const dh = document.documentElement.scrollHeight - window.innerHeight
      if (prog) prog.style.width = (dh > 0 ? (sc / dh) * 100 : 0) + '%'
      if (nav) {
        nav.style.paddingTop = sc > 60 ? '12px' : '22px'
        nav.style.paddingBottom = sc > 60 ? '12px' : '22px'
        nav.style.boxShadow = sc > 60 ? 'var(--nav-shadow)' : 'none'
      }
      if (topBtn) {
        const show = sc > 600
        topBtn.style.opacity = show ? '1' : '0'
        topBtn.style.pointerEvents = show ? 'auto' : 'none'
        topBtn.style.transform = show ? 'none' : 'translateY(12px)'
      }
      if (!reduce) {
        if (bgGrid) bgGrid.style.backgroundPosition = '0 ' + (-sc * 0.06).toFixed(1) + 'px'
        bgp.forEach((el) => {
          const f = parseFloat(el.getAttribute('data-bgp')) || 0.05
          el.style.translate = '0 ' + (-sc * f).toFixed(1) + 'px'
        })
        bgr.forEach((el) => { el.style.rotate = (sc * 0.03).toFixed(2) + 'deg' })
        const vh = window.innerHeight
        plx.forEach((el) => {
          const s = parseFloat(el.getAttribute('data-plx')) || 0.1
          const mid = el.__base - sc - vh / 2
          el.style.translate = '0 ' + (-mid * s).toFixed(1) + 'px'
        })
        if (mqRows.length) {
          mqVel = Math.max(-9, Math.min(9, mqVel + (sc - mqLast) * 0.045))
          mqLast = sc
          if (!mqRaf) mqRaf = requestAnimationFrame(mqSettle)
        }
      }
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  cleanups.push(() => {
    window.removeEventListener('scroll', onScroll)
    if (mqRaf) cancelAnimationFrame(mqRaf)
  })

  /* ---- active nav link + section-aware background glyphs ---- */
  const GLYPH_SETS = {
    home: ['{ }', '</>', ';', '=>', '#', '[ ]', '::'],
    projects: ['( )', 'git', '</>', '=>', '#', '{ }', '::'],
    skills: ['<>', 'npm', ';;', '{}', '#', '( )', '::'],
    'about-me': ['?', '&&', '@', '!', '~', '[ ]', '::'],
    experience: ['$', '>_', '&&', '=>', '#', '[ ]', '::'],
    resume: ['.pdf', '{ }', '$', '=>', '#', '[ ]', '::'],
    'ai-workflow': ['λ', 'ai', '=>', ';', '#', '[ ]', '::'],
    terminal: ['$', '>_', '~', ';', '#', '[ ]', '::'],
    contacts: ['@', '=>', '..', ';', '#', '[ ]', '::'],
  }
  const glyphEls = Array.from(document.querySelectorAll('[data-glyph]'))
  let glyphSec = 'home'
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const id = en.target.id
      document.querySelectorAll('[data-nl-t]').forEach((sp) => {
        const on = sp.getAttribute('data-nl-t') === id
        sp.style.color = on ? 'var(--bright)' : 'var(--fg)'
        sp.style.fontWeight = on ? '600' : '400'
      })
      if (!reduce && GLYPH_SETS[id] && id !== glyphSec) {
        glyphSec = id
        const pool = GLYPH_SETS[id]
        glyphEls.forEach((el, gi) => {
          const next = pool[gi % pool.length]
          if (el.textContent === next) return
          el.textContent = next
          el.__orig = null // new target text — drop the scramble cache
          scrambleEl(el, 9, 30)
        })
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })
  document.querySelectorAll('section[id]').forEach((s) => navObs.observe(s))
  cleanups.push(() => navObs.disconnect())

  /* ---- custom cursor + spotlight ---- */
  const dot = document.querySelector('[data-cur-dot]')
  if (dot && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    const spot = document.querySelector('[data-spot]')
    /* velocity-scaled RGB afterimages trailing the dot */
    const trailA = document.createElement('i')
    trailA.className = 'cursor-trail cursor-trail--a'
    const trailB = document.createElement('i')
    trailB.className = 'cursor-trail cursor-trail--b'
    const trailHost = document.querySelector('.site') || document.body
    trailHost.appendChild(trailA)
    trailHost.appendChild(trailB)
    let tax = -100
    let tay = -100
    let tbx = -100
    let tby = -100
    let pmx = -100
    let pmy = -100
    let trailOp = 0
    let mx = -100
    let my = -100
    let seen = false
    let hov = false
    let sc = 1
    let spx = -1000
    let spy = -1000
    let raf
    const onMove = (e) => { mx = e.clientX; my = e.clientY; seen = true }
    const onOver = (e) => {
      hov = !!(e.target.closest && e.target.closest('a,button,[data-hov],input,textarea'))
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    const loop = () => {
      const on = cursorFx && seen
      dot.style.opacity = on ? '1' : '0'
      sc += ((hov ? 2.2 : 1) - sc) * 0.2
      dot.style.boxShadow = hov
        ? '0 0 24px var(--ac,#C778DD), 0 0 8px var(--ac,#C778DD)'
        : '0 0 14px color-mix(in oklab, var(--ac,#C778DD) 75%, transparent)'
      dot.style.transform = 'translate(' + (mx - 5) + 'px,' + (my - 5) + 'px) scale(' + sc.toFixed(3) + ')'
      const speed = Math.abs(mx - pmx) + Math.abs(my - pmy)
      pmx = mx
      pmy = my
      trailOp += (Math.min(speed / 30, 0.85) - trailOp) * 0.16
      tax += (mx - tax) * 0.42
      tay += (my - tay) * 0.42
      tbx += (mx - tbx) * 0.24
      tby += (my - tby) * 0.24
      const tOn = on ? trailOp : 0
      trailA.style.opacity = tOn.toFixed(3)
      trailB.style.opacity = (tOn * 0.75).toFixed(3)
      trailA.style.transform = 'translate(' + (tax - 4) + 'px,' + (tay - 4) + 'px)'
      trailB.style.transform = 'translate(' + (tbx - 4) + 'px,' + (tby - 4) + 'px)'
      if (spot) {
        spx += (mx - spx) * 0.06
        spy += (my - spy) * 0.06
        spot.style.opacity = seen ? '1' : '0'
        spot.style.transform = 'translate(' + (spx - 360).toFixed(1) + 'px,' + (spy - 360).toFixed(1) + 'px)'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    cleanups.push(() => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      trailA.remove()
      trailB.remove()
    })
  }

  return () => cleanups.forEach((f) => f())
}
