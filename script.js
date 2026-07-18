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
document.querySelectorAll('.arch-frame,.arch-rail,.ncard,.video-card,.runtime-copy,.runtime-media,.tpl-copy,.tpl-trio .ph,.int-logos')
  .forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ease ${(i % 4) * 0.06}s, transform .6s ease ${(i % 4) * 0.06}s`;
    io.observe(el);
  });

/* ── Build · Run · Govern scroll stepper ── */
const stepper = document.querySelector('.stepper');
const words = [...document.querySelectorAll('.step-word')];
const screens = [...document.querySelectorAll('.step-screen')];
const dots = [...document.querySelectorAll('.step-dot')];
let curStep = -1;

function setStep(i) {
  if (i === curStep) return;
  curStep = i;
  words.forEach((w) => w.classList.toggle('is-on', +w.dataset.step === i));
  screens.forEach((s) => s.classList.toggle('is-on', +s.dataset.screen === i));
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

/* ── top scroll-progress bar + section counter ── */
const bar = document.getElementById('scrollbar-fill');
const secNum = document.getElementById('sec-num');
const secs = [...document.querySelectorAll('[data-sec]')];

function progress() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (bar) bar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
  if (secNum) {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let cur = secs[0];
    for (const s of secs) { if (s.offsetTop <= mid) cur = s; }
    if (cur) secNum.textContent = cur.dataset.sec;
  }
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
