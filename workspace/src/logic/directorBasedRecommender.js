




export function directorBasedRecommender(inputDB, outputDB = [], topGenreNum = 5, topDirectorNum = 5, topCastNum = 5) {

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }


    let genreReccStrength = {}




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
