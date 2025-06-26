import { useTranslation } from 'react-i18next';

const Achievements = () => {
  const { t } = useTranslation();

  const achievements = [
    { icon: "fab fa-github", number: "22+", label: "Public Repositories" },
    { icon: "fas fa-lock", number: "50+", label: "Private Repositories" },
    { icon: "fas fa-star", number: "5+", label: "Repository Stars" },
    { icon: "fas fa-code-branch", number: "1", label: "Repository Forks" }
  ];

  const organizations = [
    { name: "Yaklabs-Organization", description: "Contributing to organizational projects and collaborative development", link: "https://github.com/Yaklabs-Organization" },
    { name: "MegaDevs", description: "Collaborating on innovative software solutions and full-stack development projects.", link: null }
  ];

  return (
    <section id="achievements" className="bg-bg-secondary/30 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">GitHub Achievements</h2>
          <p className="text-lg text-text-secondary">Open source contributions and milestones</p>
        </div>
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            {achievements.map((stat, index) => (
              <div key={index} className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-6 border border-border-color shadow-neumorphism">
                <div className="text-3xl text-primary mb-2"><i className={stat.icon} /></div>
                <div className="font-bold text-2xl text-primary">{stat.number}</div>
                <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-bg-tertiary/80 rounded-xl p-8 border border-border-color shadow-neumorphism max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">Organization Member</h3>
            {organizations.map((org, index) => (
              <div key={index} className={`flex items-start gap-4 py-4 ${index > 0 ? 'mt-6 border-t border-border-color/50' : ''}`}>
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
          <div className="bg-bg-tertiary/80 rounded-xl p-8 border border-border-color shadow-neumorphism max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">GitHub Achievements</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium">
                <i className="fas fa-trophy" />
                <span>Arctic Code Vault Contributor</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium">
                <i className="fas fa-medal" />
                <span>Pull Shark</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium">
                <i className="fas fa-star" />
                <span>Quickdraw</span>
              </div>
            </div>
          </div>
          <div className="bg-bg-tertiary/80 rounded-xl p-8 border border-border-color shadow-neumorphism max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">Professional Network</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4 bg-bg-secondary/80 rounded-lg p-4 flex-1">
                <i className="fab fa-github text-primary text-2xl" />
                <div>
                  <h4 className="font-semibold text-text-primary text-base">GitHub Profile</h4>
                  <p className="text-xs text-text-secondary mb-1">Follow my open source journey</p>
                  <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs font-medium">View Profile</a>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-bg-secondary/80 rounded-lg p-4 flex-1">
                <i className="fab fa-linkedin text-primary text-2xl" />
                <div>
                  <h4 className="font-semibold text-text-primary text-base">LinkedIn</h4>
                  <p className="text-xs text-text-secondary mb-1">Professional connections and updates</p>
                  <a href="https://linkedin.com/in/wmirshod" target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs font-medium">Connect</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
