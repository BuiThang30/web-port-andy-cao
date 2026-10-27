import type { Metadata } from "next";
import Nav from "@/components/nav/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy Cao Vu",
  description:
    "Portfolio of Andy Cao Vu: economics, urban design, culture and community projects.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}