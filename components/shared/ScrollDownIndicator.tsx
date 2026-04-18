"use client"

import { motion } from "framer-motion"

export function ScrollDownIndicator() {
  return (
    <motion.div
      className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-center gap-1 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }}
    >
      <span className="text-[9px] sm:text-xs text-white/60 tracking-widest mb-1 group-hover:text-cyan-200 transition">Scroll</span>
      <motion.span
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
          <path d="M12 5V19" stroke="#A5F3FC" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M18 13L12 19L6 13" stroke="#F0ABFC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.span>
    </motion.div>
  )
}
