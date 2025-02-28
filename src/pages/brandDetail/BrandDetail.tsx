import { useParams } from "react-router-dom";
import ProductList from "../products/components/ProductsList";
import { useBrandDetail } from "@/utils/api hooks/useDetail";
import MainLoading from "@/components/shared/MainLoading";

const BrandDetail = () => {
  const { brandId } = useParams();
  const {
    name,
    products,
    isLoading,
    isError,
    loadMore,
    currentPage,
    lastPage,
    isSuccess,
  } = useBrandDetail(Number(brandId));

  const showMore = lastPage! > currentPage!;

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <div>Error loading category details.</div>;
  }

  return (
    <div>
      {isSuccess && (
        <div>
          <ProductList
            name={name || ""}
            products={products || []}
            loadMore={loadMore}
            isLoading={isLoading}
            showMore={showMore}
          />
        </div>
      )}
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
