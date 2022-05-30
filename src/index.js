import './css/styles.css';
import countryListContainer from '/fetchCountries';
import countryInfoBox from '/fetchCountries';
const _ = require('lodash');
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
countryInput.addEventListener('input', _.debounce(onInputAction, DEBOUNCE_DELAY));

function onInputAction(e) {
  const nameWithSpaces = e.target.value;
  const name = nameWithSpaces.trim();
  console.log(name);
  if (name === '') {
    countryListContainer.innerHTML = '';
    countryInfoBox.innerHTML = '';
    return;
  }
  fetchCountries(name);
}
