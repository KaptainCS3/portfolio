// Facts shown as numbers on screen. Every figure comes from here, never typed into a component.
// Source: the CV profile (job application/data/cv/profile.json).

/** First professional role (ProGuide, May 2023). */
export const CAREER_START = "2023-05"

export const BOOKING_MODULES = [
  "Flights",
  "Hotels",
  "Transfers",
  "Car rentals",
  "Airport lounge",
  "e-SIM",
  "Insurance",
  "Visa",
] as const

/** Company websites served by the shared email and lead service. */
export const EMAIL_SERVICE_SITES = 13

/** Whole years between a "YYYY-MM" start and today. */
export function yearsSince(start: string, now: Date = new Date()): number {
  const [y, m] = start.split("-").map(Number)
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m)
  return Math.max(0, Math.floor(months / 12))
}
