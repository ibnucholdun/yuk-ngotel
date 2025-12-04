import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { auth } from "../../auth";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://yuk-ngotel.vercel.app"
  ),
  title: {
    template: "%s | Yuk Ngotel",
    default: "Yuk Ngotel - Online Booking Hotel",
  },
  description:
    "Experience the best stay with Yuk Ngotel. Book luxurious rooms and enjoy premium amenities.",
  keywords: [
    "hotel",
    "booking",
    "reservation",
    "yuk ngotel",
    "luxury rooms",
    "staycation",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider session={session}>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
