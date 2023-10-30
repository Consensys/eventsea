import EventDetails from "@/components/EventDetails";
import { events } from "@/mock-data";

export default function Page() {
  const event = events[0];

  return <EventDetails eventId={event.id} />;
}
