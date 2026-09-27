// City dates are stored as display text ("Sat, 24 Oct 2026") because that's
// what the public site shows. These helpers convert between that text and the
// "YYYY-MM-DD" value a native date input uses.

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** Parses "Sat, 24 Oct 2026" (weekday optional). Returns null if there's no full day/month/year. */
export function parseEventDate(text: string): Date | null {
  const match = /(\d{1,2})\s+([A-Za-z]{3})[A-Za-z]*\.?,?\s+(\d{4})/.exec(text)
  if (!match) return null
  const month = MONTHS.findIndex((m) => m.toLowerCase() === match[2].toLowerCase())
  if (month === -1) return null
  const date = new Date(Number(match[3]), month, Number(match[1]))
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatEventDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/** "Sat, 24 Oct 2026" → "2026-10-24" for <input type="date">; "" if unparseable. */
export function toDateInputValue(text: string): string {
  const date = parseEventDate(text)
  if (!date) return ""
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${mm}-${dd}`
}

/** "2026-10-24" from <input type="date"> → "Sat, 24 Oct 2026". */
export function fromDateInputValue(value: string): string {
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return ""
  return formatEventDate(new Date(y, m - 1, d))
}

export function isPast(date: Date, now = new Date()): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return date < today
}
