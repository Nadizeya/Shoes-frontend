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

const SearchItem: React.FC<
  SearchItemProps & {
    setQuery: (query: any) => void;
    setShowResults: (val: boolean) => void;
  }
> = ({ item, itemType, setQuery, setShowResults }) => {
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

    setQuery((prev: any) => ({ ...prev, searchTerm: "", tag: "All" }));
    setShowResults(false);
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
  setShowResults,
  isFetching,
}: SearchResutListT) => {
  // Ensure displayResults always returns an object with empty arrays if necessary
  const filteredResults = (): SearchResutListT["resultList"] => {
    if (!resultList) {
      return { products: [], brands: [], categories: [] };
    }

    if (query.tag === "Products") {
      return {
        products: resultList.products || [],
        brands: [],
        categories: [],
      };
    } else if (query.tag === "Brands") {
      return { products: [], brands: resultList.brands || [], categories: [] };
    } else if (query.tag === "Categories") {
      return {
        products: [],
        brands: [],
        categories: resultList.categories || [],
      };
    }

    return {
      products: resultList.products || [],
      brands: resultList.brands || [],
      categories: resultList.categories || [],
    };
  };

  const displayResults = filteredResults();

  const resultexist =
    displayResults &&
    (displayResults.products.length > 0 ||
      displayResults.brands.length > 0 ||
      displayResults.categories.length > 0);

  return (
    <>
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

        {/* Render Results or Fetching State */}
        <div className="mb-3">
          {isFetching ? (
            <div className="text-center text-gray-500 py-2">Searching...</div>
          ) : resultexist && displayResults ? (
            <>
              {displayResults.products.length > 0 && (
                <div className="border-b py-1">
                  <h3 className="font-bold">Product Suggestions</h3>
                  {displayResults.products.map((product) => (
                    <SearchItem
                      item={product}
                      itemType="product"
                      key={product.id}
                      setQuery={setQuery}
                      setShowResults={setShowResults}
                    />
                  ))}
                </div>
              )}
              {displayResults.brands.length > 0 && (
                <div className="border-b py-1">
                  <h3 className="font-bold">Brand Suggestions</h3>
                  {displayResults.brands.map((brand) => (
                    <SearchItem
                      item={brand}
                      itemType="brand"
                      key={brand.id}
                      setQuery={setQuery}
                      setShowResults={setShowResults}
                    />
                  ))}
                </div>
              )}
              {displayResults?.categories.length > 0 && (
                <div>
                  <h3 className="font-bold py-1">Category Suggestions</h3>
                  {displayResults.categories.map((category) => (
                    <SearchItem
                      item={category}
                      itemType="category"
                      key={category.id}
                      setQuery={setQuery}
                      setShowResults={setShowResults}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-2">
              No results found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultList;
