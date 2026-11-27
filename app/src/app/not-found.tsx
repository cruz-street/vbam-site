import type { Metadata } from "next";
import Link from "next/link";

// Static export serves this page at /404 and /_not-found/ with HTTP 200, so it
// must carry noindex or Google files it as "Duplicate without user-selected canonical".
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1>404: This page could not be found.</h1>
      <p>
        <Link href="/">Return to the home page</Link>
      </p>
    </main>
  );
}
