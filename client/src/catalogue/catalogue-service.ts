import { useEffect, useState } from "react";
import FetchService from "../common/hooks/fetch";
import { CatalogueItemType } from "../catalogue-item/type-def";
import { ApiState } from "../common/types/state.def";

const CatalogueService = () => {
  const { get, getData, getError } = FetchService();
  const [catalogueData, setCatalogueData] = useState([] as CatalogueItemType[]);
  const [catalogueError, setCatalogueError] = useState("");
  const [catalogueState, setCatalogueState] = useState(ApiState.Loading);
  const [searchQueryState, setSearchQueryState] = useState("");

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

    if (getData == null) return;
    setCatalogueData([...getData]);
    setCatalogueState(ApiState.Complete);
  }, [getData, getError]);

  useEffect(() => {
    get(`catalogue?q=${searchQueryState}`);
  }, [searchQueryState]);

  const changeSearchQuery = (query: string) => {
    setSearchQueryState(query);
  };

  return {
    catalogueData,
    catalogueError,
    catalogueState,
    searchQueryState,
    changeSearchQuery,
  };
};

export default CatalogueService;
