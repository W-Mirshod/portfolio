/**
 * Creates a lazy-loaded section wrapper.
 * @param {Function} loader - () => import('./SomeSection.js')
 * @param {string} fallbackHTML - HTML string for the skeleton placeholder
 * @param {string} minHeight - CSS minHeight value
 * @param {string} sectionId - Stable section id for navigation/scroll tracking
 * @returns {HTMLElement}
 */
export default function createLazySection(loader, fallbackHTML = '', minHeight = '16rem', sectionId = '') {
  const wrapper = document.createElement('section');
  if (sectionId) wrapper.id = sectionId;
  wrapper.style.minHeight = minHeight;
  if (fallbackHTML) wrapper.innerHTML = fallbackHTML;

  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      obs.disconnect();
      loader().then(mod => {
        const render = mod.default;
        const content = render();
        wrapper.innerHTML = '';
        wrapper.className = 'section-reveal';

        // If content is an HTMLElement, append it; if string, set innerHTML
        if (content instanceof HTMLElement) {
          if (sectionId && content.id === sectionId) {
            content.removeAttribute('id');
          }
          wrapper.appendChild(content);
        } else if (typeof content === 'string') {
          wrapper.innerHTML = content;
        }

        // Two-phase reveal
        requestAnimationFrame(() => {
          wrapper.classList.add('is-visible');
        });
      }).catch(() => {});
    }
  }, { rootMargin: '320px 0px', threshold: 0.01 });

  obs.observe(wrapper);
  return wrapper;
}
