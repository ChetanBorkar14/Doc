import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediCare - Doctor Dashboard",
  description: "Professional healthcare management system for doctors",
};

import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans min-h-screen`}>
        <div className="flex min-h-screen">
          <Sidebar />
          {/* Main Content */}
          <main className="flex-1 bg-background overflow-y-auto min-h-screen">
            <MobileHeader />
            <div className="min-h-screen">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
