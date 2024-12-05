import React from "react";
import { Badge } from "@/components/ui/badge";
import classNames from "classnames";
import { QueryT, SearchResutListT } from "@/types/search";

const tags = [
  {
    id: 1,
    tag: "All",
  },
  {
    id: 2,
    tag: "Products",
  },
  {
    id: 3,
    tag: "Brands",
  },
  {
    id: 4,
    tag: "Categories",
  },
];

const SearchResultList = ({
  resultList,
  setQuery,
  query,
}: SearchResutListT) => {
  const resultexist = resultList && resultList?.length > 0;
  // console.log(resultList);
  return (
    <>
      {resultexist &&
        resultList?.map((result, index) => (
          <div
            className="absolute w-full p-3 bg-white rounded-md mt-2 shadow-sm"
            key={index}
          >
            <div className="flex items-center gap-2">
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
                    "cursor-pointer  border border-[#323232] text-black hover:bg-transparent",
                    {
                      "bg-black text-white hover:bg-black":
                        query.tag === val.tag,

                      "bg-transparent": query.tag !== val.tag,
                    }
                  )}
                >
                  {val.tag}
                </Badge>
              ))}
            </div>
            <div className="">{result.name}</div>
          </div>
        ))}
    </>
  );
};

export default SearchResultList;
