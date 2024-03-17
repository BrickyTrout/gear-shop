import CatalogueSearch from "../catalogue-search";

function CatalogueToolbar(props: {
  searchQuery: string;
  searchUpdated: (value: string) => void;
}) {
  const { searchQuery, searchUpdated } = props;
  return (
    <div className="catalogue-toolbar">
      <CatalogueSearch
        searchQuery={searchQuery}
        searchUpdated={searchUpdated}
      ></CatalogueSearch>
    </div>
  );
}

export default CatalogueToolbar;
