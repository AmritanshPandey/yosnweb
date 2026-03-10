"use client"

import { Reveal } from "@/components/shared/Reveal"

const logos = [
  "/assets/logos/am.png",
  "/assets/logos/b.png",
  "/assets/logos/k.png",
  "/assets/logos/p.png",
  "/assets/logos/r.png",
  "/assets/logos/m.jpg",
]

export function Clients() {
  return (
    <section className="py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">
            CLIENTS
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {logos.map((logo, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-white rounded-2xl h-40 md:h-44 flex items-center justify-center p-10 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">

                <img
                  src={logo}
                  alt={`Client ${i + 1}`}
                  className="max-h-20 w-auto object-contain"
                />

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}