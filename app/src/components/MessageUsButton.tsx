"use client";

import { useRef } from "react";
import { CALL_LINE, CONTACT_CARD, HOURS, TEXT_LINE } from "@/lib/contact";

/**
 * Persistent floating "Contact us" button (bottom-right, every page) and the
 * pop-up it opens. No third-party code: a native <dialog> with plain text and
 * tel:/sms: links on the numbers.
 */
export default function MessageUsButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const same = TEXT_LINE.tel === CALL_LINE.tel;
  const btn =
    "font-archivo font-[600] flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 min-h-[52px] text-[16px] transition-colors";
  const textBtn = `${btn} btn-primary`;
  const callBtn = `${btn} border-2 border-vbam-atlantic text-vbam-atlantic hover:bg-vbam-sand`;
  const icon = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const BubbleIcon = () => (
    <svg {...icon}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12Z" /></svg>
  );
  const PhoneIcon = () => (
    <svg {...icon}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
  );

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
        <span>Contact us</span>
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
          <h2 id="reach-us-title" className="font-fraunces font-[400] text-vbam-atlantic " style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.015em" }}>
            Get in <em className="font-cormorant italic">touch.</em>
          </h2>
          <p className="font-inter text-vbam-atlantic/80 mt-2" style={{ fontSize: 17, lineHeight: 1.5 }}>
            Text or call us at
          </p>

          {same ? (
            <>
              <p className="font-fraunces font-[500] text-vbam-atlantic mt-1" style={{ fontSize: 30, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                {CALL_LINE.display}
              </p>
              <div className="mt-4 flex gap-3">
                <a href={`sms:${TEXT_LINE.tel}`} className={textBtn} aria-label={`Text us at ${TEXT_LINE.display}`}>
                  <BubbleIcon /> Text
                </a>
                <a href={`tel:${CALL_LINE.tel}`} className={callBtn} aria-label={`Call us at ${CALL_LINE.display}`}>
                  <PhoneIcon /> Call
                </a>
              </div>
            </>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              <a href={`sms:${TEXT_LINE.tel}`} className={textBtn} aria-label={`Text us at ${TEXT_LINE.display}`}>
                <BubbleIcon /> Text {TEXT_LINE.display}
              </a>
              <a href={`tel:${CALL_LINE.tel}`} className={callBtn} aria-label={`Call us at ${CALL_LINE.display}`}>
                <PhoneIcon /> Call {CALL_LINE.display}
              </a>
            </div>
          )}

          <p className="mt-4">
            <a
              href={CONTACT_CARD.href}
              download
              className="font-inter font-[500] text-vbam-inlet underline underline-offset-4 hover:text-vbam-atlantic transition-colors"
              style={{ fontSize: 15 }}
            >
              {CONTACT_CARD.label}
            </a>
          </p>

          <p className="font-inter text-vbam-atlantic/70 mt-5" style={{ fontSize: 14, lineHeight: 1.6 }}>
            {HOURS} After hours, call and our nurse line will help.
          </p>
          <p className="font-inter text-vbam-atlantic/70 mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
            For an emergency, call 911.
          </p>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="font-archivo font-[600] text-vbam-inlet underline underline-offset-4 hover:text-vbam-atlantic transition-colors mt-5 py-2 cursor-pointer"
            style={{ fontSize: 15 }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
