import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "../globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-shop",
  description: "Ecommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
