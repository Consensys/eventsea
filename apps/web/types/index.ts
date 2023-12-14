export enum ContractPermission {
  READ,
  WRITE,
}
export namespace EventSea {
  interface Owner {
    address: string;
    name?: string;
    email?: string;
  }

  export enum EventType {
    Concert = "Concert",
    Conference = "Conference",
    Exhibition = "Exhibition",
    Festival = "Festival",
    Workshop = "Workshop",
    Sports = "Sports",
    Webinar = "Webinar",
    Meetup = "Meetup",
    Hackathon = "Hackathon",
    BlockchainConference = "Blockchain Conference",
    Other = "Other",
  }

  export enum Currency {
    BTC = "BTC",
    ETH = "ETH",
    USDT = "USDT",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
  }

  interface TicketTier {
    name: string;
    price: number;
    availableTickets?: number;
  }

  interface Location {
    address: string;
    name?: string;
    isOnline?: boolean;
  }

  interface Participant {
    id: string;
    name: string;
    registrationDate: number; // Timestamp in UTC
    email?: string;
  }

  export interface Event {
    id: string;
    owner: Owner;
    title: string;
    description: string;
    location: Location;
    eventType: EventType;
    dateTime: number; // Timestamp in UTC
    ticketInfo: TicketTier;
    participantCount?: number;
    participants?: Participant[];
    tags?: string[];
    image: string;
  }
}