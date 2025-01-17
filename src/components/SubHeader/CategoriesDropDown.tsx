import { CategoryT } from "@/types/common";
import { Link } from "react-router-dom";

interface Props {
  data: CategoryT[];
}

const CategoriesDropDown = ({ data }: Props) => {
  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 5));
  }

  return (
    <div className="space-y-4 px-12">
      {chunkedData.map((row, rowIndex) => (
        <div className="flex justify-start" key={rowIndex}>
          {row.map((category, index) => (
            <div className=" w-1/5">
              <Link
                to={`/categories/${category.id}`}
                className="inline-block font-bold hover:underline"
                key={index}
              >
                {category.name}
              </Link>
            </div>
          ))}
          {/* Add empty divs to keep the layout consistent if there's less than 3 items in the row */}
          {row.length < 3 &&
            Array(3 - row.length)
              .fill(0)
              .map((_, idx) => <div key={idx} className="w-1/3"></div>)}
        </div>
      ))}
    </div>
  );
};

export default CategoriesDropDown;
