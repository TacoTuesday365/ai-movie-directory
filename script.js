document.addEventListener("DOMContentLoaded", loadMovies);

const aiMovies = [
    { title: "Metropolis", year: "1927", trailer: "https://www.youtube.com/watch?v=gXjGPUuyNaY" },
    { title: "The Day the Earth Stood Still", year: "1951", trailer: "https://www.youtube.com/watch?v=jSpowoK-sc4" },
    { title: "Forbidden Planet", year: "1956", trailer: "https://www.youtube.com/watch?v=867t_Jzkt78" },
    { title: "Colossus: The Forbin Project", year: "1970", trailer: "https://www.youtube.com/watch?v=7zkvx8rkEUU" },
    { title: "Westworld", year: "1973", trailer: "https://www.youtube.com/watch?v=IuS5guSOokM" },
    { title: "The Stepford Wives", year: "1975", trailer: "https://www.youtube.com/watch?v=juH4KIJ2nl8" },
    { title: "Demon Seed", year: "1977", trailer: "https://www.youtube.com/watch?v=EYY8kt_Vv8w" },
    { title: "Blade Runner", year: "1982", trailer: "https://www.youtube.com/watch?v=rrpVG0AuVeU" },
    { title: "Tron", year: "1982", trailer: "https://www.youtube.com/watch?v=vgh5Kj6k5gQ" },
    { title: "The Terminator", year: "1984", trailer: "https://www.youtube.com/watch?v=k64P4l2Wmeg" },
    { title: "Electric Dreams", year: "1984", trailer: "https://www.youtube.com/watch?v=O-gM0zsTvsg" },
    { title: "D.A.R.Y.L.", year: "1985", trailer: "https://www.youtube.com/watch?v=YyHSdzmGl3s" },
    { title: "Short Circuit", year: "1986", trailer: "https://www.youtube.com/watch?v=hP0mZt4TvNM" },
    { title: "RoboCop", year: "1987", trailer: "https://www.youtube.com/watch?v=EDCPs2jk0EQ" },
    { title: "Akira", year: "1988", trailer: "https://www.youtube.com/watch?v=wU-fqr682w4" },
    { title: "Total Recall", year: "1990", trailer: "https://www.youtube.com/watch?v=jUhDXqN8j9I" },
    { title: "Terminator 2: Judgment Day", year: "1991", trailer: "https://www.youtube.com/watch?v=CRRlbK5w8KE" },
    { title: "Ghost in the Shell", year: "1995", trailer: "https://www.youtube.com/watch?v=SvBVDibG94g" },
    { title: "The Matrix", year: "1999", trailer: "https://www.youtube.com/watch?v=vKQi3jnLgZg" },
    { title: "Bicentennial Man", year: "1999", trailer: "https://www.youtube.com/watch?v=UvH1dP5O2wI" },
    { title: "A.I. Artificial Intelligence", year: "2001", trailer: "https://www.youtube.com/watch?v=oNS9ITeE09Y" },
    { title: "Minority Report", year: "2002", trailer: "https://www.youtube.com/watch?v=report" },
    { title: "I, Robot", year: "2004", trailer: "https://www.youtube.com/watch?v=G9vM0wM3bOE" },
    { title: "Stealth", year: "2005", trailer: "https://www.youtube.com/watch?v=dlBzqF09e7o" },
    { title: "Eagle Eye", year: "2008", trailer: "https://www.youtube.com/watch?v=v0w5ndlJZy4" },
    { title: "Moon", year: "2009", trailer: "https://www.youtube.com/watch?v=twuPUR0-tNA" },
    { title: "Her", year: "2013", trailer: "https://www.youtube.com/watch?v=WzV6mXkJz9s" },
    { title: "Ex Machina", year: "2014", trailer: "https://www.youtube.com/watch?v=EoogT_XQ5wI" },
    { title: "Chappie", year: "2015", trailer: "https://www.youtube.com/watch?v=lyu7v7nWzfo" },
    { title: "Avengers: Age of Ultron", year: "2015", trailer: "https://www.youtube.com/watch?v=tmeOjFno6Do" },
    { title: "Ghost in the Shell", year: "2017", trailer: "https://www.youtube.com/watch?v=G4VmJcRr0Yg" },
    { title: "Blade Runner 2049", year: "2017", trailer: "https://www.youtube.com/watch?v=gCcx85zBXKY" },
    { title: "Upgrade", year: "2018", trailer: "https://www.youtube.com/watch?v=36z9G-gWjIU" },
    { title: "The Mitchells vs. The Machines", year: "2021", trailer: "https://www.youtube.com/watch?v=N_pb4Aq9J1c" },
    { title: "M3GAN", year: "2023", trailer: "https://www.youtube.com/watch?v=SVW46cKet8c" },
    { title: "The Creator", year: "2023", trailer: "https://www.youtube.com/watch?v=ex3WrZTEAw4" }
];
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
