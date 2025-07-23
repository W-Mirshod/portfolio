import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-bg-secondary/30 py-16 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow-lg animate-fadeInUp">
            {t('About Me')}
          </h2>
          <p className="text-base sm:text-lg text-text-secondary animate-fadeInUp delay-100">
            {t('Your Complete Digital Solution Partner')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center animate-fadeInUp delay-200">
          <div className="w-full">
            <p className="text-base sm:text-lg text-text-primary mb-6 leading-relaxed animate-fadeInUp delay-300">
              {t("Ready to transform your vision into reality? 🚀 I'm W Mirshod - a full-stack solution architect who single-handedly delivers complete digital platforms from concept to deployment. Whether you need a simple e-commerce site or complex AI-powered systems, I handle every aspect of development so you don't have to manage multiple vendors.")}
            </p>
            <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed animate-fadeInUp delay-400">
              🏗️ {t('Complete Platform Development - Backend to Frontend')}<br/>
              🤖 {t('AI Integration & Automation Solutions')}<br/>
              ☁️ {t('Cloud Infrastructure & DevOps Management')}<br/>
              🛒 {t('E-commerce to Enterprise-Level Applications')}<br/>
              ⚡ {t('Performance Optimization & Scalable Architecture')}
            </p>
            <p className="text-base sm:text-lg text-text-primary mb-10 leading-relaxed animate-fadeInUp delay-500">
              {t("Why choose a one-person solution? You get unified vision, faster communication, and cost-effective development. My expertise covers Python, Django, JavaScript, React, AWS, Docker, AI APIs, and database optimization. I've architected microservices, built high-traffic platforms, and deployed scalable solutions for businesses. From MVP to enterprise-grade systems, I deliver end-to-end solutions that grow with your business.")}
            </p>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 animate-fadeInUp delay-600">
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-4 sm:p-6 border border-border-color text-text-primary font-semibold min-w-[90px] sm:min-w-[100px] shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold text-primary">20+</span>
                <span className="text-xs mt-1 text-text-secondary">{t('Major Projects Delivered')}</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-4 sm:p-6 border border-border-color text-text-primary font-semibold min-w-[90px] sm:min-w-[100px] shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold text-primary">8K+</span>
                <span className="text-xs mt-1 text-text-secondary">{t('Active Users Supported')}</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-4 sm:p-6 border border-border-color text-text-primary font-semibold min-w-[90px] sm:min-w-[100px] shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold text-primary">99.7%</span>
                <span className="text-xs mt-1 text-text-secondary">{t('Uptime Achieved')}</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-4 sm:p-6 border border-border-color text-text-primary font-semibold min-w-[90px] sm:min-w-[100px] shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold text-primary">4+</span>
                <span className="text-xs mt-1 text-text-secondary">{t('Years Experience')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
