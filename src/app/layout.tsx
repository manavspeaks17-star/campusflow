import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusFlow | The Campus-First Marketplace",
  description: "A premium marketplace for students to buy, sell, and connect on campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#FAFAFA] text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
