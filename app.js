const cardsContainer = document.querySelector("#cards");
const search_navbar = document.querySelector("#search-navbar");
const baseUrl = "https://pokeapi.co/api/v2";
const navbar = document.querySelector("#navbar");
const main_container = document.querySelector("#main-container");
const stats_pokemon = document.querySelector("#stats_pokemon");
let modal;

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("click", pokemonSeleccionado);
search_navbar.addEventListener("keydown", parametrosBusqueda);

function main() {
  //connectionApi(baseUrl + "/pokemon?limit=20&offset=0");
  //connectionApi(baseUrl + "/pokemon?limit=2&offset=0");
  updatePokemons(baseUrl + "/pokemon?limit=20&offset=0");
}

async function connectionApi(url) {
  spinner();

  await fetch(url)
    .then((res) => res.json())
    .then((res) => obtenerResultados(res))
    .catch((error) => mostrarAlertas(error));
}

function mostrarAlertas(msg) {
  console.log(msg);
}

function obtenerResultados(data) {
  // setTimeout(()=>{
  limpiaHTML(main_container);
  // },50000)
  const pokemons = data.results;

  pokemons.forEach((pokemon) => {
    infoPokemon(pokemon);
  });
}

async function infoPokemon(pokemon) {
  let infoPokemon = pokemon.url;

  await fetch(infoPokemon)
    .then((res) => res.json())
    .then((res) => mostrarPokemones(res))
    .catch((error) => mostrarAlertas(error));
}

function mostrarPokemones(pokemon) {
  limpiaHTML(main_container)

  const { id, name } = pokemon;
  const pokemonType = pokemon.types[0].type.name;

  const nodo = document.createElement("DIV");

  nodo.innerHTML = `
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img loading="lazy" class="rounded-t-lg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
          pokemon.id
        }.png" alt="${name}" />
    </a>
    <div class="p-5">
        <a href="#">
        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">${pokemonType}</span>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> <span class="text-3xl font-bold text-gray-900 dark:text-white">${pokemon.name.toUpperCase()}</span> </p>


        <a href="#" id="${id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
</div>
`;

  cardsContainer.appendChild(nodo);
}

async function pokemonSeleccionado(e) {
  const id = e.target.id;

  if (id && id !== "modalEl") {
    fetch(baseUrl + `/pokemon/${id}`)
      .then((res) => res.json())
      .then((res) => mostrarModal(res))
      .catch((error) => mostrarAlertas(error));
  } else {
    return 0;
  }
}

function typesIterador(array) {
  const types_pokemon = document.querySelector("#types_pokemon");

  limpiaHTML(types_pokemon);

  array.forEach((object) => {
    const types = document.createElement("DIV");
    types.innerHTML = `
    <span class="bg-blue-100 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-100">${object.type.name}</span>
    `;

    types_pokemon.appendChild(types);
  });
}

function mostrarEstadisticas(estadisticas) {
  limpiaHTML(stats_pokemon);

  const estadistica = document.createElement("DIV");
  let estadisticasObj = {
    hp: estadisticas[0],
    attack: estadisticas[1],
    defense: estadisticas[2],
    special_attack: estadisticas[3],
    special_defense: estadisticas[4],
    speed: estadisticas[5],
  };

  estadistica.innerHTML = `
  

  <div class="container_stats_items">

  <div class="">
  <p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">HP</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.hp.base_stat}%"> ${estadisticasObj.hp.base_stat}%</div>
</div>
</div>

<div class="">
<p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">Attack</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.attack.base_stat}%"> ${estadisticasObj.attack.base_stat}%</div>
</div>
</div>

<div class="">
<p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">Defense</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.defense.base_stat}%"> ${estadisticasObj.defense.base_stat}%</div>
</div>
</div>


<div class="">
<p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">Special Attack</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.special_attack.base_stat}%"> ${estadisticasObj.special_attack.base_stat}%</div>
</div>
</div>

<div class="">
<p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">Special Defense</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.special_defense.base_stat}%"> ${estadisticasObj.special_defense.base_stat}%</div>
</div>
</div>


<div class="">
<p class="text-lg text-left font-medium text-gray-900 dark:text-white stat_pokemon_item">Speed</p>

<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div class="bg-blue-600 rounded-full text-center text-xl text-gray-900 dark:text-white" style="width: ${estadisticasObj.speed.base_stat}%"> ${estadisticasObj.speed.base_stat}%</div>
</div>
</div>




<button type="button" onclick="cerrarModal()" id="close_modal_button" class="stat_pokemon_item_button text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
<img src="assets/icons/ArrowSmallLeft.svg" class="button-return"/> <span class="text-lg text-left font-medium text-gray-900 dark:text-white"> Back </span>
</button>


  `;

  stats_pokemon.appendChild(estadistica);
}

