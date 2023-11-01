import { events } from "@/mock-data";
import GetTickets from "@/components/GetTickets";
import LocationIcon from "@/components/icons/LocationIcon";
import Image from "next/image";

type PageProps = {
  params: {
    eventId: string;
  };
};

const EventPage = ({ params: { eventId } }: PageProps) => {
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const { title, tags, dateTime, description, location, images } = event;
  const date = new Date(Number(dateTime) * 1000).toLocaleDateString();

  return (
    <div className="py-6 px-16 flex flex-col gap-10 rounded-md mb-8">
      <Image
        src="/green-bg.webp"
        width={1350}
        height={522.24}
        quality={100}
        className="absolute top-0 z-[-1] left-40"
        alt="Background image"
      />

      <div className="relative w-full h-[450px] rounded-md mb-4 overflow-hidden">
        {images && images[0] && (
          <Image src={images[0]} alt={title} layout="fill" objectFit="cover" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
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

          <div className="my-4 space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Location
            </h3>
            <div>
              <div className="flex gap-4 bg-white py-6 border-t border-l border-r rounded-ss-xl rounded-se-xl px-5">
                <LocationIcon />
                <p className="text-gray-900">{location.address}</p>
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

        <div className=" w-full">
          <GetTickets event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
