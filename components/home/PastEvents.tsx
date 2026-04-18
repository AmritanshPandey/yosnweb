"use client"

import { Reveal } from "@/components/shared/Reveal"

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
        <Reveal>
          <h2 className="heading-fun text-4xl sm:text-6xl md:text-8xl">
            NIGHTS WE&apos;VE PRODUCED
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-fun mb-10 mt-3">
            34 events. Thousands of memories. Every single one a full house.
          </p>
        </Reveal>

        <div className="columns-2 gap-3 space-y-3 sm:gap-6 sm:space-y-6 md:columns-4">
          {events.map((event, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="fun-card group relative mb-6 break-inside-avoid overflow-hidden rounded-xl">
                <img
                  src={event.src}
                  alt={`Event ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
