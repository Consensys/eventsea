import { EventSea } from "@/types";

export const events: EventSea.Event[] = [
  {
    id: "1",
    owner: {
      address: "22",
      name: "chin",
    },
    title: "Sao Paulo Web3 Festival",
    description: "cecwecwe",
    tags: ["Web3"],
    location: {
      name: "oekce",
      address: "Sao Paulo, Brazil",
    },
    eventType: EventSea.EventType.Concert,
    ticketInfo: [
      {
        name: "ede",
        price: 12,
      },
    ],
    dateTime: 1695654870, // Timestamp in UTC
    participantCount: 3,
    participants: [],
    images: ["/images/image_1.png"],
  },
  {
    id: "2",
    owner: {
      address: "22",
      name: "chin",
    },
    title: "Medellin Crypto Week",
    description: "cecwecwe",
    tags: ["Web3"],
    location: {
      name: "oekce",
      address: "Medellin, Colombia",
    },
    eventType: EventSea.EventType.Concert,
    ticketInfo: [
      {
        name: "ede",
        price: 11,
      },
    ],
    dateTime: 1695654870,
    participantCount: 3,
    participants: [],
    images: ["/images/image_2.png"],
  },

  {
    id: "3",
    owner: {
      address: "22",
      name: "chin",
    },
    title: "NFT Art Gala: Parisian Soiree",
    description: "cecwecwe",
    tags: ["Web3"],
    location: {
      name: "oekce",
      address: "Paris, France",
    },
    eventType: EventSea.EventType.Concert,
    ticketInfo: [
      {
        name: "ede",
        price: 21,
      },
    ],
    dateTime: {
      start: 1695654870,
      end: 1695914062,
    }, // Timestamp in UTC
    participantCount: 3,
    participants: [],
    images: ["/images/image_3.png"],
  },

  {
    id: "4",
    owner: {
      address: "22",
      name: "chin",
    },
    title: "Miami Crypto Beach Bash",
    description: "cecwecwe",
    tags: ["Web3"],
    location: {
      name: "oekce",
      address: "Miami, USA",
    },
    eventType: EventSea.EventType.Concert,
    ticketInfo: [
      {
        name: "ede",
        price: 22,
      },
    ],
    dateTime: 1695654870, // Timestamp in UTC
    participantCount: 3,
    participants: [],
    images: ["/images/image_4.png"],
  },
];
