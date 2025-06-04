// Header Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    const body = document.body;

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking nav items
        const mobileNavItems = document.querySelectorAll('.nav-mobile .nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links with gentle push effect
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Gentle scroll with easing
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(800, Math.abs(distance) * 0.5); // Shorter duration
                let startTime = null;

                function scrollAnimation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Ease-out function for smoother deceleration
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    window.scrollTo(0, startPosition + (distance * easeOut));
                    
                    if (progress < 1) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }
                
                requestAnimationFrame(scrollAnimation);
            }
        });
    });

    // Active navigation highlighting with gentle section assistance
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    let isScrolling = false;
    let scrollTimeout;
    
    // Section boundary assistance
    let scrollDirection = 0;
    let scrollVelocity = 0;
    let previousScrollY = 0;
    let previousScrollTime = Date.now();
    
    function handleSectionAssistance() {
        const currentTime = Date.now();
        const currentScrollY = window.scrollY;
        const timeDelta = currentTime - previousScrollTime;
        
        if (timeDelta > 0) {
            scrollVelocity = (currentScrollY - previousScrollY) / timeDelta;
            previousScrollY = currentScrollY;
            previousScrollTime = currentTime;
        }
        
        // Only assist if scroll velocity is very low (user is naturally stopping)
        if (Math.abs(scrollVelocity) < 0.3 && Math.abs(scrollVelocity) > 0.05) {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const headerHeight = header.offsetHeight;
                const sectionTop = rect.top + window.scrollY - headerHeight;
                const currentPos = window.scrollY;
                
                // Check if we're near a section start (within 30px)
                const distanceToTop = Math.abs(currentPos - sectionTop);
                
                if (distanceToTop < 30 && distanceToTop > 5) {
                    // Very gentle nudge to section start
                    const startPosition = window.pageYOffset;
                    const distance = sectionTop - startPosition;
                    const duration = 300; // Short, gentle animation
                    let startTime = null;

                    function nudgeAnimation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Very gentle easing
                        const easeOut = 1 - Math.pow(1 - progress, 2);
                        
                        window.scrollTo(0, startPosition + (distance * easeOut));
                        
                        if (progress < 1) {
                            requestAnimationFrame(nudgeAnimation);
                        }
                    }
                    
                    requestAnimationFrame(nudgeAnimation);
                }
            });
        }
    }

    window.addEventListener('scroll', () => {
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        isScrolling = true;
        
        // Update active nav items
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // Set timeout to detect when scrolling has stopped
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            handleSectionAssistance();
        }, 150); // Wait 150ms after scrolling stops
    });

    // Header background blur effect on scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add more blur as user scrolls down
        if (currentScrollY > 100) {
            header.style.backdropFilter = 'blur(25px)';
            header.style.background = 'rgba(10, 11, 15, 0.95)';
        } else {
            header.style.backdropFilter = 'blur(20px)';
            header.style.background = 'rgba(10, 11, 15, 0.9)';
        }
    });

});
