import { useState, useEffect } from "react";
import HeroCard from "../../../components/shared/HeroCard";
import { heroCardsData } from "../hero";

const getRandomCards = (data: any, num: number) => {
  return [...data] // Create a copy to avoid mutating original array
    .sort(() => 0.5 - Math.random())
    .slice(0, num);
};

const HeroSection = () => {
  const [randomCards, setRandomCards] = useState<any[]>([]);

  useEffect(() => {
    setRandomCards(getRandomCards(heroCardsData, 3)); // Runs only once on mount
  }, []);

  return (
    <div className="flex gap-7 mt-4 overflow-x-scroll no-scrollbar">
      {randomCards.map((card, index) => (
        <HeroCard
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          background={card.background}
          path={card.path}
        />
      ))}
    </div>
  );
};

export default HeroSection;
