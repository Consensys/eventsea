import FeaturedEvents from "@/components/featured-events";
import ForYou from "@/components/ForYou";

import { getEvents } from "@/lib/actions";

export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  const events = await getEvents();

  return (
    <main className="space-y-6 md:px-10">
      <FeaturedEvents events={events.reverse().slice(0, 8)} />
      {events.length > 0 && (
        <section>
          <h2 className="text-[#09090B] font-semibold text-[28px] mb-4">
            Events for you
          </h2>
          <ForYou events={events} />
        </section>
      )}
    </main>
  );
}
