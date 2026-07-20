/** Career start — July 2021 */
export const CAREER_START = new Date(2021, 6, 1); // month is 0-indexed → July

export interface ExperienceBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMonths: number;
  /** e.g. "5 Years 1 Month" */
  label: string;
  /** e.g. "5 Years 1 Month 19 Days" */
  detailedLabel: string;
  /** decimal years for charts, e.g. 5.1 */
  decimalYears: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function getExperienceBreakdown(now = new Date()): ExperienceBreakdown {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  let months = now.getMonth() - CAREER_START.getMonth();
  let days = now.getDate() - CAREER_START.getDate();
  let hours = now.getHours() - CAREER_START.getHours();
  let minutes = now.getMinutes() - CAREER_START.getMinutes();
  let seconds = now.getSeconds() - CAREER_START.getSeconds();

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
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
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
  };
}

/** e.g. "5 Years 1 Month" */
export function getExperienceLabel(now = new Date()): string {
  return getExperienceBreakdown(now).label;
}

/** Shorter badge text e.g. "5y 1m" */
export function getExperienceShort(now = new Date()): string {
  const { years, months } = getExperienceBreakdown(now);
  return `${years}y ${months}m`;
}

/** Decimal years for numeric stats */
export function getExperienceValue(now = new Date()): number {
  return getExperienceBreakdown(now).decimalYears;
}

/** Live clock string HH:MM:SS for the experience ticker */
export function getExperienceClock(now = new Date()): string {
  const { hours, minutes, seconds } = getExperienceBreakdown(now);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getExperienceYears(now = new Date()): number {
  return getExperienceBreakdown(now).decimalYears;
}
