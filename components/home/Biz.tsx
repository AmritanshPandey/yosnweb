"use client"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { motion } from "framer-motion"

export function Biz() {
  return (
    <section className="relative py-28 bg-black border-white/10 text-white overflow-hidden">

      {/* Background layer (replace with image later) */}
      <motion.div
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 6 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-black"
      />

      <div className="relative container mx-auto px-6 max-w-3xl text-center">

        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            BIZ AT YOSN INNOVATIONS
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-white/70 mb-8">
            Partner with us to create high-impact brand experiences that resonate.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Button size="lg">Partner With Us</Button>
        </Reveal>

      </div>
    </section>
  )
}