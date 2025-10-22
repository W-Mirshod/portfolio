import { useTranslation } from 'react-i18next';
import experienceData from '../../data/experience.json';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="bg-bg-secondary/30 py-14 px-2 sm:px-4" role="main" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 id="experience-title" className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">{t('experience.title')}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-fadeInUp delay-200" role="list" aria-label="Professional experience timeline">
          {experienceData.map((exp, index) => (
            <article key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5" role="listitem">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-xl font-semibold text-white tracking-tight">{exp.title}</h3>
                    <h4 className="text-sm font-medium text-gray-400">{exp.company}</h4>
                  </div>
                  <time className="text-xs font-mono text-gray-500 bg-gray-900/50 px-3 py-1 rounded-md border border-gray-800 self-start sm:self-center" dateTime={exp.period.split(' - ')[0]}>
                    {exp.period}
                  </time>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-20 flex flex-col items-center justify-center animate-fadeInUp delay-300">
          <a
            href="https://linkedin.com/in/wmirshod"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-semibold text-base shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-blue-500/25 hover:shadow-2xl border border-blue-400/30 animate-pulse-slow overflow-hidden"
            style={{ 
              boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.3), 0 4px 20px 0 rgba(0, 0, 0, 0.4)',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="flex items-center gap-3 relative z-10">
              <i className="fab fa-linkedin text-2xl group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold">LinkedIn Profile</span>
              <div className="flex items-center gap-2 bg-white/20 text-blue-100 font-bold text-sm px-4 py-2 rounded-full border border-blue-300/50 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 0A4 4 0 0012 4a4 4 0 00-1 7.87" /></svg>
                1,000+
                <span className="text-xs font-medium">Connections</span>
              </div>
            </span>
            <span className="text-blue-200 font-medium text-sm relative z-10 group-hover:text-white transition-colors duration-300">Visit LinkedIn profile</span>
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
