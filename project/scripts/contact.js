document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('thankYouModal');
    const okButton = document.getElementById('okButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (form.checkValidity()) {
            // Here you would typically send the form data to a server
            console.log('Form submitted successfully');

            // Show the modal
            modal.style.display = 'block';
        } else {
            form.reportValidity();
        }
    });

    okButton.addEventListener('click', function() {
        // Hide the modal
        modal.style.display = 'none';

        // Redirect to the home page
        window.location.href = './index.html';
    });
});