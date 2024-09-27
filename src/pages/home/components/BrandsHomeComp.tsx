import React from "react";
import { Link } from "react-router-dom";
import { products } from "../products";
import ProductCard from "../../../components/shared/ProductCard";

const BrandsHomeComp = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Beauty Offers (25)</h1>
        <Link to={`/brands`} className="text-blue-400">
          Show More
        </Link>
      </div>

      {/* map data from api */}
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {products.map((brand: any) => (
          <ProductCard
            key={brand.id}
            id={brand.id}
            tags={brand.tags}
            desc={brand.desc}
            image={brand.image}
            price={brand.price}
            title={brand.title}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandsHomeComp;
