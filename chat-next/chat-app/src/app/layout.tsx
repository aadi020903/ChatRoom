import type { Metadata } from "next";
import "./globals.css";
import RoomIdContextProvider from "./context/RoomIdContext";
import { Toaster } from 'sonner'
import DarkModeProvider from "./context/DarkModeContext";
import AppBar from "./components/AppBar";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Chat App",
  description: "Join Room and Start Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DarkModeProvider>

        <RoomIdContextProvider>
          <body
            className={`${bricolage_grotesque_init.className} dark:bg-white`}
          >
            <AppBar />
            {children}
            <Analytics />
            <Toaster />
          </body>
        </RoomIdContextProvider>
      </DarkModeProvider>
    </html>
  );
}