import { useCallback, useEffect, useRef, useState } from "react";

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export interface UseTimerReturn {
  remainingMs: number;
  status: TimerStatus;
  start: (durationMs: number) => void;
  resume: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [remainingMs, setRemainingMs] = useState(0);
  const [status, setStatus] = useState<TimerStatus>("idle");

  const endTimeRef = useRef<number>(0);
  const remainingAtPauseRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const now = performance.now();
    const left = endTimeRef.current - now;
    if (left <= 0) {
      setRemainingMs(0);
      setStatus("completed");
      return;
    }
    setRemainingMs(left);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback((durationMs: number) => {
    cancelAnimationFrame(rafRef.current);
    endTimeRef.current = performance.now() + durationMs;
    remainingAtPauseRef.current = durationMs;
    setRemainingMs(durationMs);
    setStatus("running");
  }, []);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    remainingAtPauseRef.current = endTimeRef.current - performance.now();
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    endTimeRef.current = performance.now() + remainingAtPauseRef.current;
    setStatus("running");
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    endTimeRef.current = 0;
    remainingAtPauseRef.current = 0;
    setRemainingMs(0);
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (status === "running") {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, tick]);

  return { remainingMs, status, start, resume, pause, reset };
}
