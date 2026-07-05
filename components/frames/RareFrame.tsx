export default function RareFrame() {
  const sparks = [
    { top: "8%", left: "6%", size: 14, delay: "0s" },
    { top: "14%", left: "88%", size: 10, delay: "0.6s" },
    { top: "78%", left: "8%", size: 9, delay: "1.1s" },
    { top: "86%", left: "85%", size: 13, delay: "0.3s" },
    { top: "45%", left: "92%", size: 8, delay: "1.5s" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {sparks.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute neon-pulse text-pink-300"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          fill="currentColor"
        >
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
        </svg>
      ))}
    </div>
  );
}