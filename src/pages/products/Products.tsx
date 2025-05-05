import MainLoading from "@/components/shared/MainLoading";
import ProductList from "./components/ProductsList";
import { useProducts, useRecommended } from "@/utils/api hooks/useProducts";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();

  const isRecommendationPage = location.pathname === "/nadi-recommendation";
  const { products, isLoading, isError, loadMore, currentPage, lastPage } =
    isRecommendationPage ? useRecommended() : useProducts();

  const showMore = lastPage! > currentPage!;

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <div>Error loading category details.</div>;
  }

  return (
    <div>
      <ProductList
        name={isRecommendationPage ? "Recommendation" : "All Products"}
        products={products || []}
        loadMore={loadMore}
        isLoading={isLoading}
        showMore={showMore}
      />
    </div>
    // <div className="py-5">
    //   <h1></h1>
    //   {isSuccess && products ? (
    //     Object.keys(products).map((categoryName: string) => (
    //       <div key={categoryName} className="category-section">
    //         <h2 className="category-title">
    //           {categoryName.replace(/_/g, " ")}
    //         </h2>
    //         <ProductList products={products[categoryName]} />
    //       </div>
    //     ))
    //   ) : (
    //     <div>No products available.</div>
    //   )}
    // </div>
  );
};

export default Products;
