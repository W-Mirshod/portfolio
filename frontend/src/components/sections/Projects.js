import i18n from '../../utils/i18n.js';
import { setupScrollReveal } from '../../utils/parallax.js';
import projectsData from '../../data/projects.json';
import createSpotlightCard, { attachSpotlightBehavior } from '../ui/SpotlightCard.js';

export function mountProjectsSection(section) {
  function render() {
    const t = (k, opts) => i18n.t(k, opts);
    section.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'max-w-5xl mx-auto';
    container.innerHTML = `
      <header class="text-center mb-16">
        <div class="flex items-center justify-center gap-4 mb-6">
          <h2 class="text-3xl font-light liquid-title tracking-wide animate-fadeInUp">${t('projects.title')}</h2>
        </div>
        <div class="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
      </header>
    `;

    if (projectsData.length === 0) {
      container.innerHTML += `
        <div class="flex justify-center items-center py-20">
          <div class="text-center">
            <div class="text-gray-400 text-6xl mb-4"><i class="fas fa-search"></i></div>
            <h3 class="text-xl font-semibold text-white mb-2">${t('projects.noProjects')}</h3>
            <p class="text-blue-100/70 mb-4">${t('projects.noProjectsSubtitle')}</p>
          </div>
        </div>
      `;
    } else {
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8';

      projectsData.forEach(project => {
        const cardHTML = `
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-md liquid-icon-shell flex items-center justify-center">
              <i class="${project.icon} text-blue-300 text-base"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold text-blue-100">${t(`projects.data.${project.id}.title`, { defaultValue: project.title })}</h3>
            </div>
          </div>
          <p class="text-xs text-blue-100/85 mb-4 leading-relaxed flex-grow">${t(`projects.data.${project.id}.description`, { defaultValue: project.description })}</p>
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${project.technologies.map((tech, idx) => `<span class="text-[10px] text-blue-100/90 bg-white/10 px-2.5 py-1 rounded border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-200">${t(`projects.data.${project.id}.technologies.${idx}`, { defaultValue: tech })}</span>`).join('')}
          </div>
          <div class="flex items-center justify-end gap-2 mt-auto pt-3 border-t border-white/20">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md liquid-btn text-blue-200 text-xs font-medium border border-white/20 hover:text-white transition-all duration-200"><i class="fab fa-github text-sm"></i><span>${t('projects.viewInGithub')}</span></a>` : ''}
            ${project.url && project.url !== '#' ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md liquid-btn text-blue-200 text-xs font-medium border border-white/20 hover:text-white transition-all duration-200"><i class="fas fa-external-link-alt text-xs"></i><span>${t('projects.viewWebsite')}</span></a>` : ''}
          </div>
        `;
        const card = createSpotlightCard(cardHTML, 'group liquid-panel liquid-panel-interactive glass-blur-strong rounded-lg p-5 glass-border transition-all duration-300 flex flex-col h-full');
        grid.appendChild(card);
      });

      container.appendChild(grid);
      setupScrollReveal(grid);
    }

    section.appendChild(container);
  }

  function hydrateFromSsr() {
    const grid = section.querySelector('.grid');
    if (grid) {
      setupScrollReveal(grid);
      grid.querySelectorAll('.spotlight-card').forEach((card) => attachSpotlightBehavior(card));
    }
  }

  if (section.hasAttribute('data-ssr-projects-grid')) {
    hydrateFromSsr();
    i18n.on('languageChanged', render);
  } else {
    render();
    i18n.on('languageChanged', render);
  }
}

export default function createProjects() {
  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'liquid-section py-20 px-4 bg-bg-secondary/20';
  mountProjectsSection(section);
  return section;
}
