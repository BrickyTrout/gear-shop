import React from "react";
import CatalogueSearch from "../catalogue-search";

function CatalogueToolbar(props: {
  searchQuery: string;
  pageSize: number;
  searchUpdated: (value: string) => void;
  pageSizeUpdated: (size: number) => void
}) {
  const { searchQuery, pageSize, searchUpdated,  pageSizeUpdated} = props;
  const pageSizeOptions = [10, 20, 50];
  const pageSizeOptionsJsx = pageSizeOptions.map(pageSize => {
    return <option value={pageSize} >{pageSize}</option>
  })
  const onPageSizeSelected = (event:React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const pageSize = parseInt(event.target.value);
    pageSizeUpdated(pageSize)
  }
  return (
    <div className="catalogue-toolbar">
      <CatalogueSearch
        searchQuery={searchQuery}
        searchUpdated={searchUpdated}
      ></CatalogueSearch>
      <select onChange={(event)=>onPageSizeSelected(event)} value={pageSize}>
    {pageSizeOptionsJsx}
      </select>
    </div>
  );
}

export default CatalogueToolbar;
