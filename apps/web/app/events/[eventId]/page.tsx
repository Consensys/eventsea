import { notFound } from "next/navigation";
import GetTickets from "@/components/GetTickets";
import LocationIcon from "@/components/icons/LocationIcon";
import Image from "next/image";
import { getEventContract } from "@/lib/getEventContract";
import { format } from "date-fns";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";
import { addImg, addTokenMetadata } from "@/lib/ipfs";

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
    permission: ContractPermission.WRITE,
  });

  const ticketPrice = await ticketContract._ticketPrice();

  const formattedDate = format(new Date(Number(date) * 1000), "MMM. d");

  return (
    <div className="flex flex-col gap-10 px-16 py-6 mb-8 rounded-md">
      <Image
        src="/green-bg.webp"
        width={1350}
        height={522.24}
        quality={100}
        className="absolute top-0 z-[-1] left-40"
        alt="Background image"
      />

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

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          {/* {tags && tags.length > 0 && (
            <span className="inline-block p-1 mb-4 text-sm text-gray-500 bg-green-200 rounded-md">
              {tags.join(", ")}
            </span>
          )} */}
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

          <div className="my-4 space-y-6">
            <h3 className="mb-1 text-lg font-semibold text-gray-700">
              Location
            </h3>
            <div>
              <div className="flex gap-4 px-5 py-6 bg-white border-t border-l border-r rounded-ss-xl rounded-se-xl">
                <LocationIcon />
                <p className="text-gray-900">{location}</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467690.14373023267!2d-46.92493746247684!3d-23.68206359528588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo%2C%20Brazil!5e0!3m2!1sen!2spe!4v1698854401265!5m2!1sen!2spe"
                width="600"
                height="450"
                style={{
                  border: 0.5,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <GetTickets
            ticketPrice={Number(ticketPrice)}
            ticketNFT={ticketNFT}
            metadataHash={metadataHash}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
