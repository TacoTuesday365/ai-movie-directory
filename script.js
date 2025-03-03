document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const yearRange = document.getElementById("yearRange");
    const yearDisplay = document.getElementById("yearDisplay");
    const movieContainer = document.getElementById("movie-container");

    const API_KEY = "16746966"; // Replace with your API key

    let debounceTimer;

    // Initial movie fetch
    fetchMovies("", yearRange.value);

    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchMovies(searchInput.value, yearRange.value);
        }, 500); // 500ms delay
    });

    yearRange.addEventListener("input", () => {
        yearDisplay.textContent = yearRange.value;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchMovies(searchInput.value, yearRange.value);
        }, 500); // 500ms delay
    });

    async function fetchMovies(query = "", year = "") {
        if (!query.trim()) return; // Prevent empty queries

        let url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
        if (year) url += `&y=${year}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
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
