import HeroCard from "../../../components/shared/HeroCard";
import { heroCardsData } from "../hero";

const HeroSection = () => {
  return (
    <div className="flex gap-7 mt-4 overflow-x-scroll no-scrollbar">
      {heroCardsData.map((card, index) => (
        <HeroCard
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          background={card.background}
        />
      ))}
    </div>
  );
};

export default HeroSection;
