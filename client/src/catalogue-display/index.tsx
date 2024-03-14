import { ApiState } from "../common/types/state.def";
import CatalogueFilteredDisplay from "../catalogue-filtered-display";
import { CatalogueItemType } from "../catalogue-item/type-def";
import {
  convertCatalogueFilterObjectToArray,
  extractFilterObjectFromCatalogueItemsAndCategories,
  toggleFilterStateOnClick,
} from "../catalogue-filtered-display/catalogue-filtered-display-service";
import CatalogueFilter from "../catalogue-filter";
import React, { useEffect, useState } from "react";
import { CatalogueFilterObject } from "../catalogue-filter/type-def";
import CatalogueSearch from "../catalogue-search";

function CatalogueDisplay(props: {
  catalogueData: CatalogueItemType[];
  catalogueError: string;
  catalogueState: ApiState;
  categoryData: string[];
  categoryError: string;
  categoryState: ApiState;
  searchQueryState: string;
  changeSearchQuery: (value: string) => void;
}) {
  const {
    catalogueData,
    catalogueError,
    catalogueState,
    categoryData,
    categoryError,
    categoryState,
    searchQueryState,
    changeSearchQuery,
  } = props;

  const [catalogueFilterObject, setCatalogueFilterObject] = useState({}) as [
    CatalogueFilterObject,
    React.Dispatch<React.SetStateAction<CatalogueFilterObject>>
  ];
  useEffect(() => {
    const filterObject = extractFilterObjectFromCatalogueItemsAndCategories(
      catalogueData,
      categoryData
    );
    setCatalogueFilterObject(filterObject);
  }, [categoryData, catalogueData]);

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

  const searchBarJsx = renderSearchBar(searchQueryState, changeSearchQuery);

  const filteredCatalogueJsx = renderFilteredCatalogue(
    catalogueData,
    catalogueError,
    catalogueState,
    catalogueFilterObject
  );

  const catalogueFilterJsx = renderCatalogueFilter(
    categoryError,
    categoryState,
    catalogueFilterObject,
    onFilterClick
  );

  return (
    <div className="catalogue">
      {searchBarJsx}
      <div className="catalogue__filter-catalogue-container">
        {catalogueFilterJsx}
        {filteredCatalogueJsx}
      </div>
    </div>
  );
}

function renderFilteredCatalogue(
  catalogueData: CatalogueItemType[],
  catalogueError: string,
  catalogueState: ApiState,
  filterObject: CatalogueFilterObject
) {
  if (catalogueState === ApiState.Loading) {
    return <>"Loading"</>;
  }

  if (catalogueState === ApiState.Error) {
    return <>Error: {catalogueError}</>;
  }

  if (catalogueState === ApiState.Complete) {
    return (
      <CatalogueFilteredDisplay
        unfilteredArray={catalogueData}
        filterObject={filterObject}
      ></CatalogueFilteredDisplay>
    );
  }

  return <div className="catalogue">Error: unknown state!</div>;
}

function renderCatalogueFilter(
  categoryError: string,
  categoryState: ApiState,
  filterObject: CatalogueFilterObject,
  onFilterClick: (category: string, filter: string) => void
) {
  const catalogueFilterArray =
    convertCatalogueFilterObjectToArray(filterObject);

  if (categoryState === ApiState.Loading) {
    return <>"Loading"</>;
  }

  if (categoryState === ApiState.Error) {
    return <>Error: {categoryError}</>;
  }

  if (categoryState === ApiState.Complete) {
    return (
      <CatalogueFilter
        onFilterClick={onFilterClick}
        catalogueFilterArray={catalogueFilterArray}
      ></CatalogueFilter>
    );
  }

  return <div className="catalogue">Error: unknown state!</div>;
}

function renderSearchBar(
  searchQuery: string,
  searchBarOnChange: (value: string) => void
) {
  return (
    <CatalogueSearch
      searchQuery={searchQuery}
      searchUpdated={searchBarOnChange}
    ></CatalogueSearch>
  );
}

export default CatalogueDisplay;
