'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { SOCIAL_SECTION } from '@/content/home';
import { SOCIAL_POSTS, type SocialPost } from '@/content/social';

type Filter = 'all' | 'instagram' | 'facebook';

function truncate(text: string, max = 140): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function PostCard({ post }: { post: SocialPost }) {
  const platformLabel = post.platform === 'instagram' ? 'Instagram' : 'Facebook';
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View this ${platformLabel} post — opens in new tab`}
      className="block rounded-lg overflow-hidden bg-white border border-vbam-atlantic/[.08] hover:shadow-md transition-shadow h-full"
    >
      {post.mediaUrl && (
        <div className="relative aspect-square overflow-hidden bg-vbam-sand">
          <img
            src={post.mediaUrl}
            alt={truncate(post.caption, 80) || `${platformLabel} post`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div style={{ padding: '16px 18px' }}>
        <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
          {platformLabel}
        </p>
        {post.caption && (
          <p className="font-inter font-[300] text-vbam-atlantic/[.82]" style={{ fontSize: 14, lineHeight: 1.55 }}>
            {truncate(post.caption)}
          </p>
        )}
      </div>
    </a>
  );
}

export default function SocialFeedSection() {
  const [filter, setFilter] = useState<Filter>('all');

  if (SOCIAL_POSTS.length === 0) return null;

  const filtered = filter === 'all' ? SOCIAL_POSTS : SOCIAL_POSTS.filter((p) => p.platform === filter);

  return (
    <section className="bg-vbam-foam" id="social" style={{ padding: 'clamp(48px, 8vw, 112px) 0' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">

        <ScrollReveal animation="left" as="div" className="text-center">
          <p
            className="font-archivo font-[700] text-vbam-coral"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}
          >
            {SOCIAL_SECTION.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h2
            className="font-fraunces font-[400] text-vbam-atlantic mx-auto text-center"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: 640, marginBottom: 20 }}
          >
            {SOCIAL_SECTION.headingLine1}{' '}
            <em className="font-cormorant italic text-grad-sunrise">{SOCIAL_SECTION.headingItalic}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            className="font-inter font-[300] text-vbam-atlantic/[.84] mx-auto text-center"
            style={{ fontSize: 18, lineHeight: 1.72, maxWidth: 680, marginBottom: 36 }}
          >
            {SOCIAL_SECTION.body}
          </p>
        </ScrollReveal>

        <div className="flex justify-center gap-2 flex-wrap" style={{ marginBottom: 40 }}>
          {(['all', 'instagram', 'facebook'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`font-archivo font-[600] rounded-full transition-colors ${
                filter === f
                  ? 'bg-vbam-atlantic text-vbam-foam'
                  : 'bg-transparent text-vbam-atlantic/70 border border-vbam-atlantic/20 hover:border-vbam-atlantic/40'
              }`}
              style={{ fontSize: 12, padding: '8px 18px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
            >
              {f === 'all' ? 'All' : f === 'instagram' ? 'Instagram' : 'Facebook'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ScrollReveal key={`${p.platform}-${p.id}`} animation="scale" delay={i * 60}>
              <PostCard post={p} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
