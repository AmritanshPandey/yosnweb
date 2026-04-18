"use client"

import { Reveal } from "@/components/shared/Reveal"

const events = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

export default function Page() {
  return (
    <section className="bg-black text-white py-24 sm:py-32 page-fun">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <Reveal>
          <div className="mb-12 sm:mb-16">
            <p className="eyebrow-fun mb-4 sm:mb-6">
              Our Portfolio
            </p>
            <h1 className="heading-fun text-5xl sm:text-6xl md:text-8xl">
              Past Events
            </h1>

            <p className="body-fun mt-3 max-w-2xl leading-relaxed">
              Over the years, YOSN Innovations has created unforgettable
              entertainment experiences across concerts, comedy tours,
              storytelling events, and brand activations.
            </p>
          </div>
        </Reveal>

        {/* Masonry Grid */}
        <div className="columns-2 gap-3 space-y-3 sm:gap-6 sm:space-y-6 md:columns-3 lg:columns-4">

          {events.map((event, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="fun-card relative overflow-hidden rounded-xl group break-inside-avoid">

                <img
                  src={event.src}
                  alt={`Event ${i + 1}`}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/0" />

              </div>
            </Reveal>
          ))}

        </div>

      </div>

    </section>
  )
}
