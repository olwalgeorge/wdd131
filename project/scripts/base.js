

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

 // Hamburger menu functionality
 const hamburger = document.querySelector('.hamburger-menu');
 const nav = document.querySelector('nav');

 function toggleMenu() {
     hamburger.classList.toggle('open');
     nav.classList.toggle('open');
     const isOpen = hamburger.classList.contains('open');
     hamburger.setAttribute('aria-expanded', isOpen);
 }

 hamburger.addEventListener('click', (event) => {
     event.stopPropagation();
     toggleMenu();
 });

 // Close menu when clicking outside
 document.addEventListener('click', (event) => {
     if (nav.classList.contains('open') && !nav.contains(event.target) && !hamburger.contains(event.target)) {
         toggleMenu();
     }
 });

 // Keyboard accessibility
 hamburger.addEventListener('keydown', (event) => {
     if (event.key === 'Enter' || event.key === ' ') {
         event.preventDefault();
         toggleMenu();
     }
 });

 // Close menu on Escape key press
 document.addEventListener('keydown', (event) => {
     if (event.key === 'Escape' && nav.classList.contains('open')) {
         toggleMenu();
     }
 });

});