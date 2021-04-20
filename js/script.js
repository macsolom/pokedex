let pokemonRepository= (function(){
    let pokemonList = [];
    let pokemon = "";
    let searchInput = document.querySelector("#searchIn");
    let loader= document.querySelector("#loading");
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');


// Adds pokemon to pokedex & contains a datatype check
    function add(item){
        if(typeof item === "object"){
        pokemonList.push(item);
       }
       else alert("not possible")
    };

// Function to allow the retrival of the pokedex datatype
    function getAll(){
        return pokemonList;

    }

  // Function to creates and display pokemon list and button
    function addListItem(pokemon){
       let listPokemon = document.querySelector(".list-group");

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.classList.add("list-group-item-action");
         let button = document.createElement("button");
          button.innerText= capitalize(pokemon.name);
          button.classList.add("btn");
          button.classList.add("btn-dark");
          button.classList.add("btn-block")
          button.classList.add("mb-2")
        button.setAttribute("data-target","#pokemonModal")
        button.setAttribute("data-toggle","modal")
         listPokemon.appendChild(listItem);
         listItem.appendChild(button);

        // Event listener for on click to run the showDetails function
         button.addEventListener("click",function(event){
             showDetails(pokemon)
         });
        }

   // Display items details
     function showDetails(pokemon){
         loadDetails(pokemon).then(function(){
             showModal(pokemon)
         })
        };
      // Display loading
        function showloading(){
            loader.classList.add("display");
            setTimeout(function(){
                loader.classList.remove("display");
            },5000);

        };


        function hideLOading(){
            loader.classList.remove("display");
        }

   // Fetch list pokemon from our API
     function loadList(){
         showloading();
         return fetch(apiUrl).then(function(response){
             return response.json();
            }).then(function(json){
                hideLOading()
                 json.results.forEach(function(item){
                     let pokemon = {
                         name:item.name,
                         detailsUrl : item.url
                     };
                     add(pokemon);

                   });
                }).catch(function(e){
                    hideLOading()
                console.error(e);
            })
     };
   // Function that loops (forEach) over our object for return value to display pokemon types
  function returnValue(object){
     for (let key of Object.keys(object)){
         let value = object[key].type.name;
         return value
    }
}

     // Fetch details pokemon from our API
     function loadDetails(item){
        showloading()
         let url = item.detailsUrl;
         return fetch(url).then(function(response){
             return response.json();
         }).then(function(details){
            hideLOading()
              item.imageUrl = details.sprites.other.dream_world.front_default;
              item.height = details.height;
              item.types = details.types;
              returnValue(details.types);
         }).catch(function(e){
            hideLOading();
             console.error(e)
         });
     };



    // Modal for Podex (Task 1.8)
    function showModal(pokemon){
        let modalBody = document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");
        let modalHeader = document.querySelector(".modal-header");

        modalBody.innerHTML= "";
        modalTitle.innerHTML = "";

       // Get the name of the pokemon and display it on Modal
       let elementTitle = document.createElement("h1");
        elementTitle.innerText= capitalize(pokemon.name);
        modalTitle.appendChild(elementTitle);

        // Get the height & type of the pokemon and display it on the Modal
       let elementHeightType = document.createElement("p");
        elementHeightType.innerText =` is ${pokemon.height}m tall and is a ${returnValue(pokemon.types)} type pokemon!`;
        modalBody.appendChild(elementHeightType);

        // Get the img of the pokemon and display it on the Modal
        let imageElement = document.createElement("img");
        modalBody.appendChild(imageElement);
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add("img-element")

     }
     // Event listener for search bar to find pokemon on the list
     searchInput.addEventListener('input', function(){
        let listPokemon = document.querySelectorAll('.list-group-item');
        let value = searchInput.value.toUpperCase();

        listPokemon.forEach(function(pokemon){
            if(pokemon.innerText.toUpperCase().indexOf(value) > -1){
                pokemon.style.display = '';
            }else{
                pokemon.style.display = 'none';
            }
        })
    });
   // Function to capitalize first letter
  function capitalize(s){
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }


    return{
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList: loadList,
        loadDetails:loadDetails,


    };


})();

    pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

})
});
