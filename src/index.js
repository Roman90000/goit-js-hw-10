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




function selectBreed(event) {
    ref.divCatInfo.classList.remove("is-hidden");
    
    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId).then(data =>  {

        const { url, breeds } = data[0];
        
        ref.divCatInfo.innerHTML = `<div class="container">
                                        <div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div>
                                        <div class="box"><h1 class="catName">${breeds[0].name}</h1>
                                        <p class="catDescription">${breeds[0].description}</p>
                                        <p class="catTemperament"><b>Temperament:</b><br> ${breeds[0].temperament}</p>
                                        </div>
                                    </div>`
        
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
        select: ref.selector,
        data: catId,
    }); 
    ref.selector.addEventListener("change", selectBreed);
});

function FetchError() {

    ref.error.classList.remove('is-hidden');
    
    return Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
};