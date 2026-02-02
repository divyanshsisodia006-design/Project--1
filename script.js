// Toggle Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// existing code...

// Handle Form Submission
const form = document.getElementById('reservationForm');
const statusMsg = document.getElementById('formStatus');

if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page refresh
        
        statusMsg.style.color = 'black';
        statusMsg.innerText = 'Sending...';

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                statusMsg.style.color = 'green';
                statusMsg.innerText = 'Success! We will contact you shortly.';
                form.reset();
            } else {
                statusMsg.style.color = 'red';
                statusMsg.innerText = 'Something went wrong.';
            }

        } catch (error) {
            console.error('Error:', error);
            statusMsg.style.color = 'red';
            statusMsg.innerText = 'Server error. Please try again later.';
        }
    });
}