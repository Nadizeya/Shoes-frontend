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
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <Link to={`/products`} className="text-blue-400 text-sm font-bold">
          Show More
        </Link>
      </div>

      {/* map data from api */}
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {data.map((product: ProductT) => (
          <ProductCard
            id={product.id}
            name={product.name}
            category_name={product.category_name}
            brand_name={product.brand_name} // Optional
            short_description={product.short_description}
            original_price={product.original_price}
            image={product.image}
            videos={product.videos} // Optional
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHomeComp;
