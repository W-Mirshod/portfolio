const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

/**
 * Creates a magnetic button element.
 * @param {string} text - Button text content or innerHTML
 * @param {object} opts
 * @returns {HTMLElement}
 */
export default function createMagneticButton(text, { strength = 0.4, className = '', onClick } = {}) {
  const button = document.createElement('button');
  button.className = `magnetic-button transition-transform duration-300 ease-out ${className}`;
  button.innerHTML = text;

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  if (!isTouchDevice()) {
    let rafId = null;

    button.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 120;

        if (distance < maxDistance) {
          const pull = (1 - distance / maxDistance) * strength;
          button.style.transform = `translate(${distanceX * pull}px, ${distanceY * pull}px) scale(1.05)`;
        }
      });
    }, { passive: true });

    button.addEventListener('mouseleave', () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      button.style.transform = 'translate(0, 0) scale(1)';
    }, { passive: true });
  }

  return button;
}
