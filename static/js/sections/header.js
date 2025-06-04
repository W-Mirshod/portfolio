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

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');

    window.addEventListener('scroll', () => {
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
    });

    // Header background blur effect on scroll
    let lastScrollY = 0;
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
        
        lastScrollY = currentScrollY;
    });

});
