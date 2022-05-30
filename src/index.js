import './css/styles.css';
import Notiflix from 'notiflix';
const _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
countryInput.addEventListener('input', _.debounce(onInputAction, DEBOUNCE_DELAY));
const countryListContainer = document.querySelector('.country-list');
const countryInfoBox = document.querySelector('.country-info');

function onInputAction(e) {
  const nameWithSpaces = e.target.value;
  const name = nameWithSpaces.trim();
  console.log(name);
  fetchCountries(name);

  function fetchCountries(name) {
    const fetchRef = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    if (name === '') {
      countryInfoBox.innerHTML = '';
      countryInfoBox.innerHTML = '';
      return;
    }
    fetch(fetchRef)
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(response => {
        console.log(response);

        if (response.length > 10) {
          countryInfoBox.innerHTML = '';
          countryListContainer.innerHTML = '';
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        }

        if (response.length === 1) {
          countryListContainer.innerHTML = '';
          const nameOfficial = response[0].name.official;
          const capital = response[0].capital[0];
          const population = response[0].population;
          const flag = response[0].flags.svg;
          const languages = Object.values(response[0].languages);

          const markup = markUpCard(capital, population, languages, flag, nameOfficial);
          console.log(markup);
          countryInfoBox.innerHTML = markup;
        }
        if (response.length <= 10 && response.length > 1) {
          countryInfoBox.innerHTML = '';
          const listArray = [];
          response.map(element => {
            const nameOfficial = element.name.official;
            const flag = element.flags.svg;
            listArray.push(markUpList(nameOfficial, flag));
          });
          countryListContainer.innerHTML = listArray.join('');
        }

        if (response[0].message === 'Page Not Found') {
          countryInfoBox.innerHTML = '';
          countryInfoBox.innerHTML = '';
          Notiflix.Notify.failure('');
        }
      })
      .catch(error => {
        countryInfoBox.innerHTML = '';
        countryInfoBox.innerHTML = '';
        console.log(error);
        console.log("that's a mistake");
        Notiflix.Notify.failure('Oops, there is no country with such name');
      });
  }
}

function markUpList(name, flag) {
  return `<li class="coutry-item">
        <img class="country-flag" src="${flag}" alt="Country flag" width="40px" height="40px"/>
        <span>${name}</span>
    </li>`;
}
function markUpCard(capital, population, languages, flag, country) {
  return `
        <div class="country-infobox">
        <div class="headline-box">
        <img class="country-flag" src="${flag}" alt="Country flag" width="40px" height="40px" />
        <h2 class="country-name">${country}</h2>
         </div>
        <ul class="country-description">
        <li><span class="description-category">Capital: </span>${capital}</li>
        <li><span class="description-category">Population: </span>${population}</li>
        <li><span class="description-category">Languages: </span>${languages.join(', ')}</li>
        </ul>
       </div>
       </div>`;
}
