import { ethers } from "ethers";
import abi from "@blockchain/artifacts/contracts/EventsFactory.sol/EventsFactory.json";
import { EventsFactory } from "@blockchain/typechain-types/contracts/EventsFactory";
import { ContractPermission } from "@/types";

type Args = {
  permission: ContractPermission;
};

export const getEventFactoryContract = async ({ permission }: Args) => {
  const provider =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
      ? new ethers.BrowserProvider(window.ethereum!)
      : new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

  const signerOrProvider =
    permission === ContractPermission.READ
      ? provider
      : await provider.getSigner();

  return new ethers.Contract(
    process.env.NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS!,
    abi.abi,
    signerOrProvider
  ) as unknown as EventsFactory;
};
