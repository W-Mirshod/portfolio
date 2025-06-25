import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../styles/Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setFormStatus({ type: 'loading', message: t('contact.sending') });
      
      // In a real implementation, we would send the form data to a server
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ type: 'success', message: t('contact.success') });
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ type: 'error', message: t('contact.error') });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows="5" 
                  required
                ></textarea>
              </div>
              <div className="form-group recaptcha-container">
                <div className="recaptcha-wrapper">
                  <div 
                    id="recaptcha-container" 
                    className="g-recaptcha" 
                    data-sitekey="***REMOVED***"
                  ></div>
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={formStatus?.type === 'loading'}>
                <FontAwesomeIcon icon={faPaperPlane} />
                {formStatus?.type === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
            
            {formStatus && (
              <div className={`form-messages ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </div>
          
          <div className="contact-info">
            <div className="contact-card">
              <h3>{t('contact.info.title')}</h3>
              <p>{t('contact.info.description')}</p>
              
              <div className="contact-methods">
                <a href="mailto:wmirshod@gmail.com" className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('contact.info.email')}</span>
                    <span className="contact-value">wmirshod@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+998907126437" className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('contact.info.phone')}</span>
                    <span className="contact-value">+998 (90) 712-64-37</span>
                  </div>
                </a>

                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-details">
                    <span className="contact-label">{t('contact.info.location')}</span>
                    <span className="contact-value">{t('contact.info.country')}</span>
                  </div>
                </div>

                <div className="contact-socials">
                  <h4>{t('contact.info.social')}</h4>
                  <div className="social-links">
                    <a href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/w-mirshod" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://t.me/maverick3526" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
