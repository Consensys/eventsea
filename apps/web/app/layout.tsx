import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EventSea",
  description: "Event ticketing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-[#F4F4F5] py-2 md:py-3">
        <div className="max-w-screen-xl mx-auto">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
