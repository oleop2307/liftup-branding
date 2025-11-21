// Main JavaScript file for Ole Opitz personal website

// Header scroll behavior
(() => {
    const header = document.querySelector('.site-header');
    let lastY = window.scrollY;
    let ticking = false, hidden = false, compact = false;
    const offset = 100, tol = 5;
    
    const smooth = () => {
        const y = window.scrollY, d = y - lastY;
        if (Math.abs(d) < tol) return (ticking = false);
        if (y > offset && d > 0 && !hidden) header.classList.add('is-hidden');
        if (d < 0 && hidden) header.classList.remove('is-hidden');
        header.classList.toggle('is-compact', y > 4);
        hidden = header.classList.contains('is-hidden');
        lastY = y; 
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) { 
            window.requestAnimationFrame(smooth); 
            ticking = true; 
        }
    }, { passive: true });
})();

// Hero photo parallax effect
(() => {
    const photo = document.querySelector('#hero-photo img');
    if (!photo) return;

    const maxTranslate = 50;
    const maxZoom = 1.08;

    function parallax() {
        const y = window.scrollY;
        const limit = window.innerHeight;
        if (y <= limit) {
            const progress = y / limit;
            const translate = progress * maxTranslate;
            const scale = 1.05 + progress * (maxZoom - 1.05);
            photo.style.transform = `translateY(${translate}px) scale(${scale})`;
        }
    }

    window.addEventListener('scroll', parallax, { passive: true });
})();

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form handling
const form = document.querySelector(".contact-form");
const button = document.querySelector(".submit-button");
const thankYou = document.getElementById("thankYou");

if (form && button && thankYou) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        button.disabled = true;
        button.textContent = "Gesendet ✓";

        thankYou.classList.add("show");

        setTimeout(() => {
            button.disabled = false;
            button.textContent = "Senden";
            thankYou.classList.remove("show");
        }, 5000);
    });
}

// Modal system for Impressum & Datenschutz
function setupModal(openId, modalId, closeId) {
    const openBtn = document.getElementById(openId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);

    if (!openBtn || !modal || !closeBtn) return;

    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("show");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") modal.classList.remove("show");
    });
}

setupModal("openImpressum", "impressumModal", "closeImpressum");
setupModal("openDatenschutz", "datenschutzModal", "closeDatenschutz");

// Back to top button
const toTopBtn = document.querySelector('.to-top');

if (toTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });

    toTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Navigation - Korrigierte Version
document.addEventListener("DOMContentLoaded", () => {
  const navToggle  = document.querySelector('.nav-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');
  const body = document.body;

  if (!navToggle || !navWrapper) return;

  function closeMenu() {
    navWrapper.classList.remove('active');
    body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const active = navWrapper.classList.toggle('active');
    body.classList.toggle('menu-open', active);
    navToggle.setAttribute('aria-expanded', active ? 'true' : 'false');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = active ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  document.querySelectorAll('.nav a').forEach(a =>
    a.addEventListener('click', closeMenu)
  );

  document.addEventListener('click', (e) => {
    if (!navWrapper.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});

// Scroll Progress Indicator
(() => {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

// Sticky CTA Button
(() => {
  const ctaBtn = document.querySelector('.sticky-cta');
  if (!ctaBtn) return;

  const showCTA = () => {
    if (window.scrollY > 400) {
      ctaBtn.classList.add('show');
    } else {
      ctaBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', showCTA, { passive: true });

  ctaBtn.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
})();

// Skill Bars Animation beim Sichtbarwerden
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));
