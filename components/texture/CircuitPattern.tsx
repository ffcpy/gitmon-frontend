export default function CircuitPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
      <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 20 H15 M25 20 H40 M20 0 V15 M20 25 V40" stroke="#38bdf8" strokeWidth="1" fill="none" />
        <circle cx="20" cy="20" r="2" fill="#38bdf8" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}