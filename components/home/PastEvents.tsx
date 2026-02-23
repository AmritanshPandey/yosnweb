"use client"

import { Reveal } from "@/components/shared/Reveal"
import { motion } from "framer-motion"

const colors = [
  "bg-indigo-600/40",
  "bg-emerald-600/40",
  "bg-rose-600/40",
  "bg-amber-500/40",
  "bg-cyan-600/40",
  "bg-purple-600/40",
  "bg-pink-600/40",
  "bg-blue-600/40",
]

export function PastEvents() {
  return (
    <section className="py-28 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            PAST EVENTS
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {colors.map((color, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-lg ${color} flex items-center justify-center text-white font-medium`}
              >
                Event
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}