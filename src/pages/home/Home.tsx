import ProductsHomeComp from "./components/ProductsHomeComp";
import HeroSection from "./components/HeroSection";
// import { useApiGet } from "@/utils/useQueryHook";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setMainCategories } from "@/store/slices/Home/homeSlice";
import { useHomeData } from "@/utils/api hooks/useHomeData";
import MainLoading from "@/components/shared/MainLoading";

const Home = () => {
  const dispatch = useAppDispatch();

  const { mainCategories, productsData, isLoading, isSuccess } = useHomeData();

  useEffect(() => {
    if (isSuccess) {
      if (mainCategories) dispatch(setMainCategories(mainCategories));
      // if (productsData) dispatch(setProducts(productsData));
    }
  }, [mainCategories, productsData, isSuccess]);

  return (
    <div>
      {isLoading && <MainLoading />}
      {isSuccess && (
        <div className="space-y-8 pb-10">
          <HeroSection />
          <ProductsHomeComp
            id={1}
            name="Beauty Offers (10)"
            data={productsData.beauty_offer}
          />
          <ProductsHomeComp
            id={2}
            name="Chosen For You"
            data={productsData.Choose_for_you}
          />
          <HeroSection />

          <ProductsHomeComp
            id={3}
            name="New Arrival"
            data={productsData.New_Arrivals}
          />
          <HeroSection />
        </div>
      )}
    </div>
  );
};

export default Home;
