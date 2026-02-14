import { movieDB } from "./Mock_Movie_DB.js";
import {movieOrganizer} from "./ReccomendationAlgorithm.js"


export default function currentYearStuff() {

const currentYear = new Date().getFullYear();

const reccList = movieOrganizer(movieDB, movieDB).finalReccList



let currentYearReccList = reccList.filter(item => {
    
    return item.releaseYear == currentYear;
})


let currentYearTopRatedList = currentYearReccList.sort((a, b) => {
    return -(a.imdbRating - b.imdbRating);
})

return {currentYearReccList,currentYearTopRatedList};

}


