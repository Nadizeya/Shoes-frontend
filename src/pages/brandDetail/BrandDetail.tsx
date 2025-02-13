import { useParams } from "react-router-dom";
import ProductList from "../products/components/ProductsList";
import { useBrandDetail, useCategoryDetail } from "@/utils/api hooks/useDetail";

const BrandDetail = () => {
  const { brandId } = useParams();
  const { products, isLoading, isError, loadMore, currentPage, lastPage } =
    useBrandDetail(Number(brandId));

  const showMore = lastPage! > currentPage!;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading category details.</div>;
  }

  return (
    <div>
      <ProductList
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

export default BrandDetail;
