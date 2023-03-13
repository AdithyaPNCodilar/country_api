const apiUrl = 'https://restcountries.com/v2/all';

const countryContainer = document.getElementById('country-container');
const popup = document.createElement('div');
popup.classList.add('popup');

const request = new XMLHttpRequest();
request.open('GET', apiUrl);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(request.responseText);
    data.forEach(country => {
      // Create card element
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-name', country.name);
      card.innerHTML = `
        <h2>${country.name}</h2>
        <img src="${country.flag}" alt="${country.name}">
        <p>Capital: ${country.capital}</p>
      `;
      
      // Add click event listener to card
      card.addEventListener('click', () => {
        // Update popup content
        popup.innerHTML = `
          <h2>${country.name}</h2>
          <img src="${country.flag}" alt="${country.name}">
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>NumericCode: ${country.numericCode}</p>
          <p>SubRegion: ${country.subregion}</p>
          <p>Region: ${country.region}</p>
          <button>Close</button>
        `;
        
        // Show popup
        popup.style.display = 'block';
        
        // Add click event listener to popup close button
        const closeButton = popup.querySelector('button');
        closeButton.addEventListener('click', () => {
          // Hide popup
          popup.style.display = 'none';
        });
      });
      
      // Add card to country container
      countryContainer.appendChild(card);
    });
  } else {
    console.error('An error occurred while retrieving data from the server');
  }
};

request.onerror = function() {
  console.error('An error occurred while making the request');
};

request.send();

// Add popup to body
document.body.appendChild(popup);
