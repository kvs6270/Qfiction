import { movieDB } from "./Mock_Movie_DB.js";



export function movieOrganizer(inputDB, outputDB = []) {


    let genreReccStrength = {}


    let directorReccStrength = {}


    let castReccStrength = {}

    let reccList = [];



    inputDB.forEach(item => {
        item.genres.forEach(genre => {
            if (genre in genreReccStrength) {
                ++genreReccStrength[genre];
            }

            else {
                genreReccStrength[genre] = 1;
            }
        })


    })




    inputDB.forEach(item => {

        if (item.director in directorReccStrength) {
            ++directorReccStrength[item.director]
        }

        else {
            directorReccStrength[item.director] = 1;
        }



    })

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


    outputDB.forEach((item, index) => {

        reccList.push({
            "Name": item.title,
            "Score": 0
        })

        item.genres.forEach(genre => {
            reccList[index].Score = reccList[index].Score + 1 * genreReccStrength[genre]
        })

        reccList[index].Score = reccList[index].Score + 1 * directorReccStrength[item.director]

        item.cast.forEach(cast => {
            reccList[index].Score = reccList[index].Score + 1 * castReccStrength[cast]
        })

    })


    reccList.sort((a, b) => {
        return (-(a.Score - b.Score));
    })




    let finalReccList = reccList.map((item, index) => {

        let result = outputDB.find((item2) => {
            return (item.Name == item2.title);
        })


        return { result };

    })

    return { finalReccList, genreReccStrength, castReccStrength, directorReccStrength };


}


























