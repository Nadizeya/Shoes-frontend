import ProductsInfo from "./components/ProductsInfo";
import ProductAccordion from "./components/ProductAccordion";
import SimilarProduct from "./components/SimilarProduct";
import SuggestionProduct from "./components/SuggestionProduct";
import HeroSection from "../home/components/HeroSection";
import { ChevronLeft } from "lucide-react";

const ProductDetails = () => {
  return (
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
      <SimilarProduct />
      <SuggestionProduct />
      <HeroSection />
      <SimilarProduct />
      <SuggestionProduct />
      <HeroSection />
    </div>
  );
};

export default ProductDetails;
