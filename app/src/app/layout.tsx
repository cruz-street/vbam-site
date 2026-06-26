import type { Metadata } from "next";
import { Fraunces, Cormorant_Garamond, Archivo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

// Shared VBP/VBAM Klara patient-messaging widget id (public; not a secret).
const KLARA_WIDGET_ID =
  process.env.NEXT_PUBLIC_KLARA_WIDGET_ID || "168b842c-9a0d-43dd-bc25-d0dc202289aa";

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
        {/* Google Tag Manager — base container (GTM-WRKLM7XK).
            Individual tags (GA4, Meta/IG Pixel, AdRoll) are configured inside GTM,
            not here. Keep marketing pixels page-scoped away from patient-data /
            registration pages to avoid PHI capture (HIPAA). */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WRKLM7XK');`}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRKLM7XK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Header />
        {children}
        <Footer />
        {/* Klara floating "Message us" widget — the patient-messaging widget shared
            with Vero Beach Pediatrics. Queue-init then load the official bundle
            (matches the live embed). Widget id is public; env can override. */}
        <Script id="klara-widget-init" strategy="lazyOnload">
          {`window.klaraWidget=window.klaraWidget||[];window.klaraWidget.push(['setWidgetId','${KLARA_WIDGET_ID}']);`}
        </Script>
        <Script
          id="klara-widget-bundle"
          src="https://s3.amazonaws.com/widget-frontend.klara.com/bundle.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
