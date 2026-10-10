"use client";

import { useRef } from "react";
import { CALL_LINE, HOURS, SHARED_LINE, TEXT_LINE } from "@/lib/contact";

/**
 * Persistent floating "Text or call us" button (bottom-right, every page) and the
 * pop-up it opens. No third-party code: a native <dialog> with plain text and
 * tel:/sms: links. Phones get the tap buttons; on a desktop the numbers are shown
 * instead, since a computer can't place a call or send a text.
 */
export default function MessageUsButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-label="Text or call the Vero Beach Adult Medicine team"
        className="btn-primary font-archivo font-[600] fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] shadow-lg transition-colors cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Text or call us</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="reach-us-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="reach-us m-auto w-[min(92vw,420px)] rounded-2xl bg-vbam-foam p-0 text-vbam-atlantic shadow-2xl"
      >
        <div className="p-7">
          <p className="font-archivo font-[700] text-vbam-coral" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Reach us
          </p>
          <h2 id="reach-us-title" className="font-fraunces font-[400] text-vbam-atlantic mt-2" style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.015em" }}>
            Text or <em className="font-cormorant italic">call us.</em>
          </h2>

          {SHARED_LINE ? (
            <p className="font-inter text-vbam-atlantic/80 mt-4" style={{ fontSize: 15, lineHeight: 1.6 }}>
              Text or call us at <strong className="font-[600] text-vbam-atlantic">{CALL_LINE.display}</strong>.
            </p>
          ) : (
            <ul className="font-inter text-vbam-atlantic/80 mt-4 space-y-1" style={{ fontSize: 15, lineHeight: 1.6 }}>
              <li>
                Text us at <strong className="font-[600] text-vbam-atlantic">{TEXT_LINE.display}</strong>
              </li>
              <li>
                Call us at <strong className="font-[600] text-vbam-atlantic">{CALL_LINE.display}</strong>
              </li>
            </ul>
          )}

          <div className="reach-us-actions mt-5 gap-3">
            <a
              href={`sms:${TEXT_LINE.tel}`}
              className="btn-primary font-archivo font-[600] rounded-full text-center transition-colors"
              style={{ fontSize: 15, padding: "14px 28px", flex: 1 }}
            >
              Text us
            </a>
            <a
              href={`tel:${CALL_LINE.tel}`}
              className="font-archivo font-[600] rounded-full border border-vbam-atlantic/30 text-vbam-atlantic text-center transition-colors hover:border-vbam-atlantic/60"
              style={{ fontSize: 15, padding: "14px 28px", flex: 1 }}
            >
              Call us
            </a>
          </div>

          <p className="font-inter text-vbam-atlantic/70 mt-5" style={{ fontSize: 14, lineHeight: 1.6 }}>
            {HOURS}
          </p>
          <p className="font-inter text-vbam-atlantic/70 mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Please keep medical details out of texts. For an emergency, call 911.
          </p>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="font-archivo font-[600] text-vbam-inlet hover:text-vbam-atlantic transition-colors mt-5 cursor-pointer"
            style={{ fontSize: 14 }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
