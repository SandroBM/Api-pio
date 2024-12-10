const API = "https://api.jikan.moe/v4/anime";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const animeContainer = document.getElementById("dataAlbum");


// Buscar animes
async function searchAnime() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    try {
        // Se llama la API
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
        const data = await response.json();

        // Mostrar resultados
        displayAnimes(data.data);
    } catch (error) {
        console.error("Error al buscar animes:", error);
        alert("Hubo un problema al obtener los datos. Intenta nuevamente.");
    }
}

// Mostrar resultados
function displayAnimes(animes) {
    animeContainer.innerHTML = ""; // Limpiar contenedor

    if (!animes || animes.length === 0) {
        animeContainer.innerHTML = "<p>Escriba Bien.</p>";
        return;
    }

    animes.forEach(anime => {

        // Solicitar datos de la API y se verifican que esten los datos necesarios
        const imageUrl = anime.images?.jpg?.image_url || "";
        const animeUrl = anime.url || "#";
        const title = anime.title || "Sin título";
        const synopsis = anime.synopsis || "Sin descripción.";

        const card = document.createElement("div");
        card.className = "col anime-card";
        card.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                     <strong>Year:</strong> ${anime.year || 'unknown'}<br>
                     <strong>Episodes:</strong> ${anime.episodes || 'unknown'}<br>
                     <strong>Score:</strong> ${anime.score || 'unknown'}<br>
                    <p class="card-text">${synopsis.slice(0, 100)}...</p>
                    <a href="${animeUrl}" target="_blank" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;
        animeContainer.appendChild(card);
    });
}


// Evento para el boton de busqueda
searchButton.addEventListener("click", searchAnime);
