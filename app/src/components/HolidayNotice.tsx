"use client";

import { useEffect, useState } from "react";
import { BUILD_DATE, upcomingHolidayNotices } from "@/lib/holidays";

/** "Holiday hours" line: upcoming closures only. Renders the build-date list first (matches the static HTML), then switches to today's date after mount. */
export function HolidayNotice({ className }: { className?: string }) {
  const [notices, setNotices] = useState(() => upcomingHolidayNotices(3, BUILD_DATE));
  useEffect(() => setNotices(upcomingHolidayNotices()), []);
  if (notices.length === 0) return null;
  return (
    <p className={className}>
      <strong>Holiday hours:</strong> {notices.join(" ")}
    </p>
  );
}
