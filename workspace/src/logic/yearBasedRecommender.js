import { movieOrganizer } from "./ReccomendationAlgorithm";



export function yearBasedRecommender(inputDB, outputDB) {
        
    return movieOrganizer(inputDB, outputDB).finalReccList;
}