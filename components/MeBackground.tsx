export default function MeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src="/gifme1.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(10,12,20,0.2) 0%, rgba(10,12,20,0.55) 65%, rgba(10,12,20,0.8) 100%)",
        }}
      />
    </div>
  );
}