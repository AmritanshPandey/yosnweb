"use client"

import { Reveal } from "@/components/shared/Reveal"

export function Clients() {
  return (
    <section className="py-28 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            CLIENTS
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1,2,3,4].map((_, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-16 bg-white/10 rounded-md hover:bg-white/20 transition duration-300" />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}