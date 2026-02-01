"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center z-50">
      <div className="relative w-48 h-[1px] bg-white/10 overflow-hidden">
        {/* Animated Gold Progress Bar */}
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
          Kibali Educational Centre
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059]/60 italic">
          Preserving Excellence
        </span>
      </motion.div>
    </div>
  );
}
