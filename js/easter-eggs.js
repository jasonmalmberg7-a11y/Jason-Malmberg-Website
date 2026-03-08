/**
 * Jason Malmberg Website — easter-eggs.js
 *
 * Hidden interactions for curious visitors.
 * Influences baked in: Joe Lally, Dee Dee Ramone, Steve Youth,
 * Roland Kirk, Charles Mingus, Jaco Pastorius.
 *
 * Eggs:
 *  1. Konami Code (↑↑↓↓←→←→BA)  → Punk Jazz Mode overlay
 *  2. Logo click ×3              → Dee Dee Ramone count-in
 *  3. Type "MINGUS"              → Mingus workshop mode (flash + quote)
 *  4. Type "JACO"                → Jaco Pastorius modal
 *  5. Type "FUGAZI"              → Joe Lally tribute flash
 *  6. Hover on footer secret     → secret message visible
 *  7. View source HTML comments  → curated developer messages
 */

'use strict';

/* =========================================================================
   1. Konami Code → Punk Jazz Mode
   =========================================================================
   Classic: ↑ ↑ ↓ ↓ ← → ← → B A
   ========================================================================= */
(function initKonamiCode() {
  const KONAMI = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];
  let index = 0;

  document.addEventListener('keydown', (e) => {
    const expected = KONAMI[index];
    // Case-insensitive match for b/a
    if (e.key === expected || e.key.toLowerCase() === expected) {
      index++;
      if (index === KONAMI.length) {
        index = 0;
        if (typeof window.openPunkJazzMode === 'function') {
          window.openPunkJazzMode();
        }
      }
    } else {
      index = 0;
      // Check if the failed key could restart the sequence
      if (e.key === KONAMI[0]) index = 1;
    }
  });
})();

/* =========================================================================
   2. Logo click ×3 → Dee Dee Ramone "1! 2! 3! 4!" Count-in
   =========================================================================
   Dee Dee Ramone was famous for the count-in that kicked off every song.
   "Hey! Ho! Let's go!" started with the count. Now it's an Easter egg.
   ========================================================================= */
(function initLogoCounting() {
  const logo = document.getElementById('site-logo');
  if (!logo) return;

  let clickCount = 0;
  let resetTimer;

  logo.addEventListener('click', (e) => {
    // Don't navigate on the Easter egg clicks
    e.preventDefault();

    clickCount++;
    clearTimeout(resetTimer);

    if (clickCount >= 3) {
      clickCount = 0;
      if (typeof window.showCountIn === 'function') {
        window.showCountIn();
      }
    } else {
      // Reset counter after 1.5s of inactivity
      resetTimer = setTimeout(() => {
        clickCount = 0;
      }, 1500);
    }
  });
})();

/* =========================================================================
   3. Type "MINGUS" anywhere → Mingus Workshop Mode
   =========================================================================
   Charles Mingus ran the Jazz Workshop — demanding, spontaneous, brilliant.
   Type his name to unlock a quote flash and colour pulse.
   ========================================================================= */
(function initMingusMode() {
  const TARGET  = 'MINGUS';
  let buffer    = '';
  let resetTimer;

  document.addEventListener('keydown', (e) => {
    // Ignore if focused in an input/textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

    // Build buffer from printable single-character keys
    if (e.key.length === 1) {
      buffer += e.key.toUpperCase();
      if (buffer.length > TARGET.length) {
        buffer = buffer.slice(-TARGET.length);
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { buffer = ''; }, 1500);

      if (buffer === TARGET) {
        buffer = '';
        triggerMingusMode();
      }
    }
  });

  function triggerMingusMode() {
    showQuoteFlash({
      quote:  '"Tonight the music will not be polite."',
      source: 'Charles Mingus',
      color:  '#c9a227', // gold for jazz
    });

    // Brief colour pulse on body
    document.body.style.transition = 'background-color 0.4s';
    document.body.style.backgroundColor = '#0d0a00';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 600);
    }, 800);
  }
})();

/* =========================================================================
   4. Type "JACO" anywhere → Jaco Pastorius tribute
   =========================================================================
   Jaco changed the bass forever. If you know, you know.
   ========================================================================= */
