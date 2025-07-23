document.addEventListener("DOMContentLoaded", function () {
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

                try {
                    const response = await fetch('./api/save_info.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            costumer_name: name,
                            costumer_email: email,
                            costumer_message: message
                        })
                    });

                    const result = await response.json();
                    if (!response.ok || !result.success) throw new Error(result.error || 'Database save failed');
                    
                } catch (error) {
                    console.error('Error:', error);
                    alert('Order processing failed. Please try again.');
                }
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

                try {
                    const response = await fetch('./api/save_order.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            product_number: product_number,
                            product_name: name,
                            price: price
                        })
                    });

                    const result = await response.json();
                    if (!response.ok || !result.success) throw new Error(result.error || 'Database save failed');
                    
                    const whatsappNumber = "918421572075";
                    const text = `NEW ORDER\nProduct:- ${name}\nPrice:- ₹${price}`;
                    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
                    window.open(url, "_blank", "noopener");
                } catch (error) {
                    console.error('Error:', error);
                    alert('Order processing failed. Please try again.');
                }
            });
        });
    }
});
