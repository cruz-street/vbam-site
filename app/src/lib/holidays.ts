// Holiday closures. One list to edit each year; the notice shows only upcoming entries.
// Source: company holiday schedule approved 2026-11-02 (VBP / VBAM column).
export type Closure = {
  date: string; // YYYY-MM-DD
  holiday: string;
  hours: "closed" | "half"; // half = open at the normal time, close at noon
};

export const HOLIDAY_CLOSURES: Closure[] = [
  { date: "2026-11-26", holiday: "Thanksgiving", hours: "closed" },
  { date: "2026-11-27", holiday: "Thanksgiving", hours: "closed" },
  { date: "2026-12-24", holiday: "Christmas Eve", hours: "half" },
  { date: "2026-12-25", holiday: "Christmas Day", hours: "closed" },
  { date: "2026-12-31", holiday: "New Year's Eve", hours: "half" },
  { date: "2027-01-01", holiday: "New Year's Day", hours: "closed" },
  { date: "2027-05-31", holiday: "Memorial Day", hours: "closed" },
  { date: "2027-07-05", holiday: "Independence Day", hours: "closed" },
  { date: "2027-09-06", holiday: "Labor Day", hours: "closed" },
  { date: "2027-11-25", holiday: "Thanksgiving", hours: "closed" },
  { date: "2027-11-26", holiday: "Thanksgiving", hours: "closed" },
  { date: "2027-12-24", holiday: "Christmas Eve", hours: "half" },
  { date: "2027-12-31", holiday: "New Year's Eve", hours: "half" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]} ${MONTHS[m - 1]} ${d}`;
}

function todayIso() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

/** Up to `max` upcoming notices, e.g. "Closed Thu Nov 26 and Fri Nov 27 for Thanksgiving." */
export function upcomingHolidayNotices(max = 3, today = todayIso()): string[] {
  const groups: { holiday: string; hours: Closure["hours"]; dates: string[] }[] = [];
  for (const c of HOLIDAY_CLOSURES.filter((c) => c.date >= today)) {
    const last = groups[groups.length - 1];
    if (last && last.holiday === c.holiday && last.hours === c.hours) last.dates.push(c.date);
    else groups.push({ holiday: c.holiday, hours: c.hours, dates: [c.date] });
  }
  return groups.slice(0, max).map((g) => {
    const days = g.dates.map(shortDate).join(" and ");
    return g.hours === "closed"
      ? `Closed ${days} for ${g.holiday}.`
      : `Open until noon on ${days} for ${g.holiday}.`;
  });
}

/** schema.org specialOpeningHoursSpecification entries for upcoming closures (closed = 00:00 to 00:00). */
export function holidayOpeningHoursSpecs(today = todayIso()) {
  return HOLIDAY_CLOSURES.filter((c) => c.date >= today).map((c) => ({
    "@type": "OpeningHoursSpecification" as const,
    validFrom: c.date,
    validThrough: c.date,
    ...(c.hours === "closed" ? { opens: "00:00", closes: "00:00" } : { opens: "08:00", closes: "12:00" }),
  }));
}
