import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getGeocode, getLatLng } from "use-places-autocomplete";

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

export const getNetworkRPC = (network: string) => {
  switch (network) {
    case "localhost":
      return "http://127.0.0.1:8545/";
    case "linea-testnet":
      return `${process.env.LINEA_TEST_RPC_ENDPOINT}/${process.env.INFURA_API_KEY}`;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

export const getLatLngFromAddress = async (address: string) => {
  const data = await getGeocode({ address: address });
  return getLatLng(data[0]);
};
