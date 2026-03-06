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

const genres = ["action", "sci-fi", "thriller", "drama", "fantasy"];

function getRandomCast() {
  const shuffled = [...actors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3); // 3 random actors
}

function generateDirectorMovies(director, directorKey) {
  return Array.from({ length: 10 }, (_, i) => ({
    ID: `${directorKey}-movie-${i + 1}`,
    id: `${directorKey}-${i + 1}`,
    title: `${directorKey} Film ${i + 1}`,
    genre: genres[(i + directorKey.length) % genres.length],
    director: director,                 // added director property
    cast: getRandomCast(),
    imdbRating: Number((6 + Math.random() * 3).toFixed(1)),
    votes: Math.floor(50000 + Math.random() * 900000)
  }));
}

export const directorFilms = directors.reduce((acc, director) => {
  const key = director.replace(/\s+/g, "_").toLowerCase();
  acc[director] = generateDirectorMovies(director, key);
  return acc;
}, {});