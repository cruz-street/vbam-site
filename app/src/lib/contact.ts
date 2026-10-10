// How patients reach the practice by text or phone. One place to change when the
// text line moves.
//
// "pre-port": texting runs on its own line (855) and calls go to the main line.
// "post-port": texting moves to the main line, so one number does both. At that
// point also update the 855 links in content/contact.json, content/virtual-care.json
// and components/layout/Footer.tsx.
export const CONTACT_PHASE: "pre-port" | "post-port" = "pre-port";

export const CALL_LINE = { display: "(772) 569-3212", tel: "+17725693212" };

const PRE_PORT_TEXT_LINE = { display: "(855) 430-8172", tel: "+18554308172" };

export const TEXT_LINE = CONTACT_PHASE === "pre-port" ? PRE_PORT_TEXT_LINE : CALL_LINE;

// True once one number handles both texts and calls.
export const SHARED_LINE = TEXT_LINE.tel === CALL_LINE.tel;

export const HOURS = "Monday to Friday, 8 am to 5 pm. Closed for lunch from 12 to 1.";
