"use server";

import { ethers } from "ethers";

import { env } from "@/env.mjs";
import { format } from "date-fns";

import { EventSea } from "@/types";
import { getNetworkRPC } from "./utils-server";
import EventFactoryContract from "lib/contracts/artifacts/EventsFactory.sol/EventsFactory.json";
import EventContract from "lib/contracts/artifacts/Event.sol/Event.json";
import TicketContract from "lib/contracts/artifacts/Ticket.sol/Ticket.json";
import { Event, EventsFactory, Ticket } from "lib/contracts/typechain-types/";

const getEventContract = async (address: string) => {
  const network = env.NEXT_PUBLIC_CHAIN_ID;
  const rpcUrl = await getNetworkRPC(network);

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  return new ethers.Contract(
    address,
    EventContract.abi,
    provider
  ) as unknown as Event;
};

const getTicketContract = async (address: string) => {
  const network = env.NEXT_PUBLIC_CHAIN_ID;
  const rpcUrl = await getNetworkRPC(network);

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  return new ethers.Contract(
    address,
    TicketContract.abi,
    provider
  ) as unknown as Ticket;
};

export const getEvents = async (query: string = "") => {
  const network = env.NEXT_PUBLIC_CHAIN_ID;
  const rpcUrl = await getNetworkRPC(network);

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  try {
    const eventsFactory = new ethers.Contract(
      env.NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS,
      EventFactoryContract.abi,
      provider
    ) as unknown as EventsFactory;

    // Just using the first 8 events as featured for now
    const eventAddresses = (await eventsFactory.getEvents()).slice(0, 8);

    const eventsPromises = eventAddresses.map(async (address) => {
      const eventContract = await getEventContract(address);

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

      const ticketContract = await getTicketContract(ticketNFT);

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
        image: image
          ? `${env.INFURA_IPFS_GATEWAY}/${image}`
          : "/images/default.png",
        dateTime: Number(date),
      } as EventSea.Event;
    });

    const events = (await Promise.all(eventsPromises)) as EventSea.Event[];

    const lowerCaseQuery = query.toLowerCase();

    return events.filter((event) =>
      event.title?.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Error fetching events");
  }
};

export const getEventById = async (eventId: string) => {
  const event = await getEventContract(eventId)

  const eventData = await Promise.all([
    event.title(),
    event.description(),
    event.location(),
    event.eventType(),
    event.image(),
    event.date(),
    event.ticketNFT(),
  ]);

  return {
    title: eventData[0],
    description: eventData[1],
    location: eventData[2],
    eventType: eventData[3],
    image: eventData[4]
      ? `${env.INFURA_IPFS_GATEWAY}/${eventData[4]}`
      : "/images/default.png",
    date: eventData[5],
    ticketNFT: eventData[6],
  };
};

export const getTicketById = async (ticketNFTId: string) => {
  const ticket = await getTicketContract(ticketNFTId);
  
  const ticketPrice = await ticket._ticketPrice();

  const ticketId = await ticket.tokenId();

  return {
    price: ticketPrice,
    id: ticketId,
  };
};

export const getLocationDetails = async (placeId: string) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};
