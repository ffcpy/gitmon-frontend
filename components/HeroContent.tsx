export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4">
      <div className="relative mb-2">
        <div className="absolute inset-0 blur-2xl bg-orange-400/40 rounded-full scale-110" />
        <img
          src="/logo.png"
          alt="GitMon"
          className="relative w-48 sm:w-72 md:w-96 object-contain"
        />
      </div>

      <p className="font-terminal text-lg sm:text-xl md:text-2xl text-slate-100/95 mt-1 tracking-wide">
        Transforme seu perfil GitHub em uma{" "}
        <span className="text-amber-300 font-bold">carta colecionável</span>
      </p>
    </div>
  );
}