/* =============================================
   ROHAN MHABDI PORTFOLIO — script.js
   Pure Vanilla JS + GSAP + Lenis
   ============================================= */

'use strict';

// =============================================
// LOADER
// =============================================
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  let progress = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 22;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('loading');
        initHeroReveal();
      }, 300);
    }
    fill.style.width = progress + '%';
  }, 80);
})();

// =============================================
// HERO REVEAL (runs after loader)
// =============================================
function initHeroReveal() {
  const reveals = document.querySelectorAll('.hero .reveal-up');
  reveals.forEach(el => el.classList.add('animated'));
  initCounters();
}

// =============================================
// SMOOTH SCROLL — Lenis
// =============================================
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

// =============================================
// CUSTOM CURSOR
// =============================================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;

  let curX = 0, curY = 0;
  let folX = 0, folY = 0;

  document.addEventListener('mousemove', (e) => {
    curX = e.clientX;
    curY = e.clientY;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
  });

  function animateFollower() {
    folX += (curX - folX) * 0.08;
    folY += (curY - folY) * 0.08;
    follower.style.left = folX + 'px';
    follower.style.top = folY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const hoverEls = document.querySelectorAll('a, button, [data-magnetic], .project-card, .video-card, .expertise-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
}

// =============================================
// SCROLL PROGRESS
// =============================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / maxScroll * 100) + '%';
  }, { passive: true });
}

// =============================================
// NAVBAR
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// =============================================
// HAMBURGER / MOBILE MENU
// =============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

// =============================================
// MAGNETIC BUTTONS
// =============================================
function initMagneticButtons() {
  const magnetics = document.querySelectorAll('[data-magnetic]');

  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'translate(0, 0)';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });
}

// =============================================
// CARD TILT EFFECT
// =============================================
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -10;
      const tiltY = x * 10;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// =============================================
// PARTICLES CANVAS
// =============================================
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.4, 1.6),
      dx: rand(-0.2, 0.2),
      dy: rand(-0.3, -0.08),
      alpha: rand(0.1, 0.5),
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -10) Object.assign(p, createParticle(), { y: H + 10 });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// =============================================
// HERO PARALLAX
// =============================================
function initHeroParallax() {
  const portrait = document.getElementById('portraitWrap');
  const blobs = document.querySelectorAll('.blob');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    if (portrait) {
      portrait.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
    }
    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 0.6;
      blob.style.transform = `translate(${x * factor * 8}px, ${y * factor * 8}px)`;
    });
  });
}

// =============================================
// SCROLL-TRIGGERED REVEALS
// =============================================
function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// =============================================
// COUNTER ANIMATION
// =============================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      counter.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Observer for about-section counters
function initScrollCounters() {
  const statCards = document.querySelectorAll('.stat-card');
  if (!statCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.getAttribute('data-count'));
          const duration = 1600;
          const start = performance.now();
          const run = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target);
            if (p < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => observer.observe(card));
}

// =============================================
// SKILL BARS
// =============================================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        setTimeout(() => {
          target.style.width = target.getAttribute('data-width') + '%';
        }, 100);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// =============================================
// VIDEO FILTER TABS
// =============================================
function initVideoFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoCards = document.querySelectorAll('.video-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      videoCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity = '0.25';
          card.style.transform = 'scale(0.96)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });
}

// =============================================
// TESTIMONIAL SLIDER
// =============================================
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsWrap = document.getElementById('sliderDots');

  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }
  startAuto();

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  });
}

// =============================================
// PROJECT MODAL
// =============================================
const projectData = [
  {
    name: 'TowardsPoint - Travel Management System',
    desc: 'Full booking platform with scheduling, payments, and notifications.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Netlify'],
    demo: 'https://towardspoint12.netlify.app/', github: 'https://github.com/rohanmhabdi18/TowardsP', image: 'towardspoint_thumb.jpg',
  },
  {
    name: 'E-Commerce Platform',
    desc: 'A full-stack online store with user authentication, product filtering, cart management, Stripe payments, and an admin dashboard for inventory management.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT'],
    demo: '#', github: '#', icon: 'fa-bag-shopping',
  },
  {
    name: 'Portfolio Website',
    desc: 'An Awwwards-inspired personal portfolio with GSAP animations, Lenis smooth scroll, custom cursor, and cinematic section transitions.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Lenis'],
    demo: 'https://portfolioitsrohan.netlify.app/', github: 'https://github.com/rohanmhabdi18/Rohan-s-Portfolio', image: 'portfolio t.png',
  },
  {
    name: 'AI Writing Tool',
    desc: 'A content generation web application powered by OpenAI GPT with real-time streaming, multiple tones, history saving, and export functionality.',
    tech: ['React', 'OpenAI API', 'Firebase', 'Tailwind CSS'],
    demo: '#', github: '#', icon: 'fa-robot',
  },
  {
    name: 'Business Landing Page',
    desc: 'A high-converting SaaS landing page with animated hero, pricing tables, testimonials, FAQ accordion, and HubSpot form integration.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    demo: '#', github: '#', icon: 'fa-building',
  },
  {
    name: 'Analytics Dashboard',
    desc: 'Real-time data visualization dashboard with interactive charts, date filtering, CSV exports, and multi-user Firebase backend.',
    tech: ['React', 'D3.js', 'Firebase', 'Recharts'],
    demo: '#', github: '#', icon: 'fa-chart-line',
  },
];

function initProjectModals() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-project'));
      const data = projectData[idx];
      if (!data) return;

      modalBody.innerHTML = `
        ${data.image
          ? '<div style="width:100%; height:240px; margin-bottom:24px; border-radius:12px; border:1px solid var(--border); overflow:hidden;"><img src="' + data.image + '" style="width:100%; height:100%; object-fit:cover;" alt="' + data.name + '"></div>'
          : '<div class="modal-icon" style="font-size:52px;color:rgba(139,92,246,0.4);margin-bottom:20px;text-align:center;"><i class="fa-solid ' + data.icon + '"></i></div>'
        }
        <h3 style="font-family:var(--font-display);font-size:clamp(22px,3vw,30px);font-weight:800;letter-spacing:-0.5px;margin-bottom:16px;">${data.name}</h3>
        <p style="color:var(--white-70);font-size:15px;line-height:1.8;margin-bottom:24px;">${data.desc}</p>
        <div style="margin-bottom:28px;">
          <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--white-40);font-family:var(--font-mono);margin-bottom:12px;">Tech Stack</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${data.tech.map(t => `<span style="font-size:12px;padding:5px 14px;border-radius:50px;border:1px solid var(--border);color:var(--white-70);font-family:var(--font-mono);">${t}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:14px;">
          <a href="${data.demo}" class="btn btn-primary" style="font-size:13px;padding:12px 22px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
          <a href="${data.github}" class="btn btn-ghost" style="font-size:13px;padding:12px 22px;">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      `;
      overlay.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// =============================================
// VIDEO MODAL
// =============================================
function initVideoModal() {
  const overlay = document.getElementById('videoModalOverlay');
  const closeBtn = document.getElementById('videoModalClose');

  if (!overlay) return;

  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank');
      } else {
        overlay.classList.add('open');
        document.body.classList.add('no-scroll');
      }
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// =============================================
// CONTACT FORM
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("CjR0SoBhwqyVaMgta");
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check built-in HTML5 validation (required fields)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('.btn-submit');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');

    btn.disabled = true;
    span.textContent = 'Sending...';
    icon.className = 'fa-solid fa-spinner fa-spin';

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      service: document.getElementById("service") ? document.getElementById("service").value : "",
      budget: document.getElementById("budget") ? document.getElementById("budget").value : "",
      message: document.getElementById("message").value
    };

    try {
      // Email to you
      await emailjs.send(
        "service_fhkn98q",
        "template_nsqqxjn",
        templateParams
      );

      // Auto reply to visitor
      await emailjs.send(
        "service_fhkn98q",
        "template_kqblmoh",
        templateParams
      );

      // Success UI
      span.textContent = 'Message Sent Successfully!';
      icon.className = 'fa-solid fa-check';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';

      form.reset();
    } catch (error) {
      console.error(error);

      // Error UI
      span.textContent = 'Failed to send message.';
      icon.className = 'fa-solid fa-xmark';
      btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
    } finally {
      // Reset the form state after some time
      setTimeout(() => {
        span.textContent = 'Send Message';
        icon.className = 'fa-solid fa-paper-plane';
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    }
  });
}

// =============================================
// GSAP SCROLL ANIMATIONS (if GSAP available)
// =============================================
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Section headings use data-reveal instead of GSAP to avoid conflicts

  // Project cards use data-reveal instead of GSAP to avoid conflicts in iframes

  // Parallax on expertise section
  gsap.to('.blob-1', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    y: -200,
    ease: 'none',
  });
}

// =============================================
// SMOOTH ANCHOR SCROLL
// =============================================
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// =============================================
// INIT ALL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initMagneticButtons();
  initTiltCards();
  initParticles();
  initHeroParallax();
  initScrollReveals();
  initScrollCounters();
  initSkillBars();
  initVideoFilters();
  initTestimonialSlider();
  initProjectModals();
  initVideoModal();
  initContactForm();
  initAnchorScroll();
  initGSAP();
});
