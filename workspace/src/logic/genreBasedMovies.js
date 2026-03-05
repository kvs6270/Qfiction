const directors = [
  "Christopher Nolan",
  "Denis Villeneuve",
  "Kathryn Bigelow",
  "David Fincher",
  "Greta Gerwig",
  "James Cameron"
];

const actors = [
  "Leonardo DiCaprio",
  "Scarlett Johansson",
  "Ryan Gosling",
  "Zendaya",
  "Timothee Chalamet",
  "Emily Blunt",
  "Michael B. Jordan",
  "Margot Robbie",
  "Oscar Isaac",
  "Florence Pugh",
  "Cillian Murphy",
  "Ana de Armas"
];

function generateMovies(genre, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${genre}-${i + 1}`,
    title: `${genre.toUpperCase()} Film ${i + 1}`,
    genre: genre,
    director: directors[(i + genre.length) % directors.length],
    cast: [
      actors[(i * 2) % actors.length],
      actors[(i * 2 + 3) % actors.length],
      actors[(i * 2 + 5) % actors.length]
    ],
    imdbRating: Number((6.8 + Math.random() * 2.4).toFixed(1)),
    votes: 1000 + Math.floor(Math.random() * 90000)
  }));
}

export const genreFilms = {
  action: generateMovies("action", 500),
  scifi: generateMovies("scifi", 500),
  drama: generateMovies("drama", 500)
};

