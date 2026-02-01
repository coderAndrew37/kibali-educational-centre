import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import SchemaMarkup from "./_components/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kibali.ac.ke"),
  title: {
    default: "Kibali Educational Centre | Excellence in CBC Education",
    template: "%s | Kibali Educational Centre",
  },
  description:
    "A premier international-standard school in Nairobi, dedicated to holistic CBC development and academic brilliance.",
  openGraph: {
    title: "Kibali Educational Centre",
    description:
      "Empowering the next generation of leaders through excellence.",
    url: "https://kibali.ac.ke",
    siteName: "Kibali Educational Centre",
    images: [
      {
        url: "/og-image.jpg", // Place a high-res professional school photo in /public
        width: 1200,
        height: 630,
        alt: "Kibali Educational Centre Campus",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kibali Educational Centre",
    description: "Leading the way in modern CBC education in Kenya.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SchemaMarkup />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
