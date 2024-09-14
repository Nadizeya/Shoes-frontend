import BrandsHomeComp from "./components/BrandsHomeComp";
import ProductsHomeComp from "./components/ProductsHomeComp";
import HeroSection from "./components/HeroSection";
import { fetchUsers } from "@/api/endpoints/userApi";
import { useApiGet } from "@/utils/useQueryHook";
const Home = () => {
  const { data } = useApiGet(["users"], fetchUsers, {
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  console.log(data);
  return (
    <div>
      <HeroSection />
      <BrandsHomeComp />
      <ProductsHomeComp />
    </div>
  );
};

export default Home;
