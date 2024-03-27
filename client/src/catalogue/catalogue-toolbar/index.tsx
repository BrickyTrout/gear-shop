import React from "react";
import CatalogueSearch from "../catalogue-search";

function CatalogueToolbar(props: {
  searchQuery: string;
  pageSize: number;
  searchUpdated: (value: string) => void;
  pageSizeUpdated: (size: number) => void;
}) {
  const { searchQuery, pageSize, searchUpdated, pageSizeUpdated } = props;
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
      <select onChange={(event) => onPageSizeSelected(event)} value={pageSize}>
        {pageSizeOptionsJsx}
      </select>
    </div>
  );
}

export default CatalogueToolbar;
