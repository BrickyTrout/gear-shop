import { areAllFiltersUnchecked } from "../catalogue-filtered-display-service";
import { fakeCatalogueFilterObjectWithNoCheckedFilter, fakeCatalogueFilterObjectWithOneCheckedFilter } from "./test-data";

it("verifies correctly at least one filter is checked", () => {
  const shouldBeFalse = areAllFiltersUnchecked(
    fakeCatalogueFilterObjectWithOneCheckedFilter
  );
  expect(shouldBeFalse).toBe(false);
  const shouldBeTrue = areAllFiltersUnchecked(
    fakeCatalogueFilterObjectWithNoCheckedFilter
  );
  expect(shouldBeTrue).toBe(true);
});
