import { EventSea } from "@/types";
import { formatEther } from "ethers";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Image from "next/image";
import Link from "next/link";

type Props = {
  events: EventSea.Event[];
};

const ForYou: React.FC<Props> = ({ events }) => {
  const formatDate = (timestamp: number) =>
    format(new Date(timestamp * 1000), "MMM. d");
  const formatEventDate = (dateTime: number) => formatDate(dateTime);

  return (
    <Table>
      <TableCaption>Events for you</TableCaption>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="flex justify-between hover:bg-transparent">
          <TableHead>Title</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Ticket price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col w-full gap-4">
        {events.map((event, index) => {
          return (
            <Link href={`/events/${event.id}`} key={index}>
              <TableRow className="bg-white border rounded-xl flex justify-between items-center py-1">
                <TableCell className="flex items-center gap-3">
                  <Image
                    src={
                      event.image
                        ? `https://eventsea.infura-ipfs.io/ipfs/${event.image}`
                        : "/public/images/default.png"
                    }
                    alt={event.title}
                    width={50}
                    height={50}
                  />
                  {event.title}
                </TableCell>
                <TableCell>{event.location.address}</TableCell>
                <TableCell>{formatEventDate(event.dateTime)}</TableCell>
                <TableCell>{formatEther(event.ticketInfo.price)} ETH</TableCell>
              </TableRow>
            </Link>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ForYou;
