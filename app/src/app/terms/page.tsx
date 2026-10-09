import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import JsonLd from '@/components/shared/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/breadcrumb-schema';

const PHONE = '(772) 569-3212';
const PHONE_HREF = 'tel:+17725693212';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Vero Beach Adult Medicine terms and conditions, including our text message consent, message frequency, rates, and how to get help or opt out.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/terms/' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', url: 'https://verobeachadultmedicine.com/' },
  { name: 'Terms & Conditions', url: 'https://verobeachadultmedicine.com/terms/' },
]);

export default function Terms() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero eyebrow="Legal" heading="Terms & Conditions" />

      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 md:px-10">
          <p className="font-archivo font-[700] text-vbam-atlantic" style={{ fontSize: 14 }}>
            Last Updated: October 9, 2026
          </p>

          <div className="mt-10">
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 24, lineHeight: 1.2 }}>
              Text Message Terms
            </h2>
            <div
              className="mt-3 space-y-3 font-inter font-[300] text-vbam-atlantic/[.82]"
              style={{ fontSize: 16, lineHeight: 1.75 }}
            >
            <p>
              By providing your mobile number, you agree to receive text messages from Vero Beach Adult Medicine
              regarding your healthcare and account. Messages may include appointment reminders and
              confirmations, billing notifications and payment reminders, important health-related
              updates, post-visit survey reminders, and two-factor authentication (2FA).
            </p>
            <p>
              <strong>Message Frequency:</strong> You may receive multiple messages depending on
              your appointments and account activity.
            </p>
            <p>
              <strong>Message &amp; Data Rates:</strong> Standard message and data rates may apply
              based on your mobile carrier&rsquo;s plan.
            </p>
            <p>
              <strong>Privacy Policy:</strong> For information about how we collect, use, and
              protect your information, please review our Privacy Policy:{' '}
              <a
                href="/privacy-policy/"
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              >
                https://verobeachadultmedicine.com/privacy-policy/
              </a>
              .
            </p>
            <p>
              <strong>Help &amp; Support:</strong> For assistance, reply &ldquo;HELP&rdquo; for more
              information.
            </p>
            <p>
              <strong>Opt-Out:</strong> Reply &ldquo;STOP&rdquo; at any time to unsubscribe from
              future messages.
            </p>
            <p>
              The patient opt-ins will not be shared with any third-party systems for marketing
              purposes. This ensures transparency and aligns with regulatory standards for data
              protection.
            </p>
            <p>
              For questions, contact us at{' '}
              <a
                href={PHONE_HREF}
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              >
                {PHONE}
              </a>{' '}
              or visit{' '}
              <a
                href="/"
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              >
                verobeachadultmedicine.com
              </a>
              .
            </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
