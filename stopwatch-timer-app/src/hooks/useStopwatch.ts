import { useCallback, useEffect, useRef, useState } from "react";

export type StopwatchStatus = "idle" | "running" | "paused";

export interface UseStopwatchReturn {
  elapsedMs: number;
  status: StopwatchStatus;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useStopwatch(): UseStopwatchReturn {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [status, setStatus] = useState<StopwatchStatus>("idle");

  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const now = performance.now();
    setElapsedMs(accumulatedRef.current + (now - startTimeRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = performance.now();
    setStatus("running");
  }, []);

  const pause = useCallback(() => {
    accumulatedRef.current += performance.now() - startTimeRef.current;
    cancelAnimationFrame(rafRef.current);
    setStatus("paused");
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    accumulatedRef.current = 0;
    startTimeRef.current = 0;
    setElapsedMs(0);
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (status === "running") {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, tick]);

  return { elapsedMs, status, start, pause, reset };
}
