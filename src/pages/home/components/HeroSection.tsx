import React from "react";
import HeroCard from "./HeroCard";
import Hero1 from "/assets/logo/hero1.png";
import Hero2 from "/assets/logo/hero2.png";
import Hero3 from "/assets/logo/hero3.png";

const HeroSection = () => {
  return (
    <div className="flex gap-7 mt-4 overflow-x-scroll no-scrollbar">
      <HeroCard
        image={Hero1}
        title="Bestselling Beauty"
        description="These fan-favorites are worth the hype"
        background="#edc1cf"
      />
      <HeroCard
        image={Hero2}
        title="Bestselling Beauty"
        description="These fan-favorites are worth the hype"
        background="#d1c1b0"
      />
      <HeroCard
        image={Hero3}
        title="Bestselling Beauty"
        description="These fan-favorites are worth the hype"
        background="#edc1cf"
      />
    </div>
  );
};

export default HeroSection;
