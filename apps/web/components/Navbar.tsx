"use client";

// Navbar.tsx

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";
import CreateEvent from "@/components/create-event-form";
import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "./../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const ConnectWalletButton = () => {
  const [account, setAccount] = useState<string | undefined>();

  const { sdk, connected, connecting } = useSDK();

  const connect = async () => {
    try {
      const metaMaskAccount = (await sdk?.connect()) as string[];
      setAccount(metaMaskAccount[0]);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setAccount(undefined); // Optionally reset the account state
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="primary">{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-white border rounded-md shadow-lg right-0 z-10 top-10">
            <button className="block w-full pl-2 pr-4 py-2 text-left hover:bg-gray-200">
              My Events
            </button>
            <button className="block w-full pl-2 pr-4 py-2 text-left hover:bg-gray-200">
              Wallet Details
            </button>
            <button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button variant="primary" disabled={connecting} onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" /> Login
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
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
          <ConnectWalletButton />
        </MetaMaskProvider>
      </div>
    </nav>
  );
};

export default NavBar;
