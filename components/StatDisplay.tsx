export default function StatDisplay({
  label,
  value,
  style,
  textClass = "text-white",
}: {
  label: string;
  value: number;
  style: "bars" | "dots" | "plain";
  textClass?: string;
}) {
  if (style === "dots") {
    const filled = Math.round(value / 20);
    return (
      <div className={`flex items-center justify-between text-[11px] ${textClass}`}>
        <span className="uppercase font-gamified opacity-90">{label}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < filled ? "bg-current" : "bg-current opacity-20"}`} />
          ))}
        </div>
      </div>
    );
  }

  if (style === "plain") {
    return (
      <div className={`flex items-center justify-between text-[11px] ${textClass}`}>
        <span className="uppercase font-gamified opacity-90">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-[11px] ${textClass}`}>
      <span className="w-14 uppercase font-gamified opacity-90">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-black/30 overflow-hidden">
        <div className="h-full rounded-full bg-current opacity-80" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="w-6 text-right opacity-90">{value}</span>
    </div>
  );
}