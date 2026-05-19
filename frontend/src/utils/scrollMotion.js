import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = 'power4.out';
const APPLE_EASE_OUT = 'power4.out';

let scrollMotionReady = false;
let resizeHandler = null;

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  );
}

export function isMobileMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}

export function bindLenisToScrollTrigger(lenis) {
  if (!lenis || prefersReducedMotion()) return;

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  ScrollTrigger.refresh();

  resizeHandler = () => {
    lenis.resize();
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', resizeHandler, { passive: true });
}

export function startLenisRaf(lenis) {
  if (prefersReducedMotion()) {
    function nativeRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(nativeRaf);
    }
    requestAnimationFrame(nativeRaf);
    return;
  }

  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}

export function destroyScrollMotion() {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());
  scrollMotionReady = false;
}

function markScrollTargets() {
  const sections = document.querySelectorAll('main section[id], main .liquid-section[id]');
  sections.forEach((section) => {
    if (section.id === 'home') return;

    const header = section.querySelector(':scope > div > header, :scope > header');
    if (header && !header.classList.contains('scroll-reveal-header')) {
      header.classList.add('scroll-reveal-header');
      header.querySelectorAll('.animate-fadeInUp, .animate-fade-up').forEach((el) => {
        el.classList.remove('animate-fadeInUp', 'animate-fade-up');
      });
    }

    const container = section.querySelector(':scope > div');
    if (!container) return;
    const staggerRoots = container.querySelectorAll(
      ':scope > [role="list"], :scope > .reveal-stagger, :scope > .scroll-reveal-stagger, :scope > .grid.gap-8, :scope > .grid.gap-4'
    );
    staggerRoots.forEach((root) => {
      if (root.closest('#home')) return;
      root.classList.add('scroll-reveal-stagger');
      Array.from(root.children).forEach((child, index) => {
        if (child.classList.contains('scroll-reveal-item')) return;
        child.classList.add('scroll-reveal-item');
        child.style.setProperty('--scroll-reveal-i', String(index));
      });
    });
  });

  document.querySelectorAll('.scroll-parallax').forEach((el) => {
    if (!el.dataset.scrollParallax) {
      el.dataset.scrollParallax = el.dataset.scrollParallax || '0.12';
    }
  });
}

function revealHeaders() {
  gsap.utils.toArray('.scroll-reveal-header').forEach((header) => {
    const title = header.querySelector('h2, h3');
    const divider = header.querySelector('.liquid-divider');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 86%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
      defaults: { ease: APPLE_EASE_OUT, duration: 0.95 },
    });

    if (title) {
      gsap.set(title, { y: 36, opacity: 0, filter: isMobileMotion() ? 'none' : 'blur(6px)' });
      tl.to(title, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05 }, 0);
    }
    if (divider) {
      gsap.set(divider, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      tl.to(divider, { scaleX: 1, opacity: 1, duration: 0.85, ease: APPLE_EASE }, 0.12);
    }
  });
}

function revealStaggerItems() {
  gsap.utils.toArray('.scroll-reveal-stagger').forEach((container) => {
    const items = container.querySelectorAll(':scope > .scroll-reveal-item');
    if (!items.length) return;

    gsap.set(items, {
      y: 44,
      opacity: 0,
      scale: 0.97,
      filter: isMobileMotion() ? 'none' : 'blur(4px)',
    });

    gsap.to(items, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.92,
      ease: APPLE_EASE_OUT,
      stagger: {
        each: 0.09,
        from: 'start',
      },
      scrollTrigger: {
        trigger: container,
        start: 'top 84%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
    });
  });
}

function revealStandalone() {
  gsap.utils.toArray('[data-scroll-reveal]').forEach((el) => {
    const variant = el.dataset.scrollReveal || 'up';
    const from = { opacity: 0, duration: 0.9, ease: APPLE_EASE_OUT };
    if (variant === 'scale') {
      Object.assign(from, { scale: 0.94, y: 24 });
    } else if (variant === 'left') {
      Object.assign(from, { x: -40, y: 12 });
    } else if (variant === 'right') {
      Object.assign(from, { x: 40, y: 12 });
    } else {
      Object.assign(from, { y: 48 });
    }
    if (!isMobileMotion()) from.filter = 'blur(6px)';

    gsap.from(el, {
      ...from,
      filter: 'blur(0px)',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function setupScrollParallax() {
  if (isMobileMotion()) return;

  gsap.utils.toArray('[data-scroll-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.scrollParallax || '0.12');
    gsap.to(el, {
      y: () => -window.innerHeight * amount * 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
    });
  });
}

function upgradeRevealStagger() {
  document.querySelectorAll('.reveal-stagger:not(.scroll-reveal-stagger)').forEach((el) => {
    el.classList.add('scroll-reveal-stagger');
    Array.from(el.children).forEach((child, index) => {
      child.classList.add('scroll-reveal-item');
      child.style.setProperty('--scroll-reveal-i', String(index));
    });
  });
}

export function initScrollMotion() {
  if (scrollMotionReady || prefersReducedMotion() || typeof window === 'undefined') {
    document.documentElement.classList.add('scroll-motion-ready');
    return () => {};
  }

  scrollMotionReady = true;
  document.documentElement.classList.add('scroll-motion-ready');

  markScrollTargets();
  upgradeRevealStagger();
  revealHeaders();
  revealStaggerItems();
  revealStandalone();
  setupScrollParallax();

  ScrollTrigger.refresh();

  return destroyScrollMotion;
}
