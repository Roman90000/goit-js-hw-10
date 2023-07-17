import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import 'slim-select/dist/slimselect.css';
import "../src/css/styles.css";

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

ref.loader.classList.add('is-hidden');
ref.error.classList.add('is-hidden');

ref.selector.addEventListener("change", selectBreed);

function selectBreed(event) {
    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId).then(data => {
        console.log(data)
        const { url, breeds } = data[0];
        ref.divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`

    }).catch(FetchError);
};

let catId = [];

fetchBreeds()
.then(data => {
    data.map(element => {
        catId.push({
            text: element.name,
            value: element.id
        });
        
    });

    new SlimSelect({
        select: document.querySelector('.breed-select'),
        data: catId,
    }); 
});

function FetchError() {
   return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
};