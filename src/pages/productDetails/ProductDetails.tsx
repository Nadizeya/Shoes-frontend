import { useAppDispatch } from "@/store/hook";
import {
  setProductDetail,
  setSelectedItem,
} from "@/store/slices/Products/productSlice";
import { useProductDetails } from "@/utils/api hooks/useProductDetail";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../home/components/HeroSection";
import ProductAccordion from "./components/ProductAccordion";
import ProductsInfo from "./components/ProductsInfo";
import SimilarProduct from "./components/SimilarProduct";
import SuggestionProduct from "./components/SuggestionProduct";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const { productDetail, isSuccess } = useProductDetails(numericProductId);

  console.log(productDetail);

  useEffect(() => {
    if (isSuccess) {
      if (productDetail) {
        dispatch(setProductDetail(productDetail));
        if (productDetail.items && productDetail.items.length > 0) {
          dispatch(setSelectedItem(productDetail.items[0]));
        }
      }
    }
  }, [productDetail, isSuccess]);
  return (
    <div>
      {isSuccess && (
        <div className="px-4 py-8">
          <h4 className="flex items-center gapa-4">
            Hair
            <ChevronLeft width={20} height={20} className="text-gray-600" />
            Styling
            <ChevronLeft width={20} height={20} className="text-gray-600" />
            Cut
          </h4>

          <ProductsInfo />
          <ProductAccordion />
          {/* <SimilarProduct /> */}
          {/* <SuggestionProduct /> */}
          <HeroSection />
          {/* <SimilarProduct /> */}
          {/* <SuggestionProduct /> */}
          <HeroSection />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
