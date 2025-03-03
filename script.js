document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const yearRange = document.getElementById("yearRange");
    const yearDisplay = document.getElementById("yearDisplay");

    searchInput.addEventListener("input", () => fetchMovies(searchInput.value));

    yearRange.addEventListener("input", () => {
        yearDisplay.textContent = yearRange.value;
        fetchMovies(searchInput.value, yearRange.value);
    });
});

async function fetchMovies(query = "", year = "") {
    const API_KEY = "your_api_key_here";  
    let url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    if (year) url += `&y=${year}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Search) {
        displayMovies(data.Search);
    }
}

function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;

        container.appendChild(card);
    });
}
