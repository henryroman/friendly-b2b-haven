import { format, parseISO } from "date-fns";

/** "2026-06-12" -> "12 June 2026". Matches the display format already used across the site. */
export function formatDisplayDate(iso: string): string {
  return format(parseISO(iso), "d MMMM yyyy");
}
