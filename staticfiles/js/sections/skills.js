// Skills Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Skills section animations with enhanced easing
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add professional stagger animation for skill categories
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 200;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-morph');
                    
                    // Animate skill tags within the category with cascade effect
                    animateSkillTags(entry.target, index);
                }, delay);
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Enhanced skill tag animation function
    function animateSkillTags(category, categoryIndex) {
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, tagIndex) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px) scale(0.8)';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                tag.classList.add('animate-cascade');
            }, tagIndex * 100 + categoryIndex * 50);
        });
    }

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(40px) scale(0.9)';
        category.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        skillsObserver.observe(category);
    });

});
