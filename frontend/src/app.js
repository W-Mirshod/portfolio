import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import createHeader from './components/sections/Header.js';
import createHome from './components/sections/Home.js';
import createGoToTop from './components/ui/GoToTop.js';
import createLazySection from './components/ui/LazySection.js';

export function initApp() {
  const root = document.getElementById('root');
  if (!root) return;

  // ─── Lenis smooth scroll ───
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ─── Header (fixed navigation) ───
  const headerFragment = createHeader();
  document.body.appendChild(headerFragment);

  // ─── Main content container ───
  const main = document.createElement('main');
  main.className = 'xl:ml-32';
  main.setAttribute('role', 'main');

  // ─── Home section (loaded immediately) ───
  const homeSection = createHome();
  main.appendChild(homeSection);

  // ─── Lazy-loaded sections ───
  const lazySections = [
    { loader: () => import('./components/sections/Experience.js'), minHeight: '600px' },
    { loader: () => import('./components/sections/Skills.js'), minHeight: '500px' },
    { loader: () => import('./components/sections/Achievements.js'), minHeight: '400px' },
    { loader: () => import('./components/sections/Certificate.js'), minHeight: '500px' },
    { loader: () => import('./components/sections/Projects.js'), minHeight: '600px' },
    { loader: () => import('./components/sections/Footer.js'), minHeight: '400px' },
  ];

  lazySections.forEach(({ loader, minHeight }) => {
    const lazySection = createLazySection(loader, '', minHeight);
    main.appendChild(lazySection);
  });

  root.appendChild(main);

  // ─── Go-to-top button ───
  const goToTop = createGoToTop();
  document.body.appendChild(goToTop);
}
