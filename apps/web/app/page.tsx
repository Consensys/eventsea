import FeaturedEvents from "@/components/featured-events";

import ForYou from "@/components/ForYou";

import { getLocationDetails } from "@/lib/actions";

import { getEventContract } from "@/lib/getEventContract";
import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission, EventSea } from "@/types";

export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  const eventsFactory = await getEventFactoryContract({
    permission: ContractPermission.READ,
  });

  const eventAddresses = (await eventsFactory.getEvents()).slice(0, 8);

  const eventsPromises = eventAddresses.map(async (address) => {
    const eventContract = await getEventContract({
      address,
      permission: ContractPermission.READ,
    });

    const [
      title,
      description,
      owner,
      location,
      eventType,
      image,
      date,
      ticketNFT,
    ] = await Promise.all([
      eventContract.title(),
      eventContract.description(),
      eventContract.owner(),
      eventContract.location(),
      eventContract.eventType(),
      eventContract.image(),
      eventContract.date(),
      eventContract.ticketNFT(),
    ]);

    const ticketContract = await getTicketContract({
      address: ticketNFT,
      permission: ContractPermission.READ,
    });

    const ticketPrice = await ticketContract._ticketPrice();
    const ticketName = await ticketContract.name();

    return {
      id: address,
      title,
      description,
      owner: {
        address: owner,
      },
      location: {
        address: (await getLocationDetails(location))?.name,
      },
      ticketInfo: {
        price: Number(ticketPrice),
        name: ticketName,
      },
      eventType,
      image,
      dateTime: Number(date),
    } as EventSea.Event;
  });

  const events = (await Promise.all(eventsPromises)) as EventSea.Event[];

  return (
    <main className="space-y-6 px-10">
      <FeaturedEvents events={events} />
      {events.length > 0 && <ForYou events={events} />}
    </main>
  );
}
