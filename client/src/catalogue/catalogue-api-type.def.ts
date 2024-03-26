import { CatalogueItemType } from "../catalogue-item/type-def";

export interface CatalogueApiType {
    metadata: [{totalCount: number}],
    data: CatalogueItemType[]
}

export interface CatalogueType {
    metadata: {totalCount: number},
    data: CatalogueItemType[]
}

export const convertCatalogueApiType = (api: CatalogueApiType) => {
    return {...api, metadata: api.metadata[0]}
}