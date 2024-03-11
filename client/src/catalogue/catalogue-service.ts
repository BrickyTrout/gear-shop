import { useEffect, useState } from "react";
import FetchService from "../common/hooks/fetch";
import { CatalogueItemType } from "../catalogue-item/type-def";
import { ApiState } from "../common/types/state.def";

const CatalogueService = () => {
  const { get, getData, getError } = FetchService();
  const [catalogueData, setCatalogueData] = useState({
    data: [] as CatalogueItemType[],
    key: 0,
  });
  const [catalogueError, setCatalogueError] = useState("");
  const [catalogueState, setCatalogueState] = useState(ApiState.Loading);

  useEffect(() => {
    setCatalogueState(ApiState.Loading);
    if (getData?.length <= 0) {
      setCatalogueError("empty catalogue");
      setCatalogueState(ApiState.Error);
      console.error("empty catalogue");
      return;
    }
    if (getError) {
      setCatalogueError(getError);
      setCatalogueState(ApiState.Error);
      return;
    }

    const dataKey = new Date().valueOf();
    setCatalogueData({ data: getData, key: dataKey });
    setCatalogueState(ApiState.Complete);
  }, [getData, getError]);

  useEffect(() => {
    get("catalogue");
  }, []);

  return { catalogueData, catalogueError, catalogueState };
};

export default CatalogueService;
