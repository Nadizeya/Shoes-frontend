import { Link } from "react-router-dom";
// import { products } from "../products";
import ProductCard from "../../../components/shared/ProductCard";
import { ProductT } from "@/types/common";
import { useEffect, useState } from "react";

type ProductListProps = {
  name: string;
  id: number;
  data: ProductT[];
};
const ProductsHomeComp = (props: ProductListProps) => {
  const { data } = props;
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(() => {
    setLatest(data); // Runs only once on mount
  }, []);

  return (
    <div className="space-y-4" key={props.id}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <Link to={`/products`} className="text-blue-400 text-sm font-bold">
          Show More
        </Link>
      </div>

      {/* map data from api */}
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {latest.map((product: ProductT) => (
          <ProductCard
            id={product.id}
            name={product.name}
            brand_id={product.brand_id}
            category_id={product.category_id}
            category_name={product.category_name}
            brand_name={product.brand_name} // Optional
            short_description={product.short_description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHomeComp;
