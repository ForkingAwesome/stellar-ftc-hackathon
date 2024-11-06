// import type { Metadata } from "next";
// import "./globals.css";
// import { StellarWalletProvider } from "@/contexts/StellarWalletKitContext";

// export const metadata: Metadata = {
//   title: "Pulse",
//   description: "",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from "./fonts/font";
import { Navbar } from "@/components/navbar/navbar";
import { StellarWalletProvider } from "@/contexts/wallet-context";

export const metadata: Metadata = {
  title: "Pulse",
  description: "",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡️</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative h-full ${satoshi.className}`}>
        <StellarWalletProvider>
          <div className="absolute top-4 w-full flex justify-center">
            <Navbar />
          </div>
          {children}
        </StellarWalletProvider>
      </body>
    </html>
  );
}
