document.addEventListener("DOMContentLoaded", loadMovies);

const aiMovies = [
  { title: "Metropolis", year: "1927"},
  { title: "The Day the Earth Stood Still", year: "1951"},
  { title: "Forbidden Planet", year: "1956"},
  { title: "Colossus: The Forbin Project", year: "1970"},
  { title: "Westworld", year: "1973"},
  { title: "Futureworld", year: "1976"},
  { title: "The Stepford Wives", year: "1975"},
  { title: "Demon Seed", year: "1977"},
  { title: "Blade Runner", year: "1982"},
  { title: "Tron", year: "1982"},
  { title: "The Terminator", year: "1984"},
  { title: "Electric Dreams", year: "1984"},
  { title: "D.A.R.Y.L.", year: "1985"},
  { title: "Short Circuit", year: "1986"},
  { title: "RoboCop", year: "1987"},
  { title: "Akira", year: "1988"},
  { title: "Total Recall", year: "1990"},
  { title: "RoboCop 2", year: "1990"},
  { title: "Terminator 2: Judgment Day", year: "1991"},
  { title: "Freejack", year: "1992"},
  { title: "RoboCop 3", year: "1993"},
  { title: "Ghost in the Shell", year: "1995"},
  { title: "The Lawnmower Man", year: "1992"},
  { title: "The Lawnmower Man 2: Beyond Cyberspace", year: "1996"},
  { title: "The Matrix", year: "1999"},
  { title: "The Thirteenth Floor", year: "1999"},
  { title: "Bicentennial Man", year: "1999"},
  { title: "The Matrix Reloaded", year: "2003"},
  { title: "The Matrix Revolutions", year: "2003"},
  { title: "A.I. Artificial Intelligence", year: "2001"},
  { title: "Minority Report", year: "2002"},
  { title: "I, Robot", year: "2004"},
  { title: "Stealth", year: "2005"},
   { title: "Transformers", year: "2007"},
    { title: "Transformers: Revenge of the Fallen", year: "2009"},
    { title: "Transformers: Dark of the Moon", year: "2011"},
    { title: "Transformers: Age of Extinction", year: "2014"},
    { title: "Transformers: The Last Knight", year: "2017"},
    { title: "Transformers: Bumblebee", year: "2018"},
    { title: "Transformers: Rise of the Beasts", year: "2023"},
  { title: "Eagle Eye", year: "2008"},
  { title: "Moon", year: "2009"},
  { title: "Surrogates", year: "2009"},
  { title: "Tron: Legacy", year: "2010"},
  { title: "Real Steel", year: "2011"},
  { title: "Her", year: "2013"},
  { title: "Transcendence", year: "2014"},
  { title: "Ex Machina", year: "2014"},
  { title: "Chappie", year: "2015"},
  { title: "Avengers: Age of Ultron", year: "2015"},
  { title: "Ghost in the Shell", year: "2017"},
  { title: "Blade Runner 2049", year: "2017"},
  { title: "Upgrade", year: "2018"},
  { title: "Alita: Battle Angel", year: "2019"},
  { title: "The Mitchells vs. The Machines", year: "2021"},
  { title: "M3GAN", year: "2023"},
  { title: "The Creator", year: "2023"}
];

let batchSize = 14; // Number of movies to load per batch
let startIndex = 0; // Index of the first movie to load
let allMoviesLoaded = false; // Flag to indicate if all movies are loaded

async function loadMovies() {
    const container = document.getElementById("movie-container");
    //Load More Div
    container.innerHTML = ""; // Clear previous content

    const movieGrid = document.createElement("div");
    movieGrid.classList.add("movie-grid");
    container.appendChild(movieGrid);

    loadMoreMovies(movieGrid); // Initial load

    // Load more movies on scroll
    window.addEventListener('scroll', () => {
        if (!allMoviesLoaded && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadMoreMovies(movieGrid);
        }
    });
}

async function loadMoreMovies(movieGrid) {
    const container = document.getElementById("movie-container");
    //Add and Load Batch Movies
    let endIndex = startIndex + batchSize;
    if (endIndex >= aiMovies.length) {
        endIndex = aiMovies.length;
        allMoviesLoaded = true;

        const loadMoreNotice = document.createElement("h2");
        loadMoreNotice.textContent = "More Titles are Coming Soon!";
        container.appendChild(loadMoreNotice);
    }

    for (let i = startIndex; i < endIndex; i++) {
        const movie = aiMovies[i];
        try {
            const data = await fetchMovieDetails(movie.title, movie.year);
            if (data) {
                movieGrid.appendChild(createMovieCard(data, movie.title + " " + movie.year + " trailer"));
            }
        } catch (error) {
            console.error(`Error loading movie: ${movie.title}`, error);
        }
    }
    container.appendChild(movieGrid);
    startIndex = endIndex; // Update the starting index for the next batch
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

function createMovieCard(movie, youtubeQuery) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Create the movie card content
    card.innerHTML = `
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}" target="_blank">
            <img src="${movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        </a>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Plot:</strong> ${movie.Plot || "No description available."}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating || "N/A"}</p>
    `;

    return card;
}
