/* ============================================
   IKESPATTS STUDIO — script.js
   ============================================ */

/* ---- STICKY NAVBAR ---- */
const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
if (navbar && !navbar.classList.contains('always')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ---- MOBILE MENU ---- */
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navClose  = document.getElementById('navClose');

function openDrawer() {
  if (navDrawer) navDrawer.classList.add('open');
}
function closeDrawer() {
  if (navDrawer) navDrawer.classList.remove('open');
}

if (navToggle) navToggle.addEventListener('click', openDrawer);
if (navClose)  navClose.addEventListener('click', closeDrawer);

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => obs.observe(el));
}

/* ---- PROJECT FILTER (projects page) ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  const cards = document.querySelectorAll('.projects-grid .proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.platform === filter;
        card.style.display = show ? '' : 'none';
        // Restore wide span when showing all
        if (show && filter === 'all' && card.classList.contains('wide')) {
          card.style.gridColumn = '';
        } else if (show && filter !== 'all') {
          card.style.gridColumn = ''; // remove wide span when filtered
        }
      });
    });
  });
}
