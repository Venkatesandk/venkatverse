/** Career start — 2021-07-01 00:00:00 IST (Asia/Kolkata) */
export const CAREER_START_IST = {
  year: 2021,
  month: 7,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
} as const;

/**
 * Deterministic snapshot matching server render so initial client state
 * never mismatches SSR or displays "Calculating…" / "--:--:--".
 */
export const INITIAL_EXPERIENCE_SNAPSHOT = new Date("2026-11-25T00:00:00+05:30");

export interface ExperienceBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMonths: number;
  /** e.g. "5 Years 4 Months" */
  label: string;
  /** e.g. "5 Years 4 Months 24 Days" */
  detailedLabel: string;
  /** decimal years for charts, e.g. 5.4 */
  decimalYears: number;
  /** compact "5+ Years" */
  plusYearsLabel: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getIstParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const num = (type: Intl.DateTimeFormatPartTypes) => {
    const raw = parts.find((p) => p.type === type)?.value ?? "0";
    return Number.parseInt(raw, 10) || 0;
  };

  let hour = num("hour");
  if (hour === 24) hour = 0;

  return {
    year: num("year"),
    month: num("month"),
    day: num("day"),
    hour,
    minute: num("minute"),
    second: num("second"),
  };
}

function daysInMonth(year: number, month1To12: number): number {
  return new Date(Date.UTC(year, month1To12, 0)).getUTCDate();
}

export function getExperienceBreakdown(now: Date = INITIAL_EXPERIENCE_SNAPSHOT): ExperienceBreakdown {
  const current = getIstParts(now);

  let years = current.year - CAREER_START_IST.year;
  let months = current.month - CAREER_START_IST.month;
  let days = current.day - CAREER_START_IST.day;
  let hours = current.hour - CAREER_START_IST.hour;
  let minutes = current.minute - CAREER_START_IST.minute;
  let seconds = current.second - CAREER_START_IST.second;

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = current.month === 1 ? 12 : current.month - 1;
    const prevYear = current.month === 1 ? current.year - 1 : current.year;
    days += daysInMonth(prevYear, prevMonth);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  const yearPart = `${years} Year${years === 1 ? "" : "s"}`;
  const monthPart = `${months} Month${months === 1 ? "" : "s"}`;
  const dayPart = `${days} Day${days === 1 ? "" : "s"}`;

  const totalMonths = years * 12 + months;
  const decimalYears = Number((totalMonths / 12 + days / 365).toFixed(1));

  return {
    years,
    months,
    days,
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalMonths,
    label: `${yearPart} ${monthPart}`,
    detailedLabel: `${yearPart} ${monthPart} ${dayPart}`,
    decimalYears,
    plusYearsLabel: `${years}+ Years`,
  };
}

/** e.g. "5 Years 4 Months" */
export function getExperienceLabel(now = INITIAL_EXPERIENCE_SNAPSHOT): string {
  return getExperienceBreakdown(now).label;
}

/** e.g. "5+ Years" */
export function getExperiencePlusLabel(now = INITIAL_EXPERIENCE_SNAPSHOT): string {
  return getExperienceBreakdown(now).plusYearsLabel;
}

/** Shorter badge text e.g. "5y 4m" */
export function getExperienceShort(now = INITIAL_EXPERIENCE_SNAPSHOT): string {
  const { years, months } = getExperienceBreakdown(now);
  return `${years}y ${months}m`;
}

/** Decimal years for numeric stats */
export function getExperienceValue(now = INITIAL_EXPERIENCE_SNAPSHOT): number {
  return getExperienceBreakdown(now).decimalYears;
}

/** Live clock string HH:MM:SS for the experience ticker */
export function getExperienceClock(now = INITIAL_EXPERIENCE_SNAPSHOT): string {
  const { hours, minutes, seconds } = getExperienceBreakdown(now);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getExperienceYears(now = INITIAL_EXPERIENCE_SNAPSHOT): number {
  return getExperienceBreakdown(now).decimalYears;
}