(function initJacoMode() {
  const TARGET = 'JACO';
  let buffer   = '';
  let resetTimer;

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key.length !== 1) return;

    buffer += e.key.toUpperCase();
    if (buffer.length > TARGET.length) buffer = buffer.slice(-TARGET.length);

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { buffer = ''; }, 1500);

    if (buffer === TARGET) {
      buffer = '';
      showQuoteFlash({
        quote:  '"I\'m the greatest bass player in the world... and you can't argue with me."',
        source: 'Jaco Pastorius',
        color:  '#e8003d', // punk red — Jaco was punk in his own way
      });
    }
  });
})();

/* =========================================================================
   5. Type "FUGAZI" anywhere → Joe Lally / Fugazi tribute
   =========================================================================
   Joe Lally's bass playing defined what punk could be with jazz sensibility.
   Fugazi: no merch table at the door above five bucks.
   ========================================================================= */
(function initFugaziMode() {
  const TARGET = 'FUGAZI';
  let buffer   = '';
  let resetTimer;

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key.length !== 1) return;

    buffer += e.key.toUpperCase();
    if (buffer.length > TARGET.length) buffer = buffer.slice(-TARGET.length);

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { buffer = ''; }, 1500);

    if (buffer === TARGET) {
      buffer = '';
      showQuoteFlash({
        quote:  '"Suggestion: turn off the sound. No, really — the first note you play is a statement of intent."',
        source: 'Joe Lally / Fugazi influence',
        color:  '#ff006e', // punk pink
      });
    }
  });
})();

/* =========================================================================
   6. Type "RAMONE" → Steve Youth / Ramones tribute
   =========================================================================
   Dee Dee was the Ramones. Steve Youth carried the punk bass torch.
   ========================================================================= */
(function initRamoneMode() {
  const TARGET = 'RAMONE';
  let buffer   = '';
  let resetTimer;

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key.length !== 1) return;

    buffer += e.key.toUpperCase();
    if (buffer.length > TARGET.length) buffer = buffer.slice(-TARGET.length);

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { buffer = ''; }, 1500);

    if (buffer === TARGET) {
      buffer = '';
      // Trigger Dee Dee count-in as a bonus
      if (typeof window.showCountIn === 'function') {
        window.showCountIn();
      }
      setTimeout(() => {
        showQuoteFlash({
          quote:  '"Gabba Gabba Hey."',
          source: 'Dee Dee Ramone · 1951–2002',
          color:  '#e8003d',
        });
      }, 2000);
    }
  });
})();

/* =========================================================================
   7. Type "ROLAND" → Roland Kirk multi-instrumental tribute
   =========================================================================
   Roland Kirk played three horns simultaneously. Refused to pick one.
   ========================================================================= */
(function initRolandMode() {
  const TARGET = 'ROLAND';
  let buffer   = '';
  let resetTimer;

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key.length !== 1) return;

    buffer += e.key.toUpperCase();
    if (buffer.length > TARGET.length) buffer = buffer.slice(-TARGET.length);

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { buffer = ''; }, 1500);

    if (buffer === TARGET) {
      buffer = '';
      showQuoteFlash({
        quote:  '"I don\'t play three instruments at once. I play one music — it just comes out of three places."',
        source: 'Rahsaan Roland Kirk',
        color:  '#8b3abf', // purple — Kirk was otherworldly
      });
    }
  });
})();

/* =========================================================================
   Utility: Quote Flash
   =========================================================================
   Creates a brief overlay with a quote, then fades it away.
   ========================================================================= */
