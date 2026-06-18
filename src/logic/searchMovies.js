function getTitleArray(data) {

    return data.results
        // ❌ remove garbage entries
        .filter(movie => movie.poster_path && movie.release_date && movie.vote_count > 100)

        // ✅ transform into clean objects
        .map(movie => ({
            id: movie.id,
            Title: `${movie.title} (${movie.release_date.split("-")[0]})`,
            Popularity: movie.popularity,
            image: "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path,
            rating: movie.vote_average,
            vote: movie.vote_count

            
        }))
        .sort((a,b) => b.Popularity - a.Popularity)
        
        ;

}

export async function searchMovies(string) {
    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c";

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(string)}`
      );

      const data = await res.json();

      return getTitleArray(data)


}