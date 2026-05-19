"use client"

import Image from "next/image"
import { IconMapPin } from "@tabler/icons-react"

type Props = {
  imageUrl: string
  eventName?: string
  cities?: string[]
  status?: string
}

export function SafeAreaPreview({
  imageUrl,
  eventName = "Event Title Preview",
  cities = ["Delhi", "Mumbai"],
  status = "On Sale",
}: Props) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
        Safe Area Preview — how it looks on event cards
      </p>

      {/* 4:5 card preview */}
      <div className="relative w-64 overflow-hidden rounded-xl border border-cyan-300/20 shadow-lg shadow-cyan-300/5">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Gradient overlay like production */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Status badge */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full border border-cyan-300/35 bg-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
              {status}
            </span>
          </div>

          {/* Bottom overlay — title + cities */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-white line-clamp-2">
              {eventName}
            </h3>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {cities.slice(0, 3).map((city) => (
                <span
                  key={city}
                  className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70"
                >
                  <IconMapPin size={9} />
                  {city}
                </span>
              ))}
              {cities.length > 3 && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                  +{cities.length - 3} more
                </span>
              )}
            </div>

            {/* Book button placeholder */}
            <div className="mt-3 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.18em] text-cyan-100">
              Book Tickets
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-amber-200/60">
        Check that text is readable and faces are not hidden.
      </p>
    </div>
  )
}
