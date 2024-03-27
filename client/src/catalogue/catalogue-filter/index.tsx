import { CatalogueFilterArray, CatalogueFilterFacet } from "./type-def";

function CatalogueFilter(props: {
  onFilterClick: (filter: string, category: string) => void;
  catalogueFilterArray: CatalogueFilterArray;
}) {
  const { catalogueFilterArray, onFilterClick } = props;

  const renderFacetElement = (
    category: string,
    option: { label: string; state: boolean }
  ) => {
    const facetId = `${category}_${option.label}`;
    return (
      <div className="catalogue-filter__facet" key={facetId}>
        <input
          id={facetId}
          type="checkbox"
          checked={option.state}
          onChange={() => onFilterClick(category, option.label)}
        />
        <label htmlFor={facetId}> {option.label}</label>
      </div>
    );
  };

  const renderFilterElement = (catalogueFilter: {
    category: string;
    options: CatalogueFilterFacet[];
  }) => {
    const { category, options } = catalogueFilter;
    const facetsElements = options?.map((option) =>
      renderFacetElement(category, option)
    );

    return (
      <div className="catalogue-filter__category" key={category}>
        <div className="catalogue-filter__category-label"> {category}</div>

        <div className="catalogue-filter__facets">{facetsElements}</div>
      </div>
    );
  };

  const filterElements = catalogueFilterArray?.map((filter) =>
    renderFilterElement(filter)
  );
  return <div className="catalogue-filter">{filterElements}</div>;
}

export default CatalogueFilter;
