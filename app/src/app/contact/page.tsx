import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AppointmentForm from '@/components/contact/AppointmentForm';
import JsonLd from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Contact & Appointments',
  description: 'Book an appointment or contact Vero Beach Adult Medicine. Located at Citrus Medical Plaza, 959 37th Place, Vero Beach, FL 32960. Call (772) 569-3212.',
  alternates: { canonical: 'https://vbadultmedicine.com/contact/' },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Vero Beach Adult Medicine',
  url: 'https://vbadultmedicine.com',
  telephone: '+1-772-569-3212',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '959 37th Place',
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday'], opens: '08:00', closes: '12:00' },
  ],
  medicalSpecialty: 'Internal Medicine',
};

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={contactJsonLd} />
      <PageHero
        eyebrow="Contact"
        heading="We'd love to"
        headingItalic="hear from you."
        subhead="Request an appointment or ask us a question. We typically respond within one business day."
      />

      {/* ── Contact info + form ─── */}
      <section className="bg-vbam-foam" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12 grid grid-cols-2 gap-16 items-start">

          {/* Contact info */}
          <ScrollReveal animation="left">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                Get in Touch
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 32 }}>
                Come find us on <em className="font-cormorant italic text-grad-sunrise">the coast.</em>
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Location</p>
                  <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Citrus Medical Plaza<br />
                    959 37th Place<br />
                    Vero Beach, FL 32960
                  </p>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Phone</p>
                  <a
                    href="tel:7725693212"
                    className="font-inter font-[400] text-vbam-atlantic hover:text-vbam-inlet transition-colors"
                    style={{ fontSize: 20, letterSpacing: '0.01em' }}
                  >
                    (772) 569-3212
                  </a>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Hours</p>
                  <ul className="font-inter font-[300] text-vbam-atlantic/[.82] space-y-1" style={{ fontSize: 15 }}>
                    <li>Mon – Thu · 8:00 am – 5:00 pm</li>
                    <li>Fri · 8:00 am – 12:00 pm</li>
                    <li>Sat – Sun · Closed</li>
                  </ul>
                  <p className="font-cormorant italic text-vbam-sea-glass mt-2" style={{ fontSize: 16 }}>
                    By appointment
                  </p>
                </div>

                <div
                  className="rounded-lg border border-vbam-atlantic/[.08] bg-vbam-sand"
                  style={{ padding: '20px 22px' }}
                >
                  <p className="font-inter font-[300] text-vbam-atlantic/70" style={{ fontSize: 14, lineHeight: 1.65 }}>
                    <strong className="font-[500] text-vbam-atlantic">Same-day visits:</strong> Call in the morning and we'll do our best to see you the same day. Direct access — no phone tree.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal animation="left" delay={100}>
            <div className="bg-vbam-sand rounded-xl" style={{ padding: '40px 36px' }}>
              <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 6 }}>
                Request an Appointment
              </h3>
              <p className="font-inter font-[300] text-vbam-atlantic/60" style={{ fontSize: 14, marginBottom: 28 }}>
                New and existing patients welcome.
              </p>
              <AppointmentForm />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Sibling callout ─── */}
      <section className="bg-vbam-atlantic text-center" style={{ padding: '56px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <p className="font-inter font-[300] text-vbam-foam/70" style={{ fontSize: 15, lineHeight: 1.7 }}>
            Sibling of{' '}
            <a
              href="https://verobeachpediatrics.com"
              className="text-vbam-sunrise hover:text-vbam-foam transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vero Beach Pediatrics
            </a>
            {' '}· Same family. Different chapter. Same coast.
          </p>
        </div>
      </section>
    </main>
  );
}
