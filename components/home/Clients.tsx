"use client"

import Image from "next/image"
import { Reveal } from "@/components/shared/Reveal"
import { SplitHeading } from "@/components/shared/SplitHeading"

const logos = [
  { src: "/assets/logos/am.png", alt: "YOSN brand partner logo" },
  { src: "/assets/logos/b.png", alt: "YOSN brand partner logo" },
  { src: "/assets/logos/k.png", alt: "YOSN brand partner logo" },
  { src: "/assets/logos/p.png", alt: "YOSN brand partner logo" },
  { src: "/assets/logos/r.png", alt: "YOSN brand partner logo" },
  { src: "/assets/logos/m.jpg", alt: "YOSN brand partner logo" },
]

export function Clients() {
  return (
    <section className="border-t border-white/10 bg-[#080808] py-16 text-white sm:py-24 md:py-32 page-fun">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SplitHeading
          text="BRANDS THAT TRUST YOSN"
          className="heading-fun text-3xl sm:text-5xl md:text-7xl"
        />

        <Reveal delay={0.1}>
          <p className="body-fun mb-10 mt-3 max-w-2xl">
            We partner with brands who know live experiences are the most
            powerful marketing there is.
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 md:grid-cols-3">
          {logos.map((logo, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-32 items-center justify-center rounded-xl border border-white/20 bg-white p-8 transition-all duration-300 hover:border-cyan-300/40 hover:shadow-[0_16px_42px_rgba(49,212,255,0.18),0_8px_28px_rgba(255,79,216,0.12)] sm:h-40 sm:p-10 md:h-44">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="max-h-20 w-auto object-contain opacity-100 transition-all duration-300 hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
