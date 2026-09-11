import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PageHero from '@/components/shared/PageHero';

const PHONE = '(772) 569-3212';
const PHONE_HREF = 'tel:+17725693212';
const EMAIL = 'careteam@verobeachadultmedicine.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Vero Beach Adult Medicine privacy policy — how we collect, use, share, and protect your personal information, your choices, and our HIPAA notice.',
  alternates: { canonical: 'https://verobeachadultmedicine.com/privacy-policy/' },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 24, lineHeight: 1.2 }}>
        {title}
      </h2>
      <div
        className="mt-3 space-y-3 font-inter font-[300] text-vbam-atlantic/[.82]"
        style={{ fontSize: 16, lineHeight: 1.75 }}
      >
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <main>
      <PageHero eyebrow="Legal" heading="Privacy Policy" />

      <section className="bg-vbam-foam" style={{ padding: 'clamp(40px, 7vw, 96px) 0' }}>
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 md:px-10">
          <p className="font-archivo font-[700] text-vbam-atlantic" style={{ fontSize: 14 }}>
            Last Updated: September 10, 2026
          </p>

          <Section title="Collection of Personal Information">
            <p>
              We collect personal information that you provide to us directly — such as your name,
              address, email address, and phone number — including when you create or use an account
              on our Patient Portal.
            </p>
            <p>
              We also automatically collect certain information when you visit our website, such as
              your IP address, the pages you view, the searches you perform, and details about your
              device. This information is collected using cookies and similar technologies.
            </p>
            <p>
              We use a third-party service, NextRoll, which collects information about your activity
              on our website to provide analytics and targeted advertising. Hashed versions of your
              email address and other identifiers may be shared with advertising partners. You can
              learn more in the{' '}
              <a
                href="https://www.nextroll.com/privacy"
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                NextRoll privacy policy
              </a>
              .
            </p>
          </Section>

          <Section title="Use of Personal Information">
            <p>
              We use the personal information we collect to provide and improve our services, respond
              to your requests, communicate with you, operate and analyze our website, and for
              marketing and advertising purposes consistent with this policy.
            </p>
          </Section>

          <Section title="Sharing of Personal Information">
            <p>
              We may share your personal information with service providers who perform functions on
              our behalf, with advertising and analytics partners as described above, and when
              required to comply with the law or to protect our rights.
            </p>
          </Section>

          <Section title="Linked Third-Party Online Platforms">
            <p>
              Our website may contain links to third-party websites and platforms. We are not
              responsible for the privacy practices of those third parties, and we encourage you to
              review their privacy policies.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We maintain reasonable administrative, technical, and physical safeguards designed to
              protect your personal information. However, no method of transmission or storage is
              completely secure.
            </p>
          </Section>

          <Section title="Your Choices">
            <p>
              You may opt out of receiving marketing emails from us by following the unsubscribe
              instructions in those messages.
            </p>
            <p>
              To opt out of interest-based advertising, you can visit the following industry opt-out
              tools:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://optout.networkadvertising.org/?c=1"
                  className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Network Advertising Initiative (NAI)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youronlinechoices.com/"
                  className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  European Interactive Digital Advertising Alliance (EDAA)
                </a>
              </li>
              <li>
                <a
                  href="https://optout.aboutads.info/?c=2&lang=EN"
                  className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Advertising Alliance (DAA)
                </a>
              </li>
            </ul>
          </Section>

          <Section title="Information for Users Outside the United States">
            <p>
              Our website is intended for users in the United States. If you access it from outside
              the United States, your information will be transferred to, stored, and processed in
              the United States, where data protection laws may differ from those in your country.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Our website is not directed to children under the age of 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </Section>

          <Section title="Revisions to this Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last Updated&rdquo; date at the top of this page.
            </p>
          </Section>

          <Section title="Contact Information">
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              >
                {EMAIL}
              </a>{' '}
              or{' '}
              <a
                href={PHONE_HREF}
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
              >
                {PHONE}
              </a>
              .
            </p>
            <address className="not-italic">
              Citrus Medical Plaza
              <br />
              955 37th Place
              <br />
              Vero Beach, FL 32960
            </address>
          </Section>

          <div className="mt-12 rounded-3xl bg-vbam-sand p-7">
            <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 16, lineHeight: 1.75 }}>
              For more information about how your protected health information is handled, please see
              the{' '}
              <a
                href="https://www.priviahealth.com/privacy-and-compliance/"
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                HIPAA Privacy Notice
              </a>{' '}
              and the{' '}
              <a
                href="https://www.priviahealth.com/notice-nondiscrimination/"
                className="font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notice of Nondiscrimination
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
