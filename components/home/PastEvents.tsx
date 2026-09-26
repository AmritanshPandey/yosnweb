"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconArrowUpRight, IconStar } from "@tabler/icons-react"
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

const MOBILE_GALLERY_LIMIT = 8

function getTicketLink(event: Event) {
  return (
    event.cities?.find((c) => !c.soldOut)?.ticketLink ??
    event.cities?.[0]?.ticketLink ??
    ""
  )
}

// Renders an event's hero image either filling the frame ("cover", the
// default — crops as needed) or letterboxed over a live blurred/dark/black
// backdrop ("contain"), matching exactly what the admin upload preview shows.
function EventHeroImage({ event, sizes }: { event: Event; sizes: string }) {
  if (!event.heroImage) return <div className="h-full bg-white/5" />

  if (event.heroImageFit === "contain") {
    return (
      <>
        {event.heroImageBg === "dark" || event.heroImageBg === "black" ? (
          <div className={`absolute inset-0 ${event.heroImageBg === "dark" ? "bg-[#111]" : "bg-black"}`} />
        ) : (
          <Image
            src={event.heroImage}
            alt=""
            fill
            aria-hidden
            className="object-cover scale-110 blur-2xl brightness-[0.35]"
            sizes={sizes}
          />
        )}
        <Image src={event.heroImage} alt={event.name} fill className="object-contain" sizes={sizes} />
      </>
    )
  }

  return (
    <Image
      src={event.heroImage}
      alt={event.name}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes={sizes}
    />
  )
}

// Event cards are ticket stubs: the flyer/photo sits untouched on top (flyers
// already carry their own artwork and text, so nothing is laid over them),
// then a perforated tear line, then the stub with the details.
const TICKET_SHELL =
  "group relative rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_-18px_rgba(49,212,255,0.45),0_14px_36px_-22px_rgba(255,79,216,0.5)]"
const TICKET_EDGE =
  "border-white/10 bg-[#0a0a0d] transition-colors duration-300 group-hover:border-cyan-300/45"

