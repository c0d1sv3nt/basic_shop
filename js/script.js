document.addEventListener('DOMContentLoaded', function() {
    // Responsive Navbar
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Close navbar when a link is clicked (optional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // "Buy Now" button functionality to navigate to payment page
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.itemName;
            const itemPrice = this.dataset.itemPrice;
            // You might want to store this information in local storage or pass it via URL parameters
            // For simplicity, we'll just navigate to the payment page.
            window.location.href = 'payment.html';
        });
    });

    // Payment Form Validation
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const cardNumberInput = document.getElementById('cardNumber');
            const expiryDateInput = document.getElementById('expiryDate');
            const cvvInput = document.getElementById('cvv');
            const cardholderNameInput = document.getElementById('cardholderName');
            const billingAddressInput = document.getElementById('billingAddress');

            const cardNumberError = document.getElementById('cardNumberError');
            const expiryDateError = document.getElementById('expiryDateError');
            const cvvError = document.getElementById('cvvError');
            const cardholderNameError = document.getElementById('cardholderNameError');
            const billingAddressError = document.getElementById('billingAddressError');

            let isValid = true;

            // Basic Card Number Validation (only checks if not empty)
            if (cardNumberInput.value.trim() === '') {
                cardNumberError.textContent = 'Please enter your card number.';
                isValid = false;
            } else {
                cardNumberError.textContent = '';
            }

            // Basic Expiry Date Validation (MM/YY format)
            if (!/^\d{2}\/\d{2}$/.test(expiryDateInput.value.trim())) {
                expiryDateError.textContent = 'Please enter a valid expiry date (MM/YY).';
                isValid = false;
            } else {
                expiryDateError.textContent = '';
            }

            // Basic CVV Validation (only checks if not empty and is a number)
            if (cvvInput.value.trim() === '' || !/^\d+$/.test(cvvInput.value.trim())) {
                cvvError.textContent = 'Please enter a valid CVV.';
                isValid = false;
            } else {
                cvvError.textContent = '';
            }

            // Basic Cardholder Name Validation (only checks if not empty)
            if (cardholderNameInput.value.trim() === '') {
                cardholderNameError.textContent = 'Please enter the cardholder name.';
                isValid = false;
            } else {
                cardholderNameError.textContent = '';
            }

            // Basic Billing Address Validation (only checks if not empty)
            if (billingAddressInput.value.trim() === '') {
                billingAddressError.textContent = 'Please enter your billing address.';
                isValid = false;
            } else {
                billingAddressError.textContent = '';
            }

            if (isValid) {
                // Simulate a POST request
                const formData = new FormData(paymentForm);
                const data = {};
                formData.forEach((value, key) => (data[key] = value));

                fetch('YOUR_POST_URL_HERE', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = 'success.html';
                    } else {
                        // Handle error response (e.g., display an error message)
                        alert('Payment failed. Please try again.');
                        console.error('Payment failed:', response);
                    }
                })
                .catch(error => {
                    // Handle network errors
                    alert('Network error. Please try again later.');
                    console.error('Network error:', error);
                });
            }
        });
    }
});