import { movieDB } from "./Mock_Movie_DB.js";
import { films2026 } from "./movies2026.js";


const sampleMovies = [
    {
        id: "movie-1",
        title: "Crimson Pursuit",
        genre: "action",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Cillian Murphy", "Emily Blunt"],
        imdbRating: 8.1,
        votes: 45231
    },
    {
        id: "movie-2",
        title: "Iron Protocol",
        genre: "action",
        director: "Kathryn Bigelow",
        cast: ["Michael B. Jordan", "Scarlett Johansson", "Oscar Isaac"],
        imdbRating: 7.6,
        votes: 18344
    },
    {
        id: "movie-3",
        title: "Shadow Extraction",
        genre: "action",
        director: "Christopher Nolan",
        cast: ["Ryan Gosling", "Emily Blunt", "Margot Robbie"],
        imdbRating: 7.9,
        votes: 22104
    },
    {
        id: "movie-4",
        title: "Steel Horizon",
        genre: "action",
        director: "Denis Villeneuve",
        cast: ["Timothee Chalamet", "Zendaya", "Oscar Isaac"],
        imdbRating: 8.3,
        votes: 50912
    },
    {
        id: "movie-5",
        title: "Nebula Rising",
        genre: "scifi",
        director: "Denis Villeneuve",
        cast: ["Zendaya", "Timothee Chalamet", "Florence Pugh"],
        imdbRating: 8.4,
        votes: 61255
    }
];




export function movieOrganizer(inputDB, outputDB = [], topGenreNum = 5, topDirectorNum = 5, topCastNum = 5) {

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }


    let genreReccStrength = {}


    let directorReccStrength = {}


    let castReccStrength = {}

    let reccList = [];



    inputDB.forEach(item => {

        if (item.genre in genreReccStrength) {
            ++genreReccStrength[item.genre];
        }

        else {
            genreReccStrength[item.genre] = 1;
        }



    })

    const genreReccStrengthArray = [];

    for (let genre in genreReccStrength) {
        genreReccStrengthArray.push({ "genre": genre, "score": genreReccStrength[genre] });
    }

    genreReccStrengthArray.sort((a, b) => {
        return -(a.score - b.score);
    }).slice(0, topGenreNum)





    inputDB.forEach(item => {

        if (item.director in directorReccStrength) {
            ++directorReccStrength[item.director]
        }

        else {
            directorReccStrength[item.director] = 1;
        }



    })

    const directorReccStrengthArray = [];

    for (let director in directorReccStrength) {
        directorReccStrengthArray.push({ "director": director, "score": directorReccStrength[director] });
    }

    directorReccStrengthArray.sort((a, b) => {
        return -(a.score - b.score);
    }).slice(0, topDirectorNum)





    inputDB.forEach(item => {
        item.cast.forEach(actor => {
            if (actor in castReccStrength) {
                ++castReccStrength[actor]
            }

            else {
                castReccStrength[actor] = 1;
            }
        })
    })

    const castReccStrengthArray = [];

    for (let cast in castReccStrength) {
        castReccStrengthArray.push({ "cast": cast, "score": castReccStrength[cast] });
    }

    castReccStrengthArray.sort((a, b) => {
        return -(a.score - b.score);
    }).slice(0, topCastNum)






    outputDB.forEach((item, index) => {

        reccList.push({
            movie: item,
            Score: 0
        })


        reccList[index].Score += 1 * (genreReccStrength[item.genre] || 0)
        reccList[index].Score += 5 * (directorReccStrength[item.director] || 0)

        item.cast.forEach(actor => {
            reccList[index].Score += 3 * (castReccStrength[actor] || 0)
        })

    })


    reccList.sort((a, b) => {
        return b.Score - a.Score;
    })




    let finalReccList = reccList.map(item => item.movie);


    return { finalReccList, genreReccStrengthArray, castReccStrengthArray, directorReccStrengthArray };


}


// console.log(movieOrganizer(sampleMovies, films2026).genreReccStrengthArray)
// console.log(movieOrganizer(sampleMovies, films2026).castReccStrengthArray)
// console.log(movieOrganizer(sampleMovies, films2026).directorReccStrengthArray)
console.log(movieOrganizer(sampleMovies, films2026).finalReccList)





























