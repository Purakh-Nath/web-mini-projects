export interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function msToTimeParts(totalMs: number): TimeParts {
  const absMs = Math.max(0, totalMs);
  const hours = Math.floor(absMs / 3_600_000);
  const minutes = Math.floor((absMs % 3_600_000) / 60_000);
  const seconds = Math.floor((absMs % 60_000) / 1_000);
  const milliseconds = Math.floor((absMs % 1_000) / 10);
  return { hours, minutes, seconds, milliseconds };
}

export function formatTimeParts(parts: TimeParts): string {
  const { hours, minutes, seconds, milliseconds } = parts;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  const ms = String(milliseconds).padStart(2, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
}

export function timePartsToMs(
  hours: number,
  minutes: number,
  seconds: number,
): number {
  return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000;
}

export function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}