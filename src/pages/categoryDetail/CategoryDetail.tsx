import { useLocation, useParams } from "react-router-dom";
import ProductList from "../products/components/ProductsList";
import { useCategoryDetail } from "@/utils/api hooks/useDetail";
import MainLoading from "@/components/shared/MainLoading";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const {
    products,
    isLoading,
    isError,
    loadMore,
    currentPage,
    lastPage,
    name,
  } = useCategoryDetail(Number(categoryId));

  const showMore = lastPage! > currentPage!;

  if (isLoading) {
    return <MainLoading />;
  }

  if (products?.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Sorry! There are no products at the moment.
      </div>
    );
  }

  return (
    <div>
      <ProductList
        name={name || ""}
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

export default CategoryDetails;
