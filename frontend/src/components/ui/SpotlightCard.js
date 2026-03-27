const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export function attachSpotlightBehavior(card) {
  if (!card || isTouchDevice()) {
    card?.style.setProperty('--spotlight-opacity', '0');
    card?.style.setProperty('--spotlight-color', 'rgba(6, 182, 212, 0.4)');
    return;
  }

  let rafRef = null;
  card.addEventListener('mousemove', (e) => {
    if (rafRef) return;
    rafRef = requestAnimationFrame(() => {
      rafRef = null;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
    });
  }, { passive: true });

  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--spotlight-opacity', '1');
  }, { passive: true });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--spotlight-opacity', '0');
  }, { passive: true });

  card.style.setProperty('--spotlight-opacity', '0');
  card.style.setProperty('--spotlight-color', 'rgba(6, 182, 212, 0.4)');
}

/**
 * Creates a spotlight card element.
 * @param {string} innerHTMLContent
 * @param {string} className
 * @returns {HTMLElement}
 */
export default function createSpotlightCard(innerHTMLContent, className = '') {
  const card = document.createElement('div');
  card.className = `spotlight-card relative ${className}`;

  const overlay = document.createElement('div');
  overlay.className = 'spotlight-overlay';
  card.appendChild(overlay);

  const content = document.createElement('div');
  content.innerHTML = innerHTMLContent;
  while (content.firstChild) {
    card.appendChild(content.firstChild);
  }

  attachSpotlightBehavior(card);

  return card;
}
