import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import createHeader from './components/sections/Header.js';
import createHome from './components/sections/Home.js';
import createExperience from './components/sections/Experience.js';
import createSkills from './components/sections/Skills.js';
import createAchievements from './components/sections/Achievements.js';
import createCertificate from './components/sections/Certificate.js';
import createProjects from './components/sections/Projects.js';
import createFooter from './components/sections/Footer.js';
import createGoToTop from './components/ui/GoToTop.js';

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

  // ─── All sections loaded eagerly ───
  main.appendChild(createHome());
  main.appendChild(createExperience());
  main.appendChild(createSkills());
  main.appendChild(createAchievements());
  main.appendChild(createCertificate());
  main.appendChild(createProjects());
  main.appendChild(createFooter());

  root.appendChild(main);

  // ─── Go-to-top button ───
  const goToTop = createGoToTop();
  document.body.appendChild(goToTop);
}

