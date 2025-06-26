import { useTranslation } from 'react-i18next';

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
    <section id="experience" className="bg-bg-secondary/30 py-16" role="main" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 id="experience-title" className="text-3xl md:text-4xl font-bold text-primary mb-2">Professional Experience</h2>
          <p className="text-lg text-text-secondary">Building expertise through hands-on development</p>
        </header>
        <div className="flex flex-col gap-10 max-w-3xl mx-auto" role="list" aria-label="Professional experience timeline">
          {experiences.map((exp, index) => (
            <article key={index} className="relative flex flex-col md:flex-row bg-bg-tertiary/80 rounded-2xl p-8 border border-border-color shadow-neumorphism transition-all duration-300 hover:shadow-neumorphism-hover" role="listitem">
              <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-primary shadow-lg border-4 border-bg-secondary z-10" aria-hidden="true"></div>
              <div className="md:w-1/4 flex-shrink-0 flex flex-col items-start md:items-end mb-4 md:mb-0 pr-8">
                <time className="inline-block mb-2 font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg text-xs" dateTime={exp.period.split(' - ')[0]}>
                  {exp.period}
                </time>
              </div>
              <div className="md:w-3/4 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                <h4 className="text-base font-medium text-text-secondary mb-1">{exp.company}</h4>
                <p className="text-base text-text-secondary mb-2">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-16 flex justify-center">
          <a
            href="https://linkedin.com/in/wmirshod"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-lg shadow-neumorphism transition-all duration-200 hover:scale-105 hover:shadow-neumorphism-hover"
          >
            <i className="fab fa-linkedin text-2xl" />
            Visit LinkedIn Profile
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
