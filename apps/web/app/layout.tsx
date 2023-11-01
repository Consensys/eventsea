// Layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/Navbar";
import EventDetails from "@/components/EventDetails";
import { events } from "@/mock-data";

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
      <body className="bg-[#F4F4F5] px-3 py-2 md:py-3 lg:px-0">
        <NavBar />

        {children}
      </body>
    </html>
  );
}
