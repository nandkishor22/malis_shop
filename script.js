// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        document.body.classList.toggle('nav-open');
        navLinks.style.right = isExpanded ? '-100%' : '0';
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767 && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle') &&
            document.body.classList.contains('nav-open')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            navLinks.style.right = '-100%';
        }
    });

    // Smooth scroll and menu close for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 767) {
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
                navLinks.style.right = '-100%';
            }
        });
    });
});
