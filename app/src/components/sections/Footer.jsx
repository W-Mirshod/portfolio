import { useTranslation } from 'react-i18next';
import '../../components/styles/FooterSection.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#certificate', label: 'Certificate' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const specializations = [
    'Backend Development',
    'Frontend Development', 
    'DevOps & Cloud',
    'AI Integration',
    'Database Design',
    'API Development'
  ];

  const socialLinks = [
    {
      icon: 'fab fa-github',
      url: 'https://github.com/W-Mirshod',
      label: 'GitHub'
    },
    {
      icon: 'fab fa-linkedin',
      url: 'https://linkedin.com/in/wmirshod',
      label: 'LinkedIn'
    },
    {
      icon: 'fab fa-telegram',
      url: 'https://t.me/wmirshod',
      label: 'Telegram'
    },
    {
      icon: 'fas fa-envelope',
      url: 'mailto:mirshod@wmirshod.com',
      label: 'Email'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/Mirshod.png" alt="W Mirshod" width="50" height="50" />
              <h3>W Mirshod</h3>
            </div>
            <p className="footer-description">
              Full-stack developer specializing in Python, Django, React, and AI solutions. 
              Building innovative digital experiences that make a difference.
            </p>
            <div className="footer-status">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Available for new opportunities</span>
              </div>
            </div>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="footer-section">
            <h4 className="footer-title">Specializations</h4>
            <ul className="footer-links">
              {specializations.map((spec, index) => (
                <li key={index}>
                  <span className="footer-text">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:mirshod@wmirshod.com" className="footer-link">
                  mirshod@wmirshod.com
                </a>
              </div>
              <div className="contact-item">
                <i className="fab fa-telegram"></i>
                <a href="https://t.me/wmirshod" target="_blank" rel="noopener noreferrer" className="footer-link">
                  @wmirshod
                </a>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span className="footer-text">Tashkent, Uzbekistan</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <span className="footer-text">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>© {currentYear} Mirshod Qayimov. All rights reserved.</p>
              <p className="footer-subtitle">Built with React & passion ❤️</p>
            </div>
            
            <div className="footer-actions">
              <button 
                onClick={scrollToTop} 
                className="back-to-top"
                aria-label="Back to top"
              >
                <i className="fas fa-arrow-up"></i>
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="footer-bg-elements">
        <div className="footer-pattern"></div>
        <div className="footer-gradient"></div>
      </div>
    </footer>
  );
};

export default Footer;
