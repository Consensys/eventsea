import FeaturedEvents from "@/components/featured-events";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="text-red-500">
      <FeaturedEvents />
      <Link href={`/events`}>
        <div>Go to Event Details</div>
      </Link>
    </main>
  );
}
