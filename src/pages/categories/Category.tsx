import { useMainCategoryById } from "@/utils/api hooks/useNameList";
import { Link, useParams } from "react-router-dom";
import { NewCategory } from "@/types/homeTypes";
import { BrandT, CategoryT } from "@/types/common";
import MainLoading from "@/components/shared/MainLoading";

const MainCategory = () => {
  const { maincategoryId } = useParams();
  const { category, isLoading, isError } = useMainCategoryById(
    Number(maincategoryId)
  );

  if (isLoading) return <MainLoading />;
  if (!category) return <div>Error loading category details.</div>;

  // Determine which data to map based on existence
  let items: (NewCategory | BrandT | CategoryT)[] = [];

  if (category.new_categories && category.new_categories.length > 0) {
    items = category.new_categories;
  } else if (category.brands && category.brands.length > 0) {
    items = category.brands;
  } else if (category.categories && category.categories.length > 0) {
    items = category.categories;
  }

  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold mb-6">{category.name}</h1>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
        {items.map((item, index) => (
          <Link
            key={(item as any).id || index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            to={`/brands/${(item as any).id}`}
          >
            <span className="text-sm font-medium text-gray-800">
              {(item as any).name.replace(/_/g, " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainCategory;
