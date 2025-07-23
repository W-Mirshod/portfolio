import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
    if (!window.grecaptcha || !window.grecaptcha.getResponse()) {
      setFormMessage({ type: 'error', text: t('Please complete the reCAPTCHA verification') });
      return;
    }
    setFormMessage(null);
    try {
      const res = await fetch("http://localhost:54832/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken: window.grecaptcha ? window.grecaptcha.getResponse() : "test-token"
        })
      });
      if (res.ok) {
        setFormMessage({ type: 'success', text: t('Your message has been sent successfully!') });
        setFormData({ name: '', email: '', message: '' });
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      } else {
        const data = await res.json();
        setFormMessage({ type: 'error', text: data.error || t('An error occurred. Please try again later.') });
      }
    } catch (error) {
      setFormMessage({ type: 'error', text: t('An error occurred. Please try again later.') });
    }
  };

  return (
    <section id="contact" className="w-full bg-[rgba(22,24,34,0.3)] py-16 dark:bg-[rgba(22,24,34,0.3)]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 drop-shadow-lg">{t("Get In Touch")}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">{t("Let's discuss your next project")}</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-8">
          <div ref={contactFormRef} className="w-full max-w-xl bg-[rgba(30,32,40,0.8)] dark:bg-[rgba(30,32,40,0.8)] p-8 md:p-10 rounded-2xl border border-gray-700/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1.5">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("Your Name")}
                  required
                  className="w-full px-4 py-3 bg-[rgba(22,24,34,0.8)] border border-gray-700/60 rounded-lg text-gray-100 text-base font-medium focus:outline-none focus:border-blue-400 focus:bg-[rgba(22,24,34,0.9)] placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("Your Email")}
                  required
                  className="w-full px-4 py-3 bg-[rgba(22,24,34,0.8)] border border-gray-700/60 rounded-lg text-gray-100 text-base font-medium focus:outline-none focus:border-blue-400 focus:bg-[rgba(22,24,34,0.9)] placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("Your Message")}
                  rows="5"
                  required
                  className="w-full px-4 py-3 min-h-[120px] max-h-[200px] bg-[rgba(22,24,34,0.8)] border border-gray-700/60 rounded-lg text-gray-100 text-base font-medium focus:outline-none focus:border-blue-400 focus:bg-[rgba(22,24,34,0.9)] placeholder-gray-400 resize-y transition-all duration-300"
                ></textarea>
              </div>
              <div className="flex justify-center items-center mb-4">
                <div className="bg-[rgba(63,162,246,0.1)] border border-blue-400 rounded-xl px-5 pt-4 pb-2 shadow-[0_4px_24px_0_rgba(63,162,246,0.13),0_1.5px_8px_rgba(0,0,0,0.07)] min-w-[300px] max-w-[350px] transition-all duration-300 focus-within:shadow-[0_8px_32px_0_rgba(63,162,246,0.22),0_2.5px_12px_rgba(0,0,0,0.13)] focus-within:border-blue-300 hover:shadow-[0_8px_32px_0_rgba(63,162,246,0.22),0_2.5px_12px_rgba(0,0,0,0.13)] hover:border-blue-300">
                  <div
                    id="recaptcha-container"
                    className="g-recaptcha"
                    ref={recaptchaRef}
                    data-sitekey="***REMOVED***"
                  ></div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 border-none rounded-lg text-gray-100 text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
                {t("Send Message")}
              </button>
            </form>
            {formMessage && (
              <div id="form-messages" className={`mt-4 p-4 rounded-lg text-center font-medium animate-fadeIn ${formMessage.type === 'success' ? 'bg-green-100/10 border border-green-500 text-green-500' : 'bg-red-100/10 border border-red-500 text-red-500'}`}>
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
