// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
const btn = document.getElementById('themeBtn');
try { const t = localStorage.getItem('theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}
btn.addEventListener('click', () => {
  const dark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#0e1220';
  const next = dark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Fade-in on scroll
const items = document.querySelectorAll('.card, .facts, .about > div, .chips span');
items.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: 0.15 });
items.forEach(el => io.observe(el));

// Highlight active nav link
const links = document.querySelectorAll('nav div a');
const secs = [...links].map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  secs.forEach((s, i) => links[i].classList.toggle('active', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
});
