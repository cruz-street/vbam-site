import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import PositioningSection from '@/components/home/PositioningSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import ServicesSection from '@/components/home/ServicesSection';
import VbpSection from '@/components/home/VbpSection';
import PriviaSection from '@/components/home/PriviaSection';
import CtaStrip from '@/components/home/CtaStrip';
import JsonLd from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Vero Beach Adult Medicine | Primary Care on the Treasure Coast',
  description:
    'A boutique adult primary care practice in Vero Beach, FL — now welcoming new patients. Sibling of Vero Beach Pediatrics.',
  alternates: { canonical: 'https://vbadultmedicine.com' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Vero Beach Adult Medicine',
  url: 'https://vbadultmedicine.com',
  logo: 'https://vbadultmedicine.com/images/vbam-mark.svg',
  description: 'A boutique adult primary care practice in Vero Beach, FL — now welcoming new patients. Sibling of Vero Beach Pediatrics.',
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
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday'], opens: '08:00', closes: '12:00' },
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
      <PriviaSection />
      <CtaStrip />
    </main>
  );
}
