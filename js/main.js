/**
 * Jason Malmberg Website — main.js
 * Core site interactions: loading, navigation, scroll reveals, copy year.
 */

'use strict';

/* =========================================================================
   Loading Screen
   ========================================================================= */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader once fonts + page are ready
  window.addEventListener('load', () => {
    // Small delay so the animation has a moment to be seen
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.setAttribute('aria-hidden', 'true');
      // Remove from tab order after transition
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
      }, { once: true });
    }, 600);
  });
}

/* =========================================================================
   Navigation
   ========================================================================= */
function initNav() {
  const header    = document.querySelector('.site-header');
  const toggle    = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  // Sticky header shadow on scroll
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
  }

  // Mobile hamburger toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    // Close nav when a link is clicked (mobile)
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        toggle.focus();
      }
    });
  }
}

/* =========================================================================
   Scroll Reveal
   ========================================================================= */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* =========================================================================
   Copyright Year
   ========================================================================= */
function initCopyYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('#copy-year, .copy-year').forEach(el => {
    el.textContent = year;
  });
}

/* =========================================================================
   Active Nav Link (highlight current page)
   ========================================================================= */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Match exact page or index default
    const linkPage = href.split('#')[0].split('/').pop() || 'index.html';
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

/* =========================================================================
   Console Easter Egg — for curious developers
   ========================================================================= */
function initConsoleEasterEgg() {
  const styles = {
    big:  'color: #c9a227; font-size: 18px; font-weight: bold; font-family: monospace;',
    body: 'color: #8a857a; font-size: 13px; font-family: monospace; line-height: 1.6;',
    gold: 'color: #c9a227; font-size: 13px; font-family: monospace;',
    punk: 'color: #e8003d; font-size: 13px; font-family: monospace;',
    dim:  'color: #4a4540; font-size: 12px; font-family: monospace;',
  };

  // ASCII bass clef + site name
  console.log(
    '%c' +
`╔════════════════════════════════════════════════════╗
║                                                    ║
║   𝄢  JASON MALMBERG — BASSIST & BANDLEADER  𝄞    ║
║                                                    ║
╚════════════════════════════════════════════════════╝`,
    styles.big
  );

  console.log(
    '%cYou opened the DevTools. Nice. A person of taste.\n\nThis site was built with plain HTML, CSS, and JavaScript.\nNo framework. No build step. Just the fundamentals.',
    styles.body
  );

  console.log(
    '%c\nInfluences wired into the DNA of this site:',
    styles.gold
  );

  const influences = [
    { name: 'Joe Lally',       note: 'Fugazi. Minimalist. Driving. Righteous.' },
    { name: 'Dee Dee Ramone',  note: '1-2-3-4. The count-in that started everything.' },
    { name: 'Steve Youth',     note: 'Punk bass with something to say.' },
    { name: 'Roland Kirk',     note: 'Played three instruments at once. Refused limits.' },
    { name: 'Charles Mingus',  note: 'The jazz workshop. Leader, composer, force of nature.' },
    { name: 'Jaco Pastorius',  note: 'Made the bass a lead instrument. Changed everything.' },
  ];

  influences.forEach(({ name, note }) => {
    console.log(`%c  ♩ ${name.padEnd(18)} %c${note}`, styles.gold, styles.body);
  });

  console.log(
    '%c\nEaster eggs hidden in the site:\n  ↑ ↑ ↓ ↓ ← → ← → B A  — classic.\n  Click the logo 3 times  — Dee Dee says hi.\n  Type M-I-N-G-U-S        — workshop mode.',
    styles.punk
  );

  console.log(
    '%c\n"If you\'re not playing the right thing, at least play it loud." — C.M.',
    styles.dim
  );
}

/* =========================================================================
   Smooth Scroll for anchor links
   ========================================================================= */
function initSmoothScroll() {
  // CSS handles smooth-scroll; this adds offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.site-header')?.offsetHeight ?? 64;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* =========================================================================
   Punk Jazz Mode Toggle (Easter egg — activated from easter-eggs.js)
   ========================================================================= */
function initPunkJazzMode() {
  const overlay = document.getElementById('pjm-overlay');
  const closeBtn = document.getElementById('pjm-close');
  if (!overlay || !closeBtn) return;

  // Expose opener for easter-eggs.js to call
  window.openPunkJazzMode = () => {
    overlay.hidden = false;
    overlay.classList.add('active');
    body.classList.add('punk-jazz-mode');
    closeBtn.focus();

    // Trap focus in overlay
    overlay.addEventListener('keydown', trapFocus);
  };

  window.closePunkJazzMode = () => {
    overlay.classList.remove('active');
    body.classList.remove('punk-jazz-mode');
    overlay.addEventListener('transitionend', () => {
      overlay.hidden = true;
    }, { once: true });
    overlay.removeEventListener('keydown', trapFocus);
  };

  closeBtn.addEventListener('click', window.closePunkJazzMode);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) window.closePunkJazzMode();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) window.closePunkJazzMode();
  });

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }
}

/* =========================================================================
   Count-in Toast (Dee Dee Ramone Easter egg — activated from easter-eggs.js)
   ========================================================================= */
function initCountInToast() {
  const toast = document.getElementById('count-in-toast');
  if (!toast) return;

  window.showCountIn = () => {
    const lines = ['1!', '2!', '3!', '4!'];
    let i = 0;

    const show = () => {
      toast.textContent = lines[i];
      toast.classList.add('show');
      i++;

      if (i < lines.length) {
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(show, 200);
        }, 350);
      } else {
        setTimeout(() => toast.classList.remove('show'), 600);
      }
    };

    show();
  };
}

/* =========================================================================
   Init All
   ========================================================================= */
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initScrollReveal();
  initCopyYear();
  initActiveNav();
  initConsoleEasterEgg();
  initSmoothScroll();
  initPunkJazzMode();
  initCountInToast();
});
