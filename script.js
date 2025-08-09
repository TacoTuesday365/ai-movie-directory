document.addEventListener("DOMContentLoaded", loadApp);

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
  { title: "The Creator", year: "2023"}
];

function loadApp() {
    loadHero();
    loadCarousels();
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

async function loadHero() {
    const heroSection = document.getElementById("hero-section");
    const featuredMovie = aiMovies[Math.floor(Math.random() * aiMovies.length)];

    try {
        const movieDetails = await fetchMovieDetails(featuredMovie.title, featuredMovie.year);
        if (movieDetails) {
            heroSection.style.backgroundImage = `url(${movieDetails.Poster})`;
            heroSection.innerHTML = `
                <div class="hero-content">
                    <h2 class="hero-title">${movieDetails.Title}</h2>
                    <p class="hero-plot">${movieDetails.Plot}</p>
                    <p class="hero-rating">IMDb: ${movieDetails.imdbRating}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error loading hero movie:", error);
    }
}

function loadCarousels() {
    const carouselsContainer = document.getElementById("carousels-container");
    carouselsContainer.innerHTML = "";

    const categories = {
        "New Releases (2010s & 2020s)": movie => parseInt(movie.year) >= 2010,
        "Modern Classics (2000s)": movie => parseInt(movie.year) >= 2000 && parseInt(movie.year) < 2010,
        "Golden Age (1980s & 1990s)": movie => parseInt(movie.year) >= 1980 && parseInt(movie.year) < 2000,
        "Vintage AI (Pre-1980s)": movie => parseInt(movie.year) < 1980
    };

    // Sort movies by year descending for "New Releases", and ascending for others
    aiMovies.sort((a, b) => b.year - a.year);

    for (const [title, filterFn] of Object.entries(categories)) {
        const moviesForCarousel = aiMovies.filter(filterFn);
        if (moviesForCarousel.length > 0) {
            createCarousel(title, moviesForCarousel, carouselsContainer);
        }
    }
}

function createCarousel(title, movies, container) {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    const carouselTitle = document.createElement("h2");
    carouselTitle.classList.add("carousel-title");
    carouselTitle.textContent = title;

    const carouselContent = document.createElement("div");
    carouselContent.classList.add("carousel-content");

    movies.forEach(async movie => {
        try {
            const movieDetails = await fetchMovieDetails(movie.title, movie.year);
            if (movieDetails) {
                const card = createMovieCard(movieDetails);
                carouselContent.appendChild(card);
            }
        } catch (error) {
            console.error(`Error loading movie for carousel: ${movie.title}`, error);
        }
    });

    carousel.appendChild(carouselTitle);
    carousel.appendChild(carouselContent);
    container.appendChild(carousel);
}

function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const youtubeQuery = `${movie.Title} ${movie.Year} trailer`;
    card.innerHTML = `
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}" target="_blank">
            <img src="${movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <div class="movie-card-content">
                <h3>${movie.Title}</h3>
                <p>IMDb: ${movie.imdbRating || "N/A"}</p>
            </div>
        </a>
    `;
    return card;
}
