import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description: "Meet the physicians of Vero Beach Adult Medicine — board-certified internists delivering thoughtful, patient-first adult primary care on the Treasure Coast.",
  alternates: { canonical: 'https://vbadultmedicine.com/about/' },
};

function DoctorPhoto({ size = 280 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-full relative overflow-hidden mx-auto"
      style={{
        width: size, height: size,
        background: '#F5F1E8',
        boxShadow: '0 24px 64px -28px rgba(10,61,74,.28)',
        border: '1px solid rgba(10,61,74,.07)',
        flexShrink: 0,
      }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, #FBCF9A 0%, #F7D8B4 30%, rgba(245,241,232,.5) 65%, #E8DCC8 100%)', opacity: 0.55 }} />
      <div className="absolute" style={{ bottom: '55%', left: '50%', transform: 'translateX(-50%)', width: '30%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(10,61,74,.18)' }} />
      <div className="absolute" style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '58%', background: 'rgba(10,61,74,.18)', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Doctors"
        heading="Care that begins with"
        headingItalic="the patient."
        subhead="Three physicians. One shared belief — that great primary care belongs in the places people actually want to live."
      />

      {/* ── Dr. Patricia Stewart ─── */}
      <section className="bg-vbam-foam" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="scale">
              <DoctorPhoto />
            </ScrollReveal>
            <div>
              <ScrollReveal animation="left">
                <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                  02 · Physician
                </p>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={60}>
                <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 18 }}>
                  Meet Dr. <em className="font-cormorant italic text-grad-sunrise">Patricia Stewart.</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={100}>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 22 }}>
                  {['Board-Certified · Internal Medicine', '12+ Years Treasure Coast', 'Native Floridian'].map(c => (
                    <span key={c} className="font-archivo font-[700] bg-vbam-sand text-vbam-inlet" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 13px', borderRadius: 999, border: '1px solid rgba(10,61,74,.08)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={140}>
                <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
                  Dr. Stewart brings a thoughtful, patient-first approach to adult primary care — focused on building relationships over time and creating a more personal, unhurried experience.
                </p>
                <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 28 }}>
                  She trained at Emory, completed her residency at the University of Miami, and chose Vero Beach because she believes great primary care belongs in the places people actually want to live.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="left" delay={180}>
                <Link href="/contact/" className="font-archivo font-[600] bg-vbam-atlantic text-vbam-foam hover:bg-vbam-inlet transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 13, padding: '12px 24px' }}>
                  Schedule Your First Visit →
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── D'Elia + Wije ─── */}
      <section className="bg-vbam-sand" style={{ padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic text-center" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 56 }}>
              Also joining the practice.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-8">
            {([
              { name: "D'Elia", bio: "Dr. D'Elia brings additional expertise to our growing practice. Full bio and credentials coming soon." },
              { name: 'Wije', bio: 'Announcement forthcoming. We look forward to introducing Dr. Wije to the Vero Beach community.' },
            ] as const).map((doc, i) => (
              <ScrollReveal key={doc.name} animation="scale" delay={i * 100}>
                <div className="bg-vbam-foam rounded-lg border border-vbam-atlantic/[.08] text-center" style={{ padding: '40px 36px' }}>
                  <DoctorPhoto size={120} />
                  <h3 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.01em', marginTop: 24, marginBottom: 14 }}>
                    Meet Dr. <em className="font-cormorant italic text-grad-sunrise">{doc.name}.</em>
                  </h3>
                  <span className="font-archivo font-[700] bg-vbam-sand text-vbam-inlet" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 999, border: '1px solid rgba(10,61,74,.08)' }}>
                    Internal Medicine
                  </span>
                  <p className="font-inter font-[300] text-vbam-atlantic/70" style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>{doc.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="text-center" style={{ background: 'var(--grad-sunrise)', padding: '80px 0' }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <ScrollReveal>
            <h2 className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.018em', marginBottom: 14 }}>
              Ready to become a patient?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="font-inter font-[300] text-vbam-atlantic/75 mx-auto" style={{ fontSize: 16, maxWidth: 480, marginBottom: 28 }}>
              New patients are welcome. Schedule your first visit in minutes.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <Link href="/contact/" className="font-archivo font-[600] bg-vbam-atlantic text-vbam-foam hover:bg-vbam-inlet transition-colors inline-flex items-center gap-2 rounded-full" style={{ fontSize: 14, padding: '14px 28px' }}>
              Book an Appointment →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
