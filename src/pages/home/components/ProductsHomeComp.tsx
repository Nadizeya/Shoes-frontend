import React from "react";
import { Link } from "react-router-dom";
// import { products } from "../products";
import ProductCard from "../../../components/shared/ProductCard";
import { ProductT } from "@/types/common";

type ProductListProps = {
  name: string;
  id: number;
  data: ProductT[];
};
const ProductsHomeComp = (props: ProductListProps) => {
  const { data } = props;
  return (
    <div className="space-y-4" key={props.id}>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <Link to={`/products`} className="text-blue-400">
          Show More
        </Link>
      </div>

      {/* map data from api */}
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {data.map((product: ProductT) => (
          <ProductCard
            key={product.id}
            id={product.id}
            // tags={product.tags}
            desc={product.short_description}
            image={product.image?.[0] || "/assets/products/product3.png"}
            price={product.original_price}
            title={product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHomeComp;
