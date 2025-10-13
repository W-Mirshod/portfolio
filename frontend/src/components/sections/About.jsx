import { useTranslation } from 'react-i18next';
import ParallaxBackground from '../ui/ParallaxBackground';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-bg-secondary/30 py-16 px-2 sm:px-4 relative overflow-hidden">
      <ParallaxBackground className="absolute inset-0 opacity-30" particleCount={10} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow-lg layered-entrance">
            {t('About Me')}
          </h2>
          <p className="text-base sm:text-lg text-text-secondary layered-entrance" style={{ animationDelay: '0.1s' }}>
            {t('Your Complete Digital Solution Partner')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
          <div className="w-full">
            <p className="text-base sm:text-lg text-text-primary mb-6 leading-relaxed layered-entrance" style={{ animationDelay: '0.2s' }}>
              {t("Building production-grade systems that actually work 🚀 I'm W Mirshod - a senior software engineer who ships complete digital platforms from database design to deployment. I've architected microservices handling 8K+ concurrent users with 99.7% uptime, built IoT platforms processing 50K+ events daily, and deployed AI systems reducing operational costs by 65%.")}
            </p>

            <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed layered-entrance" style={{ animationDelay: '0.3s' }}>
              🏗️ {t('Microservices Architecture - Python/Django, Redis caching, PostgreSQL optimization')}<br/>
              🤖 {t('AI/ML Integration - PyTorch models, YOLOv8 computer vision, anomaly detection')}<br/>
              ☁️ {t('Cloud Infrastructure - AWS multi-region, Docker/Kubernetes, Grafana/Prometheus')}<br/>
              🛒 {t('High-Traffic Platforms - E-commerce APIs, real-time WebSocket systems')}<br/>
              ⚡ {t('Performance Engineering - <200ms latency, 30 FPS edge processing, 87% mAP accuracy')}
            </p>

            <p className="text-base sm:text-lg text-text-primary mb-10 leading-relaxed layered-entrance" style={{ animationDelay: '0.4s' }}>
              {t("Why work with a technical specialist? You get architectural decisions backed by real production experience, not marketing promises. I've solved complex challenges: scaling WebSocket connections for IoT devices, optimizing YOLOv8 models for CPU-only environments, implementing Redis-based caching that reduced API response times by 73%. From MVP prototypes to enterprise systems handling millions of requests, I deliver solutions that perform under real-world load.")}
            </p>

            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {[
                { number: '20+', label: t('Major Projects Delivered') },
                { number: '8K+', label: t('Active Users Supported') },
                { number: '99.7%', label: t('Uptime Achieved') },
                { number: '4+', label: t('Years Experience') }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center card-depth-2 rounded-xl p-4 sm:p-6 depth-hover-card layered-entrance morphing-glow"
                  style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                >
                  <span className="text-xl sm:text-2xl font-bold text-primary mb-1 depth-pulse">{stat.number}</span>
                  <span className="text-xs mt-1 text-text-secondary text-center leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
