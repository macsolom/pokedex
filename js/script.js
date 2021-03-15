// 1.2 JavaScript Basicis pt.1 (Create a variable, pokemonList, and assign data to its array)
let pokemonRepository = (function()){
  let pokedex = [
    {
      name: 'Zapdos',
      height: 1.6,
      types: ['electric','flying']
    },
    {
      name: 'Butterfree',
      height: 1.1,
      types: ['bug','flying']
    },
    {
      name: 'Onix',
      height: 8.8,
      types: ['rock','ground']
    }
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

  return {
    addF: add,
    getAllF: getAll
  };
})();

pokemonRepository.addF({name: 'Jynx', height: 1.4, types: ['Psychic', 'Ice']});

//Using the .forEach method, this is iterating over the elements in the pokedex array and deciding based on height parameters how to write them out
pokemonRepository.getALLF().forEach(function(pokemon) {
  if (pokemon.height > 2.0 && pokemon.height < 5) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}m - Wow, that's big! <br/> <br/>`);
  } else if (pokemon.height < 1.0) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}m - This is a small Pokemon! <br/> <br/>`);
  } else {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}m <br/> <br/>`);
  }
};
