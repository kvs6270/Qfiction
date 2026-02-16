

export function topRated(movieArray, voteThreshold) {

   
    return [...movieArray].filter((item) => {
        return item.votes >= voteThreshold;
    }).sort((a,b) => {
        return (b.imdbRating - a.imdbRating);
    })


}