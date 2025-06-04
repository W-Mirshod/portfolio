// Experience Section JavaScript
// Handles experience timeline animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Experience items intersection observer
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for experience items
                if (entry.target.classList.contains('experience-item')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    const delay = index * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe experience elements
    const experienceElements = document.querySelectorAll('.experience-item');
    experienceElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        experienceObserver.observe(el);
    });

    // Enhanced hover effects for experience items
    experienceElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
            item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            // Animate experience icon if exists
            const experienceIcon = item.querySelector('.experience-icon');
            if (experienceIcon) {
                experienceIcon.style.transform = 'scale(1.2) rotate(10deg)';
            }

            // Highlight timeline dot
            const timelineDot = item.querySelector('.timeline-dot');
            if (timelineDot) {
                timelineDot.style.transform = 'scale(1.3)';
                timelineDot.style.boxShadow = '0 0 20px rgba(63, 162, 246, 0.6)';
            }
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset experience icon
            const experienceIcon = item.querySelector('.experience-icon');
            if (experienceIcon) {
                experienceIcon.style.transform = 'scale(1) rotate(0deg)';
            }

            // Reset timeline dot
            const timelineDot = item.querySelector('.timeline-dot');
            if (timelineDot) {
                timelineDot.style.transform = 'scale(1)';
                timelineDot.style.boxShadow = '0 0 0 rgba(63, 162, 246, 0)';
            }
        });
    });

    // Timeline progress animation
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        const updateTimelineProgress = () => {
            const timelineRect = timelineLine.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            
            // Calculate progress based on scroll position
            const progress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / timelineHeight));
            
            // Update timeline progress indicator
            const progressIndicator = timelineLine.querySelector('.timeline-progress');
            if (progressIndicator) {
                progressIndicator.style.height = `${progress * 100}%`;
            }
        };

        // Update timeline progress on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateTimelineProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial update
        updateTimelineProgress();
    }

    // Experience detail expansion
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const expandBtn = item.querySelector('.expand-details');
        const details = item.querySelector('.experience-details');
        
        if (expandBtn && details) {
            expandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isExpanded = details.classList.contains('expanded');
                
                if (isExpanded) {
                    details.classList.remove('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More';
                    details.style.maxHeight = '0';
                } else {
                    details.classList.add('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
                    details.style.maxHeight = details.scrollHeight + 'px';
                }
            });
        }
    });

    // Experience filter by company/role type
    const experienceFilters = document.querySelectorAll('.experience-filter');
    experienceFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterType = filter.getAttribute('data-filter');
            
            // Update active filter
            experienceFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter experience items
            experienceElements.forEach(item => {
                const itemType = item.getAttribute('data-type');
                
                if (filterType === 'all' || itemType === filterType) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Achievement highlights animation
    const achievements = document.querySelectorAll('.experience-achievement');
    achievements.forEach((achievement, index) => {
        achievement.addEventListener('mouseenter', () => {
            achievement.style.transform = 'scale(1.05)';
            achievement.style.backgroundColor = 'rgba(63, 162, 246, 0.1)';
        });

        achievement.addEventListener('mouseleave', () => {
            achievement.style.transform = 'scale(1)';
            achievement.style.backgroundColor = 'transparent';
        });

        // Stagger animation on scroll
        const achievementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    achievementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        achievement.style.opacity = '0';
        achievement.style.transform = 'translateX(-20px)';
        achievement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        achievementObserver.observe(achievement);
    });

    // Skills tags within experience items
    const experienceSkills = document.querySelectorAll('.experience-skill');
    experienceSkills.forEach(skill => {
        skill.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            skill.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

});
