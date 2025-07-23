document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded',
                menuToggle.classList.contains('active') ? 'true' : 'false');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Smooth scroll for nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
    if (document.querySelector(".contact-form")) {
        document
            .querySelector(".contact-form")
            .addEventListener("submit", async function (e) { // <-- add async here
                e.preventDefault();
                const name = this.name.value.trim();
                const email = this.email.value.trim();
                const message = this.message.value.trim();
                const whatsappNumber = "918421572075";
                const text = `Name:- ${name}\nEmail:- ${email}\nMessage:- ${message}`;
                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
                window.open(url, "_blank", "noopener");

                // Immediately open WhatsApp after form submission
                window.open(url, "_blank", "noopener");
            });
    }

    if (document.querySelectorAll(".buy-now-btn").length) {
        document.querySelectorAll(".buy-now-btn").forEach(function (btn) {
            btn.addEventListener("click", async function () {
                const card = btn.closest(".product-card");
                const name = card.querySelector(".product-title").textContent.trim();
                const priceText = card.querySelector(".product-price").textContent;
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                const product_number = card.querySelector(".product-img").src
                    .split('/').pop() // Get filename from URL
                    .split('.')[0]    // Remove extension
                    .replace(/\D/g, ''); // Extract numbers only

                const whatsappNumber = "918421572075";
                const text = `NEW ORDER\nProduct:- ${name}\nPrice:- ₹${price}`;
                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
                window.open(url, "_blank", "noopener");
            });
        });
    }
});
