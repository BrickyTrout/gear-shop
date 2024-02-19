import { CatalogueItemType } from "./type-def";

function CatalogueItem(props: CatalogueItemType) {
  const { id, name } = props;
  return (
    <div className="catalogue-item">
      <h4>{name}</h4>
    </div>
  );
}

export default CatalogueItem;