function StatusBadge({ event }: { event: Event }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm ${STATUS_COLORS[event.status]}`}
    >
      {STATUS_LABELS[event.status]}
    </span>
  )
}

function TearLine() {
  return <div aria-hidden className="absolute inset-x-5 top-0 border-t border-dashed border-white/20" />
}

function FeaturedCard({ event }: { event: Event }) {
  const ticketLink = getTicketLink(event)
  const cities = event.cities ?? []

  return (
    <article className={TICKET_SHELL}>
      <div className={`ticket-notch-bottom relative aspect-video overflow-hidden rounded-t-2xl border-x border-t ${TICKET_EDGE}`}>
        <EventHeroImage event={event} sizes="(max-width: 768px) 100vw, 80vw" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <StatusBadge event={event} />
          <span className="flex items-center gap-1.5 rounded-full border border-amber-300/45 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200 backdrop-blur-sm">
            <IconStar size={10} />
            Featured
          </span>
        </div>
      </div>

      <div className={`ticket-notch-top relative grid gap-6 rounded-b-2xl border-x border-b px-5 py-6 sm:px-8 sm:py-7 md:grid-cols-[1fr_auto] md:items-end ${TICKET_EDGE}`}>
        <TearLine />
        <div className="min-w-0">
          <p className="eyebrow-fun">
            {CATEGORY_LABELS[event.category]}
            {event.duration && <span className="text-white/35"> · {event.duration}</span>}
          </p>
          <h3 className="mt-2 font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
            {event.name}
          </h3>
          {cities.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs uppercase tracking-[0.12em]">
              {cities.slice(0, 4).map((city) => (
                <li key={city.name} className={city.soldOut ? "text-white/35 line-through" : "text-white/75"}>
                  {city.name}
                  {city.date && <span className="ml-2 text-white/40">{city.date}</span>}
                </li>
              ))}
              {cities.length > 4 && <li className="text-white/40">+{cities.length - 4} more</li>}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
          {event.ticketsFrom && (
            <p className="whitespace-nowrap font-mono md:text-right">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/40">From</span>
              <span className="text-lg text-white">{event.ticketsFrom}</span>
            </p>
          )}
          {ticketLink && (
            <Link
              href={ticketLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-cyan-300 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.18em] transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-[0_0_28px_rgba(49,212,255,0.6)]"
            >
              Book tickets
              <IconArrowUpRight size={15} stroke={2.2} />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

function RegularCard({ event }: { event: Event }) {
  const ticketLink = getTicketLink(event)
  const firstCity = event.cities?.[0]
  const moreCities = (event.cities?.length ?? 0) - 1

  return (
    <article className={`${TICKET_SHELL} flex h-full flex-col`}>
      <div className={`ticket-notch-bottom relative aspect-[4/3] overflow-hidden rounded-t-2xl border-x border-t ${TICKET_EDGE}`}>
        <EventHeroImage
          event={event}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadge event={event} />
        </div>
      </div>

      <div className={`ticket-notch-top relative flex flex-1 flex-col rounded-b-2xl border-x border-b px-5 pb-5 pt-5 ${TICKET_EDGE}`}>
        <TearLine />
        {firstCity && (
          <p className="eyebrow-fun">
            {firstCity.name}
            {firstCity.date && <span className="text-white/35"> · {firstCity.date}</span>}
            {moreCities > 0 && <span className="text-white/35"> · +{moreCities}</span>}
          </p>
        )}
        <h3 className="mt-2 line-clamp-2 font-display text-2xl uppercase leading-none tracking-tight text-white sm:text-3xl">
          {event.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          {event.ticketsFrom ? (
            <p className="whitespace-nowrap font-mono">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/40">From</span>
              <span className="text-sm text-white">{event.ticketsFrom}</span>
            </p>
          ) : (
            <span />
          )}
          {ticketLink && (
            <Link
              href={ticketLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-cyan-300/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100 transition-[background-color,color,box-shadow] duration-300 hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_22px_rgba(49,212,255,0.5)]"
            >
              Book tickets
              <IconArrowUpRight size={13} stroke={2.2} />
            </Link>
          )}
        </div>
      </div>
    </article>
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
  const [showAllPhotos, setShowAllPhotos] = useState(false)


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
            {GALLERY.map((photo, i) => {
              // Phones: plain 2-up squares and only the first few until "Show all";
              // the 2×2 highlight layout starts at sm.
              const hiddenOnMobile = !showAllPhotos && i >= MOBILE_GALLERY_LIMIT
              return (
                <Reveal
                  key={i}
                  delay={Math.min(i * 0.02, 0.12)}
                  className={`${photo.highlight ? "col-span-1 sm:col-span-2" : "col-span-1"} ${hiddenOnMobile ? "hidden sm:block" : ""}`}
                >
                  <div
                    className={`group relative overflow-hidden rounded-xl ${photo.highlight
                      ? "sm:ring-1 sm:ring-cyan-300/30 sm:shadow-[0_0_28px_rgba(49,212,255,0.10)]"
                      : ""
                      }`}
                  >
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={`YOSN event night ${i + 1}`}
                        fill
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        sizes={photo.highlight ? "(max-width: 640px) 50vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/0" />
                    {photo.highlight && (
                      <div className="absolute right-3 top-3 hidden sm:block">
                        <span className="flex items-center gap-1 rounded-full border border-cyan-300/30 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200 backdrop-blur-sm">
                          <IconStar size={8} />
                          Highlight
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>

          {!showAllPhotos && GALLERY.length > MOBILE_GALLERY_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAllPhotos(true)}
              className="mt-6 w-full rounded-full border border-cyan-300/40 py-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:bg-cyan-300/10 sm:hidden"
            >
              Show all {GALLERY.length} photos
            </button>
          )}
        </div>

      </div>
    </section>
  )
}
