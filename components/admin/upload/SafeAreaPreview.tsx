"use client"

import Image from "next/image"
import { IconMapPin } from "@tabler/icons-react"
import type { ImageDisplay } from "./ImageCropper"

type Props = {
  imageUrl: string
  eventName?: string
  cities?: string[]
  status?: string
  display?: ImageDisplay
}

export function SafeAreaPreview({
  imageUrl,
  eventName = "Event Title Preview",
  cities = ["Delhi", "Mumbai"],
  status = "On Sale",
  display = { fit: "cover" },
}: Props) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
        Preview — how it looks on the events page
      </p>

      {/* 16:9 hero card preview — matches the event page hero container */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/15 shadow-lg">
        <div className="relative aspect-video w-full">
          {display.fit === "contain" ? (
            <>
              {display.bg === "blur" ? (
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  aria-hidden
                  unoptimized
                  className="object-cover scale-110 blur-2xl brightness-[0.35]"
                />
              ) : (
                <div className={`absolute inset-0 ${display.bg === "dark" ? "bg-[#111]" : "bg-black"}`} />
              )}
              <Image src={imageUrl} alt="Preview" fill unoptimized className="object-contain" />
            </>
          ) : (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-cyan-300/35 bg-black/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
              {status}
            </span>
            {cities.slice(0, 2).map((city) => (
              <span
                key={city}
                className="flex items-center gap-1 rounded-full border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] text-white/70"
              >
                <IconMapPin size={8} />
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Info bar below image */}
        <div className="bg-black/90 px-4 py-3">
          <p className="font-display text-lg uppercase leading-tight tracking-tight text-white line-clamp-1">
            {eventName}
          </p>
        </div>
      </div>

      <p className="text-[10px] text-amber-200/60">
        Make sure the subject is centred and visible — the bottom third may be covered by text overlays.
      </p>
    </div>
  )
}
