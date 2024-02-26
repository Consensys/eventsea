"use client"

import Image from "next/image";
import { format } from "date-fns";
import { EventSea } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { CardSkeleton } from "./CardSkeleton";

export const EventCard = ({ event }: { event: EventSea.Event }) => {
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (timestamp: number) =>
    format(new Date(timestamp * 1000), "MMM. d");

  return (
    <>
      {isLoading ? (
        <CardSkeleton image={event.image} setIsLoading={setIsLoading} />
      ) : (
        <article
          key={event.id}
          className="relative flex flex-col aspect-square group"
        >
          <div className="h-full overflow-hidden transition-transform duration-300 ease-in-out origin-top rounded-lg group-hover:scale-x-105">
            <Image
              src={
                event.image
                  ? `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${event.image}`
                  : "/images/default.png"
              }
              onLoad={() => setIsLoading(false)}
              objectFit="cover"
              alt={event.title}
              fill={true}
              className="duration-150 origin-center transform rounded-lg group-hover:scale-110 "
            />
          </div>

          <Link href={`/events/${event.id}`}>
            <button className="absolute bg-[#C4FF1C] h-10 flex justify-center group-hover:justify-end group-hover:pr-2  transition-all duration-300 ease-in-out items-center w-10 group-hover:w-28 rounded-md right-4 top-4">
              <p className="text-sm absolute whitespace-nowrap opacity-0 text-[#09090B] transition-opacity duration-300  left-2 group-hover:opacity-100">
                Get ticket
              </p>
              <Image
                src="/right-arrow.svg"
                width={16}
                height={16}
                alt="Follow us on Twitter"
              />
            </button>
          </Link>

          <div className="p-4 absolute bottom-0 w-full bg-white left-0 space-y-1 border transition-transform ease-linear duration-300 group-hover:translate-x-4 group-hover:translate-y-4 border-[#E4E4E7] rounded-lg font-semibold">
            <h2 className="text-sm text-[#09090B] ">{event.title}</h2>

            <p className="text-xs text-[#52525B]">{event.location?.address}</p>
            <p className="text-xs text-[#52525B]">
              {formatDate(event.dateTime)}
            </p>
          </div>
        </article>
      )}
    </>
  );
};
