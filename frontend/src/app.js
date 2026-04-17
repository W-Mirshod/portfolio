import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import createHeader, { hydrateHeader } from './components/sections/Header.js';
import createHome, { hydrateHomeSection } from './components/sections/Home.js';
import createExperience, { mountExperienceSection } from './components/sections/Experience.js';
import createSkills, { mountSkillsSection } from './components/sections/Skills.js';
import createProof, { mountProofSection } from './components/sections/Proof.js';
import createProjects, { mountProjectsSection } from './components/sections/Projects.js';
import createFooter, { mountFooterSection } from './components/sections/Footer.js';
import createGoToTop from './components/ui/GoToTop.js';

function startLenis() {
  const lenis = new Lenis({
    duration: 0.85,
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
  return lenis;
}

export function initApp() {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  startLenis();

  root.innerHTML = '';

  const headerFragment = createHeader();
  document.body.appendChild(headerFragment);

  const main = document.createElement('main');
  main.setAttribute('role', 'main');

  main.appendChild(createHome());
  main.appendChild(createExperience());
  main.appendChild(createSkills());
  main.appendChild(createProof());
  main.appendChild(createProjects());
  main.appendChild(createFooter());

  root.appendChild(main);

  const goToTop = createGoToTop();
  document.body.appendChild(goToTop);
}

export function hydrateApp() {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  startLenis();

  const existingHeader = document.getElementById('top-nav');
  if (existingHeader) {
    hydrateHeader();
  } else {
    document.getElementById('ssr-desktop-sidebar')?.remove();
    document.getElementById('ssr-mobile-header')?.remove();
    const headerFragment = createHeader();
    document.body.insertBefore(headerFragment, root);
  }

  document.getElementById('ssr-go-to-top')?.remove();
  document.body.appendChild(createGoToTop());

  hydrateHomeSection(document.getElementById('home'));
  mountExperienceSection(document.getElementById('experience'));
  mountSkillsSection(document.getElementById('skills'));
  mountProofSection(document.getElementById('proof'));
  mountProjectsSection(document.getElementById('projects'));
  mountFooterSection(document.getElementById('contact'));

  localStorage.removeItem('theme');
  document.documentElement.setAttribute('data-theme', 'dark');
}
