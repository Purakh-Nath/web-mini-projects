export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0d1425] to-slate-950" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Orb 1 — violet */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          animationDelay: '0s',
        }}
      />

      {/* Orb 2 — cyan */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />

      {/* Orb 3 — pink accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
        }}
      />
    </div>
  )
}