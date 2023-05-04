export default function fetchCountries(name) {
        const BASE_URL = "https://restcountries.com/v3.1/name/";
        const PARAMS = "name,capital,population,flags,languages";

    return fetch(`${BASE_URL}${name}?fields=${PARAMS}`).then(resp => {
        if (resp.ok) {            
            return resp.json();
        };
    });
};
