  let pokemonRepository = (function(){
    let modalContainer = document.querySelector('#modal-container');
    let pokeList = document.querySelector('.pokemon-list');
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // Function to allow the retrival of the pokedex datatype
    function getAll() {
      return pokemonList;
  }

  // Adds pokemon to pokedex - contains a datatype check
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }

  // Function that will log the pokemon name to console when called
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //Calling the modal
      showModal(pokemon);
    });
  }

  /* Function to display pokemon from database on webpage. Contains a forEach method which creates a button with the name of each element iterated over */
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    //event listener for on click to run the showDetails function
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  };

  function loadList() {
    return fetch(apiURL).then(function(response){
      return response.json();
    }).then (function(json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }

  //Modal for Podex Task 1.8
  function showModal(pokemon) {

    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    modal.appendChild(closeButtonElement);

    //get the name of the pokemon and display it on Modal
    let pokeName = document.createElement('h1');
    pokeName.innerText = pokemon.name;
    modal.appendChild(pokeName);

    //Get the height of the pokemon and display it on the Modal
    let pokeHeight = document.createElement('p');
    pokeHeight.innerText = pokemon.height;
    modal.appendChild(pokeHeight);

    //get the img of the pokemon and display it on the Modal
    let containerImg = document.querySelector('#image-container');
    let pokImg = document.createElement('img');
    pokeImg.src = pokemon.imageUrl;
    modal.appendChild(pokeImg);


    //modal is the child of modalContainer
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  //Hide function
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // close the Model when Escape key got hitted
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Close the function when the user clicked outside the Modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Allows access to the IIFE
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
  })();

  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
  });
