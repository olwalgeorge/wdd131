const crops = [
    {
        name: "Wheat",
        classification: "Grains",
        plantingDate: "2023-10-15",
        yield: 3.5,
        imageUrl: "images/wheat.webp"
    },
    {
        name: "Tomato",
        classification: "Vegetables",
        plantingDate: "2024-03-01",
        yield: 25,
        imageUrl: "images/tomato.webp"
    },
    {
        name: "Apple",
        classification: "Fruits",
        plantingDate: "2020-04-10",
        yield: 40,
        imageUrl: "images/apple.webp"
    },
    {
        name: "Soybean",
        classification: "Legumes",
        plantingDate: "2024-05-20",
        yield: 2.8,
        imageUrl: "images/soybean.webp"
    },
    {
        name: "Oat",
        classification: "Grains",
        plantingDate: "2023-10-15",
        yield: 2.5,
        imageUrl: "images/oat.webp"
    },
    {
        name: "Potato",
        classification: "Vegetables",
        plantingDate: "2024-03-01",
        yield: 3.2,
        imageUrl: "images/potato.webp"
    },
    {
        name: "Orange",
        classification: "Fruits",
        plantingDate: "2020-04-10",
        yield: 30,
        imageUrl: "images/orange.webp"
    },
    {
        name: "Pea",
        classification: "Legumes",
        plantingDate: "2024-05-20",
        yield: 1.8,
        imageUrl: "images/pea.webp"
    },
    {
        name: "Rice",
        classification: "Grains",
        plantingDate: "2023-10-15",
        yield: 2.8,
        imageUrl: "images/rice.webp"
    },
    {
        name: "Carrot",
        classification: "Vegetables",
        plantingDate: "2024-03-01",
        yield: 4.5,
        imageUrl: "images/carrot.webp"
    },
    {
        name: "Banana",
        classification: "Fruits",
        plantingDate: "2020-04-10",
        yield: 50,
        imageUrl: "images/banana.webp"
    },
    {
        name: "Lentil",
        classification: "Legumes",
        plantingDate: "2024-05-20",
        yield: 1.2,
        imageUrl: "images/lentil.webp"
    },
    {
        name: "Barley",
        classification: "Grains",
        plantingDate: "2023-10-15",
        yield: 3.8,
        imageUrl: "images/barley.webp"
    },
];

const cropGrid = document.getElementById('cropGrid');
const navigation = document.querySelector('.navigation');

// Lazy load images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, { rootMargin: '100px' });

// Filter crops
function filterCrops(filterType) {
    cropGrid.innerHTML = '';
    let filteredCrops = crops;

    if (filterType !== 'all') {
        filteredCrops = crops.filter(crop => crop.classification.toLowerCase() === filterType);
    }

    filteredCrops.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        cropCard.innerHTML = `
            <img data-src="${crop.imageUrl}" alt="${crop.name}" loading="lazy">
            <div class="crop-info">
                <h3>${crop.name}</h3>
                <p>Classification: ${crop.classification}</p>
                <p>Planting Date: ${new Date(crop.plantingDate).toLocaleDateString()}</p>
                <p>Yield: ${crop.yield} tons/acre</p>
            </div>
        `;
        cropGrid.appendChild(cropCard);

        const img = cropCard.querySelector('img');
        imageObserver.observe(img);
    });
}

// Event listeners for navigation
navigation.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        filterCrops(e.target.id);
    }
});

// Set current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();

// Initial load
filterCrops('all');

