import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/shared/JsonLd';
import CareersRoles from '@/components/careers/CareersRoles';
import { CAREERS_HERO, CAREERS_INTRO } from '@/content/careers';
import { buildBreadcrumbJsonLd } from '@/lib/breadcrumb-schema';

export const metadata: Metadata = {
  title: 'Careers',
  description: CAREERS_HERO.subhead,
  alternates: { canonical: 'https://verobeachadultmedicine.com/careers/' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', url: 'https://verobeachadultmedicine.com/' },
  { name: 'Careers', url: 'https://verobeachadultmedicine.com/careers/' },
]);

export default function CareersPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow={CAREERS_HERO.eyebrow}
        heading={CAREERS_HERO.heading}
        headingItalic={CAREERS_HERO.headingItalic}
        subhead={CAREERS_HERO.subhead}
      />

      <section className="bg-vbam-sand" style={{ padding: '0 0 clamp(20px, 4vw, 40px)' }}>
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 md:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-inter font-[300] text-vbam-atlantic/[.82]"
              style={{ fontSize: 16, lineHeight: 1.7 }}
            >
              {CAREERS_INTRO}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CareersRoles />
    </main>
  );
}
