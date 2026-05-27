import ScrollReveal from '@/components/shared/ScrollReveal';
import { REVIEWS_SECTION } from '@/content/home';
import { REVIEWS } from '@/content/reviews';

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"
          fill={i < full ? '#EE7752' : 'rgba(10,61,74,0.18)'}>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto rounded-lg bg-vbam-foam border border-vbam-atlantic/[.08] text-center" style={{ maxWidth: 540, padding: '36px 32px' }}>
      <p className="font-fraunces font-[400] text-vbam-atlantic" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 10 }}>
        {REVIEWS_SECTION.emptyTitle}
      </p>
      <p className="font-inter font-[300] text-vbam-atlantic/[.78]" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 22 }}>
        {REVIEWS_SECTION.emptyBody}
      </p>
      <a href={REVIEWS_SECTION.emptyCtaHref} target="_blank" rel="noopener noreferrer"
        className="btn-primary inline-block font-archivo font-[600] rounded-full"
        style={{ fontSize: 13, padding: '12px 24px', letterSpacing: '0.01em' }}>
        {REVIEWS_SECTION.emptyCtaLabel}
      </a>
    </div>
  );
}

export default function ReviewsSection() {
  const hasReviews = REVIEWS.reviews.length > 0;
  const profileUrl = REVIEWS.profileUrl ?? REVIEWS_SECTION.emptyCtaHref;

  return (
    <section className="bg-vbam-foam" id="reviews" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
            {REVIEWS_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}>
            {REVIEWS_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{REVIEWS_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: hasReviews ? 32 : 56 }}>
            {REVIEWS_SECTION.body}
          </p>
        </ScrollReveal>

        {!hasReviews ? (
          <EmptyState />
        ) : (
          <>
            {/* Rating summary */}
            <ScrollReveal delay={110}>
              <div className="flex items-center justify-center gap-3 flex-wrap" style={{ marginBottom: 44 }}>
                <span className="font-fraunces font-[500] text-vbam-atlantic" style={{ fontSize: 22, lineHeight: 1 }}>
                  {REVIEWS.placeRating.toFixed(1)}
                </span>
                <StarRow rating={REVIEWS.placeRating} size={18} />
                <span className="font-inter font-[300] text-vbam-atlantic/[.7]" style={{ fontSize: 15 }}>
                  {REVIEWS.totalRatings}+ Google reviews · Vero Beach Pediatrics
                </span>
              </div>
            </ScrollReveal>

            {/* Carousel — native horizontal scroll-snap (swipe on mobile, no JS library) */}
            <ScrollReveal delay={140}>
              <div
                className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12"
                style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
              >
                {REVIEWS.reviews.map((r, i) => (
                  <article
                    key={`${r.author}-${i}`}
                    className="rounded-lg bg-white border border-vbam-atlantic/[.08] flex flex-col shrink-0"
                    style={{ padding: '24px 22px', width: 'min(82vw, 340px)', scrollSnapAlign: 'start' }}
                  >
                    <div style={{ marginBottom: 12 }}><StarRow rating={r.rating} /></div>
                    <p className="font-inter font-[300] text-vbam-atlantic/[.84] flex-1" style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 18 }}>
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="pt-3 border-t border-vbam-atlantic/[.06]">
                      <p className="font-archivo font-[600] text-vbam-atlantic" style={{ fontSize: 13 }}>
                        {r.author}
                      </p>
                      <p className="font-inter text-vbam-atlantic/[.5]" style={{ fontSize: 11, marginTop: 2 }}>
                        Vero Beach Pediatrics · Google{r.relativeTime ? ` · ${r.relativeTime}` : ''}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="text-center" style={{ marginTop: 36 }}>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer"
                  className="font-archivo font-[600] text-vbam-atlantic hover:text-vbam-inlet transition-colors inline-block"
                  style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Read more on Google →
                </a>
              </div>
            </ScrollReveal>
          </>
        )}

      </div>
    </section>
  );
}
