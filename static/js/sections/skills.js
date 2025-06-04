// Skills Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Skills section animations
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger animation for skill categories
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 150;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                    
                    // Animate skill tags within the category
                    animateSkillTags(entry.target, index);
                }, delay);
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        skillsObserver.observe(category);
    });

    function animateSkillTags(category, categoryIndex) {
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, tagIndex) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8) translateY(10px)';
            tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1) translateY(0)';
            }, tagIndex * 50);
        });
    }

    // Enhanced hover effects for skill categories
    skillCategories.forEach(category => {
        const skillTags = category.querySelectorAll('.skill-tag');
        
        category.addEventListener('mouseenter', () => {
            // Highlight all tags in the category
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.boxShadow = '0 6px 20px rgba(63, 162, 246, 0.3)';
                }, index * 30);
            });
        });

        category.addEventListener('mouseleave', () => {
            // Reset all tags
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
        });
    });

    // Individual skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        // Add ripple effect on click
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position ripple at click point
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Enhanced hover effects
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.borderColor = 'var(--primary-light)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'rgba(63, 162, 246, 0.2)';
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .skill-tag {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Skills progress animation (if skill levels are implemented)
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.dataset.percentage || 0;
                    
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        progressBar.style.width = `${percentage}%`;
                    }, 100);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

});
