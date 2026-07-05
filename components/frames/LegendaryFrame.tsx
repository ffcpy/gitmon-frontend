export default function LegendaryFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
      <div className="absolute inset-2 rounded-xl border border-amber-400/40" />
      <div className="absolute inset-3 rounded-lg border border-amber-300/20" />
      <svg className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-6 text-amber-400/90" viewBox="0 0 100 24" fill="none">
        <path d="M10 12 H38 M62 12 H90" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 4 L56 12 L50 20 L44 12 Z" fill="currentColor" />
        <circle cx="30" cy="12" r="2" fill="currentColor" />
        <circle cx="70" cy="12" r="2" fill="currentColor" />
      </svg>
      <div className="legendary-sweep" />
    </div>
  );
}