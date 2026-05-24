import { Play, Pause, RotateCcw } from "lucide-react";
import { useStopwatch } from "../hooks/useStopwatch";
import { TimerDisplay } from "./TimerDisplay";
import { ControlButton } from "./ControlButton";

export function Stopwatch() {
  const { elapsedMs, status, start, pause, reset } = useStopwatch();

  const isRunning = status === "running";
  const hasStarted = status !== "idle" || elapsedMs > 0;

  return (
    <div className="flex flex-col items-center gap-10 animate-fade-in">
      {/* Status badge */}
      <div className="flex items-center gap-2 h-7">
        {isRunning ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-success/10 border border-state-success/25 text-state-success text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-state-success animate-pulse" />
            Running
          </span>
        ) : status === "paused" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-warning/10 border border-state-warning/25 text-state-warning text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-state-warning" />
            Paused
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-text-muted text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-text-muted/50" />
            Ready
          </span>
        )}
      </div>

      {/* Time display */}
      <div className="relative flex items-center justify-center">
        {/* Ambient glow ring */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 pointer-events-none
            ${isRunning ? "bg-violet/15 scale-150 opacity-100" : "bg-violet/5 scale-100 opacity-50"}`}
        />
        <TimerDisplay ms={elapsedMs} isRunning={isRunning} accent="violet" />
      </div>

      {/* Progress stripe */}
      <div className="w-full max-w-xs h-px relative overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-white/[0.06]" />
        {isRunning && (
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-violet-glow rounded-full"
            style={{
              width: `${Math.min(100, (elapsedMs / 60000) * 100)}%`,
              transition: "width 0.1s linear",
            }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!isRunning ? (
          <ControlButton
            onClick={start}
            variant="primary"
            size="lg"
            ariaLabel="Start stopwatch"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{hasStarted ? "Resume" : "Start"}</span>
          </ControlButton>
        ) : (
          <ControlButton
            onClick={pause}
            variant="secondary"
            size="lg"
            ariaLabel="Pause stopwatch"
            className="border-state-warning/30 text-state-warning hover:border-state-warning/50 hover:bg-state-warning/10"
          >
            <Pause className="w-5 h-5 fill-current" />
            <span>Pause</span>
          </ControlButton>
        )}
        <ControlButton
          onClick={reset}
          variant="danger"
          size="lg"
          disabled={!hasStarted}
          ariaLabel="Reset stopwatch"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </ControlButton>
      </div>
    </div>
  );
}
