/* ========== NAVBAR SCROLL EFFECT ========== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = current;
}, { passive: true });

/* ========== MOBILE NAV TOGGLE ========== */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ========== TESTIMONIAL SLIDER ========== */
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  cards.forEach(c => c.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  cards[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.index);
    showSlide(idx);
    resetAutoPlay();
  });
});

function startAutoPlay() {
  slideInterval = setInterval(() => {
    const next = (currentSlide + 1) % cards.length;
    showSlide(next);
  }, 5000);
}

function resetAutoPlay() {
  clearInterval(slideInterval);
  startAutoPlay();
}

startAutoPlay();

/* ========== COUNTER ANIMATION ========== */
function animateCounters() {
  const counters = document.querySelectorAll('.trust-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const increment = Math.ceil(target / 60);
    let current = 0;

    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        return;
      }
      counter.textContent = current.toLocaleString();
      requestAnimationFrame(update);
    };
    update();
  });
}

/* ========== SCROLL REVEAL (simple visibility check) ========== */
function onScrollReveal() {
  const trustSection = document.querySelector('.trust');
  if (!trustSection) return;
  const rect = trustSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight - 100;
  if (isVisible && !trustSection.dataset.counted) {
    trustSection.dataset.counted = 'true';
    animateCounters();
  }
}

window.addEventListener('scroll', onScrollReveal, { passive: true });
window.addEventListener('load', () => {
  setTimeout(onScrollReveal, 300);
});
