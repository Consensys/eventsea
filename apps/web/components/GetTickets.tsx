"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { GasFeeCard } from "./GasFeeCard";
import MetaMaskProvider from "@/providers/MetamaskProvider";
import { formatEther } from "ethers";

interface GetTicketsProps {
  ticketPrice: bigint;
}

const GetTickets: React.FC<GetTicketsProps> = ({ ticketPrice }) => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setNumberOfTickets((prevCount) => prevCount - 1);
  };

  return (
    <MetaMaskProvider>
      <div className="p-8 bg-white shadow-xl rounded-xl full md:w-3/4 md:sticky md:top-4 h-fit">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Ticket Price</span>
          <span>{formatEther(ticketPrice)}ETH</span>
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
          <span>
            {formatEther(
              (BigInt(numberOfTickets.toString()) * ticketPrice).toString()
            )}
            ETH
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Gas fee</span>
          <GasFeeCard />
        </div>
        <Button
          variant="primary"
          className="w-full text-[#0C200A] p-2 rounded focus:outline-none "
        >
          Get tickets
        </Button>
      </div>
    </MetaMaskProvider>
  );
};

export default GetTickets;
