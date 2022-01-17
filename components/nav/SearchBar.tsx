import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = () => {
  return (
    <div className="w-full h-10 pl-3 pr-2 bg-white border flex justify-between items-center relative">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        className="appearance-none w-full outline-none focus:outline-none active:outline-none px-2"
      />
      <button
        type="submit"
        className="ml-1 outline-none focus:outline-none active:outline-none"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
