import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export default function PixelPanel({ children, className = "", accent = false }: Props) {
  return (
    <div
      className={`relative bg-slate-950/50 backdrop-blur-md border-2 ${
        accent ? "border-orange-400/40" : "border-slate-400/20"
      } shadow-lg ${className}`}
      style={{
        clipPath:
          "polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))",
      }}
    >
      {children}
    </div>
  );
}