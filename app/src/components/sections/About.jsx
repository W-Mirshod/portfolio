import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-bg-secondary/30 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">About Me</h2>
          <p className="text-lg text-text-secondary">Your Complete Digital Solution Partner</p>
        </div>
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
          <div className="w-full">
            <p className="text-base md:text-lg text-text-primary mb-6">
              Ready to transform your vision into reality? 🚀 I'm W Mirshod - a full-stack solution architect who single-handedly delivers complete digital platforms from concept to deployment. Whether you need a simple e-commerce site or complex AI-powered systems, I handle every aspect of development so you don't have to manage multiple vendors.
            </p>
            <p className="text-base md:text-lg text-text-secondary mb-6">
              🏗️ Complete Platform Development - Backend to Frontend<br/>
              🤖 AI Integration & Automation Solutions<br/>
              ☁️ Cloud Infrastructure & DevOps Management<br/>
              🛒 E-commerce to Enterprise-Level Applications<br/>
              ⚡ Performance Optimization & Scalable Architecture
            </p>
            <p className="text-base md:text-lg text-text-primary mb-10">
              Why choose a one-person solution? You get unified vision, faster communication, and cost-effective development. My expertise covers Python, Django, JavaScript, React, AWS, Docker, AI APIs, and database optimization. I've architected microservices, built high-traffic platforms, and deployed scalable solutions for businesses. From MVP to enterprise-grade systems, I deliver end-to-end solutions that grow with your business.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-6 border border-border-color text-text-primary font-semibold min-w-[100px]">
                <span className="text-2xl font-bold text-primary">100%</span>
                <span className="text-xs mt-1 text-text-secondary">Project Ownership</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-6 border border-border-color text-text-primary font-semibold min-w-[100px]">
                <span className="text-2xl font-bold text-primary">15+</span>
                <span className="text-xs mt-1 text-text-secondary">Tech Stack Mastery</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-6 border border-border-color text-text-primary font-semibold min-w-[100px]">
                <span className="text-2xl font-bold text-primary">24/7</span>
                <span className="text-xs mt-1 text-text-secondary">Development Focus</span>
              </div>
              <div className="flex flex-col items-center bg-bg-tertiary/80 rounded-xl p-6 border border-border-color text-text-primary font-semibold min-w-[100px]">
                <span className="text-2xl font-bold text-primary">1</span>
                <span className="text-xs mt-1 text-text-secondary">Developer = Full Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
