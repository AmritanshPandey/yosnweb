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
    <section className="border-t border-white/10 bg-[#080808] py-16 text-white sm:py-24 md:py-32 page-fun">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2 className="heading-fun text-3xl sm:text-5xl md:text-7xl">
            BRANDS THAT TRUST YOSN
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-fun mb-10 mt-3 max-w-2xl">
            We partner with brands who know live experiences are the most
            powerful marketing there is.
          </p>
        </Reveal>

        <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 md:grid-cols-3">
          {logos.map((logo, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="fun-card flex h-32 items-center justify-center rounded-xl bg-black p-8 sm:h-40 sm:p-10 md:h-44">
                <img
                  src={logo}
                  alt={`Client ${i + 1}`}
                  className="max-h-20 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
