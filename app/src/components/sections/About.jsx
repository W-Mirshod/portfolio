import { useTranslation } from 'react-i18next';
import '../../components/styles/AboutSection.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Your Complete Digital Solution Partner</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Ready to transform your vision into reality? 🚀 I'm W Mirshod - a full-stack solution architect 
              who single-handedly delivers complete digital platforms from concept to deployment. Whether you need 
              a simple e-commerce site or complex AI-powered systems, I handle every aspect of development so you 
              don't have to manage multiple vendors.
            </p>
            
            <p>
              🏗️ Complete Platform Development - Backend to Frontend<br/>
              🤖 AI Integration & Automation Solutions<br/>
              ☁️ Cloud Infrastructure & DevOps Management<br/>
              🛒 E-commerce to Enterprise-Level Applications<br/>
              ⚡ Performance Optimization & Scalable Architecture
            </p>
            
            <p>
              Why choose a one-person solution? You get unified vision, faster communication, and cost-effective 
              development. My expertise covers Python, Django, JavaScript, React, AWS, Docker, AI APIs, and database 
              optimization. I've architected microservices, built high-traffic platforms, and deployed scalable 
              solutions for businesses. From MVP to enterprise-grade systems, I deliver end-to-end solutions that 
              grow with your business.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <h3>100%</h3>
                <span>Project Ownership</span>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <span>Tech Stack Mastery</span>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <span>Development Focus</span>
              </div>
              <div className="stat-item">
                <h3>1</h3>
                <span>Developer = Full Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
