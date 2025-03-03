document.addEventListener("DOMContentLoaded", () => {
    const movieContainer = document.getElementById("movie-container");

    // Movies grouped by generation
    const moviesByGeneration = {
        "Silent Generation (1928–1945)": [
            { title: "Metropolis", year: 1927, poster: "https://upload.wikimedia.org/wikipedia/en/6/6c/Metropolisposter.jpg" }
        ],
        "Baby Boomers (1946–1964)": [
            { title: "2001: A Space Odyssey", year: 1968, poster: "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png" },
            { title: "The Stepford Wives", year: 1975, poster: "https://upload.wikimedia.org/wikipedia/en/7/76/The_Stepford_Wives_1975.jpg" }
        ],
        "Generation X (1965–1980)": [
            { title: "Blade Runner", year: 1982, poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Blade_Runner_poster.jpg" },
            { title: "The Terminator", year: 1984, poster: "https://upload.wikimedia.org/wikipedia/en/7/70/Terminator1984movieposter.jpg" },
            { title: "RoboCop", year: 1987, poster: "https://upload.wikimedia.org/wikipedia/en/3/39/RoboCop_%281987%29_theatrical_poster.jpg" }
        ],
        "Millennials (1981–1996)": [
            { title: "The Matrix", year: 1999, poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg" },
            { title: "A.I. Artificial Intelligence", year: 2001, poster: "https://upload.wikimedia.org/wikipedia/en/e/e6/AI_Poster.jpg" },
            { title: "I, Robot", year: 2004, poster: "https://upload.wikimedia.org/wikipedia/en/3/3b/Movie_poster_i_robot.jpg" }
        ],
        "Generation Z (1997–2012)": [
            { title: "Ex Machina", year: 2014, poster: "https://upload.wikimedia.org/wikipedia/en/b/ba/Ex_Machina_%282015%29.png" },
            { title: "Her", year: 2013, poster: "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg" },
            { title: "Avengers: Age of Ultron", year: 2015, poster: "https://upload.wikimedia.org/wikipedia/en/1/1b/Avengers_Age_of_Ultron.jpg" }
        ],
        "Generation Alpha (2013–2025)": [
            { title: "M3GAN", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/a/a2/M3GAN_Poster.jpg" },
            { title: "The Creator", year: 2023, poster: "https://upload.wikimedia.org/wikipedia/en/4/4e/The_Creator_%282023%29_poster.jpg" }
        ]
    };

    function displayMovies() {
        movieContainer.innerHTML = ""; // Clear existing content

        for (const generation in moviesByGeneration) {
            const section = document.createElement("div");
            section.classList.add("generation-section");

            const header = document.createElement("h2");
            header.textContent = generation;
            section.appendChild(header);

            const movieGrid = document.createElement("div");
            movieGrid.classList.add("movie-grid");

            moviesByGeneration[generation].forEach(movie => {
                const card = document.createElement("div");
                card.classList.add("movie-card");

                card.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>Year: ${movie.year}</p>
                `;

                movieGrid.appendChild(card);
            });

            section.appendChild(movieGrid);
            movieContainer.appendChild(section);
        }
    }

    displayMovies();
});
