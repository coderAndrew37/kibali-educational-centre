// app/(website)/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import SchemaMarkup from "./_components/SchemaMarkup";
import FloatingContacts from "./_components/FloatingContact";

// Load Inter via next/font — this injects --font-inter CSS variable,
// which globals.css @theme picks up via var(--font-inter).
// This is the correct Next.js pattern; never use CSS @import for fonts.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
        url: "/og-image.jpg",
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
  robots: { index: true, follow: true },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply --font-inter variable to the tree so @theme can resolve it */}
      <body className={`${inter.variable} antialiased`}>
        <SchemaMarkup />
        <Navbar />
        <div className="pt-16 lg:pt-[96px]">{children}</div>
        <FloatingContacts />
        <Footer />
      </body>
    </html>
  );
}
