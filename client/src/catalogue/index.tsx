import CatalogueService from "./catalogue-service";
import { ApiState } from "../common/types/state.def";
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
          unfilteredArray={catalogueData}
        ></CatalogueFilteredDisplay>
      </div>
    );
  }

  return <div className="catalogue">Error: unknown state!</div>;
}

export default Catalogue;
