import React from "react";
import CatalogueSearch from "../catalogue-search";

function CatalogueToolbar(props: {
  searchQuery: string;
  pageSize: number;
  totalCount: number;
  searchUpdated: (value: string) => void;
  pageSizeUpdated: (size: number) => void;
}) {
  const { searchQuery, pageSize, totalCount, searchUpdated, pageSizeUpdated } =
    props;
  const pageSizeOptions = [10, 20, 50];
  const pageSizeOptionsJsx = pageSizeOptions.map((pageSizeOption) => {
    return (
      <option key={pageSizeOption} value={pageSizeOption}>
        {pageSizeOption}
      </option>
    );
  });
  const onPageSizeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedPageSize = parseInt(event.target.value);
    pageSizeUpdated(selectedPageSize);
  };
  return (
    <div className="catalogue-toolbar">
      <CatalogueSearch
        searchQuery={searchQuery}
        searchUpdated={searchUpdated}
      ></CatalogueSearch>
      <div className="catalogue-toolbar__page-size">
        <select
          onChange={(event) => onPageSizeSelected(event)}
          value={pageSize}
        >
          {pageSizeOptionsJsx}
        </select>{" "}
        / {totalCount}
      </div>
    </div>
  );
}

export default CatalogueToolbar;
