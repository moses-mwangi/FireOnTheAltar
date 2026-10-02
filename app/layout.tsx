// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Inter } from "next/font/google";
// // import { AuthProvider } from "@/components/providers/AuthProvider";
// import Navigation from "../components/layout/Navigation";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Bible Notes Revision Platform",
//   description: "Organize and revise your Bible study notes effectively",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* <AuthProvider> */}
//         <div className="min-h-screen bg-blue-50">
//           {/* <Navigation /> */}
//           {/* <main className="container mx-auto px-4 py-8">{children}</main> */}
//           <main className="container mx-auto px-4 py-8">{children}</main>
//         </div>
//         {/* </AuthProvider> */}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { DataProvider } from "../bible/components/DataProvider";
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
