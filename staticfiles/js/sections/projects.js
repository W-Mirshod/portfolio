// Projects Section JavaScript
// Handles project cards animations, filtering, and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Project cards intersection observer
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for project cards
                if (entry.target.classList.contains('project-card')) {
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

    // Observe project elements
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectObserver.observe(el);
    });

    // Enhanced hover effects for project cards
    projectElements.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // Animate project image if exists
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            // Reset project image
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const projectTags = card.getAttribute('data-tags');
                
                if (filter === 'all' || (projectTags && projectTags.includes(filter))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project tags hover effects
    const projectTags = document.querySelectorAll('.project-tag');
    projectTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.boxShadow = 'none';
        });
    });

    // Project links handling
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Project modal functionality (if modals exist)
    const projectModals = document.querySelectorAll('.project-modal');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalClosers = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        });
    });

    modalClosers.forEach(closer => {
        closer.addEventListener('click', () => {
            const modal = closer.closest('.project-modal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });

    // Close modal on outside click
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });

    // Project search functionality
    const projectSearch = document.getElementById('project-search');
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const projectTitle = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                const projectDescription = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                const projectTags = card.getAttribute('data-tags')?.toLowerCase() || '';
                
                const matches = projectTitle.includes(searchTerm) || 
                               projectDescription.includes(searchTerm) || 
                               projectTags.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Load more projects functionality
    const loadMoreBtn = document.querySelector('.load-more-projects');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
                loadMoreBtn.disabled = false;
                
                // Here you would typically load more projects via AJAX
                console.log('Loading more projects...');
            }, 1500);
        });
    }

});
