document.addEventListener("DOMContentLoaded", loadMovies);

const moviesByGeneration = {
    "Silent Generation (1928–1945)": [
        { title: "Metropolis", year: "1927" }
    ],
    "Baby Boomers (1946–1964)": [
        { title: "2001: A Space Odyssey", year: "1968" },
        { title: "The Stepford Wives", year: "1975" }
    ],
    "Generation X (1965–1980)": [
        { title: "Westworld", year: "1973" },
        { title: "Blade Runner", year: "1982" },
        { title: "The Terminator", year: "1984" },
        { title: "Short Circuit", year: "1986" },
        { title: "RoboCop", year: "1987" },
        { title: "Akira", year: "1988" }
    ],
    "Millennials (1981–1996)": [
        { title: "The Matrix", year: "1999" },
        { title: "A.I. Artificial Intelligence", year: "2001" },
        { title: "Minority Report", year: "2002" },
        { title: "I, Robot", year: "2004" },
        { title: "Stealth", year: "2005" },
        { title: "Eagle Eye", year: "2008" },
        { title: "Moon", year: "2009" }
    ],
    "Generation Z (1997–2012)": [
        { title: "Her", year: "2013" },
        { title: "Ex Machina", year: "2014" },
        { title: "Chappie", year: "2015" },
        { title: "Avengers: Age of Ultron", year: "2015" },
        { title: "Blade Runner 2049", year: "2017" },
        { title: "The Mitchells vs. The Machines", year: "2021" }
    ],
    "Generation Alpha (2013–2025)": [
        { title: "M3GAN", year: "2023" },
        { title: "The Creator", year: "2023" }
    ]
};

async function loadMovies() {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Clear previous content

    for (const generation in moviesByGeneration) {
        const section = document.createElement("div");
        section.classList.add("generation-section");

        const header = document.createElement("h2");
        header.textContent = generation;
        section.appendChild(header);

        const movieGrid = document.createElement("div");
        movieGrid.classList.add("movie-grid");

        for (const movie of moviesByGeneration[generation]) {
            try {
                const data = await fetchMovieDetails(movie.title, movie.year);
                if (data) movieGrid.appendChild(createMovieCard(data));
            } catch (error) {
                console.error(`Error loading movie: ${movie.title}`, error);
            }
        }

        section.appendChild(movieGrid);
        container.appendChild(section);
    }
}

async function fetchMovieDetails(title, year) {
    try {
        const response = await fetch(`/.netlify/functions/get_movies?title=${encodeURIComponent(title)}&year=${year}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch (error) {
        console.error(`Fetch failed for: ${title}`, error);
        return null;
    }
}

function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="${movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Plot:</strong> ${movie.Plot || "No description available."}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating || "N/A"}</p>
    `;

    return card;
}
