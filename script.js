// Sample AI-themed movie data
const movies = [
    { title: "The Matrix", image: "https://via.placeholder.com/200x300?text=Matrix" },
    { title: "Ex Machina", image: "https://via.placeholder.com/200x300?text=Ex+Machina" },
    { title: "Blade Runner 2049", image: "https://via.placeholder.com/200x300?text=Blade+Runner+2049" },
    { title: "Her", image: "https://via.placeholder.com/200x300?text=Her" },
    { title: "A.I. Artificial Intelligence", image: "https://via.placeholder.com/200x300?text=AI" }
];

// Function to display movies
function displayMovies(movieList) {
    const movieContainer = document.getElementById("movie-list");
    movieContainer.innerHTML = ""; // Clear previous content

    movieList.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3 class="movie-title">${movie.title}</h3>
        `;

        movieContainer.appendChild(movieCard);
    });
}

// Function to filter movies based on search input
function searchMovies(event) {
    const query = event.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
    displayMovies(filteredMovies);
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
    displayMovies(movies); // Load all movies initially
    document.getElementById("search").addEventListener("input", searchMovies);
});
