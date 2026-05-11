import type { Metadata } from "next";
import { Fraunces, Cormorant_Garamond, Archivo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--nf-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--nf-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--nf-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--nf-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vero Beach Adult Medicine | Primary Care on the Treasure Coast",
    template: "%s | Vero Beach Adult Medicine",
  },
  description:
    "A boutique adult primary care practice in Vero Beach, FL. Accepting new patients. Sibling practice of Vero Beach Pediatrics.",
  metadataBase: new URL("https://vbadultmedicine.com"),
  openGraph: {
    siteName: "Vero Beach Adult Medicine",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${cormorant.variable} ${archivo.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
