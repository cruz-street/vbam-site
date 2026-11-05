import Link from 'next/link';
import type { ReactNode } from 'react';

// Renders `text` unchanged, except that the first occurrence of `phrase` becomes
// an internal link to `href`. The visible wording is never altered, so the CMS
// strings (and any JSON-LD built from them) stay plain text. If the phrase is
// not found, the text renders as-is with no link.
export default function LinkPhrase({ text, phrase, href }: { text: string; phrase: string; href: string }): ReactNode {
  const i = text.indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <Link href={href} className="underline decoration-vbam-coral/50 underline-offset-2 hover:text-vbam-inlet transition-colors">
        {phrase}
      </Link>
      {text.slice(i + phrase.length)}
    </>
  );
}
