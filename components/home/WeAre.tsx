"use client"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"

export function WeAre() {
  return (
    <section className="py-24 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">

        <Reveal>
          <h2 className="text-4xl font-bold mb-6">
            WE ARE YOSN INNOVATIONS
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-white/70 mb-8">
            Our vision is to create meaningful entertainment experiences.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Button>Learn More</Button>
        </Reveal>

      </div>
    </section>
  )
}