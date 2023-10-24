import EventDetails from "@/components/EventDetails";
import { events } from "@/mock-data";

export default function Page() {
  const event = events[0]; // use the first event as an example

  const date = new Date(
    typeof event.dateTime === "number"
      ? event.dateTime * 1000
      : event.dateTime.start * 1000
  ).toLocaleDateString();

  return (
    <EventDetails
      title={event.title}
      tag={event.tags[0]} // assuming you want the first tag
      date={date}
      description={event.description}
      location={`${event.location.name}, ${event.location.address}`}
      imageSrc={event.images ? event.images[0] : ""}
    />
  );
}
