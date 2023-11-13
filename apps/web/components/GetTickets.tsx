"use client";

// GetTickets.tsx
import { useState } from "react";
import { Button } from "./ui/Button";
import { EventSea } from "@/types";

interface GetTicketsProps {
  ticketPrice: number;
}

const GetTickets: React.FC<GetTicketsProps> = ({ ticketPrice }) => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfTickets >= 1) {
      setNumberOfTickets((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl full md:w-3/4 md:sticky md:top-4 h-fit">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Ticket Price</span>
        <span>{ticketPrice}ETH</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">Number of tickets</span>
        <div className="flex">
          <button
            onClick={handleDecrement}
            className={`${numberOfTickets < 1 && "cursor-not-allowed opacity-30"} bg-gray-200 py-1 px-4 rounded-xl focus:outline-none`}
            disabled={numberOfTickets < 1}
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
      <Button
        variant="primary"
        className="w-full text-[#0C200A] p-2 rounded focus:outline-none "
      >
        Get tickets
      </Button>
    </div>
  );
};

export default GetTickets;
