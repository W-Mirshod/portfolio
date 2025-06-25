import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMedal, faTrophy, faBolt, faBuilding, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Achievements.css';

const Achievements = () => {
  const { t } = useTranslation();

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('achievements.title')}</h2>
          <p className="section-subtitle">{t('achievements.subtitle')}</p>
        </div>
        
        <div className="achievements-content">
          <div className="achievement-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faGithub} />
              </div>
              <div className="stat-info">
                <h3>22+</h3>
                <p>{t('achievements.publicRepos')}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="stat-info">
                <h3>50+</h3>
                <p>{t('achievements.privateRepos')}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-info">
                <h3>5+</h3>
                <p>{t('achievements.repoStars')}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-code-branch"></i>
              </div>
              <div className="stat-info">
                <h3>1</h3>
                <p>{t('achievements.repoForks')}</p>
              </div>
            </div>
          </div>
          
          <div className="organization-info">
            <h3>{t('achievements.orgMember')}</h3>
            <div className="org-card">
              <FontAwesomeIcon icon={faBuilding} />
              <div className="org-details">
                <h4>Yaklabs-Organization</h4>
                <p>{t('achievements.orgDescription1')}</p>
                <a href="https://github.com/Yaklabs-Organization" target="_blank" rel="noopener noreferrer" className="org-link">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  {t('achievements.viewOrg')}
                </a>
              </div>
            </div>
            <div className="org-card" style={{ marginTop: '1.5rem' }}>
              <FontAwesomeIcon icon={faBuilding} />
              <div className="org-details">
                <h4>MegaDevs</h4>
                <p>{t('achievements.orgDescription2')}</p>
                <a href="https://github.com/mega-devs" target="_blank" rel="noopener noreferrer" className="org-link">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  {t('achievements.viewOrg')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="github-achievements">
            <h3>{t('achievements.githubAchievements')}</h3>
            <div className="achievement-badges">
              <div className="badge">
                <FontAwesomeIcon icon={faMedal} />
                <span>Pull Shark x2</span>
              </div>
              <div className="badge">
                <FontAwesomeIcon icon={faTrophy} />
                <span>YOLO</span>
              </div>
              <div className="badge">
                <FontAwesomeIcon icon={faBolt} />
                <span>Quickdraw</span>
              </div>
            </div>
          </div>
          
          <div className="professional-network">
            <h3>{t('achievements.professionalNetwork')}</h3>
            <div className="network-stats">
              <div className="network-card">
                <div className="network-icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div className="network-info">
                  <h4>{t('achievements.linkedinProfile')}</h4>
                  <p className="network-stat">{t('achievements.connections')}</p>
                  <p className="network-description">{t('achievements.networkDescription')}</p>
                  <a href="https://www.linkedin.com/in/w-mirshod" target="_blank" rel="noopener noreferrer" className="network-link">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    {t('achievements.connectLinkedin')}
                  </a>
                </div>
              </div>
              
              <div className="network-card">
                <div className="network-icon">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <div className="network-info">
                  <h4>{t('achievements.githubCommunity')}</h4>
                  <p className="network-stat">{t('achievements.openSourceProjects')}</p>
                  <p className="network-description">{t('achievements.githubDescription')}</p>
                  <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer" className="network-link">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    {t('achievements.viewGithub')}
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
