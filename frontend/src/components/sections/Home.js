import i18n from '../../utils/i18n.js';
import { iconArrowRight } from '../ui/Icons.js';
import { initializeAudio } from '../../utils/audio.js';
import createParallaxBackground from '../ui/ParallaxBackground.js';
import createMagneticButton from '../ui/MagneticButton.js';
import '../styles/w3d-icon.css';

export function hydrateHomeSection(section) {
  const handleNavigation = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const t = (k) => i18n.t(k);

  const buttonsContainer = section.querySelector('.home-buttons');
  if (buttonsContainer) {
    buttonsContainer.querySelectorAll('button[data-hydrate-home-nav]').forEach((oldBtn) => {
      const target = oldBtn.getAttribute('data-hydrate-home-nav');
      const key = oldBtn.getAttribute('data-i18n-btn');
      const isPrimary = oldBtn.classList.contains('liquid-btn-primary');
      const className = isPrimary
        ? 'liquid-btn liquid-btn-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 font-medium text-sm sm:text-base lg:text-lg'
        : 'liquid-btn px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-white font-medium text-sm sm:text-base lg:text-lg';
      const nb = createMagneticButton(i18n.t(key), {
        className,
        onClick: () => handleNavigation(target),
      });
      nb.setAttribute('data-i18n-btn', key);
      oldBtn.replaceWith(nb);
    });
  }

  const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
  const hasWebGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setTimeout(async () => {
    const w3dContainer = section.querySelector('[data-w3d-hero]');
    if (!w3dContainer || w3dContainer.offsetWidth === 0) return;

    if (!hasWebGL || prefersReducedMotion) {
      w3dContainer.innerHTML = `<div class="w-full h-full rounded-full border-4 border-white/35 shadow-2xl ring-2 ring-white/40 liquid-panel-strong flex items-center justify-center brand-wmark brand-wmark-hero">M<span class="brand-wmark-dot">.</span></div>`;
      return;
    }

    try {
      const { initHomeW3D } = await import('../ui/W3DIcon.js');
      w3dContainer.innerHTML = '';
      initHomeW3D(w3dContainer, { isMobile });
    } catch (e) {
      w3dContainer.innerHTML = `<div class="w-full h-full rounded-full border-4 border-white/35 shadow-2xl ring-2 ring-white/40 liquid-panel-strong flex items-center justify-center brand-wmark brand-wmark-hero">M<span class="brand-wmark-dot">.</span></div>`;
    }
  }, 100);

  let audioStarted = false;
  const startAudio = () => {
    if (audioStarted) return;
    audioStarted = true;
    initializeAudio('/warm-ambient-sound.mp3', 0.5);
    window.removeEventListener('pointerdown', startAudio);
    window.removeEventListener('keydown', startAudio);
  };
  window.addEventListener('pointerdown', startAudio, { once: true });
  window.addEventListener('keydown', startAudio, { once: true });

  i18n.on('languageChanged', () => {
    section.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = i18n.t(el.dataset.i18n);
    });
    section.querySelectorAll('[data-i18n-btn]').forEach((el) => {
      el.textContent = i18n.t(el.dataset.i18nBtn);
    });
  });
}

export default function createHome() {
  const enableEffects = window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    window.matchMedia('(min-width: 768px)').matches;

  const section = document.createElement('section');
  section.id = 'home';
  section.className = 'liquid-section section-accent-glow relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20';

  const handleNavigation = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Build content
  const t = (k) => i18n.t(k);

  function buildContent() {
    return `
      <div class="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto z-10 py-4 sm:py-6 md:py-8 lg:py-12">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200/10 rounded-full blur-2xl"></div>
          <div class="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-sky-200/10 rounded-full blur-2xl"></div>
        </div>
        <div class="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto relative space-y-8 sm:space-y-10 md:space-y-12">
          <div class="flex flex-col items-center justify-center text-center w-full space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:items-start lg:text-left">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 layered-entrance lg:justify-start">
              <div class="w3d-hero-wrapper">
                <div class="w3d-hero-canvas" data-w3d-hero></div>
              </div>
              <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight text-gradient-metallic lg:text-left">Mirshod Qayimov</h1>
            </div>
            <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-100 font-semibold layered-entrance" style="animation-delay:0.1s" data-i18n="home.subtitle">${t('home.subtitle')}</h2>
            <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100/90 max-w-4xl leading-relaxed layered-entrance flex items-center justify-center gap-2 sm:gap-3 lg:justify-start" style="animation-delay:0.2s">
              <span data-i18n="home.descriptionPart1">${t('home.descriptionPart1')}</span> ${iconArrowRight('1em', 'text-blue-200')} <span data-i18n="home.descriptionPart2">${t('home.descriptionPart2')}</span>
            </p>
            <div class="home-buttons flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 layered-entrance lg:justify-start" style="animation-delay:0.3s"></div>
          </div>
          <div class="w-full max-w-6xl mx-auto layered-entrance mt-8" style="animation-delay:0.4s">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
              <div class="md:col-span-2 md:row-span-2">
                <div class="liquid-panel-strong glass-blur-strong glass-border rounded-xl p-6 lg:p-8 xl:p-10 text-center lg:text-left h-full flex flex-col justify-center">
                  <div class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-2 font-mono">99.7%</div>
                  <div class="text-lg sm:text-xl lg:text-2xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.uptime">${t('home.stats.uptime')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.uptimeSubtitle">${t('home.stats.uptimeSubtitle')}</div>
                </div>
              </div>
              <div class="md:col-span-2">
                <div class="liquid-panel glass-blur-strong glass-border rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 h-full flex flex-col justify-center">
                  <div class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 font-mono">15+</div>
                  <div class="text-base sm:text-lg lg:text-xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.projects">${t('home.stats.projects')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.projectsSubtitle">${t('home.stats.projectsSubtitle')}</div>
                </div>
              </div>
              <div class="md:col-span-2">
                <div class="liquid-panel glass-blur-strong glass-border rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 h-full flex flex-col justify-center">
                  <div class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 font-mono">91%</div>
                  <div class="text-base sm:text-lg lg:text-xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.speed">${t('home.stats.speed')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.speedSubtitle">${t('home.stats.speedSubtitle')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Background
  if (enableEffects) {
    const bg = createParallaxBackground(
      `<div class="absolute inset-0 w-full h-full bg-bg-secondary/20"></div><div class="mesh-gradient-bg"></div><div class="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-bg-secondary/10"></div>`,
      'absolute inset-0'
    );
    section.appendChild(bg.element);
  } else {
    const staticBg = document.createElement('div');
    staticBg.innerHTML = `<div class="absolute inset-0 w-full h-full bg-bg-secondary/20"></div><div class="mesh-gradient-bg"></div>`;
    while (staticBg.firstChild) section.appendChild(staticBg.firstChild);
  }

  // Content
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = buildContent();
  while (contentDiv.firstChild) section.appendChild(contentDiv.firstChild);

  // Magnetic buttons
  const buttonsContainer = section.querySelector('.home-buttons');
  if (buttonsContainer) {
    const viewBtn = createMagneticButton(t('home.buttons.viewProjects'), {
      className: 'liquid-btn px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-white font-medium text-sm sm:text-base lg:text-lg',
      onClick: () => handleNavigation('#projects')
    });
    viewBtn.setAttribute('data-i18n-btn', 'home.buttons.viewProjects');
    const talkBtn = createMagneticButton(t('home.buttons.letsTalk'), {
      className: 'liquid-btn liquid-btn-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 font-medium text-sm sm:text-base lg:text-lg',
      onClick: () => handleNavigation('#contact')
    });
    talkBtn.setAttribute('data-i18n-btn', 'home.buttons.letsTalk');
    buttonsContainer.appendChild(viewBtn);
    buttonsContainer.appendChild(talkBtn);
  }

  // Hero W mark
  const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
  const hasWebGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setTimeout(async () => {
    const w3dContainer = section.querySelector('[data-w3d-hero]');
    if (!w3dContainer || w3dContainer.offsetWidth === 0) return;

    // Fall back to text mark when GPU is unavailable or user prefers reduced motion
    if (!hasWebGL || prefersReducedMotion) {
      w3dContainer.innerHTML = `<div class="w-full h-full rounded-full border-4 border-white/35 shadow-2xl ring-2 ring-white/40 liquid-panel-strong flex items-center justify-center brand-wmark brand-wmark-hero">M<span class="brand-wmark-dot">.</span></div>`;
      return;
    }

    try {
      const { initHomeW3D } = await import('../ui/W3DIcon.js');
      initHomeW3D(w3dContainer, { isMobile });
    } catch (e) {
      w3dContainer.innerHTML = `<div class="w-full h-full rounded-full border-4 border-white/35 shadow-2xl ring-2 ring-white/40 liquid-panel-strong flex items-center justify-center brand-wmark brand-wmark-hero">M<span class="brand-wmark-dot">.</span></div>`;
    }
  }, 100);

  // Audio
  let audioStarted = false;
  const startAudio = () => {
    if (audioStarted) return;
    audioStarted = true;
    initializeAudio('/warm-ambient-sound.mp3', 0.5);
    window.removeEventListener('pointerdown', startAudio);
    window.removeEventListener('keydown', startAudio);
  };
  window.addEventListener('pointerdown', startAudio, { once: true });
  window.addEventListener('keydown', startAudio, { once: true });

  // i18n reactivity
  i18n.on('languageChanged', () => {
    section.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = i18n.t(el.dataset.i18n);
    });
    section.querySelectorAll('[data-i18n-btn]').forEach(el => {
      el.textContent = i18n.t(el.dataset.i18nBtn);
    });
  });

  return section;
}
