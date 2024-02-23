import { EventSea } from "@/types";
import { EventCard } from "./EventCard";

export const metadata = {
  title: "Blog",
};

type FeaturedEventsProps = {
  events: EventSea.Event[];
};

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  return (
    <div className="py-6 h-fit lg:py-10 w-full">
      <h2 className="text-[#09090B] font-semibold text-[28px] mb-4">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
