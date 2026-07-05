export default function MythicFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
      <div className="mythic-aurora" />
      <svg className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-7 text-yellow-300/90 z-10" viewBox="0 0 110 28" fill="none">
        <path d="M55 3 L60 12 L70 14 L60 16 L55 25 L50 16 L40 14 L50 12 Z" fill="currentColor" />
        <path d="M8 14 H36 M74 14 H102" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}