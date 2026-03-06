



export function castbasedRecommender(inputDB, outputDB = [], topGenreNum = 5, topDirectorNum = 5, topCastNum = 5) {

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }


    let genreReccStrength = {}


    let directorReccStrength = {}


    

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







    outputDB.forEach((item, index) => {

        reccList.push({
            movie: item,
            Score: 0
        })


        reccList[index].Score += 1 * (genreReccStrength[item.genre] || 0)
        reccList[index].Score += 5 * (directorReccStrength[item.director] || 0)

    
    })


    reccList.sort((a, b) => {
        return b.Score - a.Score;
    })




    let finalReccList = reccList.map(item => item.movie);


    return finalReccList;


}































