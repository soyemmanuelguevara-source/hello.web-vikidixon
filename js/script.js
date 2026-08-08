document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  /* ===== Preloader ===== */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  };

  window.addEventListener('load', () => {
    window.setTimeout(hidePreloader, 650);
  });
  window.setTimeout(hidePreloader, 2600);

  /* ===== Header scroll state ===== */
  const onScroll = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Mobile menu ===== */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Hero title typewriter ===== */
  const typewriter = document.getElementById('hero-typewriter');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typewriter && !prefersReducedMotion) {
    const phrases = [
      'Tallas de Cintura y Abdomen en Pocos Días',
      'Una Figura Más Definida con Compuestos Herbales',
      'Resultados Visibles con la Faja de Yeso Flexible'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      typewriter.textContent = phrase.slice(0, letterIndex);

      if (!deleting && letterIndex < phrase.length) {
        letterIndex += 1;
        window.setTimeout(type, 48);
        return;
      }

      if (!deleting && letterIndex === phrase.length) {
        deleting = true;
        window.setTimeout(type, 1500);
        return;
      }

      if (deleting && letterIndex > 0) {
        letterIndex -= 1;
        window.setTimeout(type, 24);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(type, 360);
    };

    type();
  }

  /* ===== Reveal on scroll ===== */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px' });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  /* ===== Countdown timer (48h rolling offer) ===== */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
    const storageKey = 'vikydixon_offer_deadline';
    let deadline = Number(localStorage.getItem(storageKey));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + OFFER_DURATION_MS;
      localStorage.setItem(storageKey, String(deadline));
    }

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const pad = n => String(n).padStart(2, '0');

    let timer;
    const tick = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);

      if (remaining <= 0) {
        if (timer) window.clearInterval(timer);
        localStorage.removeItem(storageKey);
      }
    };
    tick();
    timer = window.setInterval(tick, 1000);
  }

  /* ===== FAQ accordion ===== */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion__trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        if (t.nextElementSibling) {
          t.nextElementSibling.style.maxHeight = null;
        }
      });

      if (!isOpen && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ===== Contact form (front-end only) ===== */
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Gracias. Un asesor te contactará muy pronto para confirmar tu 50% de descuento.';
      contactForm.reset();
    });
  }

  /* ===== Back to top ===== */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== Footer year ===== */
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
