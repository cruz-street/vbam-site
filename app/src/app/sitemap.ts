import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://verobeachadultmedicine.com";
  return [
    { url: `${base}/`,             lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about/`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/for-patients/`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/for-patients/new-patient-registration/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/virtual-care/`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}
