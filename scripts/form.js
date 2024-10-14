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
        option.value = product.id; // Set the option value
        option.textContent = `${product.name} (Average Rating:${product.averagerating})`;
        productSelect.appendChild(option); // Add the option to the select element
    });
    
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        let isValid = true;
 
        const productName = document.getElementById('productName');
        const rating = document.querySelector('input[name="rating"]:checked');
        const installationDate = document.getElementById('installationDate');
        
        if (productName.value === "") {
            productName.classList.add('shake');
            isValid = false; // Mark as invalid
            productName.focus();
        }
        
        if (!rating) {
            const ratingDiv = document.querySelector('.rating');
            ratingDiv.classList.add('shake', 'error'); // Add error class
            isValid = false; // Mark as invalid
        }
        
        if (installationDate.value === "") {
            installationDate.classList.add('shake');
            isValid = false; // Mark as invalid
            installationDate.focus();
        }
 
        if (!isValid) {
            event.preventDefault(); // Prevent form submission
            setTimeout(() => { // Remove shake class after animation
                productName.classList.remove('shake');
                document.querySelector('.rating').classList.remove('shake', 'error'); // Remove error class
                installationDate.classList.remove('shake');
            },500);
        }
    });
 };

const currentyear = document.querySelector("#currentyear");
const lastModifiedElement = document.getElementById('lastModified');

currentyear.textContent = new Date().getFullYear();

const date = new Date();
const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
lastModifiedElement.textContent = usDateFormat;