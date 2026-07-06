"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { isLoggedIn } from "@/lib/auth";
import { PLAY_MUSIC_EVENT } from "@/components/BackgroundMusic";

const SESSION_KEY = "gitmon_intro_seen";
const FADE_DURATION = 1.4;

const MESSAGE_GUEST =
  "Um forasteiro se aproxima dos portões de GitMon... seu destino de desenvolvedor aguarda para ser revelado.";

const MESSAGE_MEMBER =
  "Bem-vindo de volta à Guilda, viajante. Seus feitos continuam sendo registrados nos pergaminhos.";

type Phase = "hidden" | "entering" | "visible" | "rolling" | "fading";

export default function IntroScroll() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [message, setMessage] = useState(MESSAGE_GUEST);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadySeen) return;

    setMessage(isLoggedIn() ? MESSAGE_MEMBER : MESSAGE_GUEST);
    setPhase("entering");
    const timer = setTimeout(() => setPhase("visible"), 900);
    return () => clearTimeout(timer);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function dismiss() {
    if (phase !== "visible") return;
    window.dispatchEvent(new Event(PLAY_MUSIC_EVENT));
    setPhase("rolling");
    sessionStorage.setItem(SESSION_KEY, "true");
    setTimeout(() => setPhase("fading"), 450);
  }

  if (phase === "hidden") return null;

  const isRollingOrFading = phase === "rolling" || phase === "fading";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center cursor-pointer overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: phase === "fading" ? FADE_DURATION : 0.2, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (phase === "fading") setPhase("hidden");
      }}
      onClick={dismiss}
      onMouseMove={handleMouseMove}
      style={{ perspective: 900 }}
    >
      <img
        src="/gifintro1.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Partículas ambiente sutis, tipo poeira/brasa */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 9.3) % 100}%`,
              bottom: "-10px",
              width: 2,
              height: 2,
              background: "#fbbf24",
              boxShadow: "0 0 5px 1px rgba(251,191,36,0.6)",
              animation: `summon-rise ${4 + (i % 4) * 0.6}s linear infinite`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 mx-4 flex flex-col items-center"
      >
        {/* Haste superior */}
        <motion.div
          className="w-72 sm:w-80 h-4 rounded-full relative"
          style={{
            background: "linear-gradient(180deg, #8a5a2b 0%, #5c3a1a 50%, #3a2410 100%)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.6)",
            transform: "translateZ(20px)",
          }}
          initial={{ y: 0 }}
          animate={{ y: phase === "entering" ? 0 : isRollingOrFading ? 0 : -2 }}
          transition={{ duration: 0.3 }}
        >
          <span className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#5c3a1a]" />
          <span className="absolute -right-2 top-0 w-4 h-4 rounded-full bg-[#5c3a1a]" />
        </motion.div>

        {/* Corpo do pergaminho: desenrola verticalmente */}
        <motion.div
          className="w-72 sm:w-80 overflow-hidden px-8 py-8 text-center origin-top"
          style={{
            background: "linear-gradient(180deg, #e8d3a0 0%, #d8bd82 50%, #c9a968 100%)",
            border: "2px solid #6b4a26",
            borderTop: "none",
            borderBottom: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6), inset 0 0 30px rgba(107,74,38,0.25)",
            transform: "translateZ(10px)",
          }}
          initial={{ scaleY: 0.04, opacity: 0.6 }}
          animate={{
            scaleY: isRollingOrFading ? 0.04 : 1,
            opacity: 1,
          }}
          transition={{
            duration: isRollingOrFading ? 0.4 : 0.8,
            ease: isRollingOrFading ? "easeIn" : [0.16, 1, 0.3, 1],
          }}
        >
          <motion.p
            className="font-terminal text-lg sm:text-xl text-[#3a2a12] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "visible" ? 1 : 0 }}
            transition={{ duration: 0.5, delay: phase === "visible" ? 0.3 : 0 }}
          >
            {message}
          </motion.p>

          <motion.p
            className="font-terminal text-xs text-[#6b4a26] mt-6 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === "visible" ? [0.4, 1, 0.4] : 0,
            }}
            transition={{
              opacity: { duration: 1.8, repeat: Infinity, delay: 0.8 },
            }}
          >
            Toque para continuar
          </motion.p>
        </motion.div>

        {/* Haste inferior */}
        <motion.div
          className="w-72 sm:w-80 h-4 rounded-full relative"
          style={{
            background: "linear-gradient(180deg, #8a5a2b 0%, #5c3a1a 50%, #3a2410 100%)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.6)",
            transform: "translateZ(20px)",
          }}
          animate={{ y: isRollingOrFading ? 0 : 2 }}
          transition={{ duration: 0.3 }}
        >
          <span className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#5c3a1a]" />
          <span className="absolute -right-2 top-0 w-4 h-4 rounded-full bg-[#5c3a1a]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}   