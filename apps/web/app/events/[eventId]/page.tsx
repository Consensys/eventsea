import { notFound } from "next/navigation";
import GetTickets from "@/components/GetTickets";
import Image from "next/image";
import { format } from "date-fns";
import EventLocationMap from "@/components/event-location-map";

import { env } from "@/env.mjs";
import { getEventById, getTicketById } from "@/lib/actions";

type PageProps = {
  params: {
    eventId: string;
  };
};

const EventPage = async ({ params: { eventId } }: PageProps) => {
  if (!eventId) {
    return notFound();
  }

  const { title, eventType, description, location, date, ticketNFT, image } =
    await getEventById(eventId);
  const { id, price } = await getTicketById(ticketNFT);

  const formattedDate = format(new Date(Number(date) * 1000), "MMM. d");

  return (
    <div className="w-full">
      <div className="relative w-full h-[450px] rounded-md mb-4 overflow-hidden">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>

      <div className="relative grid md:grid-cols-2 justify-items-center w-full gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <span className="text-sm text-gray-500 bg-green-200 p-1 rounded-md inline-block mb-4 w-fit">
            {eventType}
          </span>

          <div className="my-4">
            <h3 className="mb-1 text-lg font-semibold text-gray-700">Date</h3>
            <p className="text-gray-900">{formattedDate}</p>
          </div>

          <div className="my-4">
            <h3 className="mb-1 text-lg font-semibold text-gray-700">
              Details
            </h3>
            <p className="text-gray-900">{description}</p>
          </div>

          <div className="my-4 flex flex-col gap-6 items-center md:items-start">
            <EventLocationMap location={location} />
          </div>
        </div>

        <div className="w-full md:pl-20">
          <GetTickets
            ticketPrice={price}
            ticketNFT={ticketNFT}
            title={title}
            date={date}
            ticketId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
