import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import createHeader from './components/sections/Header.js';
import createHome from './components/sections/Home.js';
import createGoToTop from './components/ui/GoToTop.js';

export function initApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isConstrainedDevice =
    Boolean(connection?.saveData) ||
    (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4) ||
    (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4);

  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      duration: isConstrainedDevice ? 0.9 : 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: isConstrainedDevice ? 0.18 : 0.12,
      touchMultiplier: isConstrainedDevice ? 1.2 : 1.4,
    });

    window.lenis = lenis;

    let rafId = null;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(raf);
      }
    });
  } else {
    window.lenis = null;
  }

  // ─── Header (fixed navigation) ───
  const headerFragment = createHeader();
  document.body.appendChild(headerFragment);

  // ─── Main content container ───
  const main = document.createElement('main');
  main.className = 'xl:ml-32';
  main.setAttribute('role', 'main');

  main.appendChild(createHome());

  root.appendChild(main);

  const sectionLoaders = {
    experience: () => import('./components/sections/Experience.js'),
    skills: () => import('./components/sections/Skills.js'),
    achievements: () => import('./components/sections/Achievements.js'),
    certificate: () => import('./components/sections/Certificate.js'),
    projects: () => import('./components/sections/Projects.js'),
    contact: () => import('./components/sections/Footer.js'),
  };
  const sectionOrder = Object.keys(sectionLoaders);
  const loadedSections = new Set(['home']);
  const pendingLoads = new Map();

  const loadSection = async (sectionId) => {
    if (loadedSections.has(sectionId)) {
      return document.getElementById(sectionId);
    }

    if (pendingLoads.has(sectionId)) {
      return pendingLoads.get(sectionId);
    }

    const promise = sectionLoaders[sectionId]().then((module) => {
      const section = module.default();
      main.appendChild(section);
      loadedSections.add(sectionId);
      return section;
    }).finally(() => {
      pendingLoads.delete(sectionId);
    });

    pendingLoads.set(sectionId, promise);
    return promise;
  };

  const ensureSectionReady = async (sectionId) => {
    const targetIndex = sectionOrder.indexOf(sectionId);
    if (targetIndex === -1) {
      return document.getElementById(sectionId);
    }

    for (const id of sectionOrder.slice(0, targetIndex + 1)) {
      await loadSection(id);
    }

    return document.getElementById(sectionId);
  };

  window.ensureSectionReady = ensureSectionReady;

  const prefetchSections = (index = 0) => {
    if (index >= sectionOrder.length) return;

    const callback = async () => {
      await loadSection(sectionOrder[index]);
      prefetchSections(index + 1);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1200 });
      return;
    }

    window.setTimeout(callback, 180);
  };

  prefetchSections();

  const goToTop = createGoToTop();
  document.body.appendChild(goToTop);
}

