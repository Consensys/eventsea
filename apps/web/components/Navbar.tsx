"use client";

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import { SearchBar } from "./SearchBar";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectionModal } from "./LoginModal";
import { useState } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "EventSea",
      url: host, // using the host constant defined above
    },
  };

  return (
    <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto bg-white border py-7 rounded-xl">
      <Link href="/" className="flex gap-1 px-6">
        <EventSeaLogo />
        <span className="hidden text-2xl font-bold sm:block">
          <span className="text-[#0C200A]">Event</span>
          <span className="text-[#4C6D07]">Sea</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6">
        <SearchBar />
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton setShowModal={setShowModal} />
          <ConnectionModal open={showModal} setOpen={setShowModal} />
        </MetaMaskProvider>
      </div>
    </nav>
  );
};

export default NavBar;
