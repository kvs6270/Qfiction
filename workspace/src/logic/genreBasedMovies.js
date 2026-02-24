export const genreFilms = {
  action: Array.from({ length: 50 }, (_, i) => ({
    title: `Action Film ${i + 1}`,
    imdbRating: Number((6.5 + Math.random() * 2.5).toFixed(1)),
    votes: i % 7 === 0
      ? Math.floor(200 + Math.random() * 700)     // seldom (<1000)
      : Math.floor(1500 + Math.random() * 25000)  // frequent (>1000)
  })),

  drama: Array.from({ length: 50 }, (_, i) => ({
    title: `Drama Film ${i + 1}`,
    imdbRating: Number((7.0 + Math.random() * 2.0).toFixed(1)),
    votes: i % 6 === 0
      ? Math.floor(150 + Math.random() * 800)
      : Math.floor(2000 + Math.random() * 30000)
  })),

  sciFi: Array.from({ length: 50 }, (_, i) => ({
    title: `Sci-Fi Film ${i + 1}`,
    imdbRating: Number((6.8 + Math.random() * 2.7).toFixed(1)),
    votes: i % 8 === 0
      ? Math.floor(100 + Math.random() * 900)
      : Math.floor(1800 + Math.random() * 40000)
  }))
};