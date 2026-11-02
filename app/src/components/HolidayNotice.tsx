"use client";

import { useEffect, useState } from "react";
import { upcomingHolidayNotices } from "@/lib/holidays";

/** "Holiday hours" line: upcoming closures only. Renders the build-time list, then refreshes to today's date in the browser. */
export function HolidayNotice({ className }: { className?: string }) {
  const [notices, setNotices] = useState(() => upcomingHolidayNotices());
  useEffect(() => setNotices(upcomingHolidayNotices()), []);
  if (notices.length === 0) return null;
  return (
    <p className={className}>
      <strong>Holiday hours:</strong> {notices.join(" ")}
    </p>
  );
}
