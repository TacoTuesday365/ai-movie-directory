document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const yearRange = document.getElementById("yearRange");
    const yearDisplay = document.getElementById("yearDisplay");
    const movieContainer = document.getElementById("movie-container");

    const API_KEY = "16746966"; // Your OMDb API key

    // Fetch movies based on search input
    searchInput.addEventListener("input", () => {
        fetchMovies(searchInput.value, yearRange.value);
    });

    // Fetch movies based on year slider
    yearRange.addEventListener("input", () => {
        yearDisplay.textContent = yearRange.value;
        fetchMovies(searchInput.value, yearRange.value);
    });

    // Fetch movies from OMDb API
    async function fetchMovies(query = "", year = "") {
        if (!query) return; // Avoid empty queries

        let url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
        if (year) url += `&y=${year}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                movieContainer.innerHTML = `<p>No movies found.</p>`;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    // Display movies dynamically
    function displayMovies(movies) {
        movieContainer.innerHTML = ""; // Clear previous results

        movies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            card.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
            `;

            movieContainer.appendChild(card);
        });
    }
});
