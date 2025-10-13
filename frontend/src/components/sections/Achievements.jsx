import { useTranslation } from 'react-i18next';
import organizationsData from '../../data/organizations.json';

const githubAchievements = [
  {
    label: 'Arctic Code Vault Contributor',
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png',
    count: 2
  },
  {
    label: 'Pull Shark',
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png'
  },
  {
    label: 'Quickdraw',
    icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png'
  }
];

const githubHighlights = [
  {
    label: 'PRO',
    icon: null
  }
];

const Achievements = () => {
  const { t } = useTranslation();

  return (
    <section id="achievements" className="bg-bg-secondary/30 py-14 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow-lg animate-fadeInUp">GitHub Achievements</h2>
          <p className="text-base sm:text-lg text-text-secondary animate-fadeInUp delay-100">Open source contributions and milestones</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-10 animate-fadeInUp delay-200">
          <div className="flex gap-4 items-center">
            {githubAchievements.map((ach, idx) => (
              <div key={ach.label} className="relative flex flex-col items-center group transition-transform duration-300 hover:scale-110">
                <img
                  src={ach.icon}
                  alt={ach.label}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-primary shadow-lg bg-white animate-fadeInUp"
                  title={ach.label}
                />
                {ach.count && (
                  <span className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">x{ach.count}</span>
                )}
                <span className="text-xs mt-2 text-text-secondary text-center max-w-[80px] animate-fadeInUp delay-100">{ach.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 ml-0 md:ml-8 animate-fadeInUp delay-200">
            <span className="font-bold text-base text-primary mb-1">Highlights</span>
            <div className="flex gap-2">
              {githubHighlights.map((hl, idx) => (
                <span key={hl.label} className="flex items-center gap-1 px-3 py-1 rounded-full border border-primary text-primary text-xs font-semibold bg-white/5 animate-fadeInUp delay-300">
                  <i className="fas fa-star text-primary" />
                  {hl.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 animate-fadeInUp delay-300">
          <div className="bg-bg-tertiary/80 rounded-xl p-6 sm:p-8 border border-border-color shadow-neumorphism max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-4">Organization Member</h3>
            {organizationsData.map((org, index) => (
              <div key={index} className={`flex flex-col sm:flex-row items-start gap-4 py-4 ${index > 0 ? 'mt-6 border-t border-border-color/50' : ''}`}>
                <i className="fas fa-building text-primary text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-text-primary text-base">{org.name}</h4>
                  <p className="text-sm text-text-secondary mb-1">{org.description}</p>
                  {org.link && (
                    <a href={org.link} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs font-medium">Visit Organization</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
