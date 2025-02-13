import { CategoryT } from "@/types/common";

interface Props {
  data: CategoryT[];
  mainCategoryName: string; // Pass down from parent
}

const CategoriesDropDown = ({ data, mainCategoryName }: Props) => {
  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 5));
  }

  return (
    <div className="space-y-4 px-12">
      {chunkedData.map((row, rowIndex) => (
        <div className="flex justify-start" key={rowIndex}>
          {row.map((category, index) => (
            <div className="w-1/5" key={index}>
              <a
                href={
                  mainCategoryName === "Brand"
                    ? `/brands/${category.id}` // Route for Brand
                    : `/categories/${category.id}` // Route for other categories
                }
                className="inline-block font-bold hover:underline"
              >
                {category.name}
              </a>
            </div>
          ))}
          {/* Add empty divs to maintain layout if fewer than 3 items */}
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
