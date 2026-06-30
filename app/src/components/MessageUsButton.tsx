import { KLARA_URL } from "@/lib/klara";

/**
 * Persistent floating "Message us" button (bottom-right, every page).
 * Pure markup + CSS — always renders; opens the Klara messaging widget.
 * Replaces the embedded Klara script, which intermittently rendered blank.
 */
export default function MessageUsButton() {
  return (
    <a
      href={KLARA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us — text the Vero Beach Adult Medicine team"
      className="btn-primary font-archivo font-[600] fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] shadow-lg transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span>Message us</span>
    </a>
  );
}
