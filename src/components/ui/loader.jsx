"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.2, duration: 0.01 },
    },
  }),
};

export function Loader({ className, text = "Sending your card..." }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <motion.svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        initial="hidden"
        animate="visible"
        className="text-sunset-500"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          variants={draw}
          custom={0}
          className="opacity-30"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          variants={draw}
          custom={1}
          style={{ rotate: "90deg", transformOrigin: "center" }}
        />
      </motion.svg>
      <motion.div
        className="flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-sm font-serif text-parchment/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.03,
              duration: 0.3,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="w-48 h-0.5 bg-sunset-900/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-sunset-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}
