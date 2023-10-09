import {availableResolutionsType} from "../index";

export type UpdateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions?: availableResolutionsType,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number,
    publicationDate: string
}
export function UpdateVideoInputModelOk(title: string, author: string, minAgeRestriction: number){
    return title.length <= 40 && author.length <= 20 && minAgeRestriction >= 1 && minAgeRestriction <= 18;
}