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

export const metadata: Metadata = {
  title: 'Vero Beach Adult Medicine | Primary Care on the Treasure Coast',
  description:
    'Patient-oriented adult primary care in Vero Beach, FL — modern tools, attentive care, a familiar team. Now welcoming new patients. Sibling of Vero Beach Pediatrics.',
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

export default function HomePage() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
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
