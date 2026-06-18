const IMG = "https://image.tmdb.org/t/p/w1280";

function creditCleaner(movie) {


    function top3CastFinder(movie) {

        return movie.credits.cast
            .filter(cast => cast.known_for_department === "Acting")
            .slice(0, 3)
            .map(cast => cast.id);
    }
    function directorFinder(movie) {

        let directorArray = movie.credits.crew
            .filter(crewMember => crewMember.known_for_department === "Directing")
            .map(crew => crew.id);

        function getMostFrequent(arr) {
            const counts = new Map();

            // count occurrences
            for (const item of arr) {
                counts.set(item, (counts.get(item) || 0) + 1);
            }

            let maxCount = 0;
            let result = null;

            for (const [item, count] of counts.entries()) {
                if (count > maxCount) {
                    maxCount = count;
                    result = item;
                }
            }

            // if everything appears only once → return null
            return maxCount > 1 ? result : null;
        }

        let director = getMostFrequent(directorArray);

        if (director) {
            return director
        }
        else{
            return directorArray[0]
        }
    }


  
      return ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date.split("-")[0],
            releaseDate: movie.release_date,
            imdbRating: movie.vote_average,
            votes: movie.vote_count,
            popularity: movie.popularity,

            poster: IMG + movie.poster_path,
            backdrop: movie.backdrop_path
                ? IMG + movie.backdrop_path
                : null,

            overview: movie.overview,
            genres: movie.genres[0].id,
            cast: top3CastFinder(movie),
            director: directorFinder(movie),
            country: movie.origin_country.join("/") ,
            lang: movie.original_language,
            showkeyGenre: movie.genres.slice(0,2).map((obj) => obj.name).join("/"),
            studio: movie.production_companies.map((obj) => obj.name),
            budget: movie.budget,
            castArray: movie.credits.cast.map((obj) => ({name: obj.name, character: obj.character, profile: IMG + obj.profile_path}))



            

        })
    


        

    
}

export async function fetchMovie(movieId) {

    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c"
    const  baseUrl = "https://api.themoviedb.org/3";
  const res = await fetch(
    `${baseUrl}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();

  
  console.log(data)

  console.log(creditCleaner(data))

  return creditCleaner(data);
}