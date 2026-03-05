import { movieDB } from "./Mock_Movie_DB.js";
import {movieOrganizer} from "./ReccomendationAlgorithm.js"


function moviesForYou (inputDB, outputDB, topGenreNum, topCastNum, topDirectorNum,) {

    const finalReccList = movieOrganizer(inputDB, outputDB).finalReccList


   

    


    const genreBasedObj = {};


    const genreReccStrength = movieOrganizer(inputDB).genreReccStrength;

    

    const genreReccStrengthArray = [];

    for (let genre in genreReccStrength) {
        genreReccStrengthArray.push({"genre": genre, "score": genreReccStrength[genre]});
    }

    genreReccStrengthArray.sort((a,b) => {
        return -(a.score - b.score);
    }).splice(topGenreNum)

    genreReccStrengthArray.forEach(item => {
        genreBasedObj[item.genre] = finalReccList.filter((movie) => {
           
            return movie.genres.includes(item.genre);
        })
    })

    


    const directorBasedObj = {};

    const directorReccStrength = movieOrganizer(inputDB).directorReccStrength;

    const directorReccStrengthArray = [];

    for (let director in directorReccStrength) {
        directorReccStrengthArray.push({"director": director, "score": directorReccStrength[director]});
    }

    directorReccStrengthArray.sort((a,b) => {
        return -(a.score - b.score);
    }).splice(topDirectorNum)

    


   

    directorReccStrengthArray.forEach(item => {
        directorBasedObj[item.director] = finalReccList.filter((movie) => {
            return movie.director == item.director;
        })
    
    })

    

        

    
    const castBasedObj = {};

    const castReccStrength = movieOrganizer(inputDB).castReccStrength;

    const castReccStrengthArray = [];

    for (let cast in castReccStrength) {
        castReccStrengthArray.push({"cast": cast, "score": castReccStrength[cast]});
    }

    castReccStrengthArray.sort((a,b) => {
        return -(a.score - b.score);
    }).splice(topCastNum)

    castReccStrengthArray.forEach(item => {
        castBasedObj[item.cast] = finalReccList.filter((movie) => {
            return movie.cast.includes(item.cast);
        })
    })

    
    return {genreBasedObj, castBasedObj, directorBasedObj, genreReccStrengthArray, castReccStrengthArray, directorReccStrengthArray}

    

    
}

console.log(moviesForYou(movieDB, movieDB, 10, 10, 10).genreBasedObj)



