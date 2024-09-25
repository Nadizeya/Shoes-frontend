import BrandsHomeComp from "./components/BrandsHomeComp";
import ProductsHomeComp from "./components/ProductsHomeComp";
import HeroSection from "./components/HeroSection";

const Home = () => {

  return (
    <div>
      <HeroSection />
      <BrandsHomeComp />
      <ProductsHomeComp />
    </div>
  );
};

export default Home;
