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
    <section id="skills" className="liquid-section py-20 px-4 bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">{t("skills.title")}</h2>
          <div className="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-200">
          {orderedCategories.map((category, index) => (
            <div key={category.id} className="group liquid-panel liquid-panel-interactive rounded-xl p-6 border border-white/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">
                  <i className="fas fa-code text-sm text-white/90"></i>
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
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs text-blue-100/90 bg-white/10 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md border border-white/20 hover:bg-white/20 hover:border-white/35 hover:text-white transition-all duration-300"
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
                        <i className="fas fa-code text-[10px] text-white/70 flex-shrink-0"></i>
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