function showQuoteFlash({ quote, source, color = '#c9a227' }) {
  // Remove existing flash if any
  const existing = document.getElementById('quote-flash');
  if (existing) existing.remove();

  const flash = document.createElement('div');
  flash.id = 'quote-flash';
  flash.setAttribute('role', 'status');
  flash.setAttribute('aria-live', 'polite');
  flash.setAttribute('aria-atomic', 'true');

  Object.assign(flash.style, {
    position:    'fixed',
    bottom:      '2rem',
    left:        '50%',
    transform:   'translateX(-50%) translateY(20px)',
    background:  'rgba(10, 10, 10, 0.96)',
    border:      `1px solid ${color}`,
    borderLeft:  `4px solid ${color}`,
    borderRadius:'2px',
    padding:     '1.25rem 1.75rem',
    maxWidth:    'min(560px, 90vw)',
    zIndex:      '9995',
    opacity:     '0',
    transition:  'opacity 0.4s ease, transform 0.4s ease',
    textAlign:   'left',
    boxShadow:   `0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)`,
    backdropFilter: 'blur(12px)',
  });

  flash.innerHTML = `
    <p style="
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 1rem;
      color: #f0ece0;
      line-height: 1.6;
      margin: 0 0 0.5rem;
    ">${quote}</p>
    <cite style="
      font-family: 'Inter', system-ui, sans-serif;
      font-style: normal;
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${color};
    ">${source}</cite>
  `;

  document.body.appendChild(flash);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flash.style.opacity  = '1';
      flash.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Animate out after 4 seconds
  setTimeout(() => {
    flash.style.opacity   = '0';
    flash.style.transform = 'translateX(-50%) translateY(10px)';
    flash.addEventListener('transitionend', () => flash.remove(), { once: true });
  }, 4000);

  // Click to dismiss
  flash.addEventListener('click', () => {
    flash.style.opacity   = '0';
    flash.style.transform = 'translateX(-50%) translateY(10px)';
    flash.addEventListener('transitionend', () => flash.remove(), { once: true });
  });
}

/* =========================================================================
   Secret footer link — hover reveals the message
   =========================================================================
   Already styled in CSS; no JS needed. But we can add a fun touch: when
   focused via keyboard, announce the message properly.
   ========================================================================= */
(function initSecretLink() {
  const link = document.querySelector('.secret-link');
  if (!link) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    showQuoteFlash({
      quote:  '"The first note you play is a statement of intent."',
      source: 'Joe Lally — Fugazi',
      color:  '#ff006e',
    });
  });
})();

/* =========================================================================
   Idle curiosity: Double-tap on any quote block to cycle influences
   ========================================================================= */
(function initQuoteCycle() {
  const quotes = [
    { quote: '"Making the simple complicated is commonplace; making the complicated simple — that\'s creativity."',     source: 'Charles Mingus' },
    { quote: '"I don\'t play the saxophone. I let it play me."',                                                        source: 'Roland Kirk' },
    { quote: '"Playing a melody beautifully is harder than playing it fast."',                                          source: 'Jaco Pastorius' },
    { quote: '"1! 2! 3! 4!"',                                                                                           source: 'Dee Dee Ramone' },
    { quote: '"The note you don\'t play is as important as the one you do."',                                           source: 'Joe Lally (paraphrased)' },
    { quote: '"Jazz is not dead. It just smells funny."',                                                               source: 'Frank Zappa (honorary citation)' },
  ];
  let quoteIndex = 0;

  document.querySelectorAll('.quote-block').forEach(block => {
    let tapTimer;
    let taps = 0;

    block.addEventListener('click', () => {
      taps++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { taps = 0; }, 400);

      if (taps >= 2) {
        taps = 0;
        quoteIndex = (quoteIndex + 1) % quotes.length;
        const { quote, source } = quotes[quoteIndex];

        const blockquote = block.querySelector('blockquote');
        const cite       = block.querySelector('cite');

        if (blockquote && cite) {
          blockquote.style.transition = 'opacity 0.25s';
          cite.style.transition       = 'opacity 0.25s';
          blockquote.style.opacity    = '0';
          cite.style.opacity          = '0';

          setTimeout(() => {
            blockquote.textContent = quote;
            cite.textContent       = source;
            blockquote.style.opacity = '1';
            cite.style.opacity       = '1';
          }, 260);
        }
      }
    });

    // Accessibility: also handle keyboard
    block.setAttribute('tabindex', '0');
    block.setAttribute('title', 'Double-click to cycle quotes');
    block.style.cursor = 'pointer';
  });
})();
