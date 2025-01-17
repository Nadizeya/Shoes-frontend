import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchResultList from "./SearchResultList";
import { QueryT } from "@/types/search";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import { BASE_URL } from "@/api/BaseService";
import useResponsive from "@/utils/useResponsive";

const SearchBar = () => {
  const [query, setQuery] = useState<QueryT>({
    tag: "All",
    value: "",
  });
  const debouncedQuery = useDebounce(query.value, 500); // Debounced value
  const initialResultState = {
    products: [],
    brands: [],
    categories: [],
  };
  const [resultList, setResultList] = useState(initialResultState);
  const { desktopResponsive } = useResponsive();

  const fetchSearchResults = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setResultList(initialResultState);
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}api/global_search?query=${searchValue}`
      );

      setResultList(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Fetch results whenever the debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchResults(debouncedQuery);
    }
  }, [debouncedQuery]);
  const [showResults, setShowResults] = useState(false); // Control visibility of SearchResultList
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setQuery({
          tag: "All",
          value: "",
        });
        setResultList(initialResultState); // Reset the result list
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="basis-[40%] relative" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 rounded-full px-2 border border-black"
      >
        <div className="relative flex w-full items-center">
          <Search className="h-5 w-5" />
          <Input
            name="search"
            type="text"
            value={query.value}
            placeholder="Search"
            className="search w-full appearance-none bg-transparent border-none"
            onFocus={() => setShowResults(true)} // Show results when focusing the input
            onChange={async (e) => {
              setQuery((prev) => ({
                ...prev,
                value: e.target.value,
              }));
              setShowResults(true); // Show results while typing
            }}
          />
          <Button className="hidden" type="submit">
            Submit
          </Button>
        </div>
      </form>
      {showResults && desktopResponsive && (
        <SearchResultList
          query={query}
          setQuery={setQuery}
          resultList={resultList}
        />
      )}
      {showResults && !desktopResponsive && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="relative w-full h-full bg-white shadow-lg p-4 overflow-y-auto">
            <div className="">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-gray-200 rounded-full w-full px-2 border border-black mb-4"
              >
                <div className="relative flex w-full items-center">
                  <Search className="h-5 w-5" />
                  <Input
                    name="search"
                    type="text"
                    value={query.value}
                    placeholder="Search"
                    className="search w-full appearance-none bg-transparent border-none"
                    onChange={(e) => {
                      setQuery((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }));
                    }}
                  />
                </div>
              </form>
              <button
                onClick={() => setShowResults(false)}
                className="  text-blue-600 hover:text-black"
              >
                Cancel
              </button>

              <SearchResultList
                query={query}
                setQuery={setQuery}
                resultList={resultList}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
