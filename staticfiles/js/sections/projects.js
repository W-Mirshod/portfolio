// Projects Section JavaScript
// Handles project cards animations, filtering, and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced project cards intersection observer
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Professional morphing animation for project cards
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 180;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animate-elastic');
                }, delay);
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe project elements with enhanced initial state
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        projectObserver.observe(el);
    });

    // Enhanced hover effects for project cards
    projectElements.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.05) rotateY(2deg)';
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25), 0 0 40px rgba(63, 162, 246, 0.1)';
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Animate project image if exists
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1.15) rotate(5deg)';
                projectImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            
            // Reset project image
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1) rotate(0deg)';
                projectImage.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
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

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.project-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                setTimeout(() => {
                    activeModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        }
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
