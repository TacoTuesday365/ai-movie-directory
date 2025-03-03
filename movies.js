const API_KEY = '16746966'; // Your activated OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

// Function to fetch movies by search term
async function fetchMovies(searchTerm) {
    try {
        const response = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            console.error("Error:", data.Error);
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
}

// Function to display movies on the page
function displayMovies(movies) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
        `;

        resultsContainer.appendChild(movieElement);
    });
}

// Event listener for search input
document.getElementById("search-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchMovies(event.target.value);
    }
});
