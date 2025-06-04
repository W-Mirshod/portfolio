// Achievements Section JavaScript
// Handles GitHub stats, organization cards, and achievement badges

document.addEventListener('DOMContentLoaded', function() {
    
    // Stats counter animation
    const statsItems = document.querySelectorAll('.stat-item h3, .stat-card .stat-info h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValueText = target.textContent.replace('+', '').trim();
                const finalValue = parseInt(finalValueText);
                if (!isNaN(finalValue)) {
                    animateCounter(target, finalValue);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });

    statsItems.forEach(item => {
        statsObserver.observe(item);
    });

    function animateCounter(element, target) {
        let current = 0;
        const duration = 1500; // Animation duration in ms
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = Math.max(1, Math.floor(target / (duration / 16))); // Adjust increment for smoother animation

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16); // Roughly 60 FPS
    }

    // Achievement cards intersection observer
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for cards
                if (entry.target.classList.contains('stat-card') || 
                    entry.target.classList.contains('org-card') ||
                    entry.target.classList.contains('badge')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    const delay = index * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe achievement elements
    const achievementElements = document.querySelectorAll('.stat-item, .stat-card, .org-card, .badge');
    achievementElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        achievementObserver.observe(el);
    });

    // Enhanced hover effects for organization cards
    const orgCards = document.querySelectorAll('.org-card');
    orgCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Achievement badge pulse effect
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        // Add random pulse animation delay
        badge.style.animationDelay = `${index * 0.2}s`;
        
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1) rotate(5deg)';
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // GitHub stats refresh functionality (if needed)
    const refreshButton = document.querySelector('.stats-refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            // Add loading state
            refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshButton.disabled = true;
            
            // Simulate refresh delay
            setTimeout(() => {
                refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
                refreshButton.disabled = false;
                
                // Re-trigger counter animations
                statsItems.forEach(item => {
                    const finalValueText = item.textContent.replace('+', '').trim();
                    const finalValue = parseInt(finalValueText);
                    if (!isNaN(finalValue)) {
                        animateCounter(item, finalValue);
                    }
                });
            }, 1500);
        });
    }

});
