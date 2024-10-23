const products = [
    { id:"fc-1888", name:"flux capacitor", averagerating :4.5 },
    { id:"fc-2050", name:"power laces", averagerating :4.7 },
    { id:"fs-1987", name:"time circuits", averagerating :3.5 },
    { id:"ac-2000", name:"low voltage reactor", averagerating :3.9 },
    { id:"jj-1969", name:"warp equalizer", averagerating :5.0 }
];

window.onload = function() {
    const productSelect = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (Avg Rating: ${product.averagerating} ★)`;
        productSelect.appendChild(option);
    });
    
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        let isValid = true;

        const productName = document.getElementById('productName');
        const rating = document.querySelector('input[name="rating"]:checked');
        const installationDate = document.getElementById('installationDate');

        // Clear previous error messages
        clearErrorMessages();

        if (productName.value === "") {
            showError(productName, "Please select a product.");
            isValid = false;
            productName.focus();
        }
        
        if (!rating) {
            showError(document.querySelector('.rating'), "Please select a rating.");
            isValid = false;
        }
        
        if (installationDate.value === "") {
            showError(installationDate, "Please enter the installation date.");
            isValid = false;
            installationDate.focus();
        }

        if (!isValid) {
            event.preventDefault();
            setTimeout(() => {
                removeShakeEffect();
            }, 500);
        }
    });

    // Add input event listeners for real-time validation
    productSelect.addEventListener('change', function() {
        if (productSelect.value !== "") {
            clearError(productSelect);
        }
    });

    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (document.querySelector('input[name="rating"]:checked')) {
                clearError(document.querySelector('.rating'));
            }
        });
    });

    installationDate.addEventListener('input', function() {
        if (installationDate.value !== "") {
            clearError(installationDate);
        }
    });

    function showError(element, message) {
        element.classList.add('shake', 'error');

        // Create and insert the error message
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Insert the error message after the element
        element.parentNode.insertBefore(errorMessage, element.nextSibling);
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        document.querySelectorAll('.error').forEach(element => element.classList.remove('error'));
    }

    function clearError(element) {
        const errorMessage = element.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
            element.classList.remove('error');
        }
    }

    function removeShakeEffect() {
        document.querySelectorAll('.shake').forEach(element => element.classList.remove('shake'));
    }




    // Set max date
    const today = new Date();
    const installationDate = document.getElementById('installationDate');
    installationDate.max = today.toISOString().split('T')[0];


    // New function for mobile star rating
    function initMobileStarRating() {
        if (window.innerWidth <= 768) {
            const ratingInputs = document.querySelectorAll('.rating input[type="radio"]');
            const ratingLabels = document.querySelectorAll('.rating label');

            ratingInputs.forEach((input, index) => {
                input.value = 5 - index;
                input.id = `star${5 - index}`;
            });

            ratingLabels.forEach((label, index) => {
                label.setAttribute('for', `star${5 - index}`);
                label.textContent = '';
            });

            document.querySelector('.rating').addEventListener('change', function(e) {
                if (e.target.type === 'radio') {
                    console.log('Selected rating:', e.target.value);
                }
            });
        }
    }

    // Call the function on load and resize
    initMobileStarRating();
    window.addEventListener('resize', initMobileStarRating);
};
 // Update lastModified
 document.addEventListener('DOMContentLoaded', (event) => {
    const currentyear = document.querySelector("#currentyear");
    const lastModifiedElement = document.getElementById('lastModified');

    if (currentyear && lastModifiedElement) {
        currentyear.textContent = new Date().getFullYear();

        const date = new Date();
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
        lastModifiedElement.textContent = usDateFormat;
    }
});