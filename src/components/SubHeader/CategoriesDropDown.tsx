import { BrandT, CategoryT } from "@/types/common";

interface Props {
  data: CategoryT[] | BrandT[];
  mainCategoryName: string; // Pass down from parent
}

const CategoriesDropDown = ({ data, mainCategoryName }: Props) => {
  const chunkedData = [];
  const filteredData = data.slice(0, 30);
  for (let i = 0; i < filteredData.length; i += 5) {
    chunkedData.push(filteredData.slice(i, i + 5));
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
                    ? `/brands/${category.id}`
                    : mainCategoryName === "New"
                    ? `/new-categories/`
                    : `/categories/${category.id}`
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
