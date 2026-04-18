"use client"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { motion } from "framer-motion"

export function Biz() {
  return (
    <section className="relative py-16 bg-black border-t border-white/10 text-white overflow-hidden sm:py-24 md:py-32">

      {/* Background layer (replace with image later) */}
      <motion.div
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 6 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-black"
      />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-3xl text-center">

        <Reveal>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl md:text-7xl">
            BIZ AT YOSN INNOVATIONS
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-sm tracking-wide text-white/50 mt-4 sm:mt-6">
            Partner with us to create high-impact brand experiences that resonate.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Button size="lg" className="mt-8 rounded-none border border-white/20 bg-white px-6 text-xs uppercase tracking-widest text-black transition-all duration-300 hover:border-white hover:bg-transparent hover:text-white sm:mt-10 sm:px-8 sm:text-sm">Partner With Us</Button>
        </Reveal>

      </div>
    </section>
  )
}