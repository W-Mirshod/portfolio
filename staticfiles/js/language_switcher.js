document.addEventListener('DOMContentLoaded', function() {
    const languageForms = document.querySelectorAll('.language-form');
    
    languageForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const language = formData.get('language');
            const csrfToken = formData.get('csrfmiddlewaretoken');
            
            // Create an AJAX request to switch the language
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData,
                credentials: 'same-origin'
            })
            .then(response => {
                if (response.ok) {
                    // Get the current path and handle language prefix correctly
                    let path = window.location.pathname;
                    const availableLanguages = ['en', 'ru', 'uz']; // Add all your supported languages here
                    
                    // Check if the current path starts with a language code
                    let hasLangPrefix = false;
                    for (const lang of availableLanguages) {
                        const prefix = '/' + lang + '/';
                        if (path.startsWith(prefix)) {
                            // Replace the current language prefix with the new one
                            path = '/' + language + path.substring(prefix.length - 1);
                            hasLangPrefix = true;
                            break;
                        }
                    }
                    
                    // If there's no language prefix, add one
                    if (!hasLangPrefix) {
                        // If we're at the root path
                        if (path === '/') {
                            path = '/' + language + '/';
                        } else {
                            path = '/' + language + path;
                        }
                    }
                    
                    // Redirect to the new URL
                    window.location.href = path;
                } else {
                    console.error('Language switch failed');
                    // Fallback: Submit the form normally
                    form.removeEventListener('submit', arguments.callee);
                    form.submit();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback: Submit the form normally
                form.removeEventListener('submit', arguments.callee);
                form.submit();
            });
        });
    });
});
