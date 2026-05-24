import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import { useTimer } from "../hooks/useTimer";
import { TimerDisplay } from "./TimerDisplay";
import { ControlButton } from "./ControlButton";
import { timePartsToMs, padTwo } from "../utils/formatTime";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

interface TimeInputProps {
  value: number;
  onChange: (v: number) => void;
  max: number;
  label: string;
  disabled: boolean;
}

function TimeInput({ value, onChange, max, label, disabled }: TimeInputProps) {
  const [localVal, setLocalVal] = useState(padTwo(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalVal(padTwo(value));
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    setLocalVal(raw);
  }

  function handleBlur() {
    const num = clamp(parseInt(localVal || "0", 10), 0, max);
    onChange(num);
    setLocalVal(padTwo(num));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = clamp(value + 1, 0, max);
      onChange(next);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = clamp(value - 1, 0, max);
      onChange(next);
    } else if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass-light flex items-center justify-center
          transition-all duration-200
          ${!disabled ? "hover:border-violet-glow/30 hover:bg-white/[0.07] cursor-text ring-0 focus-within:ring-2 focus-within:ring-violet-glow/50" : "opacity-50"}`}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={localVal}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="numeric-input w-full text-center text-[1.8rem] sm:text-[2rem] font-bold text-text-primary"
          maxLength={2}
          aria-label={label}
        />
      </div>
      <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
        {label}
      </span>
    </div>
  );
}

function CompletionOverlay() {
  return (
    <div
      className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 z-10
      bg-bg-surface/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative">
        <div className="absolute inset-0 blur-2xl bg-state-success/30 scale-150" />
        <CheckCircle className="relative w-16 h-16 text-state-success drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
      </div>
      <p className="text-state-success font-bold text-xl tracking-wide">
        Time's Up
      </p>
    </div>
  );
}

export function Timer() {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);

  const { remainingMs, status, start, resume, pause, reset } = useTimer();

  const isRunning = status === "running";
  const isPaused = status === "paused";
  const isCompleted = status === "completed";
  const isIdle = status === "idle";

  const totalDurationMs = timePartsToMs(inputHours, inputMinutes, inputSeconds);
  const configuredDurationMs = useRef(totalDurationMs);

  const progressPercent = isIdle
    ? 0
    : configuredDurationMs.current > 0
      ? Math.max(
          0,
          Math.min(100, (1 - remainingMs / configuredDurationMs.current) * 100),
        )
      : 0;

  const strokeDasharray = 2 * Math.PI * 54;
  const strokeDashoffset = strokeDasharray * (1 - progressPercent / 100);

  function handleStart() {
    const durationMs = timePartsToMs(inputHours, inputMinutes, inputSeconds);
    if (durationMs <= 0) return;
    configuredDurationMs.current = durationMs;
    start(durationMs);
  }

  function handleReset() {
    reset();
  }

  const inputsDisabled = !isIdle;
  const canStart = totalDurationMs > 0 && isIdle;

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Status badge */}
      <div className="flex items-center gap-2 h-7">
        {isRunning ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/25 text-cyan-light text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-light animate-pulse" />
            Counting Down
          </span>
        ) : isPaused ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-warning/10 border border-state-warning/25 text-state-warning text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-state-warning" />
            Paused
          </span>
        ) : isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-success/10 border border-state-success/25 text-state-success text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-state-success animate-pulse" />
            Complete
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-text-muted text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-text-muted/50" />
            Set Time
          </span>
        )}
      </div>

      {/* Time input (visible when idle) */}
      {isIdle && (
        <div className="flex items-end gap-2 sm:gap-4 animate-scale-in">
          <TimeInput
            value={inputHours}
            onChange={setInputHours}
            max={23}
            label="Hours"
            disabled={inputsDisabled}
          />
          <div className="pb-8 text-2xl font-bold text-text-muted/50 select-none">
            :
          </div>
          <TimeInput
            value={inputMinutes}
            onChange={setInputMinutes}
            max={59}
            label="Min"
            disabled={inputsDisabled}
          />
          <div className="pb-8 text-2xl font-bold text-text-muted/50 select-none">
            :
          </div>
          <TimeInput
            value={inputSeconds}
            onChange={setInputSeconds}
            max={59}
            label="Sec"
            disabled={inputsDisabled}
          />
        </div>
      )}

      {/* Countdown display (visible when running/paused/completed) */}
      {!isIdle && (
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 animate-scale-in">
          {/* SVG ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 120 120"
          >
            {/* Track */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="4"
            />
            {/* Progress */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={isCompleted ? "#22C55E" : "#22D3EE"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-150 ease-linear"
              style={{
                filter: isCompleted
                  ? "drop-shadow(0 0 8px rgba(34,197,94,0.7))"
                  : "drop-shadow(0 0 8px rgba(34,211,238,0.6))",
              }}
            />
          </svg>

          {/* Ambient glow */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700
              ${isCompleted ? "bg-state-success/10" : isRunning ? "bg-cyan/10" : "bg-state-warning/5"}`}
          />

          {/* Center content */}
          <div className="relative z-10">
            <TimerDisplay
              ms={remainingMs}
              isRunning={isRunning}
              isCompleted={isCompleted}
              accent="cyan"
            />
          </div>

          {/* Completion overlay */}
          {isCompleted && <CompletionOverlay />}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {isIdle ? (
          <ControlButton
            onClick={handleStart}
            variant="primary"
            size="lg"
            disabled={!canStart}
            ariaLabel="Start timer"
            className="bg-cyan border-cyan/40 shadow-glow-cyan hover:bg-cyan-light hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start</span>
          </ControlButton>
        ) : isRunning ? (
          <ControlButton
            onClick={pause}
            variant="secondary"
            size="lg"
            ariaLabel="Pause timer"
            className="border-state-warning/30 text-state-warning hover:border-state-warning/50 hover:bg-state-warning/10"
          >
            <Pause className="w-5 h-5 fill-current" />
            <span>Pause</span>
          </ControlButton>
        ) : isPaused ? (
          <ControlButton
            onClick={resume}
            variant="primary"
            size="lg"
            ariaLabel="Resume timer"
            className="bg-cyan border-cyan/40 shadow-glow-cyan hover:bg-cyan-light"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Resume</span>
          </ControlButton>
        ) : null}

        {!isIdle && (
          <ControlButton
            onClick={handleReset}
            variant="danger"
            size="lg"
            ariaLabel="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </ControlButton>
        )}
      </div>
    </div>
  );
}
