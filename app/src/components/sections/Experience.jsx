import { useTranslation } from 'react-i18next';
import '../styles/Experience.css';

const Experience = () => {
  const { t } = useTranslation();

  const getSkills = (key) => {
    const val = t(key, { returnObjects: true });
    return Array.isArray(val) ? val : [];
  };

  return (
    <section id="experience" className="section experience-section" role="main" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-header">
          <h2 id="experience-title" className="section-title">{t('experience.title')}</h2>
          <p className="section-subtitle">{t('experience.subtitle')}</p>
        </header>
        
        <div className="experience-timeline" role="list" aria-label={t('experience.timelineLabel')}>
          <article className="experience-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <time className="experience-date" dateTime="2025-03">
              <span>{t('experience.job1.period')}</span>
            </time>
            <div className="experience-content">
              <h3 className="experience-title">{t('experience.job1.title')}</h3>
              <h4 className="experience-company">{t('experience.job1.company')}</h4>
              <p className="experience-description">{t('experience.job1.description')}</p>
              <div className="experience-skills" role="list" aria-label={t('experience.technologiesLabel')}>
                {getSkills('experience.job1.skills').map((skill, index) => (
                  <span className="experience-skill" role="listitem" key={index}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
          
          <article className="experience-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <time className="experience-date" dateTime="2024-10">
              <span>{t('experience.job2.period')}</span>
            </time>
            <div className="experience-content">
              <h3 className="experience-title">{t('experience.job2.title')}</h3>
              <h4 className="experience-company">{t('experience.job2.company')}</h4>
              <p className="experience-description">{t('experience.job2.description')}</p>
              <div className="experience-skills" role="list" aria-label={t('experience.technologiesLabel')}>
                {getSkills('experience.job2.skills').map((skill, index) => (
                  <span className="experience-skill" role="listitem" key={index}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
          
          <article className="experience-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <time className="experience-date" dateTime="2022">
              <span>{t('experience.job3.period')}</span>
            </time>
            <div className="experience-content">
              <h3 className="experience-title">{t('experience.job3.title')}</h3>
              <h4 className="experience-company">{t('experience.job3.company')}</h4>
              <p className="experience-description">{t('experience.job3.description')}</p>
              <div className="experience-skills" role="list" aria-label={t('experience.technologiesLabel')}>
                {getSkills('experience.job3.skills').map((skill, index) => (
                  <span className="experience-skill" role="listitem" key={index}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
        
        <div className="linkedin-cta">
          <p>{t('experience.ctaText')}</p>
          <a href="https://www.linkedin.com/in/w-mirshod" target="_blank" rel="noopener noreferrer" className="cta-secondary">
            <i className="fab fa-linkedin"></i>
            {t('experience.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
