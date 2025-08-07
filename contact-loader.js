// Contact Content Loader - Displays contact.html content in index.html
(function() {
    'use strict';
    
    // Only run on index.html
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }
    
    // Configuration
    const config = {
        contactUrl: 'contact.html',
        targetContainer: '#contact-content-container',
        fallbackContent: `
            <div class="section-header">
                <h2 class="section-title">Get In Touch</h2>
                <p class="section-subtitle">
                    Ready to bring your ideas to life? Let's discuss your project!
                </p>
            </div>
            <div class="contact-content">
                <form class="contact-form">
                    <div class="form-group">
                        <input type="text" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        `
    };
    
    // Load contact content
    async function loadContactContent() {
        try {
            const response = await fetch(config.contactUrl);
            if (!response.ok) throw new Error('Failed to load contact content');
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract contact section content
            const contactSection = doc.querySelector('.contact-section');
            if (!contactSection) throw new Error('Contact section not found');
            
            // Clean up the content - remove navigation and footer
            const navbar = contactSection.querySelector('.navbar');
            const footer = contactSection.querySelector('.footer');
            if (navbar) navbar.remove();
            if (footer) footer.remove();
            
            // Insert content
            const container = document.querySelector(config.targetContainer);
            if (container) {
                container.innerHTML = contactSection.innerHTML;
                
                // Add reveal animation
                container.style.opacity = '0';
                container.style.transform = 'translateY(20px)';
                container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }, 100);
                
                // Re-initialize any forms
                initializeForms();
            }
        } catch (error) {
            console.error('Error loading contact content:', error);
            const container = document.querySelector(config.targetContainer);
            if (container) {
                container.innerHTML = config.fallbackContent;
                initializeForms();
            }
        }
    }
    
    // Initialize forms after content loads
    function initializeForms() {
        const forms = document.querySelectorAll('.contact-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nameInput = form.querySelector('input[type="text"]');
                const emailInput = form.querySelector('input[type="email"]');
                const messageInput = form.querySelector('textarea');
                
                const name = nameInput?.value?.trim();
                const email = emailInput?.value?.trim();
                const message = messageInput?.value?.trim();
                
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContactContent);
    } else {
        loadContactContent();
    }
})();
