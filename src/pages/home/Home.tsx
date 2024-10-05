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
    <div className="space-y-5">
      <HeroSection />
      <ProductsHomeComp />
      <BrandsHomeComp />
    </div>
  );
};

export default Home;
