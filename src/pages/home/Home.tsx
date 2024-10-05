import BrandsHomeComp from "./components/BrandsHomeComp";
import ProductsHomeComp from "./components/ProductsHomeComp";
import HeroSection from "./components/HeroSection";

const Home = () => {

  return (
    <div className="space-y-5">
      <HeroSection />
      <BrandsHomeComp />
      <ProductsHomeComp />
    </div>
  );
};

export default Home;
