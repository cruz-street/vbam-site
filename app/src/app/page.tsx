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
import { REVIEWS } from '@/content/reviews';
import { PRACTICE_INFO } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Vero Beach Adult Medicine | Primary Care on the Treasure Coast',
  description:
    'A personal-physician primary care practice in Vero Beach, FL — a deliberately limited panel, online registration, and secure text with your care team. Founding patients welcome. Sibling of Vero Beach Pediatrics.',
  alternates: { canonical: 'https://verobeachadultmedicine.com' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Vero Beach Adult Medicine',
  url: 'https://verobeachadultmedicine.com',
  logo: 'https://verobeachadultmedicine.com/images/vbam-mark.svg',
  description: 'Patient-oriented adult primary care in Vero Beach, FL — modern tools, attentive care, a familiar team. Now welcoming new patients. Sibling of Vero Beach Pediatrics.',
  telephone: '+1-772-569-3212',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '955 37th Place',
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
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:00' },
  ],
  medicalSpecialty: 'Internal Medicine',
  priceRange: 'Accepts most insurance',
  parentOrganization: {
    '@type': 'MedicalOrganization',
    name: 'Privia Medical Group',
    url: 'https://www.priviahealth.com/',
  },
  sameAs: [
    'https://verobeachpediatrics.com',
    'https://www.priviahealth.com/',
  ],
  ...(REVIEWS.totalRatings > 0 && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS.placeRating,
      reviewCount: REVIEWS.totalRatings,
      bestRating: 5,
      worstRating: 1,
    },
  }),
};

// LocalBusiness (MedicalBusiness subtype) — local SEO entity built from the
// address/contact already in the CMS. `hasMap` points at our verified sibling
// listing, Vero Beach Pediatrics (same plaza, next door), until VBAM's own
// Google listing is verified — mirrors the map note on the contact page.
const mapQuery = encodeURIComponent(
  PRACTICE_INFO.mapQuery ||
    `${PRACTICE_INFO.address.building}, ${PRACTICE_INFO.address.street}, ${PRACTICE_INFO.address.city}`,
);
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://verobeachadultmedicine.com/#localbusiness',
  name: 'Vero Beach Adult Medicine',
  url: 'https://verobeachadultmedicine.com',
  logo: 'https://verobeachadultmedicine.com/images/vbam-mark.svg',
  image: 'https://verobeachadultmedicine.com/images/vbam-mark.svg',
  telephone: '+1-772-569-3212',
  faxNumber: PRACTICE_INFO.fax,
  priceRange: 'Accepts most insurance',
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
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:00' },
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
  ],
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <JsonLd data={localBusinessJsonLd} />
      <HeroSection />
      <TrustBar />
      <PositioningSection />
      <DoctorsSection />
      <PhilosophySection />
      <ServicesSection />
      <VbpSection />
      <ReviewsSection />
      <PriviaSection />
      <FlowSection />
      <VideosSection />
      <SocialFeedSection />
      <FacebookUpdates />
      <CtaStrip />
    </main>
  );
}
