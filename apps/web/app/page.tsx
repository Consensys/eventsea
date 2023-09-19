import { Button } from "@ui/Button";
import { Navbar } from "@components/Navbar";

export default function Page(): JSX.Element {
  return (
    <main>
      <Navbar />
      <Button>Click me</Button>
    </main>
  );
}
