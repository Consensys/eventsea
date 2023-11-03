import FeaturedEvents from "@/components/featured-events";
import ForYou from "@/components/ForYou";

export default function Page(): JSX.Element {
  return (
    <main className="text-red-500">
      <FeaturedEvents />
      <ForYou />
    </main>
  );
}
