import { useTranslation, Trans } from 'react-i18next';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>{t('about.paragraph1')}</p>
            
            <p>
              <Trans i18nKey="about.services">
                🏗️ Complete Platform Development - Backend to Frontend<br />
                🤖 AI Integration & Automation Solutions<br />
                ☁️ Cloud Infrastructure & DevOps Management<br />
                🛒 E-commerce to Enterprise-Level Applications<br />
                ⚡ Performance Optimization & Scalable Architecture
              </Trans>
            </p>
            
            <p>{t('about.paragraph2')}</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <h3>100%</h3>
                <span>{t('about.stat1')}</span>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <span>{t('about.stat2')}</span>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <span>{t('about.stat3')}</span>
              </div>
              <div className="stat-item">
                <h3>1</h3>
                <span>{t('about.stat4')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
