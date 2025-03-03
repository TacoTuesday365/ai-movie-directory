// Array of AI-themed movies
const movies = [
    {
        title: "The Matrix",
        year: 1999,
        director: "The Wachowskis",
        image: "https://via.placeholder.com/200x300?text=Matrix",
        description: "A hacker discovers the reality he knows is a simulation controlled by AI."
    },
    {
        title: "Ex Machina",
        year: 2014,
        director: "Alex Garland",
        image: "https://via.placeholder.com/200x300?text=Ex+Machina",
        description: "A programmer is invited to administer a Turing test to an advanced AI."
    },
    {
        title: "Blade Runner 2049",
        year: 2017,
        director: "Denis Villeneuve",
        image: "https://via.placeholder.com/200x300?text=Blade+Runner+2049",
        description: "A blade runner unearths a secret that could reshape society."
    },
    {
        title: "Her",
        year: 2013,
        director: "Spike Jonze",
        image: "https://via.placeholder.com/200x300?text=Her",
        description: "A lonely writer develops a deep relationship with an AI operating system."
    },
    {
        title: "A.I. Artificial Intelligence",
        year: 2001,
        director: "Steven Spielberg",
        image: "https://via.placeholder.com/200x300?text=AI",
        description: "A robotic boy longs to become real in a futuristic world."
    }
];

// Function to get all movies
function getMovies() {
    return movies;
}

// Exporting movies data (for future module use)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getMovies };
}
