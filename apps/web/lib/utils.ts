import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/env.mjs";
import { isHexString } from "ethers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string | undefined) => {
  return `${addr?.substring(0, 8)}...`;
};

export const getAppChainId = () => {
  return isHexString(env.NEXT_PUBLIC_CHAIN_ID)
    ? env.NEXT_PUBLIC_CHAIN_ID
    : `0x${parseInt(env.NEXT_PUBLIC_CHAIN_ID, 10).toString(16)}`;
};
