import { InputHTMLAttributes } from "react";

export default function PixelInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`px-4 py-3 bg-slate-950/50 backdrop-blur-md text-slate-100 font-terminal text-lg border-2 border-slate-400/20 focus:outline-none focus:border-orange-400/60 placeholder:text-slate-400 shadow-lg ${className}`}
      style={{
        clipPath:
          "polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))",
      }}
      {...props}
    />
  );
}