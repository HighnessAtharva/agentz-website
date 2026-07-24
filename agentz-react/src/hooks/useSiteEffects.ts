import { useEffect } from 'react'

/**
 * Faithful port of the original script.js. Runs once after the app mounts and
 * drives scroll-reveal, clip playback (slowed to 0.75x), the Build/Run/Govern
 * stepper reveal, the scroll-progress bar, the carousels, and the lightbox.
 * Everything queries the DOM by the same classNames the components render, so
 * the behaviour matches the static site exactly. Returns a cleanup that removes
 * every listener and the injected lightbox node (safe under StrictMode).
 */
export function useSiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: Array<() => void> = []

    const show = (el: HTMLElement) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
    const near = (el: Element, pad?: number) => {
      const r = el.getBoundingClientRect()
      const p = pad || 0
      return r.height > 0 && r.top < window.innerHeight + p && r.bottom > -p
    }

    /* ── reveal on scroll ── */
    const revealEls = [
      ...document.querySelectorAll<HTMLElement>(
        '.ph-hero,.vw-hero,.arch-frame,.arch-rail,.flow,.ncard,.dcard,.dmn,.org-canvas,.control-copy,.control-card,.video-card,.screen-card,.integ-logos,.runtime-copy,.runtime-media',
      ),
    ]
    revealEls.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity .6s ease ${(i % 4) * 0.06}s, transform .6s ease ${(i % 4) * 0.06}s`
    })
    let pendingReveal = revealEls.slice()
    function revealTick() {
      if (!pendingReveal.length) return
      pendingReveal = pendingReveal.filter((el) => {
        if (!near(el, -40)) return true
        show(el)
        return false
      })
    }

    /* ── product clips: silent loops, slowed, playing whenever on screen ── */
    const play = (v: HTMLVideoElement) => {
      v.playbackRate = 0.75
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }
    const clips = [...document.querySelectorAll<HTMLVideoElement>('.vw video')]
    clips.forEach((v) => {
      v.muted = true
      v.playbackRate = 0.75
    })
    let hasScrolled = false
    function clipTick() {
      clips.forEach((v) => {
        if (near(v, 100)) {
          if (v.paused) play(v)
        } else if (hasScrolled && !v.paused) v.pause()
      })
    }

    /* ── Build · Run · Govern stepper reveal ── */
    const stepsRoot = document.querySelector('.steps')
    const steps = [...document.querySelectorAll<HTMLElement>('.step')]
    let pendingSteps: HTMLElement[] = []
    if (stepsRoot && steps.length && !reduce) {
      stepsRoot.classList.add('js-reveal')
      pendingSteps = steps.slice()
    } else {
      steps.forEach((s) => s.classList.add('is-on'))
    }
    function stepTick() {
      if (!pendingSteps.length) return
      pendingSteps = pendingSteps.filter((s) => {
        if (!near(s, -60)) return true
        s.classList.add('is-on')
        return false
      })
    }

    /* ── scroll-progress bar ── */
    const bar = document.getElementById('scrollbar-fill')
    function progress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%'
    }

    /* ── one rAF-throttled scroll loop ── */
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        revealTick()
        stepTick()
        clipTick()
        progress()
        ticking = false
      })
    }
    const onScrollFlag = () => {
      hasScrolled = true
      onScroll()
    }
    window.addEventListener('scroll', onScrollFlag, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('load', onScroll)
    cleanups.push(() => {
      window.removeEventListener('scroll', onScrollFlag)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', onScroll)
    })

    /* ── belt-and-braces observer + slow poll ── */
    let liveSignal = false
    const gotSignal = () => {
      liveSignal = true
      onScroll()
    }
    window.addEventListener('scroll', gotSignal, { passive: true, once: true })
    let tickIo: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      tickIo = new IntersectionObserver(gotSignal, { threshold: [0, 0.15, 0.5] })
      ;[...revealEls, ...clips].forEach((el) => tickIo!.observe(el))
    }
    const poll = window.setInterval(() => {
      revealTick()
      stepTick()
      clipTick()
      progress()
      if (liveSignal || (!pendingReveal.length && !pendingSteps.length)) window.clearInterval(poll)
    }, 400)
    cleanups.push(() => {
      window.removeEventListener('scroll', gotSignal)
      if (tickIo) tickIo.disconnect()
      window.clearInterval(poll)
    })

    revealTick()
    stepTick()
    clipTick()
    progress()

    /* ── carousels: prev / next ── */
    document.querySelectorAll<HTMLElement>('.vid-track').forEach((track) => {
      const section = track.closest('section')
      const arrows = section ? [...section.querySelectorAll<HTMLButtonElement>('.vid-arrow')] : []
      const stepBy = () => {
        const card = track.firstElementChild
        return card ? card.getBoundingClientRect().width + 22 : 320
      }
      const clickHandlers: Array<[HTMLButtonElement, () => void]> = []
      arrows.forEach((a) => {
        const h = () =>
          track.scrollBy({ left: +a.dataset.dir! * stepBy(), behavior: reduce ? 'auto' : 'smooth' })
        a.addEventListener('click', h)
        clickHandlers.push([a, h])
      })
      const updateArrows = () => {
        const max = track.scrollWidth - track.clientWidth - 2
        arrows.forEach((a) => {
          a.disabled = +a.dataset.dir! < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max
        })
      }
      track.addEventListener('scroll', updateArrows, { passive: true })
      window.addEventListener('resize', updateArrows)
      updateArrows()
      cleanups.push(() => {
        clickHandlers.forEach(([a, h]) => a.removeEventListener('click', h))
        track.removeEventListener('scroll', updateArrows)
        window.removeEventListener('resize', updateArrows)
      })
    })

    /* ── lightbox: click any product image or clip to open full screen ── */
    const lbCleanup = initLightbox(play)
    if (lbCleanup) cleanups.push(lbCleanup)

    return () => cleanups.forEach((c) => c())
  }, [])
}

function initLightbox(play: (v: HTMLVideoElement) => void): (() => void) | null {
  const targets = [...document.querySelectorAll<HTMLElement>('.vw, .screen-shot, .flow-frame, .integ-logos')].filter(
    (el) => el.querySelector('img, video'),
  )
  if (!targets.length) return null

  const lb = document.createElement('div')
  lb.className = 'lb'
  lb.setAttribute('role', 'dialog')
  lb.setAttribute('aria-modal', 'true')
  lb.setAttribute('aria-label', 'Expanded view')
  lb.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close">' +
    '<svg class="ico"><use href="#i-close"/></svg></button>' +
    '<div class="lb-stage"></div><p class="lb-cap"></p>'
  document.body.appendChild(lb)

  const stage = lb.querySelector('.lb-stage') as HTMLElement
  const cap = lb.querySelector('.lb-cap') as HTMLElement
  const closeBtn = lb.querySelector('.lb-close') as HTMLElement
  let lastFocus: HTMLElement | null = null

  function close() {
    if (!lb.classList.contains('is-open')) return
    lb.classList.remove('is-open')
    document.body.classList.remove('lb-lock')
    stage.innerHTML = ''
    if (lastFocus) lastFocus.focus()
  }

  function open(el: HTMLElement) {
    const src = el.querySelector('img, video') as HTMLImageElement | HTMLVideoElement | null
    if (!src) return
    lastFocus = el
    stage.innerHTML = ''
    const node = src.cloneNode(true) as HTMLElement
    if (node.tagName === 'VIDEO') {
      const v = node as HTMLVideoElement
      v.muted = true
      v.loop = true
      v.controls = true
      v.setAttribute('playsinline', '')
      v.removeAttribute('poster')
      v.currentTime = (src as HTMLVideoElement).currentTime || 0
      stage.appendChild(v)
      play(v)
    } else {
      node.removeAttribute('width')
      node.removeAttribute('height')
      stage.appendChild(node)
    }
    cap.textContent = src.getAttribute('aria-label') || src.getAttribute('alt') || ''
    lb.classList.add('is-open')
    document.body.classList.add('lb-lock')
    closeBtn.focus()
  }

  const perTarget: Array<() => void> = []
  targets.forEach((el) => {
    el.classList.add('zoomable')
    el.setAttribute('tabindex', '0')
    el.setAttribute('role', 'button')
    const media = el.querySelector('img, video')
    const what = media && media.tagName === 'VIDEO' ? 'clip' : 'image'
    el.setAttribute('aria-label', 'Open this ' + what + ' full screen')

    const cue = document.createElement('span')
    cue.className = 'zoom-cue'
    cue.innerHTML = '<svg class="ico"><use href="#i-expand"/></svg>'
    el.appendChild(cue)

    const onClick = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      open(el)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open(el)
      }
    }
    el.addEventListener('click', onClick)
    el.addEventListener('keydown', onKey)
    perTarget.push(() => {
      el.removeEventListener('click', onClick)
      el.removeEventListener('keydown', onKey)
      cue.remove()
      el.classList.remove('zoomable')
    })
  })

  const onCloseClick = () => close()
  const onBackdrop = (e: MouseEvent) => {
    if (e.target === lb) close()
  }
  const onEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  closeBtn.addEventListener('click', onCloseClick)
  lb.addEventListener('click', onBackdrop)
  document.addEventListener('keydown', onEsc)

  return () => {
    perTarget.forEach((c) => c())
    document.removeEventListener('keydown', onEsc)
    lb.remove()
    document.body.classList.remove('lb-lock')
  }
}
