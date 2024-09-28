const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');
const h1 = document.querySelector('h1');


// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
    h1.classList.toggle('hide');

});

const currentyear = document.querySelector("#currentyear");
const lastModifiedElement = document.getElementById('lastModified');

currentyear.textContent = new Date().getFullYear();

const date = new Date();
const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
lastModifiedElement.textContent = usDateFormat;

// Get the image element
const images = document.querySelectorAll('img');
const figcaptions = document.querySelectorAll('figcaption');

// For every image, caption is image file name with hyphens replaced with spaces 
images.forEach((img, index) => {
    const fileName = img.src.split('/').pop().split('.')[0].replace(/-/g, ' ');
    const titleCaseCaption = fileName.replace(/\b\w/g, l => l.toUpperCase());
    figcaptions[index].textContent = titleCaseCaption;
});