function mostrarModal(data) {
  // set the modal menu element
  const $targetEl = document.getElementById("modalEl");
  const name_pokemon = document.getElementById("name_pokemon");
  const imagenPokemon = document.getElementById("imagenPokemon");
  const close_modal_button = document.querySelector("#close_modal_button");

  typesIterador(data.types);

  mostrarEstadisticas(data.stats);

  name_pokemon.innerText = data.name.toUpperCase();
  imagenPokemon.innerHTML = `<img class="pokemon_item_details p-8 rounded-t-lg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png" alt="${data.name}" />`;

  // options with default values
  const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };

  modal = new Modal($targetEl, options);
  modal.show();
}

function cerrarModal() {
  modal.hide();
}

function busquedaHTML() {
  const searchBox = document.createElement("DIV");
  searchBox.innerHTML = `

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
<div class="container flex flex-wrap items-center justify-between mx-auto">
<a href="https://flowbite.com/" class="flex items-center">
    <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
</a>
<div class="flex md:order-2">
  <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Search</span>
  </button>
  <div class="relative hidden md:block">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Search icon</span>
    </div>
    <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
  </div>
  <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
    <span class="sr-only">Open menu</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
  </button>
</div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
    <div class="relative mt-3 md:hidden">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </div>
      <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
    </div>
    <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
    </ul>
  </div>
</div>
</nav>
  `;
  navbar.appendChild(searchBox);
}

async function parametrosBusqueda(e) {
  if (e.code == "Enter") {
    limpiaHTML(cardsContainer);
    limpiaHTML(main_container);
    spinner()
    const termino = search_navbar.value;

    let query = baseUrl + `/pokemon/${termino}`;

    if (termino.length == 0) return connectionApi(baseUrl + "/pokemon");

    await fetch(query)
      .then((res) => res.json())
      .then((res) => mostrarPokemones(res))
      .catch((error) => mostrarErrores(error, termino));

    search_navbar.value = "";
  }
}

function mostrarErrores(msg, termino){
  
  limpiaHTML(main_container)
  limpiaHTML(cardsContainer)
  const alerta = document.createElement('DIV')
  alerta.innerHTML = `
<div class="">
<div role="status" class="pokemon_not_found">

<img loading="lazy" class="h-auto max-w-lg mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/54.png"/>

<span class="sr-only">Loading...</span>
<p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> <span class="text-6xl text-gray-900 dark:text-white">"${termino}" not found.</span> </p>
<p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> <span class="text-4xl text-gray-900 dark:text-white"> Please try again </p>

<button type="button" onclick="location.reload()" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">GO</button>
</div>
</div>
  `

  
  main_container.appendChild(alerta);
  
}

function limpiaHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function spinner() {
  if (!cardsContainer.firstChild) {
    console.log(true);
    const spinner_carga = document.createElement("DIV");
    spinner_carga.innerHTML = `
    


    <div role="status" class="spinner">
    <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> <span class="text-3xl font-bold text-gray-900 dark:text-white">Cargando...</span> </p>
</div>



    `;
    main_container.appendChild(spinner_carga);
  }
}

let pokemonsList = document.getElementById("cards");
let links = document.getElementById("links");

function updatePokemons(url) {
  spinner();

  if (url) {
    // Llamamos a la API de pokemon con Fetch
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // Obtenemos y recorremos a los primeros 20 pokemones obtenidos

        for (let i of res.results) {
          //Realizamos otra solicitud Fetch con la URL especifica del pokemon actual recorrido, para obtener datos mas especficos como la imagen
          fetch(i.url)
            .then((x) => x.json())
            .then((x) => {
              // Vamos pintando o ingresando la imagen y nombre del pokemon actual que se esta evaluando
              mostrarPokemones(x);
              //obtenerResultados(x)
            });
        }

        //Botón hacia adelante
        limpiaHTML(links);
        links.innerHTML += res.next
          ? `
        <button type="button" onclick="updatePokemons('${res.next}')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Load Pokemons
    <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
        
        `
          : "";
      });
  }
}

//updatePokemons(baseUrl+"/pokemon");
