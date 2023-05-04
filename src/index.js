import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const input = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(oneSearch, DEBOUNCE_DELAY));

function oneSearch(e) {
    e.preventDefault();
    const name = e.target.value.trim();
    fetchCountries(name).then(data => creatMarkup(data));    
};

function creatMarkup(data) {

    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
    };

    if (data.length > 2 || data.length < 10) {
        const countryItemMarkup = data
        .map(item => {
            return `<li class="country__item">
                <img class="country__flag" src="${item.flags.svg}" alt="Country flag" width="50px" />
                <p class="country__name">${item.name.official}</p>
            </li>`;
            })
        .join('');

        countryList.innerHTML = countryItemMarkup;
    };

    if (data.length === 1) {
       const countriItemInfo = data.map(item => {
            return `<li class="country__item">
                <img class="country__flag" src="${item.flags.svg}" alt="Country flag" width="50px" />
                <p class="country__name">${item.name.official}</p>
                <p><b>Capital: </b>${item.capital}</p>
                <p><b>Population: </b>${item.population} inhabitants</p>
                <p><b>Languages: </b>${Object.values(item.languages)}</p>;
            </li>`;
            })
           .join('');
        
        countryInfo.innerHTML = countriItemInfo;
    }
};

