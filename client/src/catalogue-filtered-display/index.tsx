import { useEffect, useState } from "react";
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
  const categories = ["category", "manufacturer"];
  const { unfilteredArray } = props;
  const filterObject = extractFilterObjectFromCatalogueItemsAndCategories(
    unfilteredArray,
    categories
  );
  const [catalogueFilterObject, setCatalogueFilterObject] =
    useState(filterObject);
  const filteredCatalogueItems = filterCalogueItems(
    unfilteredArray,
    catalogueFilterObject
  );
  const filteredCatalogueItemJSX = filteredCatalogueItems?.map(
    (filteredItem) => {
      return (
        <CatalogueItem
          key={filteredItem._id}
          data={filteredItem}
        ></CatalogueItem>
      );
    }
  );

  const onFilterClick = (category: string, filter: string) => {
    setCatalogueFilterObject((filterObject) => {
      const newFilterObject = toggleFilterStateOnClick(
        filterObject,
        category,
        filter
      );
      return newFilterObject;
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
