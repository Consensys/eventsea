import { notFound } from "next/navigation";
import GetTickets from "@/components/GetTickets";
import Image from "next/image";
import { getEventContract } from "@/lib/getEventContract";
import { format } from "date-fns";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";
import { addImg, addTokenMetadata } from "@/lib/ipfs";
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

  const eventContract = await getEventContract({
    address: eventId,
    permission: ContractPermission.READ,
  });

  const eventData = await Promise.all([
    eventContract.title(),
    eventContract.description(),
    eventContract.location(),
    eventContract.eventType(),
    eventContract.image(),
    eventContract.date(),
    eventContract.ticketNFT(),
  ]);

  const [title, description, location, eventType, image, date, ticketNFT] =
    eventData;

  const svgIPFS = await addImg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
        <text x="150" y="125" font-size="40" fill="black">
          ${title}
        </text>
        <text x="150" y="170" font-size="20" fill="black">
          ${date}
        </text>
        <text x="150" y="215" font-size="20" fill="black">
          ${location}
        </text>
      </svg>
    `);

  const tokenMetadata = {
    name: title,
    description: `Ticket for ${title} on ${Number(date)}`,
    image: `https://ipfs.io/ipfs/${svgIPFS.Hash}`,
    attributes: [
      {
        trait_type: "Ticket ID",
        value: 1,
      },
    ],
  };

  const metadataHash = await addTokenMetadata(tokenMetadata);

  const ticketContract = await getTicketContract({
    address: ticketNFT,
    permission: ContractPermission.READ,
  });

  const ticketPrice = await ticketContract._ticketPrice();

  const formattedDate = format(new Date(Number(date) * 1000), "MMM. d");

  return (
    <div className="py-6 lg:px-16 flex flex-col items-center gap-10 rounded-md mb-8">
      <div className="absolute top-0 z-[-1]">
        <Image
          src="/green-bg.webp"
          width={1350}
          height={522.24}
          quality={100}
          className="mx-auto"
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
            ticketPrice={ticketPrice}
            ticketNFT={ticketNFT}
            metadataHash={metadataHash}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
