
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
  temples.forEach((temple) => {
    const templeCard = document.createElement('figure');
    const templeImage = document.createElement('img');
    const templeCaption = document.createElement('figcaption');
    const templeName = document.createElement('h2');
    const templeLocation = document.createElement('p');
    const templeDedicationDate = document.createElement('p');
    const templeArea = document.createElement('p');

    templeName.textContent = temple.templeName;
    templeLocation.textContent = `Location: ${temple.location}`;
    templeDedicationDate.textContent = `Dedicated: ${temple.dedicated}`;
    templeArea.textContent = `Area: ${temple.area} sq ft`;

    templeImage.src = temple.imageUrl;
    templeImage.alt = temple.templeName;
    templeImage.loading = 'lazy';

    templeCaption.appendChild(templeName);
    templeCaption.appendChild(templeLocation);
    templeCaption.appendChild(templeDedicationDate);
    templeCaption.appendChild(templeArea);

    templeCard.appendChild(templeImage);
    templeCard.appendChild(templeCaption);

    templeGrid.appendChild(templeCard);

	
  });



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





