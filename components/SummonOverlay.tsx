"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Consultando os registros da Guilda...",
  "Invocando desenvolvedor...",
  "Traduzindo commits em poder...",
];

export default function SummonOverlay({ username }: { username: string }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 5.4) % 100}%`,
              bottom: "-10px",
              width: 3,
              height: 3,
              background: "#fbbf24",
              boxShadow: "0 0 6px 2px rgba(251,191,36,0.7)",
              animation: `summon-rise ${3 + (i % 5) * 0.4}s linear infinite`,
              animationDelay: `${(i % 6) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.28) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          className="relative w-40 h-56 border-2 border-amber-300/60 bg-slate-950/70"
          style={{
            clipPath:
              "polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))",
            boxShadow: "0 0 40px rgba(251,191,36,0.4)",
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: [40, -6, 0],
            opacity: 1,
            rotateY: [0, 360],
          }}
          transition={{
            y: { duration: 0.9, ease: "easeOut" },
            opacity: { duration: 0.5 },
            rotateY: { duration: 1.6, delay: 0.6, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logo.png"
              alt=""
              className="w-16 h-16 object-contain opacity-80"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-terminal text-lg sm:text-xl text-amber-200 tracking-wide text-center px-4"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <p className="font-terminal text-sm text-slate-400">@{username}</p>
      </div>
    </motion.div>
  );
}