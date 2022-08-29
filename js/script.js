const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

const urlBase = "https://pokeapi.co/api/v2/pokemon/";
let pokemonID = 4;

async function fetchPokemon(pokemon) {
    const url = urlBase + pokemon;
    const responseAPI = await fetch(url);

    if (responseAPI.status === 200) {
        const data = await responseAPI.json();
        return data;
    }

    console.log(url);
}

async function renderPokemon(pokemon) {
    pokemonName.innerHTML = "Searching...";
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonID = data.id;

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = pokemonID;
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

        input.value = "";

    } else {
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "?";
        pokemonImage.src = "https://w7.pngwing.com/pngs/626/602/png-transparent-question-mark-interrogative-others-miscellaneous-text-logo-thumbnail.png";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    texto = input.value.toLowerCase();
    renderPokemon(texto);
});

prevButton.addEventListener("click", () => {
    pokemonID -= 1;
    pokemonID = pokemonID <= 0 ? 1 : pokemonID;
    renderPokemon(pokemonID);
});

nextButton.addEventListener("click", () => {
    pokemonID += 1;
    renderPokemon(pokemonID);
});

renderPokemon(pokemonID);
