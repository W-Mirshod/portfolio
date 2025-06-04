// About Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Stats counter animation
    const statsItems = document.querySelectorAll('.stat-item h3');
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
        const duration = 1500;
        const increment = Math.max(1, Math.floor(target / (duration / 16)));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    // About section reveal animation
    const aboutContent = document.querySelector('.about-content');
    const statsGrid = document.querySelector('.stats-grid');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (aboutContent) {
        aboutObserver.observe(aboutContent);
    }
    
    if (statsGrid) {
        // Animate stats items with stagger effect
        const statItems = statsGrid.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });
    }

    // Add hover effects to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
            item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Progressive text reveal for about description
    const aboutText = document.querySelector('.about-text p');
    if (aboutText) {
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateY(20px)';
        textObserver.observe(aboutText);
    }

});
