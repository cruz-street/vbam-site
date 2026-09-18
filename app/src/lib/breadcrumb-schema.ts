// BreadcrumbList schema builder — each page constructs its own trail from
// Home to itself and renders the result with the shared <JsonLd> component
// (app/src/components/shared/JsonLd.tsx), the same way MedicalOrganization,
// MedicalBusiness, Physician and FAQPage schema are built elsewhere in this
// repo: a plain object per page, no extra abstraction.
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
