/* ══════════════════════════════════════════════
   AgentZ — landing interactions
   Native scroll. No smooth-scroll hijack, no vendor libs.
   ══════════════════════════════════════════════ */

/* ── reveal-on-scroll ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.gcard,.deep-copy,.deep-media,.bento-tile,.scale-viz,.scale-copy,.diagram-card')
  .forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .6s ease ${(i % 6) * 0.05}s, transform .6s ease ${(i % 6) * 0.05}s`;
    io.observe(el);
  });

/* ── waitlist is handled by Tally (embed.js) ──
   CTAs use data-tally-open="RGlZ1l"; the #waitlist section embeds the same form. */

/* ── pinned word carousel: BUILD → RUN → GOVERN ──
   MANUAL pin: JS toggles .sky-pin between position:fixed (locked to the
   viewport centre while the section is in range) and absolute (above/below).
   Fixed centre, opacity cross-fade only.                                   */
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
      if (h2) h2.style.opacity = op.toFixed(3);
      const subOp = smooth((op - 0.8) / 0.2);      // subtitle only when a word is settled
      if (sub) sub.style.opacity = subOp.toFixed(3);
      s.style.opacity = '1';
      s.style.zIndex = String(Math.round(op * 100));
      s.style.transform = 'translateY(' + y.toFixed(1) + 'px) scale(' + (0.99 + 0.01 * op).toFixed(4) + ')';
    });
  }

  if (reduce) return; // CSS shows the words stacked & visible

  let targetP = 0, curP = 0;

  function updatePin() {
    const rect = sky.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = sky.offsetHeight - vh;
    if (total <= 0) { targetP = 0; return; }
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
