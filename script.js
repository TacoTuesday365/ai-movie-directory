// script.js

// Your activated OMDb API key
const API_KEY = '16746966';
const BASE_URL = 'https://www.omdbapi.com/';

// Function to fetch movies based on the search query
function fetchMovies(searchQuery) {
  if (!searchQuery || searchQuery.trim() === "") {
    console.log("Empty search query.");
    return;
  }
  
  // Construct the API URL
  const url = `${BASE_URL}?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`;
  console.log("Fetching:", url);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True" && data.Search) {
        displayMovies(data.Search);
      } else {
        console.error("OMDb API error:", data.Error);
        document.getElementById("movie-list").innerHTML = `<p>No movies found: ${data.Error}</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
      document.getElementById("movie-list").innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
    });
}

// Function to display movies on the page
function displayMovies(movies) {
  const container = document.getElementById("movie-list");
  container.innerHTML = ""; // Clear any previous results

  movies.forEach(movie => {
    // Use the poster URL from the API if available; otherwise, use a default placeholder image.
    const poster = (movie.Poster && movie.Poster !== "N/A") 
                    ? movie.Poster 
                    : "https://via.placeholder.com/200x300?text=No+Image";
    
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.Title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/200x300?text=No+Image';">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    container.appendChild(movieCard);
  });
}

// Add event listener to the search input field
document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const query = event.target.value;
    fetchMovies(query);
  }
});
