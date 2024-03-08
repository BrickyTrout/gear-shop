import { useState } from "react";
import CatalogueItem from "../catalogue-item";
import { CatalogueItemType } from "../catalogue-item/type-def";
import CatalogueFilter from "../catalogue-filter";
import {
  convertCatalogueFilterObjectToArray,
  extractFilterObjectFromCatalogueItemsAndCategories,
  filterCalogueItems,
  toggleFilterStateOnClick,
} from "./catalogue-filtered-display-service";

function CatalogueFilteredDisplay(props: {
  unfilteredArray: CatalogueItemType[];
}) {
  const { unfilteredArray } = props;
  const categories = ["category", "manufacturer"];
  const initialFilterObject =
    extractFilterObjectFromCatalogueItemsAndCategories(
      unfilteredArray,
      categories
    );
  const [catalogueFilterObject, setCatalogueFilterObject] =
    useState(initialFilterObject);

  let filteredCatalogueItemJSX;

  const filteredCatalogueItems = filterCalogueItems(
    unfilteredArray,
    catalogueFilterObject
  );

  filteredCatalogueItemJSX = filteredCatalogueItems?.map((filteredItem) => {
    return (
      <CatalogueItem key={filteredItem._id} data={filteredItem}></CatalogueItem>
    );
  });
  // console.log("filteredCatalogueItems", filteredCatalogueItems);
  // console.log("filteredCatalogueItemJSX", filteredCatalogueItemJSX);

  const onFilterClick = (filter: string, category: string) => {
    setCatalogueFilterObject((filterObject) => {
      return toggleFilterStateOnClick(filterObject, filter, category);
    });
  };

  const catalogueFilterArray = convertCatalogueFilterObjectToArray(
    catalogueFilterObject
  );

  return (
    <div className="catalogue-filtered-display">
      <CatalogueFilter
        onFilterClick={onFilterClick}
        catalogueFilterArray={catalogueFilterArray}
      ></CatalogueFilter>
      <div className="catalogue-filtered-display__catalogue">
        {filteredCatalogueItemJSX}
      </div>
    </div>
  );
}

export default CatalogueFilteredDisplay;
