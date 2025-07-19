import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Spectral } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/elements/Navbar";
import Footer from "@/components/elements/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DDP0 Constellation",
  description:
    "DDP-0 adalah program pembekalan dari COSMIC 2024 untuk memperkenalkan konsep dasar pemrograman kepada mahasiswa baru CSUI 2025, sebagai bekal menghadapi perkuliahan di Fasilkom UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3a9dc2d9-3cdd-4302-aaff-089589c632ad"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} ${spectral.variable} antialiased`}
      >
        <main>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
