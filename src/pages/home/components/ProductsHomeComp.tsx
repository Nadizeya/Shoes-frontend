import React from "react";
import { Link } from "react-router-dom";
import { products } from "../products";
import ProductCard from "../../../components/shared/ProductCard";

type ProductListProps = {
  name: string;
  id: number;
};
const ProductsHomeComp = (props: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <Link to={`/products`} className="text-blue-400">
          Show More
        </Link>
      </div>

      {/* map data from api */}
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            tags={product.tags}
            desc={product.desc}
            image={product.image}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHomeComp;
