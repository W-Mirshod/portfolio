import { useTranslation } from 'react-i18next';
import '../../components/styles/ExperienceSection.css';

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      period: "Mar 2025 - Present",
      title: "Senior Software Engineer",
      company: "Yaklabs · Full-time",
      description: "Contributing to a tech-driven, future-oriented platform at YakLabs (Tashkent, Uzbekistan). Focused on innovative projects and modern technologies.",
      skills: ["Python", "Django", "AWS", "Docker", "PostgreSQL", "Redis", "WebSocket"]
    },
    {
      period: "Oct 2024 - Apr 2025",
      title: "Software Engineer",
      company: "MegaDevs (Germany Company) · Full-time",
      description: "Developed scalable web applications and microservices architecture. Led backend development initiatives and implemented DevOps practices for continuous integration and deployment.",
      skills: ["React", "Node.js", "TypeScript", "Docker", "Kubernetes", "AWS", "CI/CD"]
    },
    {
      period: "2022 - Oct 2024",
      title: "Backend Developer & AI Engineer",
      company: "Freelance / Independent Projects",
      description: "Specializing in microservices architecture, API development, and AI integration. Working on innovative projects with Python, Django, AWS, and machine learning technologies.",
      skills: ["Python", "Django", "FastAPI", "AI APIs", "Machine Learning", "AWS", "PostgreSQL"]
    }
  ];

  return (
    <section id="experience" className="section experience-section" role="main" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-header">
          <h2 id="experience-title" className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Building expertise through hands-on development</p>
        </header>
        
        <div className="experience-timeline" role="list" aria-label="Professional experience timeline">
          {experiences.map((exp, index) => (
            <article key={index} className="experience-item" role="listitem">
              <div className="timeline-dot" aria-hidden="true"></div>
              <time className="experience-date" dateTime={exp.period.split(' - ')[0]}>
                <span>{exp.period}</span>
              </time>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-skills" role="list" aria-label="Technologies used">
                  {exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag" role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <aside className="linkedin-cta">
          <div className="glass-card">
            <div className="glass-card-content">
              <h3>Want to see more details?</h3>
              <p>Check out my complete professional journey on LinkedIn</p>
              <a 
                href="https://linkedin.com/in/wmirshod" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                <i className="fab fa-linkedin"></i>
                Visit LinkedIn Profile
              </a>
            </div>
            <div className="glass-reflection"></div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
