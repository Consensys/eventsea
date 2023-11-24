"use client";

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";
import CreateEvent from "@/components/create-event-form";
import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "./../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    sdk?.terminate();
  };

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="primary">{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-44 top-10">
            <button className="block w-full py-2 pl-2 pr-4 text-left hover:bg-gray-200">
              My Events
            </button>
            <button className="block w-full py-2 pl-2 pr-4 text-left hover:bg-gray-200">
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
          <WalletIcon className="w-4 h-4 mr-2" /> Connect MetaMask
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
      <div className="flex items-center gap-4 px-6">
        <SearchBar />
        <CreateEvent />

        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton />
        </MetaMaskProvider>
      </div>
    </nav>
  );
};

export default NavBar;
