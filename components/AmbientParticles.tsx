"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export default function AmbientParticles({
  color,
  count = 30,
}: {
  color: string;
  count?: number;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 6,
        drift: Math.random() * 40 - 20,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
          animate={{
            y: "-95vh",            // unidade de viewport: não depende de window
            x: [0, p.drift],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}