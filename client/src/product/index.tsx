import { useLoaderData } from "react-router-dom";

export function loader({ params }: { params: any }) {
  const productId = params.id;
  return { productId };
}

const Product = () => {
  const { productId } = useLoaderData() as { productId: string };
  return <div className="product">Product: {productId}</div>;
};

export default Product;
