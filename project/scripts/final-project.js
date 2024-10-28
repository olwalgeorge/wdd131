document.addEventListener('DOMContentLoaded', function() {
    const elements = ['nitrogen', 'phosphorus', 'potassium', 'calcium', 'magnesium'];
    const weatherElements = ['temperature', 'description', 'humidity'];

    // Initialize values for chemical elements
    elements.forEach(element => {
        updateChemicalElement(element);
    });

    function updateChemicalElement(element) {
        const spanElement = document.querySelector(`#${element} span`);
        if (spanElement) {
            const value = Math.floor(Math.random() * (200 - 56 + 1)) + 56;
            spanElement.textContent = value;
        }
    }

    // Weather update function with fictitious data
    function updateWeather() {
        const weatherData = {
            temperature: (Math.random() * (30.0 - 20.0) + 20.0).toFixed(1),
            description: ['Clear', 'Partly Cloudy', 'Rain', 'Thunderstorm', 'Overcast'][Math.floor(Math.random() * 5)],
            humidity: Math.floor(Math.random() * (100 - 40 + 1)) + 40
        };

        document.querySelector('#temperature span').textContent = weatherData.temperature;
        document.querySelector('#description span').textContent = weatherData.description;
        document.querySelector('#humidity span').textContent = weatherData.humidity;
    }

    // Initial weather update
    updateWeather();

    // Periodic updates
    setInterval(() => {
        elements.forEach(updateChemicalElement);
        updateWeather();
    }, 60000); // Update every minute

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

    // Update lastModified
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