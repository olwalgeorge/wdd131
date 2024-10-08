

const temples = [
	{
	  templeName: "Aba Nigeria",
	  location: "Aba, Nigeria",
	  dedicated: "2005, August, 7",
	  area: 11500,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
	},
	{
	  templeName: "Manti Utah",
	  location: "Manti, Utah, United States",
	  dedicated: "1888, May, 21",
	  area: 74792,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
	},
	{
	  templeName: "Payson Utah",
	  location: "Payson, Utah, United States",
	  dedicated: "2015, June, 7",
	  area: 96630,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
	},
	{
	  templeName: "Yigo Guam",
	  location: "Yigo, Guam",
	  dedicated: "2020, May, 2",
	  area: 6861,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
	},
	{
	  templeName: "Washington D.C.",
	  location: "Kensington, Maryland, United States",
	  dedicated: "1974, November, 19",
	  area: 156558,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
	},
	{
	  templeName: "Lima Perú",
	  location: "Lima, Perú",
	  dedicated: "1986, January, 10",
	  area: 9600,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
	},
	{
	  templeName: "Mexico City Mexico",
	  location: "Mexico City, Mexico",
	  dedicated: "1983, December, 2",
	  area: 116642,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
	},
	// Add more temple objects here...
	{
	  templeName: "Cordoba Argentina",
	  location: "Cordoba, Argentina",
	  dedicated: "2015, May, 17",
	  area: 30000,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cordoba-argentina/2018/400x250/Cordoba-Argentina-Temple01.jpg"
	},
	{
	  templeName: "Brisbane Australia",
	  location: "Brisbane, Australia",
	  dedicated: "2003, June, 15",
	  area: 9900,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/brisbane-australia/1280x800/brisbane-australia-temple-lds-745088-wallpaper.jpg"
	},
	{
	  templeName: "Copenhagen Denmark",
	  location: "Copenhagen, Denmark",
	  dedicated: "2004, May, 23",
	  area: 15800,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/copenhagen-denmark/400x250/copenhagen-denmark-temple-lds-278232-wallpaper.jpg"
	},

  ]; 
 
  const templeGrid = document.querySelector('.container');
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');
  const currentYearSpan = document.getElementById('currentyear');
  const lastModifiedSpan = document.getElementById('lastModified');
  
  // Toggle menu
  menuButton.addEventListener('click', () => {
	  navigation.classList.toggle('show');
	  menuButton.setAttribute('aria-expanded', navigation.classList.contains('show'));
  });
  
  // Set current year and last modified date
  currentYearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();
  
  // Lazy load images
  function lazyLoadImage(entry) {
	  const img = entry.target;
	  img.src = img.dataset.src;
	  img.removeAttribute('data-src');
	  imageObserver.unobserve(img);
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
	  entries.forEach(entry => {
		  if (entry.isIntersecting) {
			  lazyLoadImage(entry);
		  }
	  });
  }, { rootMargin: '100px' });
  
  // Filter temples
  function filterTemples(filterType) {
	  templeGrid.innerHTML = '';
	  let filteredTemples = temples;
  
	  switch (filterType) {
		  case 'old':
			  filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
			  break;
		  case 'new':
			  filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
			  break;
		  case 'large':
			  filteredTemples = temples.filter(temple => temple.area > 90000);
			  break;
		  case 'small':
			  filteredTemples = temples.filter(temple => temple.area < 10000);
			  break;
	  }
  
	  filteredTemples.forEach(temple => {
		  const templeCard = document.createElement('div');
		  templeCard.className = 'temple-card';
		  templeCard.innerHTML = `
			  <img data-src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
			  <div class="temple-info">
				  <h3>${temple.templeName}</h3>
				  <p>Location: ${temple.location}</p>
				  <p>Dedicated: ${new Date(temple.dedicated).toLocaleDateString()}</p>
				  <p>Area: ${temple.area} sq ft</p>
			  </div>
		  `;
		  templeGrid.appendChild(templeCard);
  
		  const img = templeCard.querySelector('img');
		  imageObserver.observe(img);
	  });
  }
  
  // Event listeners for navigation
  document.querySelectorAll('.navigation a').forEach(link => {
	  link.addEventListener('click', (e) => {
		  e.preventDefault();
		  filterTemples(link.id);
	  });
  });
  
  // Initial load
  filterTemples('home');