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
    <section id="achievements" className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">{t('achievements.title')}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          {/* Achievements Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <i className="fas fa-trophy text-sm text-white/70"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">{t('achievements.achievements')}</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {githubAchievements.map((achievement, index) => (
                <div key={achievement.label} className="group flex items-center gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={achievement.icon}
                      alt={achievement.label}
                      className="w-12 h-12 rounded-lg border border-gray-700 group-hover:border-gray-600 transition-colors duration-300"
                    />
                    {achievement.count && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-gray-900">
                        {achievement.count}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">{achievement.label}</h4>
                    <p className="text-xs text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <i className="fas fa-star text-sm text-white/70"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">{t('achievements.highlights')}</h3>
            </div>
            
            <div className="space-y-4">
              {githubHighlights.map((highlight, index) => (
                <div key={highlight.label} className="group flex items-center gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <i className={`${highlight.icon} text-white text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">{highlight.label}</h4>
                    <p className="text-xs text-gray-400">{highlight.description}</p>
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
