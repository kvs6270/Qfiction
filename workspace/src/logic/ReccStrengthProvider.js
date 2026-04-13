
export function ReccStrengthProvider(inputDB, topGenreNum = 3, topDirectorNum = 3, topCastNum = 3) {

    console.log("ReccStrengthProvider")
    console.log(inputDB)

    if (inputDB.length == 0) {
        console.log("Watch something Nigger!!");
        return;
    }


    let genreReccStrength = {}


    let directorReccStrength = {}


    let castReccStrength = {}

    



    inputDB.forEach(item => {

        if (item.genres in genreReccStrength) {
            ++genreReccStrength[item.genres];
        }

        else {
            genreReccStrength[item.genres] = 1;
        }



    })

    let genreReccStrengthArray = [];

    for (let genre in genreReccStrength) {
        genreReccStrengthArray.push({ "genre": genre, "score": genreReccStrength[genre] });
    }

    genreReccStrengthArray = genreReccStrengthArray.sort((a, b) => {
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

    let directorReccStrengthArray = [];

    for (let director in directorReccStrength) {
        directorReccStrengthArray.push({ "director": director, "score": directorReccStrength[director] });
    }

    directorReccStrengthArray =directorReccStrengthArray.sort((a, b) => {
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

    let castReccStrengthArray = [];

    for (let cast in castReccStrength) {
        castReccStrengthArray.push({ "cast": cast, "score": castReccStrength[cast] });
    }

    castReccStrengthArray = castReccStrengthArray.sort((a, b) => {
        return -(a.score - b.score);
    }).slice(0, topCastNum)


    return {genreReccStrengthArray, castReccStrengthArray, directorReccStrengthArray}
}