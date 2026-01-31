export const HOUR_MS = 60 * 60 * 1000

export function hoursToMs(hours: number): number {
  return Math.max(0, hours) * HOUR_MS
}
