"use client";

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";

import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  return (
    <nav className="flex mx-auto px-6 py-7 bg-white border rounded-xl items-center justify-between max-w-screen-xl">
      {/* EventSeaLogo on the left */}
      <Link href="/" className="flex gap-1 pl-6">
        <EventSeaLogo />
        <span className="text-2xl font-bold sm:block hidden">
          <span className="text-[#0C200A]">Event</span>
          <span className="text-[#4C6D07]">Sea</span>
        </span>
      </Link>

      {/* Login button with WalletIcon */}
      <div className="flex gap-4 pr-6">
        <SearchBar />
        <Button variant="primary">
          <WalletIcon className="mr-2 h-4 w-4" /> LogIn
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
