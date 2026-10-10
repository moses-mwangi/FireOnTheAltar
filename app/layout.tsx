import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DataProvider } from "../app/bible/components/DataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Bible Study & Sermon Prep",
  description: "Study the Bible, prepare sermons, and organize your research",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
