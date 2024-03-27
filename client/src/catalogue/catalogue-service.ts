import { useEffect, useState } from "react";
import FetchService from "../common/hooks/fetch";
import { CatalogueItemType } from "./catalogue-item/type-def";
import { ApiState } from "../common/types/state.def";
import { CatalogueQueryParams } from "./catalogue-query-params.def";
import {
  CatalogueApiType,
  CatalogueType,
  convertCatalogueApiType,
} from "./catalogue-api-type.def";

const CatalogueService = () => {
  const {
    get,
    getData,
    getError,
  }: {
    get: (path: string) => Promise<void>;
    getData: CatalogueApiType;
    getError: string;
  } = FetchService();
  const [catalogueData, setCatalogueData] = useState({} as CatalogueType);
  const [catalogueError, setCatalogueError] = useState("");
  const [catalogueState, setCatalogueState] = useState(ApiState.Loading);
  const [searchQueryState, setSearchQueryState] = useState("");
  const [queryParamsState, setQueryParamsState] = useState({
    search: "",
    pageIndex: 1,
    pageSize: 10,
  } as CatalogueQueryParams);

  useEffect(() => {
    if (getData == null) return;
    setCatalogueState(ApiState.Loading);
    if (getData?.metadata[0]?.totalCount <= 0) {
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
    const convertedData = convertCatalogueApiType(getData);
    setCatalogueData(convertedData);
    setCatalogueState(ApiState.Complete);
  }, [getData, getError]);

  useEffect(() => {
    const { search, pageIndex, pageSize } = queryParamsState;
    get(`catalogue?q=${search}&i=${pageIndex}&s=${pageSize}`);
  }, [queryParamsState]);

  const changeSearchQuery = (query: string) => {
    setSearchQueryState(query);
    setQueryParamsState((params) => {
      return { ...params, search: query };
    });
  };
  const changePageSize = (newPageSize: number) => {
    setQueryParamsState((params) => {
      return { ...params, pageSize: newPageSize };
    });
  };
  const changePageIndex = (newPageIndex: number) => {
    setQueryParamsState((params) => {
      return { ...params, pageIndex: newPageIndex };
    });
  };
  return {
    catalogueData,
    catalogueError,
    catalogueState,
    queryParamsState,
    changeSearchQuery,
    changePageIndex,
    changePageSize,
  };
};

export default CatalogueService;
