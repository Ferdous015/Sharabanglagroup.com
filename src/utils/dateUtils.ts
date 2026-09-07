/**
 * Utility functions for date and deadline parsing, formatting, and ISO conversion
 */

const BANGLA_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const BANGLA_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const ENGLISH_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_MAP: Record<string, string> = {
  january: '01', jan: '01',
  february: '02', feb: '02',
  march: '03', mar: '03',
  april: '04', apr: '04',
  may: '05',
  june: '06', jun: '06',
  july: '07', jul: '07',
  august: '08', aug: '08',
  september: '09', sep: '09', sept: '09',
  october: '10', oct: '10',
  november: '11', nov: '11',
  december: '12', dec: '12'
};

/**
 * Converts Western digits to Bengali digits
 */
export function toBanglaDigits(num: number | string): string {
  return String(num).replace(/\d/g, (d) => BANGLA_DIGITS[d] || d);
}

/**
 * Parses any date string (e.g. "August 26, 2026", "26 August 2026", "2026-08-26", "08/26/2026") into YYYY-MM-DD for HTML5 date inputs
 */
export function parseDateToIso(val?: string | null): string {
  if (!val) return '';
  const trimmed = val.trim();
  if (!trimmed) return '';

  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Check pattern "Month Day, Year" or "Month Day Year" (e.g. "August 26, 2026" or "Aug 26 2026")
  const m1 = trimmed.match(/^([a-zA-Z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (m1) {
    const monthKey = m1[1].toLowerCase();
    const monthNum = MONTH_MAP[monthKey];
    if (monthNum) {
      const day = m1[2].padStart(2, '0');
      const year = m1[3];
      return `${year}-${monthNum}-${day}`;
    }
  }

  // Check pattern "Day Month Year" or "Day Month, Year" (e.g. "26 August 2026")
  const m2 = trimmed.match(/^(\d{1,2})\s+([a-zA-Z]+),?\s+(\d{4})$/);
  if (m2) {
    const monthKey = m2[2].toLowerCase();
    const monthNum = MONTH_MAP[monthKey];
    if (monthNum) {
      const day = m2[1].padStart(2, '0');
      const year = m2[3];
      return `${year}-${monthNum}-${day}`;
    }
  }

  // Try parsing with native Date
  const parsedTimestamp = Date.parse(trimmed);
  if (!isNaN(parsedTimestamp)) {
    const d = new Date(parsedTimestamp);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return '';
}

/**
 * Formats an ISO date string (YYYY-MM-DD) or human string into a clean English display format: "August 26, 2026"
 */
export function formatDateForDisplay(val?: string | null): string {
  if (!val) return '';
  const trimmed = val.trim();
  if (!trimmed) return '';

  // Check if string matches YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIdx = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const monthName = ENGLISH_MONTHS[monthIdx];
    if (monthName) {
      return `${monthName} ${day}, ${year}`;
    }
  }

  // If already human-readable (e.g. "August 26, 2026"), check if it parses to ISO and re-format cleanly
  const iso = parseDateToIso(trimmed);
  if (iso && iso !== trimmed) {
    const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const year = match[1];
      const monthIdx = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      const monthName = ENGLISH_MONTHS[monthIdx];
      if (monthName) {
        return `${monthName} ${day}, ${year}`;
      }
    }
  }

  // Return as-is if no conversion could be made
  return trimmed;
}

/**
 * Formats a date string into standard Bangla display string (e.g. "২৬ আগস্ট, ২০২৬")
 */
export function formatDateToBangla(val?: string | null): string {
  if (!val) return '';
  const iso = parseDateToIso(val);
  if (iso) {
    const [yearStr, monthStr, dayStr] = iso.split('-');
    const year = parseInt(yearStr, 10);
    const monthIndex = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);

    const bnDay = toBanglaDigits(day);
    const bnMonth = BANGLA_MONTHS[monthIndex] || '';
    const bnYear = toBanglaDigits(year);

    return `${bnDay} ${bnMonth}, ${bnYear}`;
  }
  return val.trim();
}

/**
 * Formats a date string into standard Chinese display string (e.g. "2026年8月26日")
 */
export function formatDateToChinese(val?: string | null): string {
  if (!val) return '';
  const iso = parseDateToIso(val);
  if (iso) {
    const [yearStr, monthStr, dayStr] = iso.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    return `${year}年${month}月${day}日`;
  }
  return val.trim();
}

// Backwards compatibility aliases for Job deadlines
export const parseDeadlineToIso = parseDateToIso;
export const formatDeadlineForDisplay = formatDateForDisplay;
export const formatDeadlineToBangla = formatDateToBangla;
export const formatDeadlineToChinese = formatDateToChinese;


