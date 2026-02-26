import i18n from '../../utils/i18n.js';

export default function createAchievements() {
  const section = document.createElement('section');
  section.id = 'achievements';
  section.className = 'liquid-section py-20 px-4 bg-bg-secondary/20';

  function render() {
    const t = (k) => i18n.t(k);
    const githubAchievements = [
      { label: t('achievements.items.arcticCodeVault.label'), icon: 'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png', count: 2, description: t('achievements.items.arcticCodeVault.description') },
      { label: t('achievements.items.pullShark.label'), icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png', description: t('achievements.items.pullShark.description') },
      { label: t('achievements.items.quickdraw.label'), icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png', description: t('achievements.items.quickdraw.description') }
    ];
    const githubHighlights = [
      { label: t('achievements.items.githubPro.label'), icon: 'fas fa-star', description: t('achievements.items.githubPro.description') }
    ];

    section.innerHTML = `
      <div class="max-w-5xl mx-auto">
        <header class="text-center mb-16">
          <h2 class="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">${t('achievements.title')}</h2>
          <div class="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          <div class="liquid-panel rounded-xl p-8 border border-white/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center"><i class="fas fa-trophy text-sm text-blue-300"></i></div>
              <h3 class="text-lg font-semibold text-blue-100">${t('achievements.achievements')}</h3>
            </div>
            <div class="grid grid-cols-1 gap-4">
              ${githubAchievements.map(a => `
                <div class="group flex items-center gap-4 p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                  <div class="relative">
                    <img src="${a.icon}" alt="${a.label}" class="w-12 h-12 rounded-lg border border-white/25 group-hover:border-white/45 transition-colors duration-300"/>
                    ${a.count ? `<div class="absolute -top-2 -right-2 w-6 h-6 bg-white/90 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center border-2 border-white/60">${a.count}</div>` : ''}
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-blue-100 mb-1">${a.label}</h4>
                    <p class="text-xs text-blue-100/75">${a.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="liquid-panel rounded-xl p-8 border border-white/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center"><i class="fas fa-star text-sm text-blue-300"></i></div>
              <h3 class="text-lg font-semibold text-blue-100">${t('achievements.highlights')}</h3>
            </div>
            <div class="space-y-4">
              ${githubHighlights.map(h => `
                <div class="group flex items-center gap-4 p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-white/55 to-white/35 border border-white/30 flex items-center justify-center">
                    <i class="${h.icon} text-blue-200 text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-blue-100 mb-1">${h.label}</h4>
                    <p class="text-xs text-blue-100/75">${h.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render();
  i18n.on('languageChanged', render);
  return section;
}
