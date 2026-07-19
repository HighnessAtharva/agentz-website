/* ══════════════════════════════════════════════
   AgentZ — landing interactions
   ══════════════════════════════════════════════ */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ── reveal on scroll ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'none';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.ph-hero,.arch-frame,.arch-rail,.flow,.ncard,.dcard,.dmn,.org-canvas,.control-copy,.control-card,.video-card,.screen-card,.integ-logos,.runtime-copy,.runtime-media')
  .forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ease ${(i % 4) * 0.06}s, transform .6s ease ${(i % 4) * 0.06}s`;
    io.observe(el);
  });

/* ── Build · Run · Govern scroll stepper ── */
const stepper = document.querySelector('.stepper');
const steps = [...document.querySelectorAll('.step')];
const dots = [...document.querySelectorAll('.step-dot')];
let curStep = -1;

function setStep(i) {
  if (i === curStep) return;
  curStep = i;
  steps.forEach((s) => s.classList.toggle('is-on', +s.dataset.step === i));
  dots.forEach((d) => d.classList.toggle('is-on', +d.dataset.go === i));
}

function stepperProgress() {
  if (!stepper || reduce) return;
  const total = stepper.offsetHeight - window.innerHeight;
  if (total <= 0) { setStep(0); return; }
  const top = stepper.getBoundingClientRect().top;
  const p = clamp(-top / total, 0, 1);
  setStep(clamp(Math.floor(p * 3), 0, 2));
}

dots.forEach((d) => d.addEventListener('click', () => {
  if (!stepper) return;
  const i = +d.dataset.go;
  const total = stepper.offsetHeight - window.innerHeight;
  const absTop = stepper.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: absTop + total * ((i + 0.5) / 3), behavior: reduce ? 'auto' : 'smooth' });
}));

/* ── top scroll-progress bar ── */
const bar = document.getElementById('scrollbar-fill');
function progress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
}

/* ── one rAF-throttled scroll loop ── */
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    stepperProgress();
    progress();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
stepperProgress();
progress();

/* ── carousels (video + product screens): prev / next ── */
document.querySelectorAll('.vid-track').forEach((track) => {
  const section = track.closest('section');
  const arrows = section ? [...section.querySelectorAll('.vid-arrow')] : [];
  const stepBy = () => {
    const card = track.firstElementChild;
    return card ? card.getBoundingClientRect().width + 22 : 320;
  };
  arrows.forEach((a) => a.addEventListener('click', () => {
    track.scrollBy({ left: (+a.dataset.dir) * stepBy(), behavior: reduce ? 'auto' : 'smooth' });
  }));
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    arrows.forEach((a) => {
      a.disabled = (+a.dataset.dir < 0) ? track.scrollLeft <= 2 : track.scrollLeft >= max;
    });
  };
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
});
