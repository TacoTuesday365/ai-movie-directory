const API_KEY = "16746966"; // Your OMDb API Key

const moviesByGeneration = {
    "Baby Boomers (1946-1964)": [
        { title: "2001: A Space Odyssey", year: "1968" },
        { title: "Metropolis", year: "1927" },
        { title: "Colossus: The Forbin Project", year: "1970" }
    ],
    "Generation X (1965-1980)": [
        { title: "Blade Runner", year: "1982" },
        { title: "The Terminator", year: "1984" },
        { title: "RoboCop", year: "1987" }
    ],
    "Millennials (1981-1996)": [
        { title: "The Matrix", year: "1999" },
        { title: "A.I. Artificial Intelligence", year: "2001" },
        { title: "I, Robot", year: "2004" }
    ],
    "Generation Z (1997-2012)": [
        { title: "Ex Machina", year: "2014" },
        { title: "Her", year: "2013" },
        { title: "The Creator", year: "2023" }
    ]
};

// Generate movie sections
const mainContainer = document.getElementById("movie-sections");

Object.keys(moviesByGeneration).forEach(generation => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${generation}</h2><div class="movie-grid"></div>`;

    const grid = section.querySelector(".movie-grid");

    moviesByGeneration[generation].forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.dataset.title = movie.title;
        card.dataset.year = movie.year;

        fetchMoviePoster(movie.title, movie.year, card);
        grid.appendChild(card);
    });

    mainContainer.appendChild(section);
});

// Fetch movie poster from API
async function fetchMoviePoster(title, year, card) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Poster && data.Poster !== "N/A") {
            card.innerHTML = `<img src="${data.Poster}" alt="${title}"><h3>${title}</h3>`;
        } else {
            card.innerHTML = `<img src="placeholder.jpg" alt="${title}"><h3>${title}</h3>`;
        }
        card.addEventListener("click", () => openMovieModal(data));
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

// Open modal with movie details
function openMovieModal(movie) {
    document.getElementById("modal-title").textContent = movie.Title;
    document.getElementById("modal-poster").src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
    document.getElementById("modal-year").textContent = `Year: ${movie.Year}`;
    document.getElementById("modal-plot").textContent = movie.Plot || "No description available.";

    document.getElementById("movie-modal").style.display = "flex";
}

// Close modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("movie-modal").style.display = "none";
});
