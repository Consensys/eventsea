"use client";

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";

import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto bg-white border py-7 rounded-xl">
      {/* EventSeaLogo on the left */}
      <Link href="/" className="flex gap-1 px-6">
        <EventSeaLogo />
        <span className="hidden text-2xl font-bold sm:block">
          <span className="text-[#0C200A]">Event</span>
          <span className="text-[#4C6D07]">Sea</span>
        </span>
      </Link>

      {/* Login button with WalletIcon */}
      <div className="flex gap-4 px-6">
        <SearchBar />
        <Button variant="primary">
          <WalletIcon className="w-4 h-4 mr-2" /> LogIn
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
