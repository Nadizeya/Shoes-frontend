import ProductCard from "@/components/shared/ProductCard";
import { ProductT } from "@/types/common";

type ProductListProps = {
  products: ProductT[];
  loadMore: () => void;
  isLoading: boolean;
  showMore: boolean;
};

const ProductList = ({
  products,
  loadMore,
  isLoading,
  showMore,
}: ProductListProps) => {
  console.log(products);

  const results = 15000;
  return (
    <div className="space-y-5 mb-10 my-2">
      <small className="text-muted-foreground">{results} results</small>

      <div className="grid grid-col sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6">
        {products.map((product: ProductT) => (
          <ProductCard
            id={product.id}
            name={product.name}
            category_name={product.category_name}
            brand_name={product.brand_name} // Optional
            short_description={product.short_description}
            original_price={product.price}
            image={product.image}
          />
        ))}
      </div>
      {showMore && (
        <p
          className="text-center text-black cursor-pointer border w-1/6 border-black rounded-full mx-auto mt-6"
          onClick={loadMore}
        >
          {isLoading ? "Loading..." : "Show More Products"}
        </p>
      )}

      {/* {!showAll && products.length > 10 && (
        <p
          className="text-center text-black cursor-pointer border w-1/6 border-black rounded-full mx-auto mt-6"
          onClick={() => setShowAll(!showAll)}
        >
          Show More Products
        </p>
      )} */}
    </div>
  );
};

export default ProductList;
