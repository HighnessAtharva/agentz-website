/* ══════════════════════════════════════════════
   Agent Z — Air-style landing · interactions
   ══════════════════════════════════════════════ */

/* ── SCROLL: native, 1:1 with the wheel ──
   Lenis (JS smooth-scroll) was hijacking the wheel and easing every scroll,
   which reads as "responding too late" on Chrome. Native scroll is instant
   and ScrollTrigger drives all the animations off it directly.
   Smooth anchor jumps still work via CSS `scroll-behavior:smooth`.        */
const USE_SMOOTH = false; // NATIVE SCROLL — locked. Lenis caused the lag; do not re-enable.
if (USE_SMOOTH && window.Lenis) {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  window.__lenis = lenis;
  if (window.gsap) {
    lenis.on('scroll', () => window.ScrollTrigger && ScrollTrigger.update());
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); }
    });
  });
}

/* ── nav: shadow on scroll ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── mega menus (hover on desktop, click as fallback) ── */
document.querySelectorAll('.nav-item.has-mega').forEach((item) => {
  const btn = item.querySelector('.nav-link');
  const open = (v) => {
    document.querySelectorAll('.nav-item.has-mega').forEach((o) => {
      if (o !== item) { o.classList.remove('open'); o.querySelector('.nav-link')?.setAttribute('aria-expanded', 'false'); }
    });
    item.classList.toggle('open', v);
    btn.setAttribute('aria-expanded', String(v));
  };
  item.addEventListener('mouseenter', () => open(true));
  item.addEventListener('mouseleave', () => open(false));
  btn.addEventListener('click', (e) => { e.preventDefault(); open(!item.classList.contains('open')); });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
  }
});

/* ── hero Build / Run / Govern toggle — swaps shot AND its caption chips ── */
const toggles = document.querySelectorAll('.ht');
const shots = document.querySelectorAll('.hero-shot');
const chipGroups = document.querySelectorAll('.chips');
function setShot(key) {
  toggles.forEach((x) => x.classList.toggle('is-active', x.dataset.toggle === key));
  shots.forEach((s) => s.classList.toggle('is-active', s.dataset.shot === key));
  chipGroups.forEach((c) => c.classList.toggle('is-active', c.dataset.chips === key));
}
toggles.forEach((t) => t.addEventListener('click', () => { heroAuto = false; setShot(t.dataset.toggle); }));

/* auto-cycle until the user interacts */
let heroIdx = 0, heroAuto = true;
const keys = ['build', 'run', 'govern'];
setInterval(() => {
  if (!heroAuto) return;
  heroIdx = (heroIdx + 1) % keys.length;
  setShot(keys[heroIdx]);
}, 3600);

/* ── mobile burger (simple: reveal a stacked menu) ── */
const burger = document.querySelector('.nav-burger');
burger?.addEventListener('click', () => {
  const menu = document.querySelector('.nav-menu');
  const cta = document.querySelector('.nav-cta');
  const show = menu.style.display !== 'flex';
  [menu, cta].forEach((el) => {
    el.style.display = show ? 'flex' : '';
    el.style.flexDirection = 'column';
    el.style.position = 'absolute';
    el.style.top = 'var(--nav-h)';
    el.style.left = '0';
    el.style.right = '0';
    el.style.background = '#fff';
    el.style.borderBottom = '1px solid var(--line)';
    el.style.padding = '16px 24px';
    el.style.gap = '4px';
    if (!show) el.removeAttribute('style');
  });
});

/* ── reveal-on-scroll ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fg-card,.deep-copy,.deep-media,.mini-card,.sol-card,.tr-col,.price-card,.def,.layer,.glass-card')
  .forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .6s ease ${(i % 6) * 0.05}s, transform .6s ease ${(i % 6) * 0.05}s`;
    io.observe(el);
  });

/* ── waitlist is handled by Tally (embed.js) ──
   CTAs use data-tally-open="RGlZ1l" for the modal; the #waitlist section
   embeds the same form inline. Submissions flow to your connected Sheet.   */

