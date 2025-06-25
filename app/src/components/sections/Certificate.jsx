import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import '../styles/Certificate.css';
import certificateImage from '../../assets/images/sertification.png';

const Certificate = () => {
  const { t } = useTranslation();

  return (
    <section id="certificate" className="section certificate-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('certificate.title')}</h2>
          <p className="section-subtitle">{t('certificate.subtitle')}</p>
        </div>
        
        <div className="certificate-content">
          <div className="certificate-card">
            <div className="certificate-icon">
              <FontAwesomeIcon icon={faCertificate} />
            </div>
            <div className="certificate-details">
              <h3>{t('certificate.pdp.title')}</h3>
              <p className="certificate-description">
                {t('certificate.pdp.description')}
              </p>
              <div className="certificate-meta">
                <div className="certificate-meta-item">
                  <span className="meta-label">{t('certificate.issuedBy')}</span>
                  <span className="meta-value">PDP IT Academy</span>
                </div>
                <div className="certificate-meta-item">
                  <span className="meta-label">{t('certificate.issuedDate')}</span>
                  <span className="meta-value">{t('certificate.pdp.date')}</span>
                </div>
                <div className="certificate-meta-item">
                  <span className="meta-label">{t('certificate.credentialId')}</span>
                  <span className="meta-value">PDP-12345-BACKEND</span>
                </div>
              </div>
            </div>
            <div className="certificate-image">
              <img 
                src={certificateImage} 
                alt={t('certificate.pdp.title')}
                loading="lazy" 
              />
              <div className="certificate-view-overlay">
                <a href={certificateImage} target="_blank" rel="noopener noreferrer" className="certificate-view-btn">
                  {t('certificate.viewCertificate')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
