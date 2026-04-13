const IMG = "https://image.tmdb.org/t/p/w1280";

function getCleanMovies(data) {
    return data.results
        // ❌ remove garbage entries
        .filter(movie => movie.poster_path && movie.release_date)

        // ✅ transform into clean objects
        .map(movie => ({
            id: movie.id,
        }));
}


export function creditCleaner(data) {


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


    return data.filter(movie => movie.status == "fulfilled").map(movie => {


        return ({
            id: movie.value.id,
            title: movie.value.title,
            year: movie.value.release_date.split("-")[0],
            imdbRating: movie.value.vote_average,
            votes: movie.value.vote_count,

            poster: IMG + movie.value.poster_path,
            backdrop: movie.value.backdrop_path
                ? IMG + movie.value.backdrop_path
                : null,

            overview: movie.value.overview,
            genres: movie.value.genres[0].id,
            cast: top3CastFinder(movie.value),
            director: directorFinder(movie.value)

        })

    });
}






export async function fetchFunc(param, page, paramType) {

    paramType = paramType.toLowerCase();

    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c"
    const baseUrl = "https://api.themoviedb.org/3";

    let result;


    switch (paramType) {
        case "year":
            result = await fetch(`${baseUrl}/discover/movie?api_key=${API_KEY}&primary_release_year=${param}&page=${page}`)


            break;


        case "genre":


            result = await fetch(`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=${param}&page=${page}`)


            break;


        case "cast":
            result = await fetch(`${baseUrl}/discover/movie?api_key=${API_KEY}&with_cast=${param}&page=${page}`)
            break;



        case "director":
            result = await fetch(`${baseUrl}/discover/movie?api_key=${API_KEY}&with_crew=${param}&page=${page}`)
            break;
    }




    if (!result.ok) {
        throw new Error(`Error: ${result.status}`)
    }

    const data = await result.json();


    const finalMovieArray = await castArrayAppender(getCleanMovies(data), baseUrl, API_KEY);




    return finalMovieArray;



}


async function castArrayAppender(movieObjArray, baseUrl, API_KEY) {

    const promisesArray = movieObjArray.map(movieObj => {


        return fetch(`${baseUrl}/movie/${movieObj.id}?api_key=${API_KEY}&append_to_response=credits`)
            .then(res => res.json());


    });

    const credits = await Promise.allSettled(promisesArray)


    

    console.log("credits")
    console.log(credits)


    return creditCleaner(credits);

}




