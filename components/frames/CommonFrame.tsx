function CornerOrnament({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute w-8 h-8 text-amber-900/70 ${className}`} fill="none">
      <path d="M2 38 V14 Q2 2 14 2 H38" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 38 V18 Q8 8 18 8 H38" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function CommonFrame() {
  return (
    <div className="absolute inset-1 pointer-events-none z-10">
      <CornerOrnament className="top-0 left-0" />
      <CornerOrnament className="top-0 right-0 rotate-90" />
      <CornerOrnament className="bottom-0 right-0 rotate-180" />
      <CornerOrnament className="bottom-0 left-0 -rotate-90" />
    </div>
  );
}