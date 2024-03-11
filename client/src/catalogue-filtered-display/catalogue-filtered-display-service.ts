import {
  CatalogueFilterArray,
  CatalogueFilterObject,
} from "../catalogue-filter/type-def";
import { CatalogueItemType } from "../catalogue-item/type-def";

export function extractFilterObjectFromCatalogueItemsAndCategories(
  items: CatalogueItemType[],
  categories: string[]
) {
  if (items == null || categories?.length === 0) return {};
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