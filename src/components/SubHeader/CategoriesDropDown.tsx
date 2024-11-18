import { CategoryT } from "@/types/common";
import { Link } from "react-router-dom";

interface Props {
  data: CategoryT[];
}

const CategoriesDropDown = ({ data }: Props) => {
  // Create chunks of 3 categories for each row
  const chunkedData = [];
  for (let i = 0; i < data.length; i += 3) {
    chunkedData.push(data.slice(i, i + 3));
  }

  return (
    <div className="absolute text-sm bg-white text-black p-4 w-full">
      <div className="space-y-4 max-w-screen-xl mx-auto px-8">
        {chunkedData.map((row, rowIndex) => (
          <div className="flex justify-start" key={rowIndex}>
            {row.map((category, index) => (
              <a
                href={`/brands/${category.id}`}
                className="w-1/5 font-bold hover:underline"
                key={index}
              >
                {category.name}
              </a>
            ))}
            {/* Add empty divs to keep the layout consistent if there's less than 3 items in the row */}
            {row.length < 3 &&
              Array(3 - row.length)
                .fill(0)
                .map((_, idx) => <div key={idx} className="w-1/3"></div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDropDown;
