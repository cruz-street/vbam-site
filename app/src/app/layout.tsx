import type { Metadata } from "next";
import { Fraunces, Cormorant_Garamond, Archivo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

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
    "Patient-oriented adult primary care in Vero Beach, FL — modern tools, attentive care, a familiar team. Now welcoming new patients. Sibling of Vero Beach Pediatrics.",
  metadataBase: new URL("https://verobeachadultmedicine.com"),
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
        {/* Klara floating "Message us" widget — site-wide. Inert until VBAM Klara widget UUID is set. */}
        {process.env.NEXT_PUBLIC_KLARA_WIDGET_ID && (
          <Script
            id="klara-widget"
            src={`https://patient.klara.com/widget.js?id=${process.env.NEXT_PUBLIC_KLARA_WIDGET_ID}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
