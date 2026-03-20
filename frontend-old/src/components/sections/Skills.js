import i18n from '../../utils/i18n.js';
import skillCategoriesData from '../../data/skills.json';
import { getSkillIcon } from '../../utils/skillIconMapper.js';
import createLazyImage from '../ui/LazyImage.js';

export default function createSkills() {
  const section = document.createElement('section');
  section.id = 'skills';
  section.className = 'liquid-section py-20 px-4 bg-bg-secondary/20';

  const categoryOrder = [1, 4, 6, 5];
  const orderedCategories = categoryOrder.map(id => skillCategoriesData.find(cat => cat.id === id)).filter(Boolean);

  function render() {
    const t = (k, opts) => i18n.t(k, opts);
    section.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <header class="text-center mb-16">
          <h2 class="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">${t('skills.title')}</h2>
          <div class="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          ${orderedCategories.map(category => `
            <div class="group liquid-panel liquid-panel-interactive rounded-xl p-6 border border-white/20 transition-all duration-500">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">
                  <i class="fas fa-code text-sm text-blue-300"></i>
                </div>
                <h3 class="text-lg font-semibold text-blue-100">${t(`skills.categories.${category.id}.title`, { defaultValue: category.title })}</h3>
              </div>
              <div class="flex flex-wrap gap-2 skill-tags" data-category-id="${category.id}">
                ${(category.skills || []).map((skill, idx) => {
                  const iconUrl = getSkillIcon(skill);
                  const translatedSkill = t(`skills.categories.${category.id}.skills.${idx}`, { defaultValue: skill });
                  return `
                    <span class="inline-flex items-center gap-1.5 sm:gap-2 text-xs text-blue-100/90 bg-white/10 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md border border-white/20 hover:bg-white/20 hover:border-white/35 hover:text-white transition-all duration-300">
                      ${iconUrl ? `<span class="skill-icon-placeholder w-4 h-4 flex-shrink-0" data-src="${iconUrl}" data-alt="${skill}"></span>` : '<i class="fas fa-code text-[10px] text-blue-300/80 flex-shrink-0"></i>'}
                      <span class="whitespace-nowrap">${translatedSkill}</span>
                    </span>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Replace skill icon placeholders with lazy images
    section.querySelectorAll('.skill-icon-placeholder').forEach(placeholder => {
      const img = createLazyImage({
        src: placeholder.dataset.src,
        alt: placeholder.dataset.alt,
        width: '16',
        height: '16',
        className: 'w-4 h-4 object-contain flex-shrink-0'
      });
      placeholder.replaceWith(img);
    });
  }

  render();
  i18n.on('languageChanged', render);
  return section;
}
