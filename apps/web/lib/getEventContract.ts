import { ethers } from "ethers";
import contract from "@blockchain/out/Event.sol/Event.json";
import { Event } from "@blockchain/typechain-types/Event";
import { ContractPermission } from "@/types";
import { getNetworkRPC } from "./utils";


type Args = {
  address: string;
  permission: ContractPermission;
};

export const getEventContract = async ({ address, permission }: Args) => {
  const network = process.env.NETWORK || "localhost";
  const rpcUrl = getNetworkRPC(network);
  
  const provider =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
      ? new ethers.BrowserProvider(window.ethereum!)
      : new ethers.JsonRpcProvider(rpcUrl);

  const signerOrProvider =
    permission === ContractPermission.READ
      ? provider
      : await provider.getSigner();

  return new ethers.Contract(
    address,
    contract.abi,
    signerOrProvider
  ) as unknown as Event;
};
