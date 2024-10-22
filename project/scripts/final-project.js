document.addEventListener('DOMContentLoaded', function() {
    const elements = ['nitrogen', 'phosphorus', 'potassium', 'calcium', 'magnesium'];
    const weatherElements = ['temperature', 'description', 'humidity'];
    const updateIntervals = {};
    const currentValues = {};

    // Initialize values and intervals for chemical elements
    elements.forEach(element => {
        currentValues[element] = Math.floor(Math.random() * (200 - 56 + 1)) + 56;
        updateIntervals[element] = Math.random() * 5000 + 2000;
    });

    function updateChemicalElement(element) {
        const spanElement = document.querySelector(`#${element} span`);
        if (spanElement) {
            const targetValue = Math.floor(Math.random() * (200 - 56 + 1)) + 56;
            const steps = 20;
            const stepSize = (targetValue - currentValues[element]) / steps;
            let step = 0;

            const smoothUpdate = setInterval(() => {
                currentValues[element] += stepSize;
                spanElement.textContent = Math.round(currentValues[element]);
                step++;
                if (step >= steps) {
                    clearInterval(smoothUpdate);
                    currentValues[element] = targetValue;
                    spanElement.textContent = targetValue;
                }
            }, 50);
        }
    }

    function scheduleNextUpdate(element) {
        updateIntervals[element] = Math.random() * 5000 + 2000;
        setTimeout(() => {
            updateChemicalElement(element);
            scheduleNextUpdate(element);
        }, updateIntervals[element]);
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

    // Initial update and schedule for each chemical element
    elements.forEach(element => {
        updateChemicalElement(element);
        scheduleNextUpdate(element);
    });

    // Initial weather update and schedule periodic updates
    updateWeather();
    setInterval(updateWeather, 600000);  // Update weather every 10 minutes
});

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    console.log('Hamburger element:', hamburger);
    console.log('Nav element:', nav);

    if (!hamburger || !nav) {
        console.error('Hamburger menu or navigation not found');
        return;
    }

    function toggleMenu() {
        console.log('Toggling menu');
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');

        // Update aria-expanded
        const isOpen = hamburger.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);

        console.log('After toggle - Hamburger classes:', hamburger.classList);
        console.log('After toggle - Nav classes:', nav.classList);
    }

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (nav.classList.contains('open') && !nav.contains(event.target) && !hamburger.contains(event.target)) {
            console.log('Clicking outside, closing menu');
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
            console.log('Escape key pressed, closing menu');
            toggleMenu();
        }
    });

    // Optional: Focus trapping within the menu when open
    nav.addEventListener('keydown', (event) => {
        if (!nav.classList.contains('open')) return;

        const focusableElements = nav.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    console.log('Event listeners set up successfully');
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.animate-item');
    const featureList = document.querySelector('.tick-list');
    let currentIndex = 0;
    let animationPaused = false;
  
    function animateItems() {
      if (!animationPaused) {
        items.forEach(item => {
          item.classList.remove('active');
          const tick = item.querySelector('.tick');
          tick.style.animation = 'none'; // Reset animation
        });
        items[currentIndex].classList.add('active');
        const activeTick = items[currentIndex].querySelector('.tick');
        activeTick.style.animation = 'hueChange 2s infinite'; // Set hue animation
        currentIndex = (currentIndex + 1) % items.length;
      }
      setTimeout(animateItems, 2000);
    }
  
    featureList.addEventListener('mouseenter', () => {
      animationPaused = true;
    });
  
    featureList.addEventListener('mouseleave', () => {
      animationPaused = false;
    });
  
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('active');
        const tick = item.querySelector('.tick');
        tick.style.animation = 'hueChange 2s infinite'; // Activate hue animation on hover
      });
      item.addEventListener('mouseleave', () => {
        if (!animationPaused) {
          item.classList.remove('active');
          const tick = item.querySelector('.tick');
          tick.style.animation = 'none'; // Stop hue animation on hover out
        }
      });
    });
  
    setTimeout(animateItems, 2000);
  });

  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    
    const size = Math.random() * 5 + 2; // Random size between 2-7px
    const startPositionX = Math.random() * 100; // Random start position
    const duration = Math.random() * 1 + 0.5; // Random duration between 0.5-1.5s
    
    raindrop.style.width = `${size}px`;
    raindrop.style.height = `${size * 5}px`; // Make droplets elongated
    raindrop.style.left = `${startPositionX}%`;
    raindrop.style.animationDuration = `${duration}s`;
    
    document.querySelector('.raindrops').appendChild(raindrop);
    
    // Remove the raindrop after it falls
    setTimeout(() => {
        raindrop.remove();
    }, duration * 1000);
}

// Create raindrops at regular intervals
setInterval(createRaindrop, 50);