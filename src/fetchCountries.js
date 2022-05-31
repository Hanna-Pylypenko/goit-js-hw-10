export function fetchCountries(name) {
  const fetchRef = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(fetchRef).then(response => {
    return response.json();
  });
}
