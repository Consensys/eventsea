interface Owner {
  address: string;
  name: string;
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

export interface TicketTier {
  name: string;
  price: number;
  availableTickets?: number;
}

export interface Location {
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
  tags: string[];
  location: Location;
  eventType: EventType;
  ticketInfo: TicketTier[];
  dateTime: number | { start: number; end: number }; // Timestamp in UTC
  participantCount: number;
  participants: Participant[];
  images?: string[];
}
