import { ChangeEvent } from "react";

function CatalogueSearch(props: {
  searchQuery: string;
  searchUpdated: (value: string) => void;
}) {
  const { searchQuery, searchUpdated } = props;

  const onSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    searchUpdated(event.currentTarget.value);
  };

  return (
    <input type="text" value={searchQuery} onChange={onSearchBarChange}></input>
  );
}

export default CatalogueSearch;
