const API_ALBUM = "https://pokeapi.co/api/v2/pokemon";

function getAlbum(api) {
    fetch(api).then((response)=> response.json())
    .then((json) => {
        fillData(json.results), pagination(json);
    })
    .catch((error)=> {
        console.log(error, "Error consumiendo la API");
    })
}

async function fillData(results) {
    let cards = "";
    for (let i = 0; i < 1302; i++) {
        try {
            
            const response = await fetch(results[i].url);
            const pokemon = await response.json();

            cards += `<div class= "col">
            <div class= "card h-100" style= "width: 12rem;">
           <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="img-pokemon">
            <h2 class="card-title" > ${pokemon.name} </h2>
            <div class="card-body">
            <h5 class="card-title">Height: ${pokemon.height}</h5>
            <h5 class="card-title">Weight: ${pokemon.weight}</h5>
            <h5 class="card-title">Type: ${pokemon.types.map(type => type.type.name).join('/')}</h5>
            </div>
            </div>
            </div>
            `
        } catch (error) {
            console.log(error, "Error consumiendo la API");
        }
    
    }
    document.getElementById("dataAlbum").innerHTML = cards;
    
    }
    
    function pagination(info){
    
    let prevDisabled = "";
    let nextDisabled = "";
    
    if (!info.previous) {
        prevDisabled = "disabled";
    }
    if (!info.next) {
        nextDisabled = "disabled";
        
    }
    
    let html = `
      <li class="page-item ${prevDisabled}"><a  class="page-link" onclick="getAlbum('${info.previous}')" >prev</a></li>
      <li class="page-item ${nextDisabled}"><a  class="page-link" onclick="getAlbum('${info.next}')" >next</a></li>
      `;
    
      document.getElementById("pagination").innerHTML = html;
    }
    
    getAlbum(API_ALBUM)
