interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export function TabButton({
  active,
  onClick,
  icon,
  label,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40',
        active
          ? 'bg-white/[0.09] text-white border border-white/[0.1]'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]',
      ].join(' ')}
      aria-selected={active}
      role="tab"
    >
      {icon}
      {label}
    </button>
  );
}