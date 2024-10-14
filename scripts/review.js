const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
  ];
  
  // Add event listener to submit button
  window.onload = function() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('productName');
      const product = products.find(p => p.id === productId);
      document.getElementById('productName').textContent = product ? product.name : 'Unknown Product';
      document.getElementById('rating').textContent = urlParams.get('rating');
      document.getElementById('installationDate').textContent = urlParams.get('installationDate');
      const features = urlParams.getAll('features');
      document.getElementById('features').textContent = features.length ? features.join(', ') : 'None';
      document.getElementById('writtenReview').textContent = urlParams.get('writtenReview');
      document.getElementById('userName').textContent = urlParams.get('userName');
  
      // Update review count in localStorage
      let reviewCount = localStorage.getItem('reviewCount') || 0;
      reviewCount++;
      localStorage.setItem('reviewCount', reviewCount);
      document.getElementById('reviewCount').innerHTML = `<b>Total Reviews Submitted:</b> ${reviewCount}`;
  };

// update last modified
const currentyear = document.querySelector("#currentyear");
const lastModifiedElement = document.getElementById('lastModified');

currentyear.textContent = new Date().getFullYear();

const date = new Date();
const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
lastModifiedElement.textContent = usDateFormat;