import { useTranslation } from 'react-i18next';
import skillCategoriesData from '../../data/skills.json';
import { getSkillIcon } from '../../utils/skillIconMapper';
import LazyImage from '../ui/LazyImage';

const Skills = () => {
  const { t } = useTranslation();

  const categoryOrder = [1, 4, 6, 5];

  const orderedCategories = categoryOrder.map(id => 
    skillCategoriesData.find(cat => cat.id === id)
  ).filter(Boolean);

  return (
    <section id="skills" className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">{t("skills.title")}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          {orderedCategories.map((category, index) => (
            <div key={category.id} className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="fas fa-code text-sm text-white/70"></i>
                </div>
                <h3 className="text-lg font-semibold text-white">{t(`skills.categories.${category.id}.title`, { defaultValue: category.title })}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Array.isArray(category.skills) && category.skills.map((skill, skillIndex) => {
                  const iconUrl = getSkillIcon(skill);
                  const skillKey = `skills.categories.${category.id}.skills.${skillIndex}`;
                  const translatedSkill = t(skillKey, { defaultValue: skill });
                  return (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs text-gray-300 bg-gray-900/50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 hover:text-white transition-all duration-300"
                    >
                      {iconUrl ? (
                        <LazyImage
                          src={iconUrl}
                          alt={skill}
                          width="16"
                          height="16"
                          className="w-4 h-4 object-contain flex-shrink-0"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZjNmNGY2IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+Cg=="
                        />
                      ) : (
                        <i className="fas fa-code text-[10px] text-gray-400 flex-shrink-0"></i>
                      )}
                      <span className="whitespace-nowrap">{translatedSkill}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
