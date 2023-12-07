import { ethers } from "ethers";
import contract from "@blockchain/artifacts/contracts/EventsFactory.sol/EventsFactory.json";
import { EventsFactory } from "@blockchain/typechain-types/contracts/EventsFactory";
import { ContractPermission } from "@/types";
import { getNetworkRPC } from "./utils";

type Args = {
  permission: ContractPermission;
};

export const getEventFactoryContract = async ({ permission }: Args) => {
  try {
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
      process.env.NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS!,
      contract.abi,
      signerOrProvider
    ) as unknown as EventsFactory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
