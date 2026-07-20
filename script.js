/* ══════════════════════════════════════════════
   AgentZ — landing interactions
   ══════════════════════════════════════════════ */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
document.querySelectorAll('.ph-hero,.vw-hero,.arch-frame,.arch-rail,.flow,.ncard,.dcard,.dmn,.org-canvas,.control-copy,.control-card,.video-card,.screen-card,.integ-logos,.runtime-copy,.runtime-media')
  .forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ease ${(i % 4) * 0.06}s, transform .6s ease ${(i % 4) * 0.06}s`;
    io.observe(el);
  });

/* ── product clips: silent loops, only while on screen ── */
const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

const clips = [...document.querySelectorAll('.vw video')];
clips.forEach((v) => { v.muted = true; });
if (clips.length && !reduce) {
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) play(en.target);
      else if (!en.target.paused) en.target.pause();
    });
  }, { threshold: 0.25 });
  clips.forEach((v) => vio.observe(v));
}

/* ── Build · Run · Govern: stacked steps, each revealing as it scrolls in ── */
const stepsRoot = document.querySelector('.steps');
const steps = [...document.querySelectorAll('.step')];
if (stepsRoot && steps.length && !reduce) {
  stepsRoot.classList.add('js-reveal');
  const sio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-on');
      sio.unobserve(en.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  steps.forEach((s) => sio.observe(s));
} else {
  steps.forEach((s) => s.classList.add('is-on'));
}

/* ── lightbox: click any product image or clip to open it full screen ── */
(() => {
  const targets = [...document.querySelectorAll('.vw, .screen-shot, .flow-frame, .integ-logos')]
    .filter((el) => el.querySelector('img, video'));
  if (!targets.length) return;

  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Expanded view');
  lb.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close">' +
    '<svg class="ico"><use href="#i-close"/></svg></button>' +
    '<div class="lb-stage"></div><p class="lb-cap"></p>';
  document.body.appendChild(lb);

  const stage = lb.querySelector('.lb-stage');
  const cap = lb.querySelector('.lb-cap');
  const closeBtn = lb.querySelector('.lb-close');
  let lastFocus = null;

  function close() {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    document.body.classList.remove('lb-lock');
    stage.innerHTML = '';
    if (lastFocus) lastFocus.focus();
  }

  function open(el) {
    const src = el.querySelector('img, video');
    if (!src) return;
    lastFocus = el;
    stage.innerHTML = '';

    const node = src.cloneNode(true);
    if (node.tagName === 'VIDEO') {
      node.muted = true;
      node.loop = true;
      node.controls = true;
      node.setAttribute('playsinline', '');
      node.removeAttribute('poster');
      node.currentTime = src.currentTime || 0;
      stage.appendChild(node);
      if (!reduce) play(node);
    } else {
      node.removeAttribute('width');
      node.removeAttribute('height');
      stage.appendChild(node);
    }

    cap.textContent = src.getAttribute('aria-label') || src.getAttribute('alt') || '';
    lb.classList.add('is-open');
    document.body.classList.add('lb-lock');
    closeBtn.focus();
  }

  targets.forEach((el) => {
    el.classList.add('zoomable');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    const media = el.querySelector('img, video');
    const what = media && media.tagName === 'VIDEO' ? 'clip' : 'image';
    el.setAttribute('aria-label', 'Open this ' + what + ' full screen');

    const cue = document.createElement('span');
    cue.className = 'zoom-cue';
    cue.innerHTML = '<svg class="ico"><use href="#i-expand"/></svg>';
    el.appendChild(cue);

    el.addEventListener('click', (e) => {
      e.preventDefault();   /* demo cards wrap the clip in a link */
      e.stopPropagation();
      open(el);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
    });
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

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
    progress();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
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
