import { addImg, addTokenMetadata } from "@/lib/ipfs";

export const GetTickets = async () => {
  const formData = new FormData();

  const title = "Hello World";
  const date = "November 2021";
  const ticketId = "#1";

  formData.append("title", title);
  formData.append("date", date);
  formData.append("ticketId", ticketId);

  const svgIPFS =
    await addImg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <text x="150" y="125" font-size="40" fill="black">
      ${formData.get("title")}
    </text>
    <text x="150" y="170" font-size="20" fill="black">
      ${formData.get("date")}
    </text>
    <text x="150" y="215" font-size="20" fill="black">
      ${formData.get("ticketId")}
    </text>
  </svg>`);

  const tokenMetadata = {
    name: formData.get("title"),
    description: `Ticket for ${formData.get("title")} on ${formData.get(
      "date"
    )}`,
    image: `https://ipfs.io/ipfs/${svgIPFS.Hash}`,
    attributes: [
      {
        trait_type: "Ticket ID",
        value: formData.get("ticketId"),
      },
    ],
  };
  
  return <h1>Get Tickets</h1>;
};
