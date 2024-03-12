import CatalogueItem from "../catalogue-item";
import { CatalogueItemType } from "../catalogue-item/type-def";
import { filterCalogueItems } from "./catalogue-filtered-display-service";
import { CatalogueFilterObject } from "../catalogue-filter/type-def";

function CatalogueFilteredDisplay(props: {
  unfilteredArray: CatalogueItemType[];
  filterObject: CatalogueFilterObject;
}) {
  const { unfilteredArray, filterObject } = props;
  const filteredCatalogueItems = filterCalogueItems(
    unfilteredArray,
    filterObject
  );
  const filteredCatalogueItemJSX = filteredCatalogueItems?.map((filteredItem) =>
    renderCatalogueItems(filteredItem)
  );

  return (
    <div className="catalogue-filtered-display">
      <div className="catalogue-filtered-display__catalogue">
        {filteredCatalogueItemJSX}
      </div>
    </div>
  );
}

function renderCatalogueItems(item: CatalogueItemType) {
  return <CatalogueItem key={item._id} data={item}></CatalogueItem>;
}

export default CatalogueFilteredDisplay;
