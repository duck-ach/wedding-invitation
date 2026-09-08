export interface CalendarCell {
  date: number;
  iso: string;
}

/**
 * Builds a 6-week-max calendar grid for the given (year, month0) where
 * month0 is 0-indexed. Leading/trailing blanks are `null`.
 */
export function getMonthMatrix(year: number, month0: number): (CalendarCell | null)[][] {
  const startWeekday = new Date(year, month0, 1).getDay();
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();

  const weeks: (CalendarCell | null)[][] = [];
  let week: (CalendarCell | null)[] = new Array(startWeekday).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push({
      date: day,
      iso: `${year}-${String(month0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

/** Formats the date portion of an ISO string as "YYYY.MM.DD" without any timezone conversion. */
export function formatDateLabel(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, ".");
}

/** Parses the calendar-date portion (year, month0, day) from an ISO string, ignoring timezone. */
export function parseDatePart(iso: string): { year: number; month0: number; day: number } {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return { year, month0: month - 1, day };
}
