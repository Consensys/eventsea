"use client";

import Link from "next/link";
import EventSeaLogo from "./icons/EventSeaLogo";
import WalletIcon from "./icons/WalletIcon";
import SearchIcon from "./icons/SearchIcon";
import { Button } from "./ui/Button";

import { useState } from "react";

export const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="flex items-center justify-between py-4">
      {/* EventSeaLogo on the left */}
      <Link href="/" className="flex gap-1 pl-6">
        <EventSeaLogo />
        <span className="text-2xl font-bold sm:block hidden">
          <span style={{ color: "#0C200A" }}>Event</span>
          <span style={{ color: "#4C6D07" }}>Sea</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Search bar with search icon for larger screens */}
        <div
          className={`relative w-64 hidden sm:block ${
            isSearchVisible ? "block" : "hidden"
          }`}
        >
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
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className="sm:hidden mr-2"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Login button with WalletIcon */}
        <div className="pr-6">
          <Button variant="primary">
            <WalletIcon className="mr-2 h-4 w-4" /> LogIn
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
