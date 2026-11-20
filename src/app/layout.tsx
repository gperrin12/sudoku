import type { Metadata } from "next";
import { Baloo_2, Cinzel, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-display-beach",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-display-istanbul",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudoku",
  description: "A themed Sudoku game with Easy, Medium, Hard, and Expert difficulty modes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${cinzel.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
