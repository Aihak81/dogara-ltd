import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Dogara Oil & Gas Ltd | Reliable Energy Solutions",
    template: "%s | Dogara Oil & Gas",
  },
  description: "Powering Industries Through Reliable Energy Solutions. Supplying LNG, CNG, Diesel, Petrol and Professional Energy Services Across Nigeria.",
  keywords: ["Dogara Oil and Gas", "LNG Nigeria", "CNG Supply", "Diesel Supply", "Petrol Supply", "Energy Solutions", "Oil and Gas Nigeria", "Petroleum Products", "Energy Consultancy"],
  authors: [{ name: "Dogara Oil & Gas Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://dogaraoilandgas.com",
    title: "Dogara Oil & Gas Ltd | Reliable Energy Solutions",
    description: "Powering Industries Through Reliable Energy Solutions. Supplying LNG, CNG, Diesel, Petrol and Professional Energy Services Across Nigeria.",
    siteName: "Dogara Oil & Gas Ltd",
    images: [
      {
        url: "https://dogaraoilandgas.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dogara Oil & Gas Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dogara Oil & Gas Ltd | Reliable Energy Solutions",
    description: "Powering Industries Through Reliable Energy Solutions. Supplying LNG, CNG, Diesel, Petrol and Professional Energy Services Across Nigeria.",
    images: ["https://dogaraoilandgas.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-dark antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
