import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import PositioningSection from '@/components/home/PositioningSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import ServicesSection from '@/components/home/ServicesSection';
import VbpSection from '@/components/home/VbpSection';
import FlowSection from '@/components/home/FlowSection';
import PriviaSection from '@/components/home/PriviaSection';
import CtaStrip from '@/components/home/CtaStrip';
import JsonLd from '@/components/shared/JsonLd';
import ReviewsSection from '@/components/home/ReviewsSection';
import VideosSection from '@/components/home/VideosSection';
import SocialFeedSection from '@/components/home/SocialFeedSection';
import FacebookUpdates from '@/components/home/FacebookUpdates';
import { PRACTICE_INFO } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Vero Beach Adult Medicine | Primary Care on the Treasure Coast',
  description:
    'Primary care in Vero Beach: no membership fee, real time with your doctor, same-day sick visits for registered patients. Now accepting new adult patients.',
  alternates: { canonical: 'https://verobeachadultmedicine.com' },
};

// ONE entity per site: the former separate MedicalOrganization node here described
// the same practice with no @id (two competing entities for one business). It was
// merged into this node; /contact/ and /new-patients/ now reference the same @id.
// LocalBusiness (MedicalBusiness subtype) — local SEO entity built from the
// address/contact already in the CMS. `hasMap` uses the plain 955 37th Place
// address pin (no business name) since VBAM's own Google listing isn't
// verified yet — see the fuller note on the contact page for what NOT to do
// here (building name in the query snaps to a permanently closed listing).
const mapQuery = encodeURIComponent(
  PRACTICE_INFO.mapQuery ||
    `${PRACTICE_INFO.address.building}, ${PRACTICE_INFO.address.street}, ${PRACTICE_INFO.address.city}`,
);
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalClinic'],
  '@id': 'https://verobeachadultmedicine.com/#localbusiness',
  name: 'Vero Beach Adult Medicine',
  description: 'Patient-oriented adult primary care in Vero Beach, FL — modern tools, attentive care, a familiar team. Now welcoming new patients. Sibling of Vero Beach Pediatrics.',
  url: 'https://verobeachadultmedicine.com',
  logo: 'https://verobeachadultmedicine.com/images/vbam-mark.svg',
  image: 'https://verobeachadultmedicine.com/images/vbam-mark.svg',
  telephone: '+1-772-569-3212',
  faxNumber: PRACTICE_INFO.fax,
  medicalSpecialty: 'Internal Medicine',
  address: {
    '@type': 'PostalAddress',
    name: PRACTICE_INFO.address.building,
    streetAddress: PRACTICE_INFO.address.street,
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.6648,
    longitude: -80.3781,
  },
  hasMap: `https://www.google.com/maps?q=${mapQuery}`,
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:00' },
  ],
  parentOrganization: {
    '@type': 'MedicalOrganization',
    name: 'Privia Medical Group',
    url: 'https://www.priviahealth.com/',
  },
  sameAs: [
    'https://www.facebook.com/verobeachadultmedicine',
    'https://www.instagram.com/verobeachadultmedicine/',
    'https://verobeachpediatrics.com',
    'https://www.linkedin.com/company/119633945/',
  ],
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessJsonLd} />
      <HeroSection />
      <TrustBar />
      <PositioningSection />
      <DoctorsSection />
      <PhilosophySection />
      <FlowSection />
      <ServicesSection />
      <VbpSection />
      <ReviewsSection />
      <PriviaSection />
      <VideosSection />
      <SocialFeedSection />
      <FacebookUpdates />
      <CtaStrip />
    </main>
  );
}
