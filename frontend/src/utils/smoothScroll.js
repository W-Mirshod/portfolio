import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { bindLenisToScrollTrigger, prefersReducedMotion, startLenisRaf } from './scrollMotion.js';

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function startSmoothScroll() {
  if (lenisInstance) return lenisInstance;

  const reduced = prefersReducedMotion();

  lenisInstance = new Lenis({
    duration: reduced ? 0 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !reduced,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.35,
    syncTouch: !reduced,
    syncTouchLerp: 0.075,
    infinite: false,
  });

  window.lenis = lenisInstance;

  startLenisRaf(lenisInstance);

  if (!reduced) {
    bindLenisToScrollTrigger(lenisInstance);
  }

  return lenisInstance;
}

export function scrollToTarget(target, options = {}) {
  const lenis = lenisInstance;
  const offset = options.offset ?? -72;
  const duration = options.duration ?? 1.2;

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { offset, duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
