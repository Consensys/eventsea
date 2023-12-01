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
    <div className="container">
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
    </div>
  );
};

export default ForYou;
