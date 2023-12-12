import FeaturedEvents from "@/components/featured-events";
import ForYou from "@/components/ForYou";

import { getEvents } from "@/lib/actions";

export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  const events = await getEvents();
  console.log(events);

  return (
    <main className="space-y-6 md:px-10">
      <FeaturedEvents events={events} />
      {events.length > 0 && <ForYou events={events} />}
    </main>
  );
}
