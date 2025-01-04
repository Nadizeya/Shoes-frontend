import { CategoryT } from "@/types/common";
import { Link } from "react-router-dom";

interface Props {
  data: CategoryT[];
  mouseLeave: any;
}

const CategoriesDropDown = ({ data, mouseLeave }: Props) => {
  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 5));
  }

  return (
    <div
      className="fixed top-36 left-0  text-sm w-screen bg-white text-black p-4 "
      onMouseLeave={mouseLeave}
    >
      <div className="space-y-4 px-12">
        {chunkedData.map((row, rowIndex) => (
          <div className="flex justify-start" key={rowIndex}>
            {row.map((category, index) => (
              <Link
                to={`/categories/${category.id}`}
                className="w-1/5 font-bold hover:underline"
                key={index}
              >
                {category.name}
              </Link>
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
