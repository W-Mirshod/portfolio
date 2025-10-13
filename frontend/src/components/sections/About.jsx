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
              {t("Building production-grade systems that actually work 🚀 I'm W Mirshod - a senior software engineer who ships complete digital platforms from database design to deployment. I've architected microservices handling 8K+ concurrent users with 99.7% uptime, built IoT platforms processing 50K+ events daily, and deployed AI systems reducing operational costs by 65%.")}
            </p>
            <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed animate-fadeInUp delay-400">
              🏗️ {t('Microservices Architecture - Python/Django, Redis caching, PostgreSQL optimization')}<br/>
              🤖 {t('AI/ML Integration - PyTorch models, YOLOv8 computer vision, anomaly detection')}<br/>
              ☁️ {t('Cloud Infrastructure - AWS multi-region, Docker/Kubernetes, Grafana/Prometheus')}<br/>
              🛒 {t('High-Traffic Platforms - E-commerce APIs, real-time WebSocket systems')}<br/>
              ⚡ {t('Performance Engineering - <200ms latency, 30 FPS edge processing, 87% mAP accuracy')}
            </p>
            <p className="text-base sm:text-lg text-text-primary mb-10 leading-relaxed animate-fadeInUp delay-500">
              {t("Why work with a technical specialist? You get architectural decisions backed by real production experience, not marketing promises. I've solved complex challenges: scaling WebSocket connections for IoT devices, optimizing YOLOv8 models for CPU-only environments, implementing Redis-based caching that reduced API response times by 73%. From MVP prototypes to enterprise systems handling millions of requests, I deliver solutions that perform under real-world load.")}
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
