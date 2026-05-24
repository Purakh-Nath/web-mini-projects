import { useMemo } from "react";
import { msToTimeParts, padTwo } from "../utils/formatTime";

interface TimerDisplayProps {
  ms: number;
  isRunning: boolean;
  isCompleted?: boolean;
  accent?: "violet" | "cyan";
}

export function TimerDisplay({
  ms,
  isRunning,
  isCompleted = false,
  accent = "violet",
}: TimerDisplayProps) {
  const parts = useMemo(() => msToTimeParts(ms), [ms]);

  const glowClass = isCompleted
    ? "text-state-success drop-shadow-[0_0_24px_rgba(34,197,94,0.7)]"
    : accent === "cyan"
      ? "text-cyan-glow drop-shadow-[0_0_20px_rgba(103,232,249,0.5)]"
      : "text-violet-glow drop-shadow-[0_0_20px_rgba(167,139,250,0.5)]";

  const separatorClass = isCompleted
    ? "text-state-success/60"
    : accent === "cyan"
      ? "text-cyan-glow/50"
      : "text-violet-glow/50";

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className={`font-mono text-[clamp(3rem,12vw,5.5rem)] font-bold leading-none tracking-tight transition-all duration-500 ${glowClass} ${isRunning ? "animate-pulse-slow" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="inline-flex items-baseline gap-[0.08em]">
          <DigitGroup value={padTwo(parts.hours)} />
          <span
            className={`text-[0.55em] mb-1 ${separatorClass} transition-colors duration-300`}
          >
            :
          </span>
          <DigitGroup value={padTwo(parts.minutes)} />
          <span
            className={`text-[0.55em] mb-1 ${separatorClass} transition-colors duration-300`}
          >
            :
          </span>
          <DigitGroup value={padTwo(parts.seconds)} />
          <span
            className={`text-[0.4em] mb-0.5 ${separatorClass} transition-colors duration-300`}
          >
            .
          </span>
          <span
            className={`text-[0.55em] font-mono tabular-nums transition-colors duration-300 ${isCompleted ? "text-state-success/80" : accent === "cyan" ? "text-cyan-glow/70" : "text-violet-glow/70"}`}
          >
            {padTwo(parts.milliseconds)}
          </span>
        </span>
      </div>
    </div>
  );
}

function DigitGroup({ value }: { value: string }) {
  return <span className="tabular-nums inline-flex">{value}</span>;
}
