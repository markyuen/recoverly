import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = () => {
  return (
    <div className="w-full h-10 bg-white  flex justify-between items-center relative">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Find Your Favourite Items"
        className="appearance-none w-full outline-none focus:outline-none active:outline-none "
      />
      <button
        type="submit"
        className="ml-1 focus:outline-none active:outline-none px-2 "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
