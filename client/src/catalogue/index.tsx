import CatalogueDisplay from "../catalogue-display";
import CatalogueCategoryService from "../catalogue-filtered-display/catalogue-filtered-display-service";
import CatalogueService from "./catalogue-service";

function Catalogue() {
  const {
    catalogueData,
    catalogueError,
    catalogueState,
    queryParamsState,
    searchQueryState,
    changeSearchQuery,
  } = CatalogueService();
  const { categoryData, categoryError, categoryState } =
    CatalogueCategoryService();
  return (
    <CatalogueDisplay
      catalogueData={catalogueData}
      catalogueError={catalogueError}
      catalogueState={catalogueState}
      categoryData={categoryData}
      categoryError={categoryError}
      categoryState={categoryState}
      searchQueryState={searchQueryState}
      changeSearchQuery={changeSearchQuery}
    ></CatalogueDisplay>
  );
}

export default Catalogue;
