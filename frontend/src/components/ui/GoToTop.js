import { gsap } from 'gsap';

/**
 * Creates and manages the GoToTop button.
 * @returns {HTMLElement}
 */
export default function createGoToTop() {
  const button = document.createElement('button');
  button.className = `fixed bottom-6 right-6 z-50 flex items-center justify-center
                 w-12 h-12 rounded-2xl
                 liquid-panel border border-white/25
                 hover:bg-white/20 hover:border-white/45
                 transition-all duration-300
                 cursor-pointer overflow-hidden group`;
  button.style.boxShadow = 'var(--liquid-shadow)';
  button.style.opacity = '0';
  button.style.pointerEvents = 'none';
  button.setAttribute('aria-label', 'Scroll to top');

  button.innerHTML = `
    <svg class="go-top-arrow text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
    <span class="go-top-w text-xl font-bold text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" style="visibility:hidden;opacity:0">W</span>
  `;

  const arrowEl = button.querySelector('.go-top-arrow');
  const wEl = button.querySelector('.go-top-w');

  let isVisible = false;
  let isScrollingToTop = false;

  const show = () => {
    if (isVisible) return;
    isVisible = true;
    button.style.pointerEvents = 'auto';
    gsap.fromTo(button,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
  };

  const hide = () => {
    if (!isVisible) return;
    isVisible = false;
    gsap.to(button, {
      opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in',
      onComplete: () => { button.style.pointerEvents = 'none'; }
    });
  };

  const transformToW = () => {
    gsap.to(arrowEl, {
      opacity: 0, scale: 0.5, rotation: -180, duration: 0.3, ease: 'power2.in',
      onComplete: () => { arrowEl.style.visibility = 'hidden'; }
    });
    wEl.style.visibility = 'visible';
    wEl.style.display = 'block';
    gsap.fromTo(wEl,
      { opacity: 0, scale: 0.5, rotation: 180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
  };

  const transformToArrow = () => {
    gsap.to(wEl, {
      opacity: 0, scale: 0.5, rotation: 180, duration: 0.3, ease: 'power2.in',
      onComplete: () => { wEl.style.visibility = 'hidden'; wEl.style.display = 'none'; }
    });
    arrowEl.style.visibility = 'visible';
    gsap.fromTo(arrowEl,
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
  };

  const checkScroll = () => {
    const scrollY = window.lenis?.scroll || window.pageYOffset || 0;
    if (scrollY > 800) show();
    else hide();

    if (isScrollingToTop && scrollY < 50) {
      isScrollingToTop = false;
      transformToArrow();
    }
  };

  const lenisInstance = window.lenis;
  if (lenisInstance) {
    lenisInstance.on('scroll', checkScroll);
  } else {
    window.addEventListener('scroll', checkScroll, { passive: true });
  }
  checkScroll();

  button.addEventListener('mouseenter', () => {
    if (!isScrollingToTop) gsap.to(button, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
  });
  button.addEventListener('mouseleave', () => {
    if (!isScrollingToTop) gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    gsap.to(button, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    isScrollingToTop = true;
    transformToW();
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  return button;
}
