const API_KEY = "your_api_key_here";  // 🔥 Replace with your OMDB API Key

document.addEventListener("DOMContentLoaded", () => {
    loadMovies(); // Load static AI movie list on page load
});

const aiMovies = [
    { title: "The Matrix", year: "1999" },
    { title: "Ex Machina", year: "2014" },
    { title: "Blade Runner", year: "1982" },
    { title: "A.I. Artificial Intelligence", year: "2001" },
    { title: "Her", year: "2013" },
    { title: "The Terminator", year: "1984" },
    { title: "I, Robot", year: "2004" },
    { title: "The Creator", year: "2023" },
];

async function loadMovies() {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Clear previous content

    for (const movie of aiMovies) {
        const data = await fetchMovieDetails(movie.title, movie.year);
        if (data) displayMovie(data);
    }
}

async function fetchMovieDetails(title, year) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return null;
    }
}

function displayMovie(movie) {
    const container = document.getElementById("movie-container");

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Plot:</strong> ${movie.Plot || "No description available."}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating || "N/A"}</p>
    `;

    container.appendChild(card);
}
