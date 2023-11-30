"use client";

import React, { useState } from "react";
import { EventSea } from "@/types";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type Props = {
  events: EventSea.Event[];
};

const ForYou: React.FC<Props> = ({ events }) => {
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 USA");

  // Countries dropdown - you can expand this list
  const countries = [
    "🇺🇸 USA",
    "🇨🇦 Canada",
    "🇬🇧 UK",
    "🇦🇺 Australia",
    "🇨🇴 Colombia",
    // ...add more countries as needed
  ];

  const formatDate = (timestamp: number) =>
    format(new Date(timestamp * 1000), "MMM. d");

  const formatEventDate = (dateTime: number) => formatDate(dateTime);

  return (
    <>
      <Table>
        <TableCaption>Events for you</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Ticket price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={index}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.location.address}</TableCell>
              <TableCell>{formatEventDate(event.dateTime)}</TableCell>
              <TableCell>1 ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
    // <div className="p-6">
    //   <div className="flex justify-between items-center mb-6">
    //     <h2 className="text-2xl text-gray-900 font-semibold">Events for you</h2>
    //     <div className="flex items-center">
    //       <span className="mr-4 text-gray-900">Showing events in</span>
    //       <select
    //         value={selectedCountry}
    //         onChange={(e) => setSelectedCountry(e.target.value)}
    //         className="border text-gray-900 rounded p-2 bg-white"
    //       >
    //         {countries.map((country, index) => (
    //           <option key={index} value={country}>
    //             {country}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </div>

    //   <div className="border-t border-gray-200 mt-4 bg-white rounded-lg shadow">
    //     {events.length > 0 ? (
    //       events.map((event, index) => (
    //         <div
    //           key={index}
    //           className="flex justify-between items-center py-4 px-4 border-b border-gray-200"
    //         >
    //           <div className="flex items-center">
    //             <img
    //               src={event.image}
    //               alt="Event"
    //               className="w-16 h-16 mr-4 rounded-lg shadow"
    //             />
    //             <div>
    //               <h4 className="text-lg text-gray-900 font-medium">
    //                 {event.title}
    //               </h4>
    //               <p className="text-gray-600">{event.location.address}</p>
    //             </div>
    //           </div>
    //           <p className="text-gray-600">{formatEventDate(event.dateTime)}</p>
    //           <div className="flex items-center">
    //             {/* Display participants or a placeholder */}
    //           </div>
    //           <span className="text-gray-600 font-bold">
    //             {/* Display ticket price or a placeholder */}
    //           </span>
    //         </div>
    //       ))
    //     ) : (
    //       <p>Loading events...</p> // Placeholder for loading state
    //     )}
    //   </div>
    // </div>
  );
};

export default ForYou;
