"use client"

import Image from "next/image"
import { Reveal } from "@/components/shared/Reveal"
import { SplitHeading } from "@/components/shared/SplitHeading"

const events = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

export function PastEvents() {
  return (
    <section
      className="border-t border-white/10 bg-black py-16 text-white sm:py-24 md:py-32 page-fun"
      id="events"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SplitHeading
          text="NIGHTS WE'VE PRODUCED"
          className="heading-fun text-4xl sm:text-6xl md:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="body-fun mb-10 mt-3">
            34 events. Thousands of memories. Every single one a full house.
          </p>
        </Reveal>

        <div className="columns-2 gap-3 space-y-3 sm:gap-6 sm:space-y-6 md:columns-4">
          {events.map((event, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.18)}>
              <div className="fun-card group relative mb-6 break-inside-avoid overflow-hidden rounded-xl">
                <Image
                  src={event.src}
                  alt={`YOSN event night ${i + 1}`}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/0" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
