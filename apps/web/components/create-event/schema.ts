import { EventSea } from "@/types";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.object({
    placeId: z.string().min(1, "Location key is required"),
    description: z.string().min(1, "Location value is required"),
  }),
  description: z.string(),
  type: z.nativeEnum(EventSea.EventType),
  image: z.custom((value) => {
    if (typeof File !== "undefined" && value instanceof File) {
      return true;
    }
    return false;
  }, "Image is required"),
  amountOfTickets: z.number().positive("Amount of tickets is required"),
  ticketPrice: z.object({
    price: z.number().positive("Price is required"),
    currency: z.nativeEnum(EventSea.Currency),
  }),
  dateTime: z.date(),
});
