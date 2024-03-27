import { Link } from "react-router-dom";
import { CatalogueItemType } from "./type-def";

function CatalogueItem(props: { data: CatalogueItemType }) {
  const { name, price, img, manufacturer, _id } = props.data;
  return (
    <Link className="catalogue-item" to={`/product/${_id}`}>
      <div className="catalogue-item__image-container">
        <img src={img}></img>
      </div>
      <div className="catalogue-item__text-container">
        <span className="catalogue-item__manufacturer">{manufacturer}</span>
        <span className="catalogue-item__name">{name}</span>
        <p className="catalogue-item__price">${price}</p>
      </div>
    </Link>
  );
}

export default CatalogueItem;
