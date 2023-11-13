import { notFound } from "next/navigation";
import GetTickets from "@/components/GetTickets";
import LocationIcon from "@/components/icons/LocationIcon";
import Image from "next/image";
import { getEventContract } from "@/lib/getEventContract";
import { format } from "date-fns";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";

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
          <Image src={`https://eventsea.infura-ipfs.io/ipfs/${image}`} alt={title} layout="fill" objectFit="cover" />
        )}
      </div>

      <div className="relative grid md:grid-cols-2 justify-items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <span className="text-sm text-gray-500 bg-green-200 p-1 rounded-md inline-block mb-4 w-fit">
            {tags.join(", ")}
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
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Location
            </h3>
            <div className="w-fit">
              <div className="flex gap-4 bg-white py-6 border-t border-l border-r rounded-ss-xl rounded-se-xl px-5">
                <LocationIcon />
                <p className="text-gray-900">{location}</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467690.14373023267!2d-46.92493746247684!3d-23.68206359528588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo%2C%20Brazil!5e0!3m2!1sen!2spe!4v1698854401265!5m2!1sen!2spe"
                width="300"
                height="450"
                style={{
                  border: 0.5,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                }}
                className="md:hidden"
                loading="lazy"
              ></iframe>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467690.14373023267!2d-46.92493746247684!3d-23.68206359528588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo%2C%20Brazil!5e0!3m2!1sen!2spe!4v1698854401265!5m2!1sen!2spe"
                width="600"
                height="450"
                style={{
                  border: 0.5,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                }}
                className="hidden lg:block"
                loading="lazy"
              ></iframe>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467690.14373023267!2d-46.92493746247684!3d-23.68206359528588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo%2C%20Brazil!5e0!3m2!1sen!2spe!4v1698854401265!5m2!1sen!2spe"
                width="490"
                height="450"
                style={{
                  border: 0.5,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                }}
                className="hidden md:block lg:hidden mx-auto"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-end">
          <GetTickets event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
