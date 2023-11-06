import { ethers } from "ethers";
import { abi } from "@blockchain/artifacts/contracts/Event.sol/Event.json";
import { Event } from "@blockchain/typechain-types/contracts/Event";
import { ContractPermission } from "@/types";


type Args = {
  address: string;
  permission: ContractPermission;
};

export const getEventContract = async ({ address, permission }: Args) => {
  const provider =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
      ? new ethers.BrowserProvider(window.ethereum!)
      : new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

  const signerOrProvider =
    permission === ContractPermission.READ
      ? provider
      : await provider.getSigner();

  return new ethers.Contract(
    address,
    abi,
    signerOrProvider
  ) as unknown as Event;
};
