import { CatalogueItemType } from "./type-def";

function CatalogueItem(props: { data: CatalogueItemType }) {
  const { _id, name, category, price, quantity, img, manufacturer } =
    props.data;
  return (
    <div className="catalogue-item">
      <div className="catalogue-item__image-container">
        <img src={img}></img>
      </div>
      <div className="catalogue-item__text-container">
        <span className="catalogue-item__manufacturer">{manufacturer}</span>
        <span className="catalogue-item__name">{name}</span>
        <p className="catalogue-item__price">${price}</p>
      </div>
    </div>
  );
}

export default CatalogueItem;
