import SearchIcon from "../public/icons/SearchIcon";
import { Button } from "./ui/Button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* Search bar with search icon for larger screens */}
      <div className={`relative w-64 hidden sm:block`}>
        {searchValue === "" && (
          <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        )}
        <input
          type="text"
          placeholder={searchValue === "" ? "Find your event" : ""}
          className="border rounded-md p-2 pl-8 pr-8 w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue === "" && (
          <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
            ⌘ K
          </span>
        )}
      </div>
      {/* Search icon for smaller screens */}
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger>
            <SearchIcon className="w-5 h-5" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="relative w-64">
              {searchValue === "" && (
                <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              )}
              <input
                type="text"
                placeholder={searchValue === "" ? "Find your event" : ""}
                className="border rounded-md p-2 pl-8 pr-8 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue === "" && (
                <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                  ⌘ K
                </span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
