const directors = [
  
  "Kathryn Bigelow",  
  "James Cameron",
  "Christopher Nolan",
  "Greta Gerwig",
  "Denis Villeneuve",
   "David Fincher",
];

const actors = [
  
  "Timothee Chalamet",
  "Zendaya",
  "Margot Robbie",
  "Oscar Isaac",
  
  "Emily Blunt",
  "Michael B. Jordan",

  "Leonardo DiCaprio",
  "Ana de Armas",
  "Florence Pugh",
  "Cillian Murphy",

  "Scarlett Johansson",
  "Ryan Gosling",
  
];

const genres = ["action", "scifi", "drama"];

export const films2026 = Array.from({ length: 50 }, (_, i) => ({
  id: `movie-${i + 1}`,
  title: `Film ${i + 1}`,
  genre: genres[i % genres.length],
  director: directors[i % directors.length],
  cast: [
    actors[(i * 2) % actors.length],
    actors[(i * 2 + 3) % actors.length],
    actors[(i * 2 + 5) % actors.length]
  ],
  imdbRating: Number((6.8 + Math.random() * 2.4).toFixed(1)),
  votes: 1000 + Math.floor(Math.random() * 90000)
}));