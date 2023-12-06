"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";

import { GasFeeCard } from "./GasFeeCard";
import MetaMaskProvider from "@/providers/MetamaskProvider";

interface GetTicketsProps {
  ticketPrice: number;
  ticketNFT: string;
  metadataHash: string;
}

const GetTickets: React.FC<GetTicketsProps> = ({
  ticketPrice,
  ticketNFT,
  metadataHash,
}) => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setNumberOfTickets((prevCount) => prevCount - 1);
  };

  const handleGetTickets = async () => {
    const nftContract = await getTicketContract({
      address: ticketNFT,
      permission: ContractPermission.WRITE,
    });
    if (numberOfTickets <= 0) {
      console.log("Please select number of tickets");
      return;
    }
    try {
      const token = (
        await nftContract.mint(
          numberOfTickets,
          `https://ipfs.io/ipfs/${metadataHash}`,
          {
            value: ticketPrice * numberOfTickets,
          }
        )
      ).wait();
      console.log(await token, " Minted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MetaMaskProvider>
      <div className="w-3/4 p-8 mx-auto bg-white shadow-xl rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Ticket Price</span>
          <span>{ticketPrice}ETH</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Number of tickets</span>
          <div className="flex">
            <button
              onClick={handleDecrement}
              className="px-4 py-1 bg-gray-200 rounded-xl focus:outline-none"
              disabled={numberOfTickets <= 1}
            >
              -
            </button>
            <span className="px-4 py-2">{numberOfTickets}</span>
            <button
              onClick={handleIncrement}
              className="px-4 py-1 bg-gray-200 rounded-xl focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total</span>
          <span>{(numberOfTickets * ticketPrice).toFixed(2)}ETH</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Gas fee</span>
          <GasFeeCard />
        </div>
        <Button
          variant="primary"
          className="w-full text-[#0C200A] p-2 rounded focus:outline-none "
          onClick={async () => await handleGetTickets()}
        >
          Get tickets
        </Button>
      </div>
    </MetaMaskProvider>
  );
};

export default GetTickets;
