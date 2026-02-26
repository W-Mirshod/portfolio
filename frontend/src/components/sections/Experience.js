import i18n from '../../utils/i18n.js';
import experienceData from '../../data/experience.json';

export default function createExperience() {
  const section = document.createElement('section');
  section.id = 'experience';
  section.className = 'liquid-section bg-bg-secondary/20 py-14 px-2 sm:px-4';
  section.setAttribute('role', 'main');
  section.setAttribute('aria-labelledby', 'experience-title');

  function render() {
    const t = (k, opts) => i18n.t(k, opts);
    section.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <header class="text-center mb-16">
          <h2 id="experience-title" class="text-3xl font-light liquid-title mb-3 tracking-wide">${t('experience.title')}</h2>
          <div class="liquid-divider mx-auto"></div>
        </header>
        <div class="flex flex-col gap-8 sm:gap-6 max-w-4xl mx-auto" role="list" aria-label="Professional experience timeline">
          ${experienceData.map(exp => `
            <article class="group relative liquid-panel liquid-panel-interactive rounded-xl p-6 border border-white/25 transition-all duration-500" role="listitem">
              <div class="flex flex-col space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div class="flex flex-col space-y-1">
                    <h3 class="text-xl font-semibold text-blue-100 tracking-tight">${t(`experience.data.${exp.id}.title`, { defaultValue: exp.title })}</h3>
                    <h4 class="text-sm font-medium text-blue-100/75">${t(`experience.data.${exp.id}.company`, { defaultValue: exp.company })}</h4>
                  </div>
                  <time class="text-xs font-mono text-blue-100 bg-white/15 px-3 py-1 rounded-md border border-white/35 self-start sm:self-center backdrop-blur-sm" datetime="${exp.period.split(' - ')[0]}">
                    ${t(`experience.data.${exp.id}.period`, { defaultValue: exp.period })}
                  </time>
                </div>
                <p class="text-sm text-blue-100/85 leading-relaxed max-w-3xl">${t(`experience.data.${exp.id}.description`, { defaultValue: exp.description })}</p>
              </div>
            </article>
          `).join('')}
        </div>
        <aside class="mt-20 flex flex-col items-center justify-center">
          <a href="https://linkedin.com/in/wmirshod" target="_blank" rel="noopener noreferrer" class="group relative inline-flex flex-col items-center gap-2 px-8 py-6 rounded-2xl liquid-btn liquid-btn-primary text-white font-semibold text-base transition-all duration-500 hover:scale-105 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span class="flex items-center gap-3 relative z-10">
              <i class="fab fa-linkedin text-2xl group-hover:scale-110 transition-transform duration-300"></i>
              <span class="text-lg font-bold">${t('experience.linkedIn.profile')}</span>
              <div class="flex items-center gap-2 bg-white/25 text-white font-bold text-sm px-4 py-2 rounded-full border border-white/45 backdrop-blur-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 0A4 4 0 0012 4a4 4 0 00-1 7.87"/></svg>
                1,800+
                <span class="text-xs font-medium">${t('experience.linkedIn.connections')}</span>
              </div>
            </span>
            <span class="text-white/85 font-medium text-sm relative z-10 group-hover:text-white transition-colors duration-300">${t('experience.linkedIn.visit')}</span>
          </a>
        </aside>
      </div>
    `;
  }

  render();
  i18n.on('languageChanged', render);
  return section;
}
