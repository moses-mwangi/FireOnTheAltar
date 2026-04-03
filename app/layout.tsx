import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
// import { AuthProvider } from "@/components/providers/AuthProvider";
import Navigation from "../components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bible Notes Revision Platform",
  description: "Organize and revise your Bible study notes effectively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <div className="min-h-screen bg-gray-50">
          {/* <Navigation /> */}
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
