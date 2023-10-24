"use client";

// GetTickets.tsx
import { useState } from "react";
import { events } from "../mock-data";
import { Button } from "./ui/Button";

const GetTickets = () => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  // Get the price of the first ticket type of the first event
  const ticketPrice = events[0].ticketInfo[0].price;

  const handleIncrement = () => {
    setNumberOfTickets((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setNumberOfTickets((prevCount) => prevCount - 1);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-64">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Ticket Price</span>
        <span>{ticketPrice}ETH</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Number of tickets</span>
        <div className="flex">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 p-2 rounded-l focus:outline-none"
            disabled={numberOfTickets <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 bg-gray-100">{numberOfTickets}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-200 p-2 rounded-r focus:outline-none"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
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
