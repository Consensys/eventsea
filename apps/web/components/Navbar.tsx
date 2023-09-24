"use client";

import Link from "next/link";
import EventSeaLogo from "./icons/EventSeaLogo";
import WalletIcon from "./icons/WalletIcon";
import SearchIcon from "./icons/SearchIcon";
import { useState } from "react";

export const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="flex items-center justify-between py-4">
      {/* EventSeaLogo on the left */}
      <Link href="/" className="flex gap-1 pl-6">
        <EventSeaLogo />
        <span className="text-2xl font-bold">
          <span style={{ color: "#0C200A" }}>Event</span>
          <span style={{ color: "#4C6D07" }}>Sea</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Search bar with search icon */}
        <div className="relative mr-4" style={{ width: "280px" }}>
          {searchValue === "" && (
            <SearchIcon
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingRight: "2px",
              }}
            />
          )}
          <input
            type="text"
            placeholder={searchValue === "" ? "Find your event" : ""}
            className="border rounded-md p-2 pl-6 pr-6 w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue === "" && (
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              ⌘ K
            </span>
          )}
        </div>

        {/* Login button with WalletIcon */}
        <div className="pr-6">
          {" "}
          <button
            className="flex justify-center items-center gap-2 px-4 py-2 rounded-md"
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              background: "#C4FF1C",
            }}
          >
            <WalletIcon />
            LogIn
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
