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

    // Enhanced professional section reveal with advanced stagger
    const aboutElements = document.querySelectorAll('.about-text p, .stats-grid .stat-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const elementIndex = Array.from(aboutElements).indexOf(entry.target);
                const delay = elementIndex * 200;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Apply different animation classes based on element type
                    if (entry.target.classList.contains('stat-item')) {
                        entry.target.classList.add('animate-elastic');
                    } else {
                        entry.target.classList.add('animate-morph');
                    }
                }, delay);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px'
    });

    aboutElements.forEach((element, index) => {
        element.style.opacity = '0';
        if (element.classList.contains('stat-item')) {
            element.style.transform = 'translateY(40px) scale(0.8)';
        } else {
            element.style.transform = 'translateY(50px) scaleY(0.7)';
        }
        element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        revealObserver.observe(element);
    });

    // Enhanced premium hover effects for stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-18px) scale(1.08) rotateY(5deg)';
            item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.querySelector('h3').style.textShadow = '0 0 30px var(--primary-color)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            item.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
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
