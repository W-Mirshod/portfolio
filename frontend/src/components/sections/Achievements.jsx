import { useTranslation } from 'react-i18next';

const getGithubAchievements = (t) => [
  {
    label: t('achievements.items.arcticCodeVault.label'),
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png',
    count: 2,
    description: t('achievements.items.arcticCodeVault.description')
  },
  {
    label: t('achievements.items.pullShark.label'),
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
    description: t('achievements.items.pullShark.description')
  },
  {
    label: t('achievements.items.quickdraw.label'),
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
    description: t('achievements.items.quickdraw.description')
  }
];

const getGithubHighlights = (t) => [
  {
    label: t('achievements.items.githubPro.label'),
    icon: 'fas fa-star',
    description: t('achievements.items.githubPro.description')
  }
];

const Achievements = () => {
  const { t } = useTranslation();
  const githubAchievements = getGithubAchievements(t);
  const githubHighlights = getGithubHighlights(t);

  return (
    <section id="achievements" className="liquid-section py-20 px-4 bg-bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">{t('achievements.title')}</h2>
          <div className="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          <div className="liquid-panel rounded-xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">
                <i className="fas fa-trophy text-sm text-blue-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-100">{t('achievements.achievements')}</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {githubAchievements.map((achievement, index) => (
                <div key={achievement.label} className="group flex items-center gap-4 p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={achievement.icon}
                      alt={achievement.label}
                      className="w-12 h-12 rounded-lg border border-white/25 group-hover:border-white/45 transition-colors duration-300"
                    />
                    {achievement.count && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/90 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center border-2 border-white/60">
                        {achievement.count}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-100 mb-1">{achievement.label}</h4>
                    <p className="text-xs text-blue-100/75">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-panel rounded-xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">
                <i className="fas fa-star text-sm text-blue-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-100">{t('achievements.highlights')}</h3>
            </div>
            
            <div className="space-y-4">
              {githubHighlights.map((highlight, index) => (
                <div key={highlight.label} className="group flex items-center gap-4 p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/55 to-white/35 border border-white/30 flex items-center justify-center">
                    <i className={`${highlight.icon} text-blue-200 text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-100 mb-1">{highlight.label}</h4>
                    <p className="text-xs text-blue-100/75">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
