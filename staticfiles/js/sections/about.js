// About Section JavaScript - Professional & Modern

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced stats counter animation with modern easing
    const statsItems = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValueText = target.textContent.replace(/[+%]/g, '').trim();
                const hasPercent = target.textContent.includes('%');
                const hasPlus = target.textContent.includes('+');
                const finalValue = parseInt(finalValueText);
                
                if (!isNaN(finalValue)) {
                    animateCounter(target, finalValue, hasPercent, hasPlus);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.3 });

    statsItems.forEach(item => {
        statsObserver.observe(item);
    });

    function animateCounter(element, target, hasPercent = false, hasPlus = false) {
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            current = Math.floor(easedProgress * target);
            let displayValue = current;
            if (hasPercent) displayValue += '%';
            if (hasPlus) displayValue += '+';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        element.textContent = '0';
        requestAnimationFrame(animate);
    }

    // Professional section reveal with stagger
    const aboutElements = document.querySelectorAll('.about-text p, .stats-grid .stat-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    aboutElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(element);
    });

    // Premium hover effects for stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-12px) scale(1.05)';
            item.querySelector('h3').style.textShadow = '0 0 20px var(--primary-color)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.querySelector('h3').style.textShadow = 'none';
        });
    });

    // Typing effect for main headline
    const mainText = document.querySelector('.about-text p:first-child');
    if (mainText) {
        const originalText = mainText.textContent;
        mainText.textContent = '';
        mainText.style.opacity = '1';
        
        setTimeout(() => {
            typeWriter(mainText, originalText, 30);
        }, 500);
    }

    function typeWriter(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const rate = scrolled * -0.5;
            aboutSection.style.transform = `translateY(${rate}px)`;
        }
    });

});
