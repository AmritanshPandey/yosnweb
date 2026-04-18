"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { ScrollDownIndicator } from "@/components/shared/ScrollDownIndicator"

// Seeded random generator for consistent but varied particles
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white page-fun">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/banners/banner.png"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoomHero_18s_linear_infinite]"
      >
        <source src="/assets/banners/banner.webm" type="video/webm" />
        <source src="/assets/banners/banner.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />
      <div className="absolute -left-12 top-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -right-12 bottom-14 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end justify-center pb-16 pt-20 sm:items-center sm:pb-20 sm:pt-24 md:pt-28">
        <div className="max-w-4xl w-full text-center sm:text-left">
          <motion.p 
            className="eyebrow-fun mb-4 text-[11px] sm:mb-4 sm:text-[10px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MUMBAI&apos;S LIVE ENTERTAINMENT STUDIO
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <h1 className="font-display text-[34vw] sm:text-[15vw] md:text-[18vw] leading-[0.82] sm:leading-[0.85] uppercase tracking-tight text-transparent bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text animate-pulse-glow">
              YOSN
            </h1>
            <motion.div
              className="absolute -inset-3 sm:-inset-8 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-transparent blur-3xl pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.p 
            className="body-fun mt-5 sm:mt-3 max-w-xl sm:mx-0 text-xl sm:text-base sm:mt-4 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We don&apos;t just host events. We create nights people never forget.
          </motion.p>

          <Button
            asChild
            size="lg"
            className="mt-8 border border-white/20 bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 text-xs uppercase tracking-widest text-black shadow-[0_8px_30px_rgba(49,212,255,0.28)] transition-all duration-300 hover:scale-[1.02] hover:from-fuchsia-300 hover:to-amber-200 sm:mt-10 sm:px-8 sm:text-sm"
          >
            <Link href="/events" className="inline-flex items-center gap-2">
              <span>UPCOMING SHOWS</span>
              <IconArrowRight size={16} stroke={2.2} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5" suppressHydrationWarning>
        {[...Array(8)].map((_, i) => {
          const seed = i * 12.9898
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
              suppressHydrationWarning
              initial={{
                x: `${seededRandom(seed) * 100}%`,
                y: "110vh",
                opacity: 0,
              }}
              animate={{
                y: "-20vh",
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6 + seededRandom(seed + 1) * 3,
                repeat: Infinity,
                delay: seededRandom(seed + 2) * 3.2,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      <ScrollDownIndicator />
    </section>
  )
}
