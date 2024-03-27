export interface CatalogueFilterFacet {
    label: string;
    state: boolean;
  }

  export interface CatalogueFilterObject {
    [key: string] : CatalogueFilterFacet[]
  }

  export type CatalogueFilterArray =
     Array<{category: string, options: CatalogueFilterFacet[]}>
