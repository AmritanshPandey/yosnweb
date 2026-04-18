"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { IconMapPin } from "@tabler/icons-react"

import { Reveal } from "@/components/shared/Reveal"
import GlobeDemo from "@/components/globe-demo"
import { cn } from "@/lib/utils"

const managedLocations = [
  {
    city: "London",
    country: "UK",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    city: "Manchester",
    country: "UK",
    lat: 53.4808,
    lng: -2.2426,
  },
  {
    city: "Birmingham",
    country: "UK",
    lat: 52.4862,
    lng: -1.8904,
  },
    {
    city: "Dublin",
    country: "Ireland",
    lat: 53.3498,
    lng: -6.2603,
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    city: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    city: "Mumbai",
    country: "India",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    city: "Delhi",
    country: "India",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    city: "Bangalore",
    country: "India",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    city: "Hyderabad",
    country: "India",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    city: "Nagpur",
    country: "India",
    lat: 21.1458,
    lng: 79.0882,
  },
  {
    city: "Ahmedabad",
    country: "India",
    lat: 23.0225,
    lng: 72.5714,
  },
  {
    city: "Chennai",
    country: "India",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    city: "Chandigarh",
    country: "India",
    lat: 30.7333,
    lng: 76.7794,
  },
  {
    city: "Pune",
    country: "India",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    city: "Surat",
    country: "India",
    lat: 21.1702,
    lng: 72.8311,
  },

]

export function ManagedLocations() {
  const [activeCity, setActiveCity] = useState(managedLocations[0].city);

  const activeLocation =
    managedLocations.find((location) => location.city === activeCity) ??
    managedLocations[0];

  return (
    <section className="overflow-hidden border-t border-white/10 bg-black py-14 text-white sm:py-20 md:py-24 page-fun relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="absolute inset-x-0 top-10 h-64 bg-[radial-gradient(circle_at_center,_rgba(49,212,255,0.16),_transparent_55%)] blur-3xl" />

        <div className="relative">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 border border-fuchsia-300/30 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-fuchsia-100/70">
                <IconMapPin size={14} className="text-fuchsia-200/90" />
                On The Road With YOSN
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="heading-fun mt-5 max-w-4xl text-3xl sm:text-5xl md:text-7xl">
                From Mumbai to London,
                <span className="block bg-gradient-to-r from-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
                  YOSN knows how to fill a room.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="body-fun mt-3 max-w-xl">
                Covering major cities across India with international stops in the UK and Dubai.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8 xl:gap-10 items-start">

            <div>
              <Reveal delay={0.3}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 sm:gap-3">
                  {managedLocations.map((location) => {
                    const isActive = location.city === activeCity

                    return (
                      <button
                        key={location.city}
                        type="button"
                        onMouseEnter={() => setActiveCity(location.city)}
                        onFocus={() => setActiveCity(location.city)}
                        onClick={() => setActiveCity(location.city)}
                        className={cn(
                          "group border px-3 py-2 text-left transition-all duration-300 sm:px-4 sm:py-2.5",
                          isActive
                            ? "border-cyan-200 bg-gradient-to-r from-cyan-300 to-fuchsia-300 text-black"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:text-cyan-100",
                        )}
                      >
                        <span className="font-display text-base uppercase tracking-wide sm:text-lg md:text-xl">
                          {location.city}
                        </span>
                        <span
                          className={cn(
                            "ml-1.5 text-[9px] uppercase tracking-[0.2em] sm:ml-2 sm:text-[10px] sm:tracking-[0.22em]",
                            isActive
                              ? "text-black/65"
                              : "text-white/45 group-hover:text-black/55",
                          )}
                        >
                          {location.country}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="fun-card relative overflow-hidden p-3 sm:p-4 md:p-5">
                <motion.div
                  className="absolute left-3 top-3 z-10 border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-sm sm:left-5 sm:top-5 sm:px-3.5 sm:py-1.5"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Now Circling
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    {activeLocation.city}
                  </p>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-3 z-10 border border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-sm sm:bottom-6 sm:right-5 sm:px-4 sm:py-3"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    City Count
                  </p>
                  <p className="mt-1 font-display text-4xl uppercase tracking-tight text-white">
                    {managedLocations.length}
                  </p>
                </motion.div>

                <div className="bg-background relative flex size-full min-h-[320px] items-center justify-center overflow-hidden rounded-xl border border-white/10 px-6 pt-7 pb-24 sm:min-h-[380px] sm:px-10 sm:pt-8 sm:pb-28 md:min-h-[430px] md:pb-32">

                  <GlobeDemo
                    className="inset-0 z-[1] scale-[1.05]"
                    cities={managedLocations.map((location) => ({
                      city: location.city,
                      lat: location.lat,
                      lng: location.lng,
                    }))}
                    initialPosition={{ lat: activeLocation.lat, lng: activeLocation.lng }}
                  />
                  <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_170%,rgba(49,212,255,0.14),rgba(255,255,255,0))]" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
