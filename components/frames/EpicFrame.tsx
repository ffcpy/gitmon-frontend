export default function EpicFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
      <svg className="absolute top-0 left-0 w-16 h-16 text-sky-400/80" viewBox="0 0 60 60" fill="none">
        <path d="M2 30 V10 L10 2 H30" stroke="currentColor" strokeWidth="2" />
        <path d="M2 20 L20 2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
      </svg>
      <svg className="absolute top-0 right-0 w-16 h-16 text-sky-400/80 rotate-90" viewBox="0 0 60 60" fill="none">
        <path d="M2 30 V10 L10 2 H30" stroke="currentColor" strokeWidth="2" />
        <path d="M2 20 L20 2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 text-sky-400/80 rotate-180" viewBox="0 0 60 60" fill="none">
        <path d="M2 30 V10 L10 2 H30" stroke="currentColor" strokeWidth="2" />
        <path d="M2 20 L20 2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-16 h-16 text-sky-400/80 -rotate-90" viewBox="0 0 60 60" fill="none">
        <path d="M2 30 V10 L10 2 H30" stroke="currentColor" strokeWidth="2" />
        <path d="M2 20 L20 2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
      </svg>
      <div className="epic-scanline" />
    </div>
  );
}