import React from "react";
import ProductList from "../products/components/ProductsList";
import { useCategoryDetail } from "@/utils/useCategory";

const CategoryDetails = () => {
  const [page, setPage] = React.useState(1);
  const { products, isLoading, isError, isSuccess, loadMore } =
    useCategoryDetail();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading category details.</div>;
  }

  return (
    <div>
      <ProductList
        products={products}
        loadMore={loadMore}
        isLoading={isLoading}
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

export default CategoryDetails;
