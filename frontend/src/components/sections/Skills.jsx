import { useTranslation } from 'react-i18next';
import skillCategoriesData from '../../data/skills.json';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">{t("Skills & Expertise")}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          {skillCategoriesData.map((category, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="fas fa-code text-sm text-white/70"></i>
                </div>
                <h3 className="text-lg font-semibold text-white">{t(category.title)}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Array.isArray(category.skills) && category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs text-gray-300 bg-gray-900/50 px-3 py-1 rounded-md border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
                  >
                    {t(skill)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
