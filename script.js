document.addEventListener("DOMContentLoaded", loadMovies);

const aiMovies = [
  { title: "Metropolis", year: "1927", series: "Metropolis", sortOrder: 1 },
  { title: "The Day the Earth Stood Still", year: "1951", series: "The Day the Earth Stood Still", sortOrder: 1 },
  { title: "Forbidden Planet", year: "1956", series: "Forbidden Planet", sortOrder: 1 },
  { title: "Colossus: The Forbin Project", year: "1970", series: "Colossus", sortOrder: 1 },
  { title: "Westworld", year: "1973", series: "Westworld", sortOrder: 1 },
  { title: "Futureworld", year: "1976", series: "Westworld", sortOrder: 2 },  // Sequel
  { title: "The Stepford Wives", year: "1975", series: "The Stepford Wives", sortOrder: 1 },
  { title: "Demon Seed", year: "1977", series: "Demon Seed", sortOrder: 1 },
  { title: "Blade Runner", year: "1982", series: "Blade Runner", sortOrder: 1 },
  { title: "Blade Runner 2049", year: "2017", series: "Blade Runner", sortOrder: 2},
  { title: "Tron", year: "1982", series: "Tron", sortOrder: 1 },
  { title: "Tron: Legacy", year: "2010", series: "Tron", sortOrder: 2 },
  { title: "The Terminator", year: "1984", series: "Terminator", sortOrder: 1 },
  { title: "Terminator 2: Judgment Day", year: "1991", series: "Terminator", sortOrder: 2 },
  { title: "Electric Dreams", year: "1984", series: "Electric Dreams", sortOrder: 1 },
  { title: "D.A.R.Y.L.", year: "1985", series: "D.A.R.Y.L.", sortOrder: 1 },
  { title: "Short Circuit", year: "1986", series: "Short Circuit", sortOrder: 1 },
  { title: "RoboCop", year: "1987", series: "RoboCop", sortOrder: 1 },
  { title: "RoboCop 2", year: "1990", series: "RoboCop", sortOrder: 2 },
  { title: "RoboCop 3", year: "1993", series: "RoboCop", sortOrder: 3 },
  { title: "Akira", year: "1988", series: "Akira", sortOrder: 1 },
  { title: "Total Recall", year: "1990", series: "Total Recall", sortOrder: 1 },
  { title: "Freejack", year: "1992", series: "Freejack", sortOrder: 1 },
  { title: "Ghost in the Shell", year: "1995", series: "Ghost in the Shell", sortOrder: 1 },
  { title: "The Lawnmower Man", year: "1992", series: "The Lawnmower Man", sortOrder: 1 },
  { title: "The Lawnmower Man 2: Beyond Cyberspace", year: "1996", series: "The Lawnmower Man", sortOrder: 2 },
  { title: "The Matrix", year: "1999", series: "Matrix", sortOrder: 1 },
  { title: "The Matrix Reloaded", year: "2003", series: "Matrix", sortOrder: 2 },
  { title: "The Matrix Revolutions", year: "2003", series: "Matrix", sortOrder: 3 },
  { title: "The Thirteenth Floor", year: "1999", series: "The Thirteenth Floor", sortOrder: 1 },
  { title: "Bicentennial Man", year: "1999", series: "Bicentennial Man", sortOrder: 1 },
  { title: "A.I. Artificial Intelligence", year: "2001", series: "A.I.", sortOrder: 1 },
  { title: "Minority Report", year: "2002", series: "Minority Report", sortOrder: 1 },
  { title: "I, Robot", year: "2004", series: "I, Robot", sortOrder: 1 },
  { title: "Stealth", year: "2005", series: "Stealth", sortOrder: 1 },
   { title: "Transformers", year: "2007", series: "Transformers", sortOrder: 1},
    { title: "Transformers: Revenge of the Fallen", year: "2009",series: "Transformers", sortOrder: 2},
    { title: "Transformers: Dark of the Moon", year: "2011",series: "Transformers", sortOrder: 3},
    { title: "Transformers: Age of Extinction", year: "2014",series: "Transformers", sortOrder: 4},
    { title: "Transformers: The Last Knight", year: "2017",series: "Transformers", sortOrder: 5},
    { title: "Transformers: Bumblebee", year: "2018",series: "Transformers", sortOrder: 6},
    { title: "Transformers: Rise of the Beasts", year: "2023", series: "Transformers", sortOrder: 7},
  { title: "Eagle Eye", year: "2008", series: "Eagle Eye", sortOrder: 1 },
  { title: "Moon", year: "2009", series: "Moon", sortOrder: 1 },
  { title: "Surrogates", year: "2009", series: "Surrogates", sortOrder: 1 },
  { title: "Tron: Legacy", year: "2010", series: "Tron", sortOrder: 2 },
  { title: "Real Steel", year: "2011", series: "Real Steel", sortOrder: 1 },
  { title: "Her", year: "2013", series: "Her", sortOrder: 1 },
  { title: "Transcendence", year: "2014", series: "Transcendence", sortOrder: 1 },
  { title: "Ex Machina", year: "2014", series: "Ex Machina", sortOrder: 1 },
  { title: "Chappie", year: "2015", series: "Chappie", sortOrder: 1 },
  { title: "Avengers: Age of Ultron", year: "2015", series: "Avengers", sortOrder: 1 },
  { title: "Ghost in the Shell", year: "2017", series: "Ghost in the Shell", sortOrder: 1 },
  { title: "Blade Runner 2049", year: "2017", series: "Blade Runner", sortOrder: 2 },
  { title: "Upgrade", year: "2018", series: "Upgrade", sortOrder: 1 },
  { title: "Alita: Battle Angel", year: "2019", series: "Alita", sortOrder: 1 },
  { title: "The Mitchells vs. The Machines", year: "2021", series: "The Mitchells vs. The Machines", sortOrder: 1 },
  { title: "M3GAN", year: "2023", series: "M3GAN", sortOrder: 1 },
  { title: "The Creator", year: "2023", series: "The Creator", sortOrder: 1 }
];

async function loadMovies() {
  const container = document.getElementById("movie-container");
  container.innerHTML = ""; // Clear previous content

  // Sort movies first by Series, then by SortOrder
  aiMovies.sort((a, b) => {
    if (a.series < b.series) return -1; // Sort by series name
    if (a.series > b.series) return 1;
    return a.sortOrder - b.sortOrder; // Then sort by sortOrder
  });

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  for (const movie of aiMovies) {
    try {
      const data = await fetchMovieDetails(movie.title, movie.year);
      if (data) movieGrid.appendChild(createMovieCard(data, movie.title + " " + movie.year + " trailer"));
    } catch (error) {
      console.error(`Error loading movie: ${movie.title}`, error);
    }
  }

  container.appendChild(movieGrid);
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
