// Shared VBP/VBAM Klara patient-messaging widget. VBAM is text-first; patients
// reach the care team through Klara's hosted widget. We link directly to it
// rather than embedding Klara's script, which intermittently rendered blank.
// A plain link is 100% reliable — nothing third-party has to load.
// (Same widget id as Vero Beach Pediatrics — shared practice group.)
export const KLARA_URL =
  "https://patient.klara.com/#/widget/168b842c-9a0d-43dd-bc25-d0dc202289aa";
