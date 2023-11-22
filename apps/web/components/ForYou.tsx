"use client";

import React, { useState, useEffect } from "react";
import { getEventContract } from "@/lib/getEventContract";
import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { ContractPermission, EventSea } from "@/types";

const ForYou: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 USA");
  const [events, setEvents] = useState<EventSea.Event[]>([]); // State for events

  // Function to fetch events from the blockchain
  const fetchEvents = async () => {
    const eventsFactory = await getEventFactoryContract({
      permission: ContractPermission.READ,
    });
    const eventAddresses = await eventsFactory.getEvents();

    const eventsPromises = eventAddresses.map(async (address) => {
      const eventContract = await getEventContract({
        address,
        permission: ContractPermission.READ,
      });

      const [title, description, owner, location, eventType, image, date] =
        await Promise.all([
          eventContract.title(),
          eventContract.description(),
          eventContract.owner(),
          eventContract.location(),
          eventContract.eventType(),
          eventContract.image(),
          eventContract.date(),
        ]);

      return {
        id: address,
        title,
        description,
        owner: { address: owner },
        location: { address: location },
        eventType,
        image,
        dateTime: Number(date),
      } as EventSea.Event;
    });

    const fetchedEvents = await Promise.all(eventsPromises);
    setEvents(fetchedEvents);
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Countries dropdown - you can expand this list
  const countries = [
    "🇺🇸 USA",
    "🇨🇦 Canada",
    "🇬🇧 UK",
    "🇦🇺 Australia",
    "🇨🇴 Colombia",
    // ...add more countries as needed
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
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 px-4 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={event.image}
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
                {new Date(event.dateTime * 1000).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="flex items-center">
                {/* Display participants or a placeholder */}
              </div>
              <span className="text-gray-600 font-bold">
                {/* Display ticket price or a placeholder */}
              </span>
            </div>
          ))
        ) : (
          <p>Loading events...</p> // Placeholder for loading state
        )}
      </div>
    </div>
  );
};

export default ForYou;
