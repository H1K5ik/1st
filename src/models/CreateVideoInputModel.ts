import {availableResolutionsType} from "../index";

export type CreateVideoInputModel ={
    title: string,
    author: string,
    availableResolutions?: availableResolutionsType
}
