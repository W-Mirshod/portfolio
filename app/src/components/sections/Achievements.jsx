import { useTranslation } from 'react-i18next';
import '../../components/styles/AchievementsSection.css';

const Achievements = () => {
  const { t } = useTranslation();

  const achievements = [
    {
      icon: "fab fa-github",
      number: "22+",
      label: "Public Repositories"
    },
    {
      icon: "fas fa-lock",
      number: "50+",
      label: "Private Repositories"
    },
    {
      icon: "fas fa-star",
      number: "5+",
      label: "Repository Stars"
    },
    {
      icon: "fas fa-code-branch",
      number: "1",
      label: "Repository Forks"
    }
  ];

  const organizations = [
    {
      name: "Yaklabs-Organization",
      description: "Contributing to organizational projects and collaborative development",
      link: "https://github.com/Yaklabs-Organization"
    },
    {
      name: "MegaDevs",
      description: "Collaborating on innovative software solutions and full-stack development projects.",
      link: null
    }
  ];

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">GitHub Achievements</h2>
          <p className="section-subtitle">Open source contributions and milestones</p>
        </div>
        
        <div className="achievements-content">
          <div className="achievement-stats">
            {achievements.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-info">
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="organization-info">
            <h3>Organization Member</h3>
            {organizations.map((org, index) => (
              <div key={index} className="org-card" style={index > 0 ? { marginTop: '1.5rem' } : {}}>
                <i className="fas fa-building"></i>
                <div className="org-details">
                  <h4>{org.name}</h4>
                  <p>{org.description}</p>
                  {org.link && (
                    <a href={org.link} target="_blank" rel="noopener noreferrer" className="org-link">
                      Visit Organization
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="github-achievements">
            <h3>GitHub Achievements</h3>
            <div className="achievement-badges">
              <div className="badge">
                <i className="fas fa-trophy"></i>
                <span>Arctic Code Vault Contributor</span>
              </div>
              <div className="badge">
                <i className="fas fa-medal"></i>
                <span>Pull Shark</span>
              </div>
              <div className="badge">
                <i className="fas fa-star"></i>
                <span>Quickdraw</span>
              </div>
            </div>
          </div>
          
          <div className="professional-network">
            <h3>Professional Network</h3>
            <div className="network-stats">
              <div className="network-card">
                <i className="fab fa-github"></i>
                <div className="network-info">
                  <h4>GitHub Profile</h4>
                  <p>Follow my open source journey</p>
                  <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer" className="network-link">
                    View Profile
                  </a>
                </div>
              </div>
              
              <div className="network-card">
                <i className="fab fa-linkedin"></i>
                <div className="network-info">
                  <h4>LinkedIn</h4>
                  <p>Professional connections and updates</p>
                  <a href="https://linkedin.com/in/wmirshod" target="_blank" rel="noopener noreferrer" className="network-link">
                    Connect
                  </a>
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
