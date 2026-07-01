"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconMapPin, IconStar } from "@tabler/icons-react"
import { getAllEvents } from "@/lib/firebase/events"
import type { Event } from "@/types"
import { STATUS_LABELS, STATUS_COLORS, CATEGORY_LABELS } from "@/types"
import { Reveal } from "@/components/shared/Reveal"
import { SplitHeading } from "@/components/shared/SplitHeading"

// ─── Edit this array to control the photo gallery ───────────────────────────
// • Reorder entries to change which photo appears where
// • Set highlight: true to make that photo appear as a 2×2 big square
// • The grid has 4 columns. For a perfectly gap-free grid, the total number of
//   "cells" must be divisible by 4 (each highlight = 4 cells, each normal = 1).
//   With 6 highlights + 28 normal = 52 cells = 13 full rows. ✓
// ────────────────────────────────────────────────────────────────────────────
const GALLERY: { src: string; highlight?: true }[] = [
  { src: "/assets/events/38.png", highlight: true },
  { src: "/assets/events/event1.jpg", highlight: true },
  { src: "/assets/events/event3.jpg", highlight: true },
  { src: "/assets/events/event6.jpg", highlight: true },

  { src: "/assets/events/event32.jpg", highlight: true },
  { src: "/assets/events/event34.jpg", highlight: true },
  { src: "/assets/events/event8.jpg", highlight: true },

  { src: "/assets/events/event9.jpg", highlight: true },
  { src: "/assets/events/event20.jpg", highlight: true },
  { src: "/assets/events/event22.jpg", highlight: true },
  { src: "/assets/events/event23.jpg", highlight: true },
  { src: "/assets/events/event29.jpg", highlight: true },
  { src: "/assets/events/event2.jpg" },
  { src: "/assets/events/event4.jpg" },
  { src: "/assets/events/event7.jpg" },


  { src: "/assets/events/event10.jpg" },
  { src: "/assets/events/event11.jpg" },
  { src: "/assets/events/event12.jpg" },
  { src: "/assets/events/event13.jpg" },
  { src: "/assets/events/event14.jpg" },
  { src: "/assets/events/event15.jpg" },
  { src: "/assets/events/event17.jpg" },
  { src: "/assets/events/event18.jpg" },
  { src: "/assets/events/event19.jpg" },

  { src: "/assets/events/event24.jpg" },
  { src: "/assets/events/event25.jpg" },
  { src: "/assets/events/event26.jpg" },
  { src: "/assets/events/event27.jpg" },
  { src: "/assets/events/event28.jpg" },

  { src: "/assets/events/event30.jpg" },
  { src: "/assets/events/event31.jpg" },

]

// ────────────────────────────────────────────────────────────────────────────

function getTicketLink(event: Event) {
  return (
    event.cities?.find((c) => !c.soldOut)?.ticketLink ??
    event.cities?.[0]?.ticketLink ??
    ""
  )
}

function FeaturedCard({ event }: { event: Event }) {
  const ticketLink = getTicketLink(event)

  return (
    <div className="fun-card group relative overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-video w-full overflow-hidden">
        {event.heroImage ? (
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        ) : (
          <div className="h-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${STATUS_COLORS[event.status]}`}>
            {STATUS_LABELS[event.status]}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-200">
            <IconStar size={9} />
            Featured
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{CATEGORY_LABELS[event.category]}</p>
          <h3 className="font-display mt-1 text-3xl uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {event.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {event.cities?.slice(0, 3).map((city) => (
              <span key={city.name} className="flex items-center gap-1 text-xs text-white/60">
                <IconMapPin size={11} className="text-cyan-300" />
                {city.name}
              </span>
            ))}
            {event.cities?.length > 3 && (
              <span className="text-xs text-white/40">+{event.cities.length - 3} more cities</span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {ticketLink && (
              <Link
                href={ticketLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition-all hover:bg-cyan-300/20"
              >
                Book Tickets
              </Link>
            )}
            {event.ticketsFrom && (
              <span className="text-sm text-white/45">from {event.ticketsFrom}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RegularCard({ event }: { event: Event }) {
  const ticketLink = getTicketLink(event)

  return (
    <div className="fun-card group relative overflow-hidden rounded-xl border border-white/10">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {event.heroImage ? (
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${STATUS_COLORS[event.status]}`}>
            {STATUS_LABELS[event.status]}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl uppercase tracking-tight text-white line-clamp-2">
            {event.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {event.cities?.slice(0, 2).map((city) => (
              <span key={city.name} className="flex items-center gap-1 text-[10px] text-white/55">
                <IconMapPin size={9} className="text-cyan-300" />
                {city.name}
              </span>
            ))}
            {event.cities?.length > 2 && (
              <span className="text-[10px] text-white/35">+{event.cities.length - 2} more</span>
            )}
          </div>
          {ticketLink && (
            <Link
              href={ticketLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-md border border-cyan-300/30 bg-cyan-300/8 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100 transition-all hover:bg-cyan-300/15"
            >
              Book Tickets
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function EventSkeletons() {
  return (
    <div className="space-y-5">
      <div className="aspect-video w-full animate-pulse rounded-2xl bg-white/6" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    </div>
  )
}

export function PastEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getAllEvents()
      .then((data) => {
        data.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        setEvents(data)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  const featured = events.filter((e) => e.featured)
  const regular = events.filter((e) => !e.featured)
  const hasLiveEvents = loading || events.length > 0

  return (
    <section
      className="border-t border-white/10 bg-black py-16 text-white sm:py-24 md:py-32 page-fun"
      id="events"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">

        {/* ── Live upcoming events ── */}
        {hasLiveEvents && (
          <div>
            <Reveal>
              <SplitHeading
                text="UPCOMING EVENTS"
                className="heading-fun text-4xl sm:text-6xl md:text-8xl"
              />
              <p className="body-fun mt-3 mb-10">
                Book your spot before they sell out.
              </p>
            </Reveal>

            {loading ? (
              <EventSkeletons />
            ) : (
              <div className="space-y-5">
                {featured.map((event, i) => (
                  <Reveal key={event.id} delay={i * 0.06}>
                    <FeaturedCard event={event} />
                  </Reveal>
                ))}
                {regular.length > 0 && (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {regular.map((event, i) => (
                      <Reveal key={event.id} delay={i * 0.04}>
                        <RegularCard event={event} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Static past events photo gallery ── */}
        <div>
          <Reveal>
            <SplitHeading
              text="NIGHTS WE'VE PRODUCED"
              className="heading-fun text-4xl sm:text-6xl md:text-8xl"
            />
            <p className="body-fun mb-10 mt-3">
              More than 250 events. Thousands of memories. Every single one a full house.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-start [grid-auto-flow:dense]">
            {GALLERY.map((photo, i) => (
              <Reveal
                key={i}
                delay={Math.min(i * 0.02, 0.12)}
                className={photo.highlight ? "col-span-2" : "col-span-1"}
              >
                <div
                  className={`group relative overflow-hidden rounded-xl ${photo.highlight
                    ? "ring-1 ring-cyan-300/30 shadow-[0_0_28px_rgba(49,212,255,0.10)]"
                    : ""
                    }`}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={`YOSN event night ${i + 1}`}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      sizes={photo.highlight ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/0" />
                  {photo.highlight && (
                    <div className="absolute right-3 top-3">
                      <span className="flex items-center gap-1 rounded-full border border-cyan-300/30 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-200 backdrop-blur-sm">
                        <IconStar size={8} />
                        Highlight
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
