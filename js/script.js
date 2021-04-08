// 1.2 JavaScript Basicis pt.1 (Create a variable, pokemonList, and assign data to its array)
let pokemonRepository = (function(){
  let pokedex = [
    {name: 'Zapdos', height: 1.6, types: ['electric','flying']},
    {name: 'Butterfree', height: 1.1, types: ['bug','flying']},
    {name: 'Onix', height: 8.8, types: ['rock','ground']}
  ];
  // Adds pokemon to pokedex - contains a datatype check
  function add(pokeomon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      pokedex.push(pokemon);
    } else {
      console.log('you need an object');
    }
  }
  // Function to allow the retrival of the pokedex datatype
  function getAll() {
    return pokedex;
  }

  function showDetails(pokemon) {
    console.log(pokemon.name)
  }

  /* Function to display pokemon from database on webpage. Contains a forEach method which creates a button with the name of each element iterated over */
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    //event listener for on click to run the showDetails function
    button.addEventListener('click', showDetails(pokemon));
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  };

  return {
    add: add,
    getAll: getAll
    addListItem: addListItem
  };
  })();

pokemonRepository.add({name: 'Jynx', height: 1.4, types: ['Psychic', 'Ice']});

pokemonRepository.getALL().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
