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
  title: "Home",
  description: "Online Booking Hotel",
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
