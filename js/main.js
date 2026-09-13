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
   Modal Manager
   Small shared coordinator so popups on this site never stack. Each popup
   asks permission before opening and reports back when it closes.
   ========================================================================= */
const ModalManager = (function () {
  let openId = null;

  return {
    requestOpen(id) {
      if (openId !== null) return false;
      openId = id;
      return true;
    },
    notifyClosed(id) {
      if (openId === id) openId = null;
    }
  };
})();

/* =========================================================================
   Mailing List Popup
   Auto-shows once per visitor, then never again. Reuses the same
   Mailchimp form/endpoint as the #mailing-list section on the page.
   ========================================================================= */
const ML_POPUP_STORAGE_KEY = 'mailingListPopupSeen';
const ML_POPUP_MODAL_ID = 'mailing-list';

function initMailingListPopup() {
  const overlay = document.getElementById('ml-popup-overlay');
  const closeBtn = document.getElementById('ml-popup-close');
  const form = document.getElementById('mc-embedded-subscribe-form-popup');
  if (!overlay || !closeBtn) return;

  const STORAGE_KEY = ML_POPUP_STORAGE_KEY;
  const SHOW_DELAY_MS = 2500;

  const hasBeenSeen = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (err) {
      // localStorage unavailable (private mode, disabled, etc.) — don't nag repeatedly
      return true;
    }
  };

  const markAsSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (err) {
      // Ignore — nothing we can do if storage is unavailable
    }
  };

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }

  function openPopup() {
    overlay.hidden = false;
    overlay.classList.add('active');
    closeBtn.focus();
    overlay.addEventListener('keydown', trapFocus);
  }

  function closePopup() {
    overlay.classList.remove('active');
    overlay.addEventListener('transitionend', () => {
      overlay.hidden = true;
    }, { once: true });
    // Fallback in case there's no transition to wait on
    setTimeout(() => { overlay.hidden = true; }, 400);
    overlay.removeEventListener('keydown', trapFocus);
    ModalManager.notifyClosed(ML_POPUP_MODAL_ID);
  }

  closeBtn.addEventListener('click', closePopup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closePopup();
  });

  // Signup success path: make sure the flag is set even if it somehow
  // wasn't already (e.g. popup was shown before this code existed).
  if (form) {
    form.addEventListener('submit', () => {
      markAsSeen();
    });
  }

  if (hasBeenSeen()) return;

  setTimeout(() => {
    // Re-check — a visitor could have already dismissed/submitted via
    // another tab, or the flag could have been set moments ago.
    if (hasBeenSeen()) return;
    if (!ModalManager.requestOpen(ML_POPUP_MODAL_ID)) return;
    markAsSeen();
    openPopup();
  }, SHOW_DELAY_MS);
}

/* =========================================================================
   Ticket Popup — Config
   Edit these two constants to change frequency or retire the popup.
   ========================================================================= */
const TICKET_POPUP_MIN_HOURS = 24; // Min hours between shows, per visitor. 0 = show on every page load.
const TICKET_POPUP_END_DATE = '2026-10-03'; // Popup stops appearing after this date (visitor's local time).

/* =========================================================================
   Ticket Popup — Record Release Show
   Shows on returning visits only: it never appears on a visitor's first
   visit, since the mailing list popup above takes priority that visit
   (see the isFirstVisit check below). Coordinates with the mailing list
   popup through ModalManager so the two never overlap.
   ========================================================================= */
function initTicketPopup() {
  const overlay = document.getElementById('ticket-popup-overlay');
  const closeBtn = document.getElementById('ticket-popup-close');
  const dismissBtn = document.getElementById('ticket-popup-dismiss');
  if (!overlay || !closeBtn) return;

  const STORAGE_KEY = 'ticketPopupLastShown';
  const SHOW_DELAY_MS = 2500;
  const MODAL_ID = 'ticket';

  // Decided once, at page load, before either popup's timer can fire —
  // so it can't be affected by the mailing list popup marking itself
  // "seen" later in this same page view.
  const isFirstVisit = (() => {
    try {
      return localStorage.getItem(ML_POPUP_STORAGE_KEY) !== 'true';
    } catch (err) {
      // Mailing list popup treats storage failure as "already seen" —
      // mirror that here so the two stay in sync.
      return false;
    }
  })();

  const isExpired = () => {
    const [y, m, d] = TICKET_POPUP_END_DATE.split('-').map(Number);
    const end = new Date(y, m - 1, d, 23, 59, 59, 999);
    return Date.now() > end.getTime();
  };

  const isDue = () => {
    if (TICKET_POPUP_MIN_HOURS <= 0) return true;
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (!last) return true;
      const elapsedHours = (Date.now() - Number(last)) / 3600000;
      return elapsedHours >= TICKET_POPUP_MIN_HOURS;
    } catch (err) {
      return true; // localStorage unavailable — fail open
    }
  };

  const markShown = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {
      // Ignore — nothing we can do if storage is unavailable
    }
  };

  let lastFocused = null;

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }

  function openPopup() {
    lastFocused = document.activeElement;
    body.classList.add('modal-open');
    overlay.hidden = false;
    overlay.classList.add('active');
    closeBtn.focus();
    overlay.addEventListener('keydown', trapFocus);
  }

  function closePopup() {
    overlay.classList.remove('active');
    overlay.addEventListener('transitionend', () => {
      overlay.hidden = true;
    }, { once: true });
    // Fallback in case there's no transition to wait on
    setTimeout(() => { overlay.hidden = true; }, 400);
    overlay.removeEventListener('keydown', trapFocus);
    body.classList.remove('modal-open');
    ModalManager.notifyClosed(MODAL_ID);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  closeBtn.addEventListener('click', closePopup);

  if (dismissBtn) {
    dismissBtn.addEventListener('click', closePopup);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closePopup();
  });

  // First-visit visitors sit this page view out entirely — not queued
  // behind the mailing list popup, not shown after it closes.
  if (isFirstVisit) return;
  if (isExpired() || !isDue()) return;

  setTimeout(() => {
    // Re-check — the popup could have expired, or another tab could have
    // shown/dismissed it, in the time since the page loaded.
    if (isExpired() || !isDue()) return;
    if (!ModalManager.requestOpen(MODAL_ID)) return;
    markShown();
    openPopup();
  }, SHOW_DELAY_MS);
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
  initMailingListPopup();
  initTicketPopup();
});
