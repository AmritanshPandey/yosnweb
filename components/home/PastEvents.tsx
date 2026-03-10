"use client"

import { Reveal } from "@/components/shared/Reveal"

const events = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

export function PastEvents() {
  return (
    <section className="py-24 bg-black text-white" id="events">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl font-bold mb-12">
            PAST EVENTS
          </h2>
        </Reveal>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-6 space-y-6">

          {events.map((event, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="relative overflow-hidden rounded-xl group mb-6 break-inside-avoid border border-white/10">

                <img
                  src={event.src}
                  alt={`Event ${i + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />

              </div>
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  )
}