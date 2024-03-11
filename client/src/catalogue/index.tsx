import { useEffect } from "react";
import CatalogueItem from "../catalogue-item";
import CatalogueService from "./catalogue-service";
import { ApiState } from "../common/types/state.def";
import CatalogueFilter from "../catalogue-filter";
import CatalogueFilteredDisplay from "../catalogue-filtered-display";

function Catalogue() {
  const { catalogueData, catalogueError, catalogueState } = CatalogueService();
  if (catalogueState === ApiState.Loading) {
    return <div className="catalogue">Loading</div>;
  }

  if (catalogueState === ApiState.Error) {
    return <div className="catalogue">Error: {catalogueError}</div>;
  }

  if (catalogueState === ApiState.Complete) {
    return (
      <div className="catalogue">
        <CatalogueFilteredDisplay
          key={catalogueData?.key}
          unfilteredArray={catalogueData?.data}
        ></CatalogueFilteredDisplay>
      </div>
    );
  }

  return <div className="catalogue">Error: unknown state!</div>;
}

export default Catalogue;
