import { Badge } from "@/components/ui/badge";
import classNames from "classnames";
import { SearchResutListT } from "@/types/search";
import { BASE_URL } from "@/api/BaseService";
import { useNavigate } from "react-router-dom";

const tags = [
  { id: 1, tag: "All" },
  { id: 2, tag: "Products" },
  { id: 3, tag: "Brands" },
  { id: 4, tag: "Categories" },
];

type SearchItemProps = {
  item: {
    id: number;
    name: string;
    description?: string;
    original_price?: number;
    image: string | null;
  };
  itemType: "product" | "brand" | "category";
};

const SearchItem: React.FC<SearchItemProps> = ({ item, itemType }) => {
  const navigate = useNavigate();

  // Determine the correct route based on itemType
  const handleClick = () => {
    if (itemType === "product") {
      navigate(`/products/${item.id}`);
    } else if (itemType === "brand") {
      navigate(`/brands/${item.id}`);
    } else if (itemType === "category") {
      navigate(`/categories/${item.id}`);
    }
  };
  return (
    <div
      className="py-2 border-b flex gap-5 last:border-none cursor-pointer"
      onClick={handleClick} // Add onClick to navigate
    >
      {item.image && (
        <img
          src={` ${BASE_URL}${item.image}`}
          alt={item.name}
          className="w-9 h-9  object-cover"
        />
      )}
      <h4>{item.name}</h4>
    </div>
  );
};

const SearchResultList = ({
  resultList,
  setQuery,
  query,
}: SearchResutListT) => {
  const resultexist =
    resultList &&
    (resultList.products.length >= 0 ||
      resultList.brands.length >= 0 ||
      resultList.categories.length >= 0);

  const filteredResults = () => {
    if (query.tag === "Products") {
      return { products: resultList?.products, brands: [], categories: [] };
    } else if (query.tag === "Brands") {
      return { products: [], brands: resultList?.brands, categories: [] };
    } else if (query.tag === "Categories") {
      return { products: [], brands: [], categories: resultList?.categories };
    }
    return resultList; // Show all results for "All"
  };

  const displayResults = filteredResults();

  return (
    <>
      {resultexist && (
        <div className="absolute w-full p-3 z-50 bg-white rounded-md mt-2 shadow-sm">
          {/* Render Tags */}
          <div className="flex gap-2 mb-3">
            {tags.map((val) => (
              <Badge
                key={val.id}
                onClick={() =>
                  setQuery((prev) => ({
                    ...prev,
                    tag: val.tag,
                  }))
                }
                className={classNames(
                  "cursor-pointer border border-[#323232] text-black hover:bg-transparent",
                  {
                    "bg-black text-white hover:bg-black": query.tag === val.tag,
                    "bg-transparent": query.tag !== val.tag,
                  }
                )}
              >
                {val.tag}
              </Badge>
            ))}
          </div>

          {/* Render Results */}
          <div className="mb-3">
            {displayResults?.products && displayResults.products.length > 0 && (
              <div className="border-b py-1">
                <h3 className="font-bold">Product Suggestions</h3>

                {resultList.products.length > 0 &&
                  resultList.products.map((product) => (
                    <SearchItem
                      item={product}
                      itemType="product"
                      key={product.id}
                    />
                  ))}
              </div>
            )}
            {displayResults?.brands && displayResults.brands.length > 0 && (
              <div className="border-b py-1">
                <h3 className="font-bold">Brand Suggestions</h3>

                {resultList.brands.length > 0 &&
                  resultList.brands.map((brand) => (
                    <SearchItem item={brand} itemType="brand" key={brand.id} />
                  ))}
              </div>
            )}
            {displayResults?.categories &&
              displayResults.categories.length > 0 && (
                <div>
                  <h3 className="font-bold py-1">Category Suggestions</h3>
                  {resultList.categories.length > 0 &&
                    resultList.categories.map((category) => (
                      <SearchItem
                        item={category}
                        itemType="category"
                        key={category.id}
                      />
                    ))}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultList;
