import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchResultList from "./SearchResultList";
import { QueryT } from "@/types/search";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState<QueryT>({
    tag: "All",
    value: "",
  });

  const [resultList, setResultList] = useState([{ id: 1, title: "AA" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(query);

    // fetch data when user clicked submit
  };

  return (
    <div className="basis-[40%] relative">
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
            onChange={async (e) => {
              setQuery((prev) => ({
                ...prev,
                value: e.target.value,
              }));
              // const result = await axios.get(
              //   "https://rickandmortyapi.com/api/character"
              // );

              // // console.log(result?.data?.results);
              // setResultList(result?.data?.results);
            }}
          />
          <Button className="hidden" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <SearchResultList
        query={query}
        setQuery={setQuery}
        resultList={resultList}
      />
    </div>
  );
};

export default SearchBar;
