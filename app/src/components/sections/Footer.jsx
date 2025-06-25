import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faServer, faLaptopCode, faCloud, faBrain, faDatabase, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';
import mirshodLogo from '../../assets/images/Mirshod.png';

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          
          {/* Quick Links Section */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.quickLinks.title')}</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">{t('footer.quickLinks.home')}</a></li>
              <li><a href="#about" className="footer-link">{t('footer.quickLinks.about')}</a></li>
              <li><a href="#experience" className="footer-link">{t('footer.quickLinks.experience')}</a></li>
              <li><a href="#skills" className="footer-link">{t('footer.quickLinks.skills')}</a></li>
              <li><a href="#achievements" className="footer-link">{t('footer.quickLinks.achievements')}</a></li>
              <li><a href="#certificate" className="footer-link">{t('footer.quickLinks.certificate')}</a></li>
              <li><a href="#projects" className="footer-link">{t('footer.quickLinks.projects')}</a></li>
              <li><a href="#contact" className="footer-link">{t('footer.quickLinks.contact')}</a></li>
            </ul>
          </div>

          {/* Major Specializations Section */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.specializations.title')}</h3>
            <div className="specialization-grid">
              <div className="specialization-item">
                <FontAwesomeIcon icon={faServer} />
                <span>{t('footer.specializations.backend')}</span>
              </div>
              <div className="specialization-item">
                <FontAwesomeIcon icon={faLaptopCode} />
                <span>{t('footer.specializations.frontend')}</span>
              </div>
              <div className="specialization-item">
                <FontAwesomeIcon icon={faCloud} />
                <span>{t('footer.specializations.devops')}</span>
              </div>
              <div className="specialization-item">
                <FontAwesomeIcon icon={faBrain} />
                <span>{t('footer.specializations.ai')}</span>
              </div>
              <div className="specialization-item">
                <FontAwesomeIcon icon={faDatabase} />
                <span>{t('footer.specializations.database')}</span>
              </div>
              <div className="specialization-item">
                <FontAwesomeIcon icon={faCogs} />
                <span>{t('footer.specializations.api')}</span>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.connect.title')}</h3>
            <div className="connect-section">
              
              {/* Social Platforms */}
              <div className="social-platforms">
                <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer" className="platform-link" data-platform="github">
                  <div className="platform-icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">GitHub</span>
                    <span className="platform-handle">@W-Mirshod</span>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/w-mirshod" target="_blank" rel="noopener noreferrer" className="platform-link" data-platform="linkedin">
                  <div className="platform-icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">LinkedIn</span>
                    <span className="platform-handle">@w-mirshod</span>
                  </div>
                </a>
                
                <a href="https://t.me/maverick3526" target="_blank" rel="noopener noreferrer" className="platform-link" data-platform="telegram">
                  <div className="platform-icon">
                    <FontAwesomeIcon icon={faTelegram} />
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">Telegram</span>
                    <span className="platform-handle">@maverick3526</span>
                  </div>
                </a>
                
                <a href="https://instagram.com/wmirshod" target="_blank" rel="noopener noreferrer" className="platform-link" data-platform="instagram">
                  <div className="platform-icon">
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">Instagram</span>
                    <span className="platform-handle">@wmirshod</span>
                  </div>
                </a>
              </div>

              {/* Contact Information */}
              <div className="contact-info">
                <a href="mailto:wmirshod@gmail.com" className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.connect.email')}</span>
                    <span className="contact-value">wmirshod@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+998907126437" className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.connect.phone')}</span>
                    <span className="contact-value">+998 (90) 712-64-37</span>
                  </div>
                </a>

                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.connect.location')}</span>
                    <span className="contact-value">{t('footer.connect.country')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
          
          <div className="footer-status">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>{t('footer.status')}</span>
            </div>
          </div>

          <div className="back-to-top">
            <button className="back-to-top-btn" aria-label={t('footer.backToTop')} onClick={scrollToTop}>
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
