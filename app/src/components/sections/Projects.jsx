import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faShoppingCart, faStore, faGraduationCap, faHospital, faRobot, faLanguage, faChartBar, faBook, faGamepad, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Projects.css';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </div>
        
        <div className="projects-grid">
          <div className="project-card" data-tags="python,django,websocket,webrtc,yaklabs">
            <div className="project-image">
              <FontAwesomeIcon icon={faFlask} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project1.title')}</h3>
              <p>{t('projects.project1.description')}</p>
              <div className="project-tags">
                {t('projects.project1.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/yaklabs-platform" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project2.title')}</h3>
              <p>{t('projects.project2.description')}</p>
              <div className="project-tags">
                {t('projects.project2.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/texnomart-api" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faStore} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project3.title')}</h3>
              <p>{t('projects.project3.description')}</p>
              <div className="project-tags">
                {t('projects.project3.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/online-shopping" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project4.title')}</h3>
              <p>{t('projects.project4.description')}</p>
              <div className="project-tags">
                {t('projects.project4.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/online-course" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faHospital} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project5.title')}</h3>
              <p>{t('projects.project5.description')}</p>
              <div className="project-tags">
                {t('projects.project5.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/For-Grey_Scientific_Labs" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project6.title')}</h3>
              <p>{t('projects.project6.description')}</p>
              <div className="project-tags">
                {t('projects.project6.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/GPT-Neo" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faLanguage} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project7.title')}</h3>
              <p>{t('projects.project7.description')}</p>
              <div className="project-tags">
                {t('projects.project7.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/Gemina-App" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="project-content">
              <h3>{t('projects.project8.title')}</h3>
              <p>{t('projects.project8.description')}</p>
              <div className="project-tags">
                {t('projects.project8.tags', { returnObjects: true }).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <a href="https://github.com/W-Mirshod/for-Medius_Technologies" target="_blank" rel="noopener noreferrer" className="project-link">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.viewProject')}
              </a>
            </div>
          </div>
        </div>
        
        <div className="projects-cta">
          <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FontAwesomeIcon icon={faGithub} />
            {t('projects.viewAll')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
