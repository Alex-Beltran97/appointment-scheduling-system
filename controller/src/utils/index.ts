export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function parseTimeToDate(baseDate: Date, time: string): Date | null {
  if (!time || typeof time !== 'string' || !time.includes(':')) return null;

  const parts = cleanTimeString(time).split(':');
  if (parts.length < 2) return null;

  const [hh, mm, ss] = [
    Number(parts[0]),
    Number(parts[1]),
    parts[2] !== undefined ? Number(parts[2]) : 0,
  ];

  if ([hh, mm, ss].some((v) => Number.isNaN(v))) return null;

  const result = new Date(baseDate);
  result.setHours(hh, mm, ss, 0);
  return result;
};

function cleanTimeString(time: string): string {
  if (!time) return '';
  return time.split('-')[0];
}

export function normalizeDateToMidnight(dateInput: string | Date): Date {
  const d = new Date(dateInput);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
