// Experience Section JavaScript
// Handles experience timeline animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Enhanced experience items intersection observer
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 300;
                const isEven = index % 2 === 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) rotate(0deg)';
                    entry.target.classList.add(isEven ? 'animate-slide-right' : 'animate-slide-left');
                    
                    // Animate timeline dot with elastic effect
                    const timelineDot = entry.target.querySelector('.timeline-dot');
                    if (timelineDot) {
                        setTimeout(() => {
                            timelineDot.style.transform = 'translateX(-50%) scale(1)';
                            timelineDot.style.opacity = '1';
                            timelineDot.classList.add('animate-elastic');
                        }, 200);
                    }
                    
                    // Cascade animate experience skills
                    const skills = entry.target.querySelectorAll('.experience-skill');
                    skills.forEach((skill, skillIndex) => {
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateX(0) scale(1)';
                            skill.classList.add('animate-cascade');
                        }, 400 + skillIndex * 80);
                    });
                    
                }, delay);
                
                experienceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -120px 0px'
    });

    // Enhanced initial styling for experience elements
    const experienceElements = document.querySelectorAll('.experience-item');
    experienceElements.forEach((el, index) => {
        const isEven = index % 2 === 0;
        el.style.opacity = '0';
        el.style.transform = `translateY(60px) translateX(${isEven ? '-40px' : '40px'}) rotate(${isEven ? '-2deg' : '2deg'})`;
        el.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
        
        // Hide timeline dots initially
        const timelineDot = el.querySelector('.timeline-dot');
        if (timelineDot) {
            timelineDot.style.opacity = '0';
            timelineDot.style.transform = 'translateX(-50%) scale(0.3)';
            timelineDot.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
        
        // Hide skills initially
        const skills = el.querySelectorAll('.experience-skill');
        skills.forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateX(-20px) scale(0.8)';
            skill.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        experienceObserver.observe(el);
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

    // Mobile-friendly skills interaction
    const experienceSkills = document.querySelectorAll('.experience-skill');
    experienceSkills.forEach(skill => {
        // Enhanced mobile tap feedback
        skill.addEventListener('touchstart', (e) => {
            e.preventDefault();
            skill.style.transform = 'scale(0.95)';
            skill.style.backgroundColor = 'rgba(63, 162, 246, 0.15)';
        }, { passive: false });
        
        skill.addEventListener('touchend', () => {
            setTimeout(() => {
                skill.style.transform = 'scale(1)';
                skill.style.backgroundColor = 'rgba(63, 162, 246, 0.08)';
            }, 100);
        });
        
        // Desktop click for ripple effect
        skill.addEventListener('click', () => {
            if (!isMobile) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                skill.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // Mobile scroll optimization
    let scrollTimeout;
    const handleMobileScroll = () => {
        if (isMobile) {
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
        }
    };

    if (isMobile) {
        window.addEventListener('scroll', handleMobileScroll, { passive: true });
    }

    // Glass card animation
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        const glassObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('animate-elastic');
                        
                        // Animate connection stats
                        const connectionCount = entry.target.querySelector('.connection-count');
                        if
