const pokeContainer = document.getElementById("poke-container");
const pokemons_number = 100;
const pokemonContainer = document.getElementById("display-pokemon");

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i, "pokeContainer");
  }
};

const getPokemon = async (id, position) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  createPokemonCard(pokemon, position);
};

const createPokemonCard = (pokemon, position) => {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon");
  pokemonCard.addEventListener("click", function () {
    pokemonCard.classList.toggle("flip");
  });
  const { id, name, sprites, types, stats } = pokemon;
  console.log(stats[0].base_stat, stats[0].stat.name);
  const type = types[0].type.name;
  const pokeContent = `
  <div class="front">
  <div class="flex-container">
  <div class="img-container">
    <img src="${sprites.front_default}" alt="${name}" />
  </div>
  </div>
  <div class="info">
    <span class="number">${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  </div>
  <div class="back">
  <p> HP :
  <span><i class="fa fa-plus-square" style="font-size:25px;color:green;"></i>
  ${stats[0].base_stat}</span>
  </p>
  <p> Attack :
  <span><i class="fa fa-hand-grab-o" style="font-size:25px;color:red;"></i>
  ${stats[1].base_stat}</span>
  </p>
  <p> Defense :
  <span><i class="fa fa-sharp fa-solid fa-shield" style="font-size:25px;color:blue;"></i>
  ${stats[2].base_stat}</span>
  </p>
  </div>
  `;
  pokemonCard.innerHTML = pokeContent;
  addPokemon(pokemonCard, position);
};

pokeID = document.getElementById("number").value;
fetchPokemons();

const searchPokemon = () => {
  pokeID = parseInt(document.getElementById("number").value);
  if (pokeID > 905) {
    alert("There are only 905 pokemons in database");
  }
  getPokemon(pokeID, "search");
};

const addPokemon = (content, position) => {
  if (position == "pokeContainer") {
    pokeContainer.appendChild(content);
  } else {
    pokemonContainer.innerHTML = ``;
    pokemonContainer.appendChild(content);
  }
};
