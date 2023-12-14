"use client";

import Link from "next/link";
import { useSDK } from "@metamask/sdk-react";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";
import CreateEvent from "@/components/create-event/create-event-form";
import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";
import { formatAddress } from "./../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import MetaMaskProvider from "@/providers/MetamaskProvider";
import { useEffect, useState } from "react";

const LINEA_TESTNET_CHAIN = "0xe704";

const switchEthereumChain = async () => {
  if (!window.ethereum) return;

  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: LINEA_TESTNET_CHAIN }],
  });

  window.location.reload();
};

export const ConnectWalletButton = () => {
  const [chainId, setChainId] = useState<string | null>(null);
  const { sdk, connected, connecting, account } = useSDK();

  useEffect(() => {
    if (window?.ethereum?.chainId) {
      setChainId(window?.ethereum?.chainId);
    }
  }, []);

  const isOnLineaTestnet = chainId === LINEA_TESTNET_CHAIN;

  const connect = async () => {
    try {
      (await sdk?.connect()) as string[];
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className="relative">
      {connected ? (
        isOnLineaTestnet ? (
          <Popover>
            <PopoverTrigger>
              <Button variant="primary">{formatAddress(account)}</Button>
            </PopoverTrigger>
            <PopoverContent className="right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-44 top-10">
              {/* <button className="block w-full py-2 pl-2 pr-4 text-left hover:bg-gray-200">
                My Events
              </button>
              <button className="block w-full py-2 pl-2 pr-4 text-left hover:bg-gray-200">
                Wallet Details
              </button> */}
              <button
                onClick={disconnect}
                className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
              >
                Disconnect
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="destructive" onClick={switchEthereumChain}>
            Swith to linea
          </Button>
        )
      ) : (
        <Button variant="primary" disabled={connecting} onClick={connect}>
          <WalletIcon className="w-4 h-4 mr-2" /> Connect MetaMask
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between gap-4 mx-auto bg-white border md:px-6 py-7 rounded-xl">
      <MetaMaskProvider>
        <Link href="/" className="flex px-2 md:gap-1 md:px-6">
          <EventSeaLogo />
          <span className="hidden text-2xl font-bold sm:block">
            <span className="text-[#0C200A]">Event</span>
            <span className="text-[#4C6D07]">Sea</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 px-1 md:px-6">
          <SearchBar />
          <CreateEvent />
          <ConnectWalletButton />
        </div>
      </MetaMaskProvider>
    </nav>
  );
};

export default NavBar;
