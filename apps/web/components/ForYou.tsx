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

type Props = {
  events: EventSea.Event[];
};

const ForYou: React.FC<Props> = ({ events }) => {
  const formatDate = (timestamp: number) =>
    format(new Date(timestamp * 1000), "MMM. d");
  const formatEventDate = (dateTime: number) => formatDate(dateTime);

  return (
    <div className="container">
      <Table>
        <TableCaption>Events for you</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Ticket price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.location.address}</TableCell>
                <TableCell>{formatEventDate(event.dateTime)}</TableCell>
                <TableCell>{formatEther(event.ticketInfo.price)} ETH</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ForYou;
