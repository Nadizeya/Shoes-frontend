import React from "react";

const categories: string[] = [
  "New",
  "Brand",
  "Make Up",
  "Skin Care",
  "Hair",
  "Fragrance",
  "Tools and Brushes",
  "Bath and Body",
  "Mini Size",
  "Beauty under 10,000",
  "Sale and Offers",
];

const SecondHeader = () => {
  // soon later we need to fetch api for all main category
  return (
    <div className="px-8 bg-main py-5 text-white flex items-center justify-between">
      {categories.map((category, index: number) => (
        <p className="text-sm cursor-pointer" key={index}>
          {category}
        </p>
      ))}
    </div>
  );
};

export default SecondHeader;
