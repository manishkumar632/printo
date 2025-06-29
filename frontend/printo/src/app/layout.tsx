import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrintO - Custom Apparel Printing Made Easy",
  description: "Design and print custom apparel with ease. Upload your designs, choose your products, and we'll handle the rest. Quality printing, fast shipping, no minimum orders.",
  keywords: "custom apparel, t-shirt printing, custom clothing, print on demand, design your own shirt",
  authors: [{ name: "PrintO Team" }],
  openGraph: {
    title: "PrintO - Custom Apparel Printing Made Easy",
    description: "Design and print custom apparel with ease. Quality printing, fast shipping, no minimum orders.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintO - Custom Apparel Printing Made Easy",
    description: "Design and print custom apparel with ease. Quality printing, fast shipping, no minimum orders.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}