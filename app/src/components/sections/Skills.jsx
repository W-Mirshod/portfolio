import { useTranslation } from 'react-i18next';
import '../styles/Skills.css';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-subtitle">{t('skills.subtitle')}</p>
        </div>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3>{t('skills.backend.title')}</h3>
            <div className="skill-items">
              {t('skills.backend.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>{t('skills.frontend.title')}</h3>
            <div className="skill-items">
              {t('skills.frontend.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>{t('skills.devops.title')}</h3>
            <div className="skill-items">
              {t('skills.devops.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3>{t('skills.databases.title')}</h3>
            <div className="skill-items">
              {t('skills.databases.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>{t('skills.ai.title')}</h3>
            <div className="skill-items">
              {t('skills.ai.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>{t('skills.tools.title')}</h3>
            <div className="skill-items">
              {t('skills.tools.items', { returnObjects: true }).map((item, index) => (
                <span className="skill-tag" key={index}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
