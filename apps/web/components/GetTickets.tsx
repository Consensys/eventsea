// GetTickets.tsx
import { Button } from "./ui/Button";
import { addImg, addTokenMetadata } from "@/lib/ipfs";
import { getTicketContract } from "@/lib/getTicketContract";
import { ContractPermission } from "@/types";
import { AmountOfTicketsComponent } from "./AmountOfTicketsComponent";

interface GetTicketsProps {
  ticketPrice: bigint;
  ticketNFT: string;
  eventTitle: string;
  eventDate: bigint;
}

const GetTickets: React.FC<GetTicketsProps> = async ({
  ticketPrice,
  ticketNFT,
  eventTitle,
  eventDate,
}) => {
  const nftContract = await getTicketContract({
    address: ticketNFT,
    permission: ContractPermission.WRITE,
  });

  let tokenID = Number(await nftContract.getTokenID());

  console.log(tokenID);
  
  const svgIPFS = await addImg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
        <text x="150" y="125" font-size="40" fill="black">
          ${eventTitle}
        </text>
        <text x="150" y="170" font-size="20" fill="black">
          ${eventDate}
        </text>
        <text x="150" y="215" font-size="20" fill="black">
          ${tokenID}
        </text>
      </svg>`);

  const tokenMetadata = {
    name: eventTitle,
    description: `Ticket for ${eventTitle} on ${eventDate}`,
    image: `https://ipfs.io/ipfs/${svgIPFS.Hash}`,
    attributes: [
      {
        trait_type: "Ticket ID",
        value: tokenID,
      },
    ],
  };

  const metadataIPFS = await addTokenMetadata(tokenMetadata);

  return <AmountOfTicketsComponent ticketPrice={ticketPrice} metadataHash={metadataIPFS.hash} nftAddress={ticketNFT} />;
};

export default GetTickets;
