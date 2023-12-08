"use server";

import { getEventContract } from "@/lib/getEventContract";
import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { ContractPermission, EventSea } from "@/types";
import { getTicketContract } from "./getTicketContract";

export const getEvents = async (query: string = "") => {
  try {
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
          price: ticketPrice,
          name: ticketName,
        },
        eventType,
        image,
        dateTime: Number(date),
      } as EventSea.Event;
    });

    const events = (await Promise.all(eventsPromises)) as EventSea.Event[];

    const lowerCaseQuery = query.toLowerCase();

    return events.filter(
      (event) => event.title?.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Error fetching events");
  }
};

export const getLocationDetails = async (placeId: string) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};
