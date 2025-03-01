import { useAppDispatch } from "@/store/hook";
import {
  setProductDetail,
  setSelectedItem,
} from "@/store/slices/Products/productSlice";
import { useProductDetails } from "@/utils/api hooks/useProductDetail";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import HeroSection from "../home/components/HeroSection";
import ProductAccordion from "./components/ProductAccordion";
import ProductsInfo from "./components/ProductsInfo";
import ProductsHomeComp from "../home/components/ProductsHomeComp";
import { useAuth } from "@/utils/useAuth";
import MainLoading from "@/components/shared/MainLoading";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAuth();
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const {
    productDetail,
    isSuccess,
    productsAfterDetail,
    refetch,
    isLoading,
    isFetching,
  } = useProductDetails(numericProductId);

  useEffect(() => {
    refetch();
  }, [location.key]);

  useEffect(() => {
    if (isSuccess) {
      if (productDetail) {
        dispatch(setProductDetail(productDetail));
        if (
          productDetail.product_variations &&
          productDetail.product_variations.length > 0
        ) {
          dispatch(setSelectedItem(productDetail.product_variations[0]));
        }
      }
    }
  }, [productDetail, isSuccess]);

  if (isLoading || isFetching) {
    return <MainLoading />;
  }

  return (
    <div>
      {isSuccess && (
        <div className="px-4 py-8">
          <h4 className="flex items-center gap-4">
            <Link to={`/`} className=" hover:underline">
              {productDetail.maincategory_name}
            </Link>
            <ChevronLeft width={20} height={20} className="text-gray-600" />
            <Link
              to={`/categories/${productDetail.category_id}`}
              className=" hover:underline"
            >
              {productDetail.category_name}
            </Link>
            <ChevronLeft width={20} height={20} className="text-gray-600" />
            <Link
              to={`/brands/${productDetail.brand_id}`}
              className=" hover:underline"
            >
              {productDetail.brand_name}
            </Link>
          </h4>
          <ProductsInfo />
          <div className="space-y-8 pb-10">
            <ProductAccordion description={productDetail.description} />
            <ProductsHomeComp
              id={1}
              name="Similar Products"
              data={productsAfterDetail.similar_products}
            />
            <ProductsHomeComp
              id={1}
              name="You may also like"
              data={productsAfterDetail.you_may_also_like}
            />

            <HeroSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
