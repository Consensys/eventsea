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
import { formatEther } from "ethers";

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
        <TableRow className="grid grid-cols-4 hover:bg-transparent">
          <TableHead>Title</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Ticket price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="md:space-y-4">
        {events.map((event, index) => {
          return (
            <TableRow className="md:flex md:flex-col md:border-b-0">
              <Link
                className="bg-white md:border grid grid-cols-4 items-center md:rounded-xl py-1 hover:bg-opacity-50 duration-100"
                href={`/events/${event.id}`}
                key={index}
              >
                <TableCell className="flex items-center gap-3 px-2 md:p-4">
                  <Image
                    src={
                      event.image
                        ? `https://eventsea.infura-ipfs.io/ipfs/${event.image}`
                        : "/images/default-thumb.png"
                    }
                    className="hidden md:block"
                    alt={event.title}
                    width={50}
                    height={50}
                  />
                  {event.title}
                </TableCell>
                <TableCell className="px-2 md:p-4">
                  {event.location.address}
                </TableCell>
                <TableCell className="px-2 md:p-4">
                  {formatEventDate(event.dateTime)}
                </TableCell>
                <TableCell className="px-0">
                  {`${formatEther(
                    BigInt(event.ticketInfo.price).toString()
                  )} ETH`}
                </TableCell>
              </Link>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ForYou;
