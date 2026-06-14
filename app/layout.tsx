import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PrepSync AI",
  description: "Placement Intelligence, Personalized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.variable} font-sans h-full overflow-hidden text-slate-900`}>
        <div className="flex h-full">
          <div className="hidden md:flex h-full">
            <Sidebar />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden pb-16 md:pb-0 relative">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
