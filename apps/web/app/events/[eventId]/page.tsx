import { notFound } from "next/navigation";
import GetTickets from "@/components/GetTickets";

import Image from "next/image";
import { getEventContract } from "@/lib/getEventContract";
import { format } from "date-fns";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";
import EventLocationMap from "@/components/event-location-map";

type PageProps = {
  params: {
    eventId: string;
  };
};

const EventPage = async ({ params: { eventId } }: PageProps) => {
  if (!eventId) {
    return notFound();
  }

  const eventContact = await getEventContract({
    address: eventId,
    permission: ContractPermission.READ,
  });

  const eventData = await Promise.all([
    eventContact.title(),
    eventContact.description(),
    eventContact.location(),
    eventContact.eventType(),
    eventContact.image(),
    eventContact.date(),
    eventContact.ticketNFT(),
  ]);

  const [title, description, location, eventType, image, date, ticketNFT] =
    eventData;

  const ticketContract = await getTicketContract({
    address: ticketNFT,
    permission: ContractPermission.READ,
  });

  const ticketPrice = await ticketContract._ticketPrice();

  const formattedDate = format(new Date(Number(date) * 1000), "MMM. d");

  return (
    <div className="flex flex-col items-center gap-10 py-6 mb-8 rounded-md lg:px-16">
      <div className="absolute top-0 z-[-1]">
        <Image
          src="/green-bg.webp"
          width={1350}
          height={522.24}
          quality={100}
          className="absolute top-0 z-[-1] left-40"
          alt="Background image"
        />
      </div>
      <div className="relative w-full h-[450px] rounded-md mb-4 overflow-hidden">
        {image && (
          <Image
            src={`https://eventsea.infura-ipfs.io/ipfs/${image}`}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <div className="grid w-full md:grid-cols-2 justify-items-center">
        <div className="flex flex-col w-full">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          {/* <span className="inline-block p-1 mb-4 text-sm text-gray-500 bg-green-200 rounded-md w-fit">
            {tags.join(", ")}
          </span> */}

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

          <div className="flex flex-col items-center gap-6 my-4 md:items-start">
            <h3 className="mb-1 text-lg font-semibold text-gray-700">
              Location
            </h3>

            <EventLocationMap
              location={JSON.parse(location)}
            />
          </div>
        </div>

        <div className="flex justify-center w-full md:justify-end">
          <GetTickets ticketPrice={Number(ticketPrice)} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
