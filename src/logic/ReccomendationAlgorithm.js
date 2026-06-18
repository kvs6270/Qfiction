




export function movieOrganizer(inputDB, outputDB = [], topGenreNum = 3, topDirectorNum = 3, topCastNum = 3) {

    

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }


    let genreReccStrength = {}


    let directorReccStrength = {}


    let castReccStrength = {}

    



    inputDB.forEach(item => {

        if (item.genre in genreReccStrength) {
            ++genreReccStrength[item.genre];
        }

        else {
            genreReccStrength[item.genre] = 1;
        }



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




    let reccList = [];


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


    return { finalReccList };


}
































