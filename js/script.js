// 1.2 JavaScript Basicis pt.1 (Create a variable, pokemonList, and assign data to its array)
let pokemonList = [
  {
    name: "Zapdos",
    height: 1.6,
    types: ["electric","flying"]
  },
  {
    name: "Butterfree",
    height: 1.1,
    types: ["bug","flying"]
  },
  {
    name: "Onix",
    height: 8.8,
    types: ["rock","ground"]
  }
];

/* 1.3 A for loop to iterate over every element in the array and then write it on the website. There's also an if logic that will look at the height of the pokemon and add extra text depending on the parameters.
*/
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 2.0 && pokemonList[i].height < 10) {
    document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}m - Wow, that's big! <br/> <br/>`);
  } else if (pokemonList[i].height < 1.0) {
    document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}m - This is a small Pokemon! <br/> <br/>`);
  } else {
    document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}m <br/> <br/>`);
  }
};