/* ── image lightbox: click any screenshot/diagram/logo to view it enlarged ── */
(function () {
  const box = document.getElementById('lightbox');
  const boxImg = document.getElementById('lb-img');
  if (!box || !boxImg) return;
  // every content image worth enlarging (skip tiny nav/brand marks)
  const targets = document.querySelectorAll(
    '.browser-body img, .shot img, .diagram-card img, .mcard-shot img, ' +
    '.int-logos img, .mega-card-shot img, .sky-chip img, .scale-viz img'
  );
  const open = (src, alt) => {
    boxImg.src = src; boxImg.alt = alt || '';
    box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    box.classList.remove('open'); box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  targets.forEach((img) => {
    img.classList.add('lb-able');
    img.addEventListener('click', (e) => { e.stopPropagation(); open(img.currentSrc || img.src, img.alt); });
  });
  document.getElementById('lb-close')?.addEventListener('click', close);
  box.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
})();

/* ── zoom-to-inspect: hover a screenshot to magnify into the detail ── */
document.querySelectorAll('.zoomable').forEach((z) => {
  const img = z.querySelector('img');
  if (!img) return;
  z.classList.add('is-zoomable');
  z.addEventListener('mousemove', (e) => {
    const r = z.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(2.1)';
  });
  z.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
});

/* ── pinned word carousel: BUILD → RUN → GOVERN ──
   MANUAL pin: JS toggles .sky-pin between position:fixed (locked to
   viewport-centre while the section is in range) and absolute (above/below).
   position:fixed is unaffected by the overflow-x:clip that broke sticky and
   works because no ancestor has a transform. Fixed centre, opacity only.    */
(function () {
  const sky = document.querySelector('.sky');
  if (!sky) return;
  const pin = sky.querySelector('.sky-pin');
  const slides = [...sky.querySelectorAll('.sky-slide')];
  const N = slides.length;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TW = 0.22;       // small handoff → each word HOLDS ~78% of its long segment
  const DRIFT = 0.05;    // barely-there vertical drift on handoff (feels "fixed")
  const smooth = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

  const HOLD_END = 0.8;  // words finish sequencing by 80% of scroll; the last 20%
  function setWords(p) { //  keeps the final word (GOVERN) held before the section releases
    const active = Math.min(1, p / HOLD_END) * (N - 1);
    const vh = window.innerHeight;
    const base = Math.min(N - 1, Math.floor(active + 1e-6));
    const frac = active - base;
    const t = frac < 1 - TW ? 0 : smooth((frac - (1 - TW)) / TW);
    slides.forEach((s, i) => {
      let op = 0, y = 0;
      if (i === base)          { op = 1 - smooth(t); y = -t * DRIFT * vh; }
      else if (i === base + 1) { op = smooth(t);     y = (1 - t) * DRIFT * vh; }
      const h2 = s.querySelector('h2');
      const sub = s.querySelector('p');
      const chip = s.querySelector('.sky-chip');
      if (h2) h2.style.opacity = op.toFixed(3);
      const subOp = smooth((op - 0.8) / 0.2);      // subtitle only when a word is settled
      if (sub) sub.style.opacity = subOp.toFixed(3);
      if (chip) chip.style.opacity = subOp.toFixed(3);
      s.style.opacity = '1';
      s.style.zIndex = String(Math.round(op * 100));
      s.style.transform = 'translateY(' + y.toFixed(1) + 'px) scale(' + (0.99 + 0.01 * op).toFixed(4) + ')';
    });
  }

  if (reduce) return; // CSS shows the words stacked & visible

  let targetP = 0, curP = 0;

  // pin state + target progress track raw scroll instantly
  function updatePin() {
    const rect = sky.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = sky.offsetHeight - vh;
    if (total <= 0) { targetP = 0; return; }
    // NOTE: !important — the stylesheet forces .sky-pin position with !important,
    // which would otherwise override these inline values and stop it pinning.
    if (rect.top > 0) {                       // section below — park pin at its top
      pin.style.setProperty('position', 'absolute', 'important'); pin.style.top = '0px';
    } else if (rect.top < -total) {           // section scrolled past — park at bottom
      pin.style.setProperty('position', 'absolute', 'important'); pin.style.top = total + 'px';
    } else {                                  // in range — LOCK to viewport centre
      pin.style.setProperty('position', 'fixed', 'important'); pin.style.top = '0px';
    }
    pin.style.left = '0px';
    pin.style.width = '100%';
    targetP = Math.min(1, Math.max(0, -rect.top / total));
  }

  // the word cross-fade EASES toward the target → smooth even on fast/jerky scroll
  function loop() {
    curP += (targetP - curP) * 0.08;
    if (Math.abs(targetP - curP) < 0.0003) curP = targetP;
    setWords(curP);
    requestAnimationFrame(loop);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { updatePin(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', updatePin);
  updatePin();
  requestAnimationFrame(loop);
})();

/* ── get-started modal: show once per visitor after a short delay ── */
(function () {
  const overlay = document.getElementById('modal');
  if (!overlay) return;
  const open = () => { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); };
  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    try { localStorage.setItem('agentz_modal_seen', '1'); } catch (e) {}
  };
  document.getElementById('modal-x')?.addEventListener('click', close);
  document.getElementById('modal-later')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  let seen = false;
  try { seen = localStorage.getItem('agentz_modal_seen') === '1'; } catch (e) {}
  if (!seen) setTimeout(open, 6000);

  // let anything linking to #get-started re-open it on demand
  document.querySelectorAll('a[href="#get-started"]').forEach((a) =>
    a.addEventListener('click', (e) => { e.preventDefault(); open(); }));
})();

/* ══════════════ GSAP SCROLL MOTION ══════════════ */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.gsap && window.ScrollTrigger && !reduce) {
  gsap.registerPlugin(ScrollTrigger);

  /* (hero dashboard parallax removed — it was drifting the screenshot down
     across the hero→cards border) */
  gsap.utils.toArray('.chip').forEach((chip, i) => {
    gsap.to(chip, {
      yPercent: (i % 2 ? -60 : -100) - i * 8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  });

  /* Build/Run/Govern words: gentle rise as each row enters (visible by default) */
  gsap.utils.toArray('.brg-row').forEach((row) => {
    gsap.from(row, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 88%' } });
  });

  /* deep-dive media parallax */
  gsap.utils.toArray('.deep-media').forEach((m) => {
    gsap.fromTo(m, { yPercent: 8 }, { yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
}
