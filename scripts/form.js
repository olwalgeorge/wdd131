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
        option.textContent = `${product.name} (Average Rating:${product.averagerating})`;
        productSelect.appendChild(option);
    });
    
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        let isValid = true;

        const productName = document.getElementById('productName');
        const rating = document.querySelector('input[name="rating"]:checked');
        const installationDate = document.getElementById('installationDate');
        
        if (productName.value === "") {
            productName.classList.add('shake');
            isValid = false;
            productName.focus();
        }
        
        if (!rating) {
            document.querySelector('.rating').classList.add('shake', 'error');
            isValid = false;
        }
        
        if (installationDate.value === "") {
            installationDate.classList.add('shake');
            isValid = false;
            installationDate.focus();
        }

        if (!isValid) {
            event.preventDefault();
            setTimeout(() => {
                productName.classList.remove('shake');
                document.querySelector('.rating').classList.remove('shake', 'error');
                installationDate.classList.remove('shake');
            }, 500);
        }
    });

    // Set max date
    const today = new Date();
    const installationDate = document.getElementById('installationDate');
    installationDate.max = today.toISOString().split('T')[0];

    // Update lastModified
    const currentyear = document.querySelector("#currentyear");
    const lastModifiedElement = document.getElementById('lastModified');

    currentyear.textContent = new Date().getFullYear();

    const date = new Date();
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    lastModifiedElement.textContent = usDateFormat;

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