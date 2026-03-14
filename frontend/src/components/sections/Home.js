import i18n from '../../utils/i18n.js';
import { iconServer, iconBrain, iconCloud } from '../ui/Icons.js';
import { initializeAudio } from '../../utils/audio.js';

const heroImageMarkup = `
  <img
    src="/Mirshod-optimized.webp"
    alt="Mirshod Qayimov"
    width="640"
    height="640"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    class="w-full h-full rounded-full object-cover border-4 border-white/35 shadow-2xl ring-2 ring-white/40 img-shimmer-load"
  />
`;

export default function createHome() {
  const section = document.createElement('section');
  section.id = 'home';
  section.className = 'liquid-section section-accent-glow relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = (k) => i18n.t(k);

  const handleNavigation = async (href) => {
    let element = document.querySelector(href);
    if (!element && typeof window.ensureSectionReady === 'function') {
      element = await window.ensureSectionReady(href.slice(1));
    }
    if (!element) return;

    if (window.lenis && !prefersReducedMotion) {
      window.lenis.scrollTo(element, { duration: 0.9, offset: -80 });
      return;
    }

    const top = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top - 80, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  function buildContent() {
    return `
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 w-full h-full bg-bg-secondary/20"></div>
        <div class="mesh-gradient-bg opacity-80"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-80"></div>
        <div class="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/10 blur-3xl"></div>
        <div class="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-sky-200/10 blur-3xl"></div>
      </div>
      <div class="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto z-10 py-4 sm:py-6 md:py-8 lg:py-12">
        <div class="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto relative space-y-8 sm:space-y-10 md:space-y-12">
          <div class="flex flex-col items-center justify-center text-center w-full space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:items-start lg:text-left">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 layered-entrance lg:justify-start">
              <div class="w-[10rem] h-[10rem] sm:w-[11rem] sm:h-[11rem] md:w-[12rem] md:h-[12rem] lg:w-[14rem] lg:h-[14rem] xl:w-[16rem] xl:h-[16rem] flex-shrink-0 overflow-hidden rounded-full">
                ${heroImageMarkup}
              </div>
              <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight text-gradient-metallic lg:text-left">Mirshod Qayimov</h1>
            </div>
            <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-100 font-semibold layered-entrance max-w-5xl" style="animation-delay:0.08s" data-i18n="home.valueProp">${t('home.valueProp')}</h2>
            <p class="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100/85 max-w-4xl leading-relaxed layered-entrance lg:max-w-3xl" style="animation-delay:0.14s" data-i18n="home.supportingText">${t('home.supportingText')}</p>
            <div class="home-buttons flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 layered-entrance lg:justify-start" style="animation-delay:0.2s"></div>
          </div>
          <div class="w-full max-w-6xl mx-auto layered-entrance mt-8" style="animation-delay:0.26s">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
              <div class="md:col-span-2 md:row-span-2">
                <div class="liquid-panel-strong glass-blur-strong glass-border rounded-xl p-6 lg:p-8 xl:p-10 text-center lg:text-left h-full flex flex-col justify-center">
                  <div class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-2 font-mono">99.7%</div>
                  <div class="text-lg sm:text-xl lg:text-2xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.uptime">${t('home.stats.uptime')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.uptimeSubtitle">${t('home.stats.uptimeSubtitle')}</div>
                </div>
              </div>
              <div class="md:col-span-2">
                <div class="liquid-panel glass-blur-strong glass-border rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 hover:opacity-95 h-full flex flex-col justify-center motion-reduce:transform-none motion-reduce:transition-none">
                  <div class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 font-mono">15+</div>
                  <div class="text-base sm:text-lg lg:text-xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.projects">${t('home.stats.projects')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.projectsSubtitle">${t('home.stats.projectsSubtitle')}</div>
                </div>
              </div>
              <div class="md:col-span-2">
                <div class="liquid-panel glass-blur-strong glass-border rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 hover:opacity-95 h-full flex flex-col justify-center motion-reduce:transform-none motion-reduce:transition-none">
                  <div class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 font-mono">91%</div>
                  <div class="text-base sm:text-lg lg:text-xl text-blue-100/90 mb-1 font-mono" data-i18n="home.stats.speed">${t('home.stats.speed')}</div>
                  <div class="text-sm sm:text-base text-blue-100/70" data-i18n="home.stats.speedSubtitle">${t('home.stats.speedSubtitle')}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full max-w-6xl mx-auto layered-entrance mt-6 lg:mt-8" style="animation-delay:0.32s">
            <div class="liquid-panel-strong glass-blur-strong glass-border rounded-xl p-6 sm:p-8 lg:p-10">
              <h3 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-blue-100 mb-6 lg:mb-8 text-center lg:text-left" data-i18n="home.sections.whatIDo">${t('home.sections.whatIDo')}</h3>
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div class="flex-1 liquid-panel rounded-lg p-5 sm:p-6 lg:p-8 border border-white/20 text-center transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 hover:opacity-95 motion-reduce:transform-none motion-reduce:transition-none">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 liquid-icon-shell rounded-lg flex items-center justify-center">${iconServer('1.5em', 'text-blue-400')}</div>
                  <h4 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-blue-100 mb-2" data-i18n="home.sections.backendAPIs">${t('home.sections.backendAPIs')}</h4>
                </div>
                <div class="flex-1 liquid-panel rounded-lg p-5 sm:p-6 lg:p-8 border border-white/20 text-center transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 hover:opacity-95 motion-reduce:transform-none motion-reduce:transition-none">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 liquid-icon-shell rounded-lg flex items-center justify-center">${iconBrain('1.5em', 'text-blue-400')}</div>
                  <h4 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-blue-100 mb-2" data-i18n="home.sections.aiMLSystems">${t('home.sections.aiMLSystems')}</h4>
                </div>
                <div class="flex-1 liquid-panel rounded-lg p-5 sm:p-6 lg:p-8 border border-white/20 text-center transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 hover:opacity-95 motion-reduce:transform-none motion-reduce:transition-none">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 liquid-icon-shell rounded-lg flex items-center justify-center">${iconCloud('1.5em', 'text-blue-400')}</div>
                  <h4 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-blue-100 mb-2" data-i18n="home.sections.devops">${t('home.sections.devops')}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  section.innerHTML = buildContent();

  const createActionButton = (textKey, href, variant) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = t(textKey);
    button.className = [
      'inline-flex items-center justify-center rounded-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4',
      'font-medium text-sm sm:text-base lg:text-lg shadow-lg',
      'transition-transform transition-opacity duration-200 ease-out',
      'hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none',
      variant === 'primary'
        ? 'bg-white text-slate-950 hover:opacity-95'
        : 'border border-white/20 bg-white/10 text-white hover:opacity-90'
    ].join(' ');
    button.style.willChange = 'transform, opacity';
    button.setAttribute('data-i18n-btn', textKey);
    button.addEventListener('click', () => {
      handleNavigation(href);
    });
    return button;
  };

  const buttonsContainer = section.querySelector('.home-buttons');
  if (buttonsContainer) {
    buttonsContainer.appendChild(createActionButton('home.buttons.viewProjects', '#projects', 'primary'));
    buttonsContainer.appendChild(createActionButton('home.buttons.contactResume', '#contact', 'secondary'));
  }

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

  return section;
}
