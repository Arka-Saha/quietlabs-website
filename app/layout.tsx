import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Quiet Labs",
  description: "Innovating in deep tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
      <body>
        <Navbar/>
        {/* <main className="container mx-auto px-4 py-8">{children}</main> */}
        <main >{children}</main>
      </body>
      
    </html>
  );
}
