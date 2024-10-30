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

});

const images = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));