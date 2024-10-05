import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input, InputProps } from "../ui/input";

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};
export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    console.log(searchTerm);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
      console.log("Hi");
    };

    return (
      <div className="w-1/3">
        <label className="flex h-10 items-center border border-text rounded-full bg-input px-2 pr-10 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-3">
          <SearchIcon />

          <input
            ref={ref}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-2 border-none bg-input placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed placeholder:opacity-50"
          />
        </label>
      </div>
    );
  }
);

export default SearchBar;
