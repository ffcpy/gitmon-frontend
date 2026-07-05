export default function RankingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src="/gifranking1.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(10,12,20,0.25) 0%, rgba(10,12,20,0.6) 65%, rgba(10,12,20,0.82) 100%)",
        }}
      />
    </div>
  );
}