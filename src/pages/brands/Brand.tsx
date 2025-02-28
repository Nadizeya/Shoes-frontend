import MainLoading from "@/components/shared/MainLoading";
import { BrandT } from "@/types/common";
import { useBrands } from "@/utils/api hooks/useNameList";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const Brand = () => {
  const { brands, isSuccess, isLoading } = useBrands();

  // Group brands alphabetically
  const groupedBrands = useMemo(() => {
    if (!brands) return {};
    return brands.reduce((acc: Record<string, BrandT[]>, brand: BrandT) => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(brand);
      return acc;
    }, {});
  }, [brands]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <div className="py-10 px-5">
      <h1 className="text-3xl font-semibold mb-6">All Brands</h1>

      <div className="flex flex-wrap gap-4 md:gap-6 mb-6 ">
        {alphabet.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="text-gray-700 font-medium hover:underline"
          >
            {letter}
          </a>
        ))}
      </div>

      {isSuccess && brands ? (
        <div className="space-y-8">
          {Object.entries(groupedBrands).map(([letter, brands]) => (
            <div key={letter} id={letter}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {letter}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {brands.map((brand: BrandT, index: number) => (
                  <Link
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                    to={`/brands/${brand.id}`}
                  >
                    <span className="text-base font-medium text-gray-800">
                      {brand.name.replace(/_/g, " ")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No brands available.</div>
      )}
    </div>
  );
};

export default Brand;
