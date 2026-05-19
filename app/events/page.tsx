"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconHourglass,
  IconMapPin,
  IconMasksTheater,
  IconTicket,
} from "@tabler/icons-react"
import { Reveal } from "@/components/shared/Reveal"
import { getAllEvents } from "@/lib/firebase/events"
import { getArtistById } from "@/lib/firebase/artists"
import type { Event, Artist } from "@/types"
import { STATUS_LABELS, STATUS_COLORS, CATEGORY_LABELS } from "@/types"

const pastEvents = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

function EventSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:gap-8 animate-pulse">
      <div className="h-[460px] rounded-2xl bg-white/6" />
      <div className="space-y-4">
        <div className="h-64 rounded-2xl bg-white/6" />
        <div className="h-32 rounded-2xl bg-white/6" />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-24 text-center">
      <IconTicket size={40} className="text-white/20" />
      <p className="mt-4 font-display text-3xl uppercase text-white/30">No Upcoming Events</p>
      <p className="mt-2 text-sm text-white/35">Check back soon — something big is coming.</p>
    </div>
  )
}

type EventWithArtist = Event & { artist?: Artist }

export default function EventsPage() {
  const [events, setEvents] = useState<EventWithArtist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const all = await getAllEvents()

        // Attach artist data to each event
        const withArtists = await Promise.all(
          all.map(async (event) => {
            if (!event.artistId) return event
            const artist = await getArtistById(event.artistId).catch(() => undefined)
            return { ...event, artist: artist ?? undefined }
          }),
        )

        // Featured events first, then by createdAt
        withArtists.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })

        setEvents(withArtists)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const hero = events[0]
  const rest = events.slice(1)

  const heroTicketLink =
    hero?.cities?.find((c) => !c.soldOut)?.ticketLink ??
    hero?.cities?.[0]?.ticketLink ??
    "#"

  const heroCityLabel =
    hero?.cities?.length === 1
      ? hero.cities[0].name
      : hero?.cities?.length > 1
        ? "Multiple Cities"
        : "TBA"

  const heroDateLabel =
    hero?.cities?.length === 1
      ? hero.cities[0].date
      : hero?.cities?.length > 1
        ? `${hero.cities[0].date} onwards`
        : "Date TBA"

  return (
    <section className="page-fun bg-black py-24 text-white sm:py-32">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6">

        {loading ? (
          <>
            <div className="mb-10 space-y-3 animate-pulse">
              <div className="h-3 w-28 rounded bg-white/10" />
              <div className="h-14 w-96 rounded bg-white/10" />
              <div className="h-4 w-80 rounded bg-white/8" />
            </div>
            <EventSkeleton />
          </>
        ) : events.length === 0 ? (
          <>
            <Reveal>
              <div className="mb-10">
                <p className="eyebrow-fun mb-4">Upcoming Event</p>
                <h1 className="heading-fun text-5xl sm:text-6xl md:text-8xl">Events</h1>
              </div>
            </Reveal>
            <EmptyState />
          </>
        ) : (
          <>
            {/* Hero heading */}
            <Reveal>
              <div className="mb-10 sm:mb-14">
                <p className="eyebrow-fun mb-4 sm:mb-5">Upcoming Event</p>
                <h1 className="heading-fun text-5xl sm:text-6xl md:text-8xl">{hero.name}</h1>
                {hero.artist && (
                  <p className="body-fun mt-4 max-w-2xl leading-relaxed">
                    {hero.artist.bio ||
                      `${hero.artist.name} live — ${CATEGORY_LABELS[hero.category]} across ${heroCityLabel}.`}
                  </p>
                )}
              </div>
            </Reveal>

            {/* Hero grid */}
            <div className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:gap-8">
              {/* Hero image card */}
              <Reveal className="h-full">
                <div className="fun-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
                  <div className="relative h-[380px] sm:h-[420px]">
                    {hero.heroImage ? (
                      <Image
                        src={hero.heroImage}
                        alt={hero.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 70vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-white/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 sm:bottom-6 sm:left-6 sm:right-6">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] sm:text-xs ${STATUS_COLORS[hero.status]}`}
                      >
                        {STATUS_LABELS[hero.status]}
                      </span>
                      <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                        {heroCityLabel}
                      </span>
                      <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60 sm:text-xs capitalize">
                        {CATEGORY_LABELS[hero.category]}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-7">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Date</p>
                      <p className="mt-2 text-xl text-white sm:text-2xl">{heroDateLabel}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Tickets From</p>
                      <p className="mt-2 text-lg text-white/90">{hero.ticketsFrom}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {heroTicketLink !== "#" && (
                        <Link
                          href={heroTicketLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-cyan-300/30 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/15"
                        >
                          Book Tickets
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Info panel */}
              <Reveal delay={0.08} className="h-full">
                <div className="flex h-full flex-col space-y-6">
                  <div className="flex-1 rounded-2xl border border-white/8 bg-black/55 p-5 sm:p-6">
                    <h2 className="font-display text-3xl uppercase tracking-tight text-white sm:text-[2.1rem]">
                      Event Info
                    </h2>

                    <div className="mt-4 space-y-2.5">
                      {hero.genres.length > 0 && (
                        <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                          <IconMasksTheater size={18} className="text-cyan-200" />
                          {hero.genres.join(", ")}
                        </p>
                      )}
                      {hero.duration && (
                        <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                          <IconHourglass size={18} className="text-cyan-200" />
                          {hero.duration}
                        </p>
                      )}
                      {hero.cities.length > 0 && (
                        <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                          <IconMapPin size={18} className="text-cyan-200" />
                          {hero.cities.map((c) => c.name).join(", ")}
                        </p>
                      )}
                    </div>

                    {/* Artist card */}
                    {hero.artist && (
                      <div className="mt-5 rounded-xl bg-white/[0.02] px-4 py-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                          Featured Artist
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          {hero.artist.profileImage && (
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/15">
                              <Image
                                src={hero.artist.profileImage}
                                alt={hero.artist.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-sm tracking-wide text-white/80">
                              {hero.artist.name}
                            </p>
                            <p className="text-xs text-white/45">{hero.artist.handle}</p>
                          </div>
                          {hero.artist.verified && (
                            <span className="ml-auto rounded-full border border-cyan-300/25 bg-cyan-300/8 px-2 py-0.5 text-[10px] text-cyan-200">
                              Verified
                            </span>
                          )}
                        </div>

                        {hero.artist.bio && (
                          <p className="mt-3 text-xs leading-relaxed text-white/55">
                            {hero.artist.bio}
                          </p>
                        )}

                        <div className="mt-3 flex items-center gap-4">
                          {hero.artist.instagram && (
                            <Link
                              href={hero.artist.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-200 transition-colors duration-300 hover:text-cyan-100"
                            >
                              <IconBrandInstagram size={16} />
                              Instagram
                            </Link>
                          )}
                          {hero.artist.youtube && (
                            <Link
                              href={hero.artist.youtube}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-red-200 transition-colors duration-300 hover:text-red-100"
                            >
                              <IconBrandYoutube size={16} />
                              YouTube
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Tour dates */}
            {hero.cities.length > 0 && (
              <Reveal delay={0.12}>
                <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 sm:p-7">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                      Tour Dates
                    </h2>
                    {heroTicketLink !== "#" && (
                      <Link
                        href={heroTicketLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/20"
                      >
                        View All Tickets
                      </Link>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {hero.cities.map((city) => (
                      <div
                        key={city.name + city.date}
                        className={`fun-card rounded-xl border border-white/10 p-4 ${city.soldOut ? "opacity-50" : ""}`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/85">
                          {city.date}
                        </p>
                        <p className="mt-2 text-2xl uppercase tracking-tight text-white">
                          {city.name}
                        </p>

                        {city.soldOut ? (
                          <span className="mt-3 inline-block rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-red-300">
                            Sold Out
                          </span>
                        ) : city.ticketLink ? (
                          <Link
                            href={city.ticketLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block rounded-lg border border-cyan-300/30 bg-cyan-300/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cyan-100 transition-colors hover:bg-cyan-300/15"
                          >
                            Book Tickets
                          </Link>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* More events */}
            {rest.length > 0 && (
              <Reveal delay={0.14}>
                <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 sm:p-7">
                  <h2 className="mb-5 font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                    More Events
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((event) => {
                      const link =
                        event.cities?.find((c) => !c.soldOut)?.ticketLink ??
                        event.cities?.[0]?.ticketLink ??
                        "#"
                      return (
                        <div key={event.id} className="fun-card overflow-hidden rounded-xl border border-white/10">
                          <div className="relative h-48">
                            {event.heroImage ? (
                              <Image
                                src={event.heroImage}
                                alt={event.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full bg-white/5" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${STATUS_COLORS[event.status]}`}
                              >
                                {STATUS_LABELS[event.status]}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="font-display text-xl uppercase tracking-tight text-white">
                              {event.name}
                            </p>
                            <p className="mt-1 text-xs text-white/45">
                              {event.cities?.length > 0
                                ? event.cities.map((c) => c.name).join(", ")
                                : "TBA"}
                            </p>
                            <p className="mt-1 text-sm text-white/70">{event.ticketsFrom}</p>
                            {link !== "#" && (
                              <Link
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-block rounded-lg border border-cyan-300/30 bg-cyan-300/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cyan-100 transition-colors hover:bg-cyan-300/15"
                              >
                                Book Tickets
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )}
          </>
        )}

        {/* Past events gallery — always shown */}
        <Reveal delay={0.16}>
          <div className="mt-14 border-t border-white/10 pt-10 sm:mt-16 sm:pt-14">
            <div className="mb-8 sm:mb-10">
              <p className="eyebrow-fun mb-3">Past Events</p>
              <h2 className="font-display text-4xl uppercase tracking-tight text-white sm:text-6xl">
                Memories We Created
              </h2>
              <p className="body-fun mt-3 max-w-2xl">
                A glimpse into YOSN experiences that brought crowds, artists,
                and brands together across unforgettable nights.
              </p>
            </div>

            <div className="columns-2 gap-3 space-y-3 sm:gap-6 sm:space-y-6 md:columns-3 lg:columns-4">
              {pastEvents.map((event, i) => (
                <Reveal key={event.src} delay={i * 0.02}>
                  <div className="fun-card group relative overflow-hidden rounded-xl break-inside-avoid">
                    <Image
                      src={event.src}
                      alt={`Past event ${i + 1}`}
                      width={720}
                      height={960}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/12 transition-colors duration-300 group-hover:bg-black/0" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
