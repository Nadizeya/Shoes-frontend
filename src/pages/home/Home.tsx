import BrandsHomeComp from "./components/ProductsHomeComp";
import ProductsHomeComp from "./components/BrandsHomeComp";
import HeroSection from "./components/HeroSection";
// import { useApiGet } from "@/utils/useQueryHook";
import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "@/types/common";
import { fetchProducts } from "@/api/endpoints/productsApi";
import { Data } from "@/types/Home/homeTypes";
import { fetchUsers } from "@/api/endpoints/userApi";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setMainCategories, setProducts } from "@/store/slices/Home/homeSlice";
import { fetchHome } from "@/api/endpoints/homeApi";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log(data);

  // const { data, isSuccess } = useApiGet<GetAllResponse<Data>>(
  //   ["home"],
  //   fetchProducts,
  //   {
  //     enabled: true,
  //     refetchOnWindowFocus: true,
  //     retry: 1,
  //   }
  // );
  useEffect(() => {
    if (isSuccess) {
      dispatch(setMainCategories(data.data.maincategroies));
      dispatch(setProducts(data.data.products));
    }
  }, [data]);
  return (
    <div className="space-y-10 pb-10">
      <HeroSection />
      {/* <ProductsHomeComp /> */}
      <BrandsHomeComp id={1} name="Beauty Offers (25)" />
      <BrandsHomeComp id={2} name="Chosen For You" />
      <BrandsHomeComp id={3} name="New Arrival" />
      <HeroSection />
    </div>
  );
};

export default Home;
