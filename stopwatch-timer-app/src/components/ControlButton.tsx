import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ControlButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-violet text-white shadow-glow-violet hover:bg-violet-light hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] active:bg-violet/80 border border-violet-glow/30',
  secondary:
    'bg-white/[0.06] text-text-secondary border border-white/[0.1] hover:bg-white/[0.1] hover:text-text-primary hover:border-white/[0.2] active:bg-white/[0.04]',
  danger:
    'bg-state-danger/10 text-state-danger border border-state-danger/30 hover:bg-state-danger/20 hover:shadow-[0_0_24px_rgba(239,68,68,0.3)] active:bg-state-danger/10',
  success:
    'bg-state-success/10 text-state-success border border-state-success/30 hover:bg-state-success/20 hover:shadow-[0_0_24px_rgba(34,197,94,0.35)] active:bg-state-success/10',
  ghost:
    'text-text-muted hover:text-text-primary hover:bg-white/[0.05] active:bg-white/[0.03]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-base rounded-2xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
};

export function ControlButton({
  onClick,
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  ariaLabel,
  className = '',
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-glow focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
        'active:scale-95 hover:-translate-y-0.5',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
