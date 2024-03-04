import { useEffect } from "react";
import CatalogueItem from "../catalogue-item";
import CatalogueService from "./catalogue-service";
import { ApiState } from "../common/types/state.def";

function Catalogue() {
  const { getCatalogue, catalogueData, catalogueError, catalogueState } =
    CatalogueService();

  useEffect(() => {
    getCatalogue();
  }, []);
  switch (catalogueState) {
    case ApiState.Error:
      return (<div className="catalogue">Error: {catalogueError}</div>);
    case ApiState.Complete:
      return (
        <div className="catalogue">
          {catalogueData?.map(({ id, name }) => {
            return <CatalogueItem key={id} id={id} name={name}></CatalogueItem>;
          })}
        </div>
      );
    default:
      return (<div className="catalogue">Loading</div>);
  }
}

export default Catalogue;
