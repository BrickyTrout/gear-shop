import CatalogueItem from "../catalogue-item";
import { CatalogueItemType } from "../catalogue-item/type-def";

function Catalogue() {
  const fakeData: CatalogueItemType[] = [
    { id: 1, name: "helmet" },
    { id: 2, name: "harness" },
  ];
  const catalogueItems = fakeData.map(({ id, name }) => {
    return <CatalogueItem id={id} name={name}></CatalogueItem>;
  });
  return <div className="catalogue">{catalogueItems}</div>;
}

export default Catalogue;
