// Nav shrink on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('small', window.scrollY > 60);
}, { passive: true });

// Hero bg lazy load with animation
const heroBg = document.getElementById('heroBg');
setTimeout(() => heroBg.classList.add('loaded'), 100);

// Scroll reveal
const srEls = document.querySelectorAll('.sr');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
srEls.forEach(el => io.observe(el));

// Counter animation
function countUp(el, target, suffix) {
  const dur = 1600;
  const start = performance.now();
  const fmt = (n) => n >= 1000 ? n.toLocaleString('es-PE') : String(n);
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 2.5);
    el.textContent = fmt(Math.round(ease * target)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const numSection = document.getElementById('numbers');
let counted = false;
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.num-val[data-target]').forEach(el => {
      countUp(el, +el.dataset.target, el.dataset.suffix);
    });
  }
}, { threshold: 0.4 }).observe(numSection);