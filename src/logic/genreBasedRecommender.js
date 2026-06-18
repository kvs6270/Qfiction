import { movieDB } from "./Mock_Movie_DB.js";



export function genreBasedRecommender(inputDB, outputDB) {

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }




    let directorReccStrength = {}


    let castReccStrength = {}

    let reccList = [];









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
            movie: item,
            Score: 0
        })


        reccList[index].Score += 5 * (directorReccStrength[item.director] || 0)

        item.cast.forEach(actor => {
            reccList[index].Score += 3 * (castReccStrength[actor] || 0)
        })

    })


    reccList.sort((a, b) => {
        return b.Score - a.Score;
    })




    let finalReccList = reccList.map(item => item.movie);

    return finalReccList;


}