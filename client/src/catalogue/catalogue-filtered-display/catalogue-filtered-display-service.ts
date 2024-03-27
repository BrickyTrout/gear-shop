import { useEffect, useState } from "react";
import {
  CatalogueFilterArray,
  CatalogueFilterObject,
} from "../catalogue-filter/type-def";
import { CatalogueItemType } from "../catalogue-item/type-def";
import FetchService from "../../common/hooks/fetch";
import { ApiState } from "../../common/types/state.def";

export function extractFilterObjectFromCatalogueItemsAndCategories(
  items: CatalogueItemType[],
  categories: string[]
) {
  if (items == null || categories == null || categories?.length === 0)
    return {};
  const onlyUnique = (value: string, index: number, array: Array<string>) => {
    return array.indexOf(value) === index;
  };
  const catalogueFilterObject: CatalogueFilterObject = categories.reduce(
    (
      accumulator: CatalogueFilterObject,
      category: string
    ): CatalogueFilterObject => {
      const options = items?.map((item) => {
        const keyTyped = category as keyof CatalogueItemType;
        return item[keyTyped] as string;
      });
      const uniqueOptions = options?.filter(onlyUnique);
      const uniqueOptionsWithState = uniqueOptions.map((uniqueOption) => {
        return { label: uniqueOption, state: false };
      });
      accumulator[category as keyof CatalogueFilterObject] =
        uniqueOptionsWithState;
      return accumulator;
    },
    {}
  );

  return catalogueFilterObject;
}
export function convertCatalogueFilterObjectToArray(
  object: CatalogueFilterObject
): CatalogueFilterArray {
  let elements = [] as CatalogueFilterArray;
  for (const [key, value] of Object.entries(object)) {
    elements.push({ category: key, options: value });
  }
  return elements;
}

export function filterCalogueItems(
  unfilteredArray: CatalogueItemType[],
  filterObject: CatalogueFilterObject
): CatalogueItemType[] {
  if (areAllFiltersUnchecked(filterObject)) return unfilteredArray;

  return unfilteredArray?.filter((catalogueItem) => {
    let filterMatched = false;
    for (const [category, options] of Object.entries(filterObject)) {
      const activeOptions = options
        .filter((option) => option.state)
        .map((option) => option.label);
      const categoryAsKeyType = category as keyof typeof catalogueItem;
      if (activeOptions.includes(catalogueItem[categoryAsKeyType] as string)) {
        filterMatched = true;
        break;
      }
    }
    return filterMatched;
  });
}

export function toggleFilterStateOnClick(
  filterObject: CatalogueFilterObject,
  toggledFilterCategory: string,
  toggledFilter: string
) {
  console.log("filterObject", filterObject);
  console.log(
    "filterObject[toggledFilterCategory]",
    filterObject[toggledFilterCategory]
  );
  const matchedCategory = filterObject[toggledFilterCategory];
  const updatedMatchedCategory = matchedCategory.map((filter) => {
    return filter.label === toggledFilter
      ? { ...filter, state: !filter.state }
      : filter;
  });

  return { ...filterObject, [toggledFilterCategory]: updatedMatchedCategory };
}

export function areAllFiltersUnchecked(filterObject: CatalogueFilterObject) {
  for (const options of Object.values(filterObject)) {
    const isAtLeastOneOptionChecked = options.find((option) => option.state);
    if (isAtLeastOneOptionChecked) return false;
  }
  return true;
}

const CatalogueCategoryService = () => {
  const { get, getData, getError } = FetchService();
  const [categoryData, setFilterData] = useState([] as string[]);
  const [categoryError, setCategoryError] = useState("");
  const [categoryState, setCategoryState] = useState(ApiState.Loading);

  useEffect(() => {
    setCategoryState(ApiState.Loading);
    if (getData?.length <= 0) {
      setCategoryError("No filter category fetched");
      setCategoryState(ApiState.Error);
      console.error("No filter category fetched");
      return;
    }
    if (getError) {
      setCategoryError(getError);
      setCategoryState(ApiState.Error);
      return;
    }
    if (
      getData == null ||
      getData?.length === 0 ||
      getData?.[0]?.filters == null
    ) {
      return;
    }
    setFilterData([...getData?.[0]?.filters]);
    setCategoryState(ApiState.Complete);
  }, [getData, getError]);

  useEffect(() => {
    get("catalogue-filters");
  }, []);

  return { categoryData, categoryError, categoryState };
};

export default CatalogueCategoryService;
