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
      </div>
    `;
  }

  render();
  i18n.on('languageChanged', render);
  return section;
}
