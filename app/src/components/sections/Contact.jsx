import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../components/styles/ContactSection.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formMessage, setFormMessage] = useState(null);
  const contactFormRef = useRef(null);
  const recaptchaRef = useRef(null);

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) return;

      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadRecaptcha();

    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (contactFormRef.current) {
      observer.observe(contactFormRef.current);
    }

    return () => {
      if (contactFormRef.current) {
        observer.unobserve(contactFormRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if reCAPTCHA is completed
    if (!window.grecaptcha || !window.grecaptcha.getResponse()) {
      setFormMessage({ type: 'error', text: t('Please complete the reCAPTCHA verification') });
      return;
    }
    
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormMessage({ type: 'success', text: t('Your message has been sent successfully!') });
      setFormData({ name: '', email: '', message: '' });
      
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      setFormMessage({ type: 'error', text: t('An error occurred. Please try again later.') });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("Get In Touch")}</h2>
          <p className="section-subtitle">{t("Let's discuss your next project")}</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form" ref={contactFormRef}>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("Your Name")} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("Your Email")} 
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("Your Message")} 
                  rows="5" 
                  required
                ></textarea>
              </div>
              <div className="form-group recaptcha-container">
                <div className="recaptcha-wrapper">
                  <div 
                    id="recaptcha-container" 
                    className="g-recaptcha" 
                    ref={recaptchaRef}
                    data-sitekey="***REMOVED***"
                  ></div>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                <i className="fas fa-paper-plane"></i>
                {t("Send Message")}
              </button>
            </form>
            {formMessage && (
              <div id="form-messages" className={`form-messages ${formMessage.type}`}>
                {formMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
