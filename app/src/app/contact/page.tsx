import type { Metadata } from 'next';
import Script from 'next/script';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/shared/JsonLd';
import { CONTACT_HERO, PRACTICE_INFO, CONTACT_INFO, CONTACT_SCHEDULING, CONTACT_CTA } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Contact & Appointments',
  description: 'Book an appointment or contact Vero Beach Adult Medicine. Located at Citrus Medical Plaza, 955 37th Place, Vero Beach, FL 32960. Call (772) 569-3212.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/contact/' },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Vero Beach Adult Medicine',
  url: 'https://verobeachadultmedicine.com',
  telephone: '+1-772-569-3212',
  address: {
    '@type': 'PostalAddress',
    streetAddress: PRACTICE_INFO.address.street,
    addressLocality: 'Vero Beach',
    addressRegion: 'FL',
    postalCode: '32960',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:00' },
  ],
  medicalSpecialty: 'Internal Medicine',
};

export default function ContactPage() {
  // Point the map + directions at our verified sibling listing, Vero Beach
  // Pediatrics — same plaza, right next door to our 955 unit (the former
  // LabCorp). VBAM's own Google listing isn't verified yet, so querying 955
  // directly snaps to the wrong business. Switch mapQuery to "Vero Beach Adult
  // Medicine" in the CMS once VBAM's listing is verified.
  const mapDestination = encodeURIComponent(
    PRACTICE_INFO.mapQuery ||
      `${PRACTICE_INFO.address.building}, ${PRACTICE_INFO.address.street}, ${PRACTICE_INFO.address.city}`
  );
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapDestination}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapDestination}`;

  return (
    <main>
      <JsonLd data={contactJsonLd} />
      <PageHero
        eyebrow={CONTACT_HERO.eyebrow}
        heading={CONTACT_HERO.heading}
        headingItalic={CONTACT_HERO.headingItalic}
        subhead={CONTACT_HERO.subhead}
      >
        {/* Jump links — same two destinations every "Book Appointment"
            button on the site points at (#schedule), plus a way to reach
            the info column directly on mobile, where it's second in DOM
            order. */}
        <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 28 }}>
          <a
            href="#info"
            className="font-archivo font-[600] text-vbam-atlantic border border-vbam-atlantic/30 hover:border-vbam-atlantic/60 transition-colors rounded-full"
            style={{ fontSize: 14, padding: '14px 28px' }}
          >
            Get in Touch
          </a>
          <a
            href="#schedule"
            className="btn-primary font-archivo font-[600] transition-colors rounded-full"
            style={{ fontSize: 14, padding: '14px 28px' }}
          >
            Book Appointment Online
          </a>
        </div>
      </PageHero>

      {/* ── Contact info + form ─── */}
      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-16 items-start">

          {/* Contact info — on mobile this drops below the Klara CTA so texting
              leads. No ScrollReveal here (unlike the scheduling column) --
              the #info jump link lands here directly, and a scroll-reveal
              fade made it feel slow to appear right after an anchor jump. */}
          <div id="info" className="order-2 md:order-1">
            <div>
              <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                {CONTACT_INFO.eyebrow}
              </p>
              <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 32 }}>
                {CONTACT_INFO.heading} <em className="font-cormorant italic text-grad-sunrise">{CONTACT_INFO.headingItalic}</em>
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Location</p>
                  <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 15, lineHeight: 1.8 }}>
                    {PRACTICE_INFO.address.building}<br />
                    {PRACTICE_INFO.address.street}<br />
                    {PRACTICE_INFO.address.city}
                  </p>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Call</p>
                  <a
                    href={`tel:${PRACTICE_INFO.phoneTel}`}
                    className="font-inter font-[400] text-vbam-atlantic hover:text-vbam-inlet transition-colors"
                    style={{ fontSize: 20, letterSpacing: '0.01em' }}
                  >
                    {PRACTICE_INFO.phone}
                  </a>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>SMS/Text</p>
                  <a
                    href={PRACTICE_INFO.smsHref}
                    className="font-inter font-[400] text-vbam-atlantic hover:text-vbam-inlet transition-colors"
                    style={{ fontSize: 20, letterSpacing: '0.01em' }}
                  >
                    {PRACTICE_INFO.sms}
                  </a>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Fax</p>
                  <p className="font-inter font-[400] text-vbam-atlantic" style={{ fontSize: 20, letterSpacing: '0.01em' }}>
                    {PRACTICE_INFO.fax}
                  </p>
                </div>

                <div>
                  <p className="font-archivo font-[700] text-vbam-atlantic/50 mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Hours</p>
                  <ul className="font-inter font-[300] text-vbam-atlantic/[.82] space-y-1" style={{ fontSize: 15 }}>
                    {PRACTICE_INFO.hours.map(h => <li key={h}>{h}</li>)}
                  </ul>
                  <p className="font-cormorant italic text-vbam-sea-glass mt-2" style={{ fontSize: 16 }}>
                    {PRACTICE_INFO.hoursNote}
                  </p>
                </div>

                <div className="rounded-lg border border-vbam-atlantic/[.08] bg-vbam-sand" style={{ padding: '20px 22px' }}>
                  <p className="font-inter font-[300] text-vbam-atlantic/70" style={{ fontSize: 14, lineHeight: 1.65 }}>
                    <strong className="font-[500] text-vbam-atlantic">Same-day visits:</strong> {PRACTICE_INFO.sameDay}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Self-scheduling — on mobile this floats above the contact info so it leads */}
          <div id="schedule" className="order-1 md:order-2">
          <ScrollReveal animation="left" delay={100} as="div">
            <div className="bg-vbam-sand rounded-xl" style={{ paddingTop: 'clamp(14px, 2vw, 20px)', paddingBottom: 'clamp(28px, 4vw, 44px)', paddingLeft: 'clamp(20px, 3vw, 40px)', paddingRight: 'clamp(20px, 3vw, 40px)' }}>
              {CONTACT_SCHEDULING.eyebrow && (
                <p
                  className="font-archivo font-[700] text-vbam-coral"
                  style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
                >
                  {CONTACT_SCHEDULING.eyebrow}
                </p>
              )}
              <p className="font-inter font-[300] text-vbam-atlantic/70" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                {CONTACT_SCHEDULING.newTabPrompt}{' '}
                <a
                  href={CONTACT_SCHEDULING.newTabHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[600] text-vbam-coral hover:text-vbam-atlantic underline transition-colors"
                >
                  {CONTACT_SCHEDULING.newTabCta}
                </a>
              </p>
              {/* Yosi self-scheduling widget. The loader script reads
                  yosi_widget_obj synchronously the instant it runs, with no
                  guard for it being undefined — so the config assignment and
                  the loader injection have to be one script, not two separate
                  next/script tags (a race there means both the inline embed
                  and its floating-button fallback silently fail). */}
              <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                <div id="yosi-widget-container" />
              </div>
              <Script id="yosi-widget-init" strategy="afterInteractive">
                {`
                  window.yosi_widget_obj = {background: '#f5f1f3', width: '400px', height: '88vh', btn_color: '#1b3c49', page_container_id: 'yosi-widget-container'};
                  window.yosi_widgetId = '2ce5dea52d9c2339d2eb678d5eb3f7b8';
                  var yosiScript = document.createElement('script');
                  yosiScript.src = 'https://s3-us-west-2.amazonaws.com/s3-schedulewidget.yosicare.com/script.js';
                  yosiScript.async = true;
                  document.body.appendChild(yosiScript);
                `}
              </Script>

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(10,61,74,.1)' }}>
                <p className="font-inter font-[300] text-vbam-atlantic/70 text-center" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>
                  {CONTACT_SCHEDULING.textPrompt}
                </p>
                <a
                  href={CONTACT_SCHEDULING.textHref}
                  className="btn-primary inline-block w-full text-center font-archivo font-[600] rounded-full transition-colors"
                  style={{ fontSize: 14, padding: '14px 28px', letterSpacing: '0.01em' }}
                >
                  {CONTACT_SCHEDULING.textCta}
                </a>
              </div>

              <p className="font-inter font-[300] text-vbam-atlantic/40 text-center" style={{ fontSize: 12, lineHeight: 1.5, marginTop: 18 }}>
                {CONTACT_SCHEDULING.disclaimer}
              </p>
            </div>
          </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── Map ─── */}
      <section className="bg-vbam-foam" style={{ padding: '0 0 clamp(48px, 8vw, 104px)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <ScrollReveal animation="rise" as="div">
            <div style={{ marginBottom: 18 }}>
              <p className="font-inter font-[400] text-vbam-atlantic" style={{ fontSize: 16, lineHeight: 1.6 }}>
                {PRACTICE_INFO.address.building} · {PRACTICE_INFO.address.street}, {PRACTICE_INFO.address.city}
              </p>
              {PRACTICE_INFO.mapNote && (
                <span
                  className="inline-flex items-center font-archivo font-[600] text-vbam-foam bg-vbam-coral rounded-full"
                  style={{ fontSize: 13.5, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '8px 16px', marginTop: 12 }}
                >
                  {PRACTICE_INFO.mapNote}
                </span>
              )}
            </div>
            <div className="rounded-xl overflow-hidden border border-vbam-atlantic/[.08]">
              <iframe
                title="Map of Vero Beach Adult Medicine at Citrus Medical Plaza, 955 37th Place, Vero Beach, FL"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, width: '100%', height: 'clamp(280px, 42vw, 440px)', display: 'block' }}
              />
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-archivo font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              style={{ fontSize: 14, marginTop: 16, letterSpacing: '0.01em' }}
            >
              Get Directions →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sibling callout ─── */}
      <section className="bg-vbam-atlantic text-center" style={{ padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
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
            {' '}· {CONTACT_CTA.sibling}
          </p>
        </div>
      </section>
    </main>
  );
}
