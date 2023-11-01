// EventDetails.tsx
import React from "react";
import GetTickets from "./GetTickets";
import Image from "next/image";
import { events } from "@/mock-data";

interface EventDetailsProps {
  eventId: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const { title, tags, dateTime, description, location, images } = event;
  const date = new Date(Number(dateTime) * 1000).toLocaleDateString();

  return (
    <div className="p-6 bg-white shadow-lg rounded-md mb-8 relative">
      <Image
        src="/green-bg.webp"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute top-0 left-0 z-[-1]"
        alt="Background image"
      />

      <div className="relative w-full h-[300px] rounded-md mb-4 overflow-hidden">
        {images && images[0] && (
          <Image src={images[0]} alt={title} layout="fill" objectFit="cover" />
        )}
      </div>

      <div className="flex">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <span className="text-sm text-gray-500 bg-green-200 p-1 rounded-md inline-block mb-4">
            {tags.join(", ")}
          </span>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Date</h3>
            <p className="text-gray-900">{date}</p>
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Details
            </h3>
            <p className="text-gray-900">{description}</p>
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Location
            </h3>
            <p className="text-gray-900">{location.address}</p>
          </div>
        </div>

        <div className="ml-6 w-1/3">
          <GetTickets event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
