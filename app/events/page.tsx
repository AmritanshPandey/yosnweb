"use client"

import { Reveal } from "@/components/shared/Reveal"

const events = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

export default function Page() {
  return (
    <section className="bg-black text-white py-32">

      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <Reveal>
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Past Events
            </h1>

            <p className="text-white/60 text-lg leading-relaxed">
              Over the years, YOSN Innovations has created unforgettable
              entertainment experiences across concerts, comedy tours,
              storytelling events, and brand activations.  
              Here’s a glimpse of some of the moments we’ve brought to life.
            </p>
          </div>
        </Reveal>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">

          {events.map((event, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="relative overflow-hidden rounded-xl group break-inside-avoid border border-white/10">

                <img
                  src={event.src}
                  alt={`Event ${i + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />

              </div>
            </Reveal>
          ))}

        </div>

      </div>

    </section>
  )
}