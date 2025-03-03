document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const yearRange = document.getElementById("yearRange");
    const yearDisplay = document.getElementById("yearDisplay");
    const movieContainer = document.getElementById("movie-container");

    const API_KEY = "16746966";  // Replace with your activated OMDb API Key

    // Initial movie fetch (latest year)
    fetchMovies("", yearRange.value);

    searchInput.addEventListener("input", () => {
        fetchMovies(searchInput.value, yearRange.value);
    });

    yearRange.addEventListener("input", () => {
        yearDisplay.textContent = yearRange.value;
        fetchMovies(searchInput.value, yearRange.value);
    });

    async function fetchMovies(query = "", year = "") {
        let url = `https://www.omdbapi.com/?s=${query || "AI"}&apikey=${API_KEY}`;
        if (year) url += `&y=${year}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.Search) {
                displayMovies(data.Search);
            } else {
                movieContainer.innerHTML = `<p>No results found.</p>`;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            movieContainer.innerHTML = `<p>Error loading movies.</p>`;
        }
    }

    function displayMovies(movies) {
        movieContainer.innerHTML = "";

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
