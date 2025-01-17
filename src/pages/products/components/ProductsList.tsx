// import { products } from "@/pages/home/products";
import ProductCard from "@/components/shared/ProductCard";
import { categoryProduct } from "@/types/categoryTypes";
import { ProductT } from "@/types/common";

// const sliceLengths = {
//   xs: 6,
//   sm: 8,
//   md: 12,
//   lg: 18,
//   xl: 24,
// };

// const screenWidth = window.innerWidth;
// let sliceLength;
// if (screenWidth < 640) {
//   sliceLength = sliceLengths.xs;
// } else if (screenWidth < 768) {
//   sliceLength = sliceLengths.sm;
// } else if (screenWidth < 1024) {
//   sliceLength = sliceLengths.md;
// } else if (screenWidth < 1280) {
//   sliceLength = sliceLengths.lg;
// } else {
//   sliceLength = sliceLengths.xl;
// }

type ProductListProps = {
  products: ProductT[];
  loadMore: () => void;
  isLoading: boolean;
};

const ProductList = ({ products, loadMore, isLoading }: ProductListProps) => {
  console.log(products);
  // const [width, setWidth] = useState(window.innerWidth);
  // function updateDimensionWidth() {
  //   setWidth(window.innerWidth);
  // }

  // const [showAll, setShowAll] = useState(false);
  // const displayedData = showAll ? products : products.slice(0, sliceLength);

  // useEffect(() => {
  //   window.addEventListener("resize", updateDimensionWidth);
  //   return () => window.removeEventListener("resize", updateDimensionWidth);
  // }, [width]);

  const results = 15000;
  return (
    <div className="space-y-5 my-2">
      <small className="text-muted-foreground">{results} results</small>

      <div className="grid grid-col sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6">
        {products.map((product: ProductT) => (
          <ProductCard
            id={product.id}
            name={product.name}
            category_name={product.category_name}
            brand_name={product.brand_name} // Optional
            short_description={product.short_description}
            original_price={product.original_price}
            image={product.image}
          />
        ))}
      </div>
      <p
        className="text-center text-black cursor-pointer border w-1/6 border-black rounded-full mx-auto mt-6"
        onClick={loadMore}
      >
        {isLoading ? "Loading..." : "Show More Products"}
      </p>
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
