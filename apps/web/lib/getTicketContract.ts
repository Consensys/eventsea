import { ethers } from "ethers";
import { abi } from "@blockchain/artifacts/contracts/Ticket.sol/Ticket.json";
import { Ticket } from "@blockchain/typechain-types/contracts/Ticket";
import { ContractPermission } from "@/types";

type Args = {
  address: string;
  permission: ContractPermission;
};

export const getTicketContract = async ({ address, permission }: Args) => {
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
  ) as unknown as Ticket;
};
