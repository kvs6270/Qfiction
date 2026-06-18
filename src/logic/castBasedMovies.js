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

const directors = [
  "Christopher Nolan",
  "Denis Villeneuve",
  "Kathryn Bigelow",
  "David Fincher",
  "Greta Gerwig",
  "James Cameron"
];

const genres = ["action", "sci-fi", "thriller", "drama", "fantasy"];

function getSupportingCast(mainActor) {
  const otherActors = actors.filter(actor => actor !== mainActor);

  const shuffled = [...otherActors].sort(() => 0.5 - Math.random());

  const supporting = shuffled.slice(0, 2 + Math.floor(Math.random() * 2)); 
  // 2–3 actors

  return [mainActor, ...supporting];
}

function getRandomDirector() {
  return directors[Math.floor(Math.random() * directors.length)];
}

function generateMovies(actor, actorKey) {
  return Array.from({ length: 10 }, (_, i) => ({
    ID: `${actorKey}-movie-${i + 1}`,
    id: `${actorKey}-${i + 1}`,
    title: `${actorKey} Film ${i + 1}`,
    genre: genres[(i + actorKey.length) % genres.length],
    director: getRandomDirector(),   // added director property
    cast: getSupportingCast(actor),
    imdbRating: Number((6 + Math.random() * 3).toFixed(1)),
    votes: Math.floor(50000 + Math.random() * 900000)
  }));
}

export const castFilms = actors.reduce((acc, actor) => {
  const key = actor.replace(/\s+/g, "_").toLowerCase();
  acc[actor] = generateMovies(actor, key);
  return acc;
}, {});