document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("movies-container");

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img class="movie-poster" src="${movie.poster}" alt="${movie.title} Poster">
            <div class="movie-info">
                <h2 class="movie-title">${movie.title}</h2>
                <a class="trailer-button" href="${movie.trailer}" target="_blank">Watch Trailer</a>
            </div>
        `;

        container.appendChild(card);
    });
});
