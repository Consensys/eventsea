import FeaturedEvents from "@/components/featured-events";
import ForYou from "@/components/ForYou";
import { getEventContract } from "@/lib/getEventContract";
import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { ContractPermission, EventSea } from "@/types";

export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  const eventsFactory = await getEventFactoryContract({
    permission: ContractPermission.READ,
  });

  const eventAddresses = await eventsFactory.getEvents();

  const eventsPromises = eventAddresses.map(async (address) => {
    const eventContact = await getEventContract({
      address,
      permission: ContractPermission.READ,
    });

    const [title, description, owner, location, eventType, image, date] =
      await Promise.all([
        eventContact.title(),
        eventContact.description(),
        eventContact.owner(),
        eventContact.location(),
        eventContact.eventType(),
        eventContact.image(),
        eventContact.date(),
      ]);

    return {
      id: address,
      title,
      description,
      owner: {
        address: owner,
      },
      location: {
        address: location,
      },
      eventType,
      image,
      dateTime: Number(date),
    } as EventSea.Event;
  });

  const events = (await Promise.all(eventsPromises)) as EventSea.Event[];

  return (
    <main>
      <FeaturedEvents events={events} />
      {events.length > 0 && <ForYou events={events} />}
    </main>
  );
}
