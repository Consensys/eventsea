import { getEventContract } from "@/lib/getEventContract";
import { ContractPermission } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  if (!eventId) {
    return notFound();
  }

  const eventContract = await getEventContract({
    address: eventId,
    permission: ContractPermission.READ,
  });

  const eventData = await Promise.all([
    eventContract.title(),
    eventContract.description(),
  ]);

  const [title, description] = eventData;

  return {
    title: `${title} - Eventsea`,
    description: description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="py-6 lg:px-16 flex flex-col items-center gap-10 rounded-md mb-8">
      <div className="absolute top-0 z-[-1]">
        <Image
          src="/green-bg.webp"
          width={1350}
          height={522.24}
          quality={100}
          className="mx-auto"
          alt="Background image"
        />
      </div>
      {children}
    </div>
  );
}
