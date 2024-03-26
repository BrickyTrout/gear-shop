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
import { CatalogueType } from "../catalogue/catalogue-api-type.def";
import { CatalogueQueryParams } from "../catalogue/catalogue-query-params.def";
import CataloguePagination from "../catalogue-pagination";
import CatalogueToolbar from "../catalogue-toolbar";

function CatalogueDisplay(props: {
  catalogueData: CatalogueType;
  catalogueError: string;
  catalogueState: ApiState;
  categoryData: string[];
  categoryError: string;
  categoryState: ApiState;
  queryParamState: CatalogueQueryParams;
  changeSearchQuery: (query: string) => void;
  changePageIndex: (index: number) => void;
  changePageSize: (size: number) => void;
}) {
  const {
    catalogueData,
    catalogueError,
    catalogueState,
    categoryData,
    categoryError,
    categoryState,
    queryParamState,
    changeSearchQuery,
    changePageIndex,
    changePageSize,
  } = props;

  const [catalogueFilterObject, setCatalogueFilterObject] = useState({}) as [
    CatalogueFilterObject,
    React.Dispatch<React.SetStateAction<CatalogueFilterObject>>
  ];
  useEffect(() => {
    const catalogueItemList = catalogueData.data;
    const filterObject = extractFilterObjectFromCatalogueItemsAndCategories(
      catalogueItemList,
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

  const searchBarJsx = renderToolbar(
    queryParamState.search,
    queryParamState.pageSize,
    changeSearchQuery,
    changePageSize
  );

  const filteredCatalogueJsx = renderFilteredCatalogue(
    catalogueData.data,
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

  const cataloguePaginationJsx = renderPagination(
    queryParamState.pageSize,
    queryParamState.pageIndex,
    catalogueData.metadata?.totalCount,
    changePageIndex
  );

  return (
    <div className="catalogue">
      {searchBarJsx}
      <div className="catalogue__filter-catalogue-container">
        {catalogueFilterJsx}
        {filteredCatalogueJsx}
      </div>
      {cataloguePaginationJsx}
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

function renderToolbar(
  searchQuery: string,
  pageSize: number,
  searchBarOnChange: (value: string) => void,
  pageSizeOnChange: (size: number) => void
) {
  return (
    <CatalogueToolbar
      searchQuery={searchQuery}
      pageSize={pageSize}
      searchUpdated={searchBarOnChange}
      pageSizeUpdated={pageSizeOnChange}
    ></CatalogueToolbar>
  );
}

function renderPagination(
  pageSize: number,
  pageIndex: number,
  totalCount: number = 0,
  setPageIndex: (index: number) => void
) {
  return (
    <CataloguePagination
      pageSize={pageSize}
      pageIndex={pageIndex}
      totalCount={totalCount}
      setPageIndex={setPageIndex}
    ></CataloguePagination>
  );
}

export default CatalogueDisplay;
