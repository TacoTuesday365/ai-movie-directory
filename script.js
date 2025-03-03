document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const movieList = document.getElementById("movie-list");

  if (!searchInput || !movieList) {
    console.error("Missing search input or movie list container!");
    return;
  }

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const query = event.target.value.trim();
      if (query) {
        fetchMovies(query);
      }
    }
  });

  function fetchMovies(searchQuery) {
    const API_KEY = "16746966";
    const BASE_URL = "https://www.omdbapi.com/";
    const url = `${BASE_URL}?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True" && data.Search) {
          displayMovies(data.Search);
        } else {
          console.error("OMDb API error:", data.Error);
          movieList.innerHTML = `<p>No movies found: ${data.Error}</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        movieList.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
      });
  }

  function displayMovies(movies) {
    movieList.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
      const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
        <img src="${poster}" alt="${movie.Title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/200x300?text=No+Image';">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
      `;
      movieList.appendChild(movieCard);
    });
  }
});
