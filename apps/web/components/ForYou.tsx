"use client";

// ForYou.tsx
import React, { useState } from "react";
import { events as mockEvents } from "@/mock-data";

const ForYou: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 USA");

  const countries = [
    "🇺🇸 USA",
    "🇨🇦 Canada",
    "🇬🇧 UK",
    "🇦🇺 Australia",
    "🇨🇴 Colombia",
    // ... (add more countries as needed)
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-900 font-semibold">Events for you</h2>
        <div className="flex items-center">
          <span className="mr-4 text-gray-900">Showing events in</span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border text-gray-900 rounded p-2 bg-white"
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 bg-white rounded-lg shadow">
        <h3 className="text-xl text-gray-900 font-medium py-4 pl-4">
          September
        </h3>
        <div className="p-4 flex justify-between text-gray-600 font-medium">
          <span>Title</span>
          <span>Location</span>
          <span>Date</span>
          <span>Going</span>
          <span>Ticket Price</span>
        </div>

        {mockEvents.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 px-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <img
                src={event.images ? event.images[0] : "/path/to/image.jpg"}
                alt="Event"
                className="w-16 h-16 mr-4 rounded-lg shadow"
              />
              <div>
                <h4 className="text-lg text-gray-900 font-medium">
                  {event.title}
                </h4>
                <p className="text-gray-600">{event.location.address}</p>
              </div>
            </div>
            <p className="text-gray-600">
              {new Date(Number(event.dateTime) * 1000).toLocaleDateString(
                undefined,
                { month: "short", day: "numeric" }
              )}
            </p>
            <div className="flex items-center">
              <img
                src="/images/image_1.png"
                alt="User"
                className="w-6 h-6 rounded-full -ml-2 shadow"
              />
              <img
                src="/images/image_2.png"
                alt="User"
                className="w-6 h-6 rounded-full -ml-2 shadow"
              />
              <div className="bg-gray-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center -ml-2 shadow">
                +3 {/* This is a placeholder, replace with dynamic value */}
              </div>
              <p className="text-gray-600 ml-2">{event.participantCount}</p>
            </div>
            <span className="text-gray-600 font-bold">
              {event.ticketInfo[0]
                ? `${event.ticketInfo[0].price} ETH`
                : "Price not available"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForYou;
