import { gsap } from 'gsap';

/**
 * Creates and manages the GoToTop button.
 * @returns {HTMLElement}
 */
export default function createGoToTop() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = !canHover;

  const button = document.createElement('button');
  button.className = `go-to-top-button fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:right-36 z-50 flex items-center justify-center
                 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl
                 border border-white/25
                 hover:bg-white/20 hover:border-white/45
                 transition-all duration-300
                 cursor-pointer overflow-hidden group`;
  button.style.boxShadow = 'var(--liquid-shadow)';
  button.style.opacity = '0';
  button.style.pointerEvents = 'none';
  button.style.willChange = 'transform, opacity';
  button.setAttribute('aria-label', 'Scroll to top');

  button.innerHTML = `
    <svg class="go-top-arrow w-4 h-4 sm:w-5 sm:h-5 text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
    <span class="go-top-w text-lg sm:text-xl font-bold text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" style="visibility:hidden;opacity:0">W</span>
  `;

  const arrowEl = button.querySelector('.go-top-arrow');
  const wEl = button.querySelector('.go-top-w');

  let isVisible = false;
  let isScrollingToTop = false;
  let nativeTopRafId = null;
  const SHOW_AT = 800;
  const HIDE_AT = 680;

  const getScrollY = () => window.lenis?.scroll || window.pageYOffset || 0;

  const show = () => {
    if (isVisible) return;
    isVisible = true;
    gsap.killTweensOf(button);
    button.style.pointerEvents = 'auto';
    gsap.fromTo(button,
      { opacity: 0, scale: 0.88, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: isTouch ? 0.2 : 0.28, ease: 'power2.out', force3D: true }
    );
  };

  const hide = () => {
    if (!isVisible) return;
    isVisible = false;
    gsap.killTweensOf(button);
    gsap.to(button, {
      opacity: 0, scale: 0.88, duration: isTouch ? 0.16 : 0.2, ease: 'power2.in', force3D: true,
      onComplete: () => { button.style.pointerEvents = 'none'; }
    });
  };

  const transformToW = () => {
    gsap.killTweensOf([arrowEl, wEl]);
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
    gsap.killTweensOf([arrowEl, wEl]);
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

  let checkRafId = null;
  const checkScroll = () => {
    if (checkRafId) return;
    checkRafId = requestAnimationFrame(() => {
      checkRafId = null;
      const scrollY = getScrollY();
      if (isScrollingToTop) {
        show();
        return;
      }
      if (!isVisible && scrollY > SHOW_AT) show();
      else if (isVisible && scrollY < HIDE_AT) hide();
    });
  };

  const finishScrollToTop = () => {
    if (!isScrollingToTop) return;
    isScrollingToTop = false;
    if (!isTouch) transformToArrow();
    checkScroll();
  };

  const waitUntilTopNative = () => {
    if (nativeTopRafId) cancelAnimationFrame(nativeTopRafId);
    const start = performance.now();
    const tick = () => {
      if (window.pageYOffset < 6 || performance.now() - start > 1800) {
        finishScrollToTop();
        nativeTopRafId = null;
        return;
      }
      nativeTopRafId = requestAnimationFrame(tick);
    };
    nativeTopRafId = requestAnimationFrame(tick);
  };

  const lenisInstance = window.lenis;
  if (lenisInstance) {
    lenisInstance.on('scroll', checkScroll);
  } else {
    window.addEventListener('scroll', checkScroll, { passive: true });
  }
  checkScroll();

  if (canHover) {
    button.addEventListener('mouseenter', () => {
      if (!isScrollingToTop) gsap.to(button, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  }

  const activate = (e) => {
    if (e?.cancelable) e.preventDefault();
    if (isScrollingToTop) return;
    gsap.killTweensOf(button, 'scale');
    if (!isTouch) {
      gsap.to(button, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    }
    isScrollingToTop = true;
    show();
    if (!isTouch) transformToW();
    const lenis = window.lenis;
    if (lenis) {
      if (prefersReducedMotion) {
        lenis.scrollTo(0, {
          immediate: true,
          lock: true,
          force: true,
        });
        finishScrollToTop();
      } else {
        lenis.scrollTo(0, {
          immediate: false,
          duration: isTouch ? 1 : 0.72,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          lock: true,
          force: true,
          onComplete: finishScrollToTop,
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      if (prefersReducedMotion) finishScrollToTop();
      else waitUntilTopNative();
    }
  };

  let lastActivateTime = 0;
  const ACTIVATE_GUARD_MS = 180;
  const tryActivate = (e) => {
    const now = performance.now();
    if (now - lastActivateTime < ACTIVATE_GUARD_MS) return;
    lastActivateTime = now;
    activate(e);
  };

  button.addEventListener('pointerup', tryActivate, { passive: false });
  button.addEventListener('click', (e) => {
    if (e.detail !== 0) return;
    tryActivate(e);
  });

  return button;
}
