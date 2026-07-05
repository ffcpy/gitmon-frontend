export default function CardPageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-grid">
      <img
        src="/gifranking1.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,12,20,0.35) 0%, rgba(10,12,20,0.75) 70%, rgba(10,12,20,0.9) 100%)",
        }}
      />
    </div>
  );
}