import { useTranslation } from 'react-i18next';

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
    <footer className="bg-footer-bg text-footer-text pt-10 pb-6 border-t border-footer-border relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-6 items-start md:items-stretch">
          <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <img src="/Mirshod.png" alt="W Mirshod" width={50} height={50} className="rounded-full border-2 border-primary shadow" />
              <h3 className="text-xl font-bold text-footer-heading">W Mirshod</h3>
            </div>
            <p className="text-footer-text-muted text-sm mb-3 text-center md:text-left max-w-xs">
              Full-stack developer specializing in Python, Django, React, and AI solutions. Building innovative digital experiences that make a difference.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-footer-text-muted">Available for new opportunities</span>
            </div>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-footer-link text-xl hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h4 className="text-lg font-semibold text-footer-heading mb-2">Quick Links</h4>
            <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-footer-link text-base hover:text-primary transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h4 className="text-lg font-semibold text-footer-heading mb-2">Specializations</h4>
            <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
              {specializations.map((spec, index) => (
                <li key={index}>
                  <span className="text-footer-text text-base">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-footer-heading mb-2">Connect</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-primary" />
                <a href="mailto:mirshod@wmirshod.com" className="text-footer-link hover:text-primary transition-colors duration-200 text-base">
                  mirshod@wmirshod.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fab fa-telegram text-primary" />
                <a href="https://t.me/wmirshod" target="_blank" rel="noopener noreferrer" className="text-footer-link hover:text-primary transition-colors duration-200 text-base">
                  @wmirshod
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-primary" />
                <span className="text-footer-text text-base">Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-globe text-primary" />
                <span className="text-footer-text text-base">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-footer-border pt-6 mt-10">
          <div className="text-footer-text-muted text-sm text-center md:text-left">
            <p>© {currentYear} Mirshod Qayimov. All rights reserved.</p>
            <p className="text-xs">Built with React & passion ❤️</p>
          </div>
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-semibold text-sm shadow hover:bg-primary-dark transition-all duration-200"
            aria-label="Back to top"
          >
            <i className="fas fa-arrow-up" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-32 bg-gradient-to-t from-footer-bg to-transparent absolute bottom-0 left-0" />
      </div>
    </footer>
  );
};

export default Footer;
