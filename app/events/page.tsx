"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconCalendarEvent,
  IconLanguage,
  IconMasksTheater,
  IconHourglass,
  IconMapPin,
} from "@tabler/icons-react"
import { Reveal } from "@/components/shared/Reveal"

const upcomingEvent = {
  name: "Quick Style India Tour",
  city: "Multiple Cities",
  venue: "Multiple Venues",
  date: "Fri 23 Oct 2026 onwards",
  duration: "1 hour 30 minutes",
  languages: "Hindi, English",
  genres: "Bollywood, Hip Hop",
  ageRating: "14+ (under 16s must be accompanied by an 18+ adult)",
  ticketsFrom: "INR 999",
  ticketLink: "https://in.bookmyshow.com/events/quick-style-india-tour/ET00495699",
  status: "On Sale",
  heroImage: "/assets/events/upcoming.avif",
}

const highlights = [
  "Music Shows",
  "Performances",
  "World Tour 2026 touch-down in India",
  "High-energy choreography and stage storytelling",
]

const aboutEvent = [
  "From viral videos to global stages, the world has always shown up for Quick Style.",
  "Now they are bringing something to India they have never brought before.",
  "With 20 years of legacy, two world championship titles, viral videos that captivated billions online, and performances on the world's biggest stages, Quick Style has grown into one of the most influential dance collectives in the world.",
  "Now that the global phenomenon comes to life in a spectacular live concert experience, you have seen Quick Style before, but never like this. The Quick Style World Tour transforms their signature choreography into a powerful stage experience, combining their most iconic routines with brand-new creations designed exclusively for the stage.",
  "Driven by precision, musicality, and world-class choreography, the production blends movement, storytelling, and cinematic visuals into a high-energy entertainment experience unlike anything audiences have seen before.",
]

const tourStops = [
  { city: "Delhi", date: "Fri, 23 Oct", price: "INR 1499 onwards", venue: "Venue To Be Announced" },
  { city: "Mumbai", date: "Sat, 24 Oct", price: "INR 1499 onwards", venue: "Venue To Be Announced" },
  { city: "Pune", date: "Sun, 25 Oct", price: "INR 999 onwards", venue: "Venue To Be Announced" },
  { city: "Kolkata", date: "Fri, 30 Oct", price: "INR 999 onwards", venue: "Venue To Be Announced" },
  { city: "Bengaluru", date: "Sat, 31 Oct", price: "INR 999 onwards", venue: "Venue To Be Announced" },
  { city: "Hyderabad", date: "Sun, 01 Nov", price: "INR 1499 onwards", venue: "Venue To Be Announced" },
]

const featuredArtist = {
  name: "The Quick Style",
  type: "Dance Crew",
  origin: "Oslo, Norway",
  knownFor: "High-energy choreography and viral dance performances",
  instagram: "https://www.instagram.com/thequickstyle/",
  youtube: "https://www.youtube.com/c/TheQuickStyle",
  handle: "@thequickstyle",
}

const pastEvents = Array.from({ length: 34 }, (_, i) => ({
  src: `/assets/events/event${i + 1}.jpg`,
}))

export default function Page() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <section className="page-fun bg-black py-24 text-white sm:py-32">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 sm:mb-14">
            <p className="eyebrow-fun mb-4 sm:mb-5">Upcoming Event</p>
            <h1 className="heading-fun text-5xl sm:text-6xl md:text-8xl">{upcomingEvent.name}</h1>
            <p className="body-fun mt-4 max-w-2xl leading-relaxed">
              The global dance phenomenon lands in India with a spectacular live
              concert experience across multiple cities.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:gap-8">
          <Reveal className="h-full">
            <div className="fun-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
              <div className="relative h-[380px] sm:h-[420px]">
                <Image
                  src={upcomingEvent.heroImage}
                  alt={upcomingEvent.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 70vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="rounded-full border border-cyan-300/35 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100 sm:text-xs">
                    {upcomingEvent.status}
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                    {upcomingEvent.city}
                  </span>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Date</p>
                  <p className="mt-2 text-xl text-white sm:text-2xl">{upcomingEvent.date}</p>
                </div>
             
              
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Tickets From</p>
                  <p className="mt-2 text-lg text-white/90">{upcomingEvent.ticketsFrom}</p>
                </div>
                      <div className=" flex flex-wrap gap-3">
                  <Link
                    href={upcomingEvent.ticketLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-cyan-300/30 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/15"
                  >
                    Book Tickets
                  </Link>
              
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col space-y-6">
              <div className="flex-1 rounded-2xl border border-white/8 bg-black/55 p-5 sm:p-6">
                <h2 className="font-display text-3xl uppercase tracking-tight text-white sm:text-[2.1rem]">Event Info</h2>

                <div className="mt-4 space-y-2.5">
                
                  <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                    <IconLanguage size={18} className="text-cyan-200" /> {upcomingEvent.languages}
                  </p>
                  <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                    <IconMasksTheater size={18} className="text-cyan-200" /> {upcomingEvent.genres}
                  </p>
                  <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                    <IconHourglass size={18} className="text-cyan-200" /> {upcomingEvent.duration}
                  </p>
                  <p className="flex items-center gap-3 text-sm tracking-wide text-white/72">
                    <IconMapPin size={18} className="text-cyan-200" /> {upcomingEvent.venue}
                  </p>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm tracking-wide text-white/66">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-cyan-300/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

          

                <div className="mt-5 rounded-xl bg-white/[0.02] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Featured Artist</p>
                  <p className="mt-1 text-sm tracking-wide text-white/80">
                    {featuredArtist.name} {featuredArtist.handle}
                  </p>

                  <div className="mt-5 grid gap-1.5 text-xs tracking-wide text-white/60 sm:grid-cols-2">
                    <p>
                      <span className="text-white/40">Type:</span> {featuredArtist.type}
                    </p>
                    <p>
                      <span className="text-white/40">Origin:</span> {featuredArtist.origin}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="text-white/40">Known for:</span> {featuredArtist.knownFor}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <Link
                      href={featuredArtist.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="The Quick Style on Instagram"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-200 transition-colors duration-300 hover:text-cyan-100"
                    >
                      <IconBrandInstagram size={16} />
                      Instagram
                    </Link>

                    <Link
                      href={featuredArtist.youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="The Quick Style on YouTube"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-red-200 transition-colors duration-300 hover:text-red-100"
                    >
                      <IconBrandYoutube size={16} />
                      YouTube
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 sm:mt-10 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                About The Event
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                  {upcomingEvent.ageRating}
                </p>
                <button
                  type="button"
                  onClick={() => setAboutOpen((prev) => !prev)}
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/80 transition-colors duration-300 hover:bg-white/10"
                >
                  {aboutOpen ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {aboutEvent.map((paragraph, i) => (
                <p
                  key={i}
                  className={`body-fun leading-relaxed text-white/70 ${!aboutOpen && i > 1 ? "hidden" : ""}`}
                >
                  {paragraph}
                </p>
              ))}

              {aboutOpen && (
                <p className="body-fun leading-relaxed text-white/70">
                  All sales are final, and we will not be able to issue any refunds.
                </p>
              )}

              {aboutOpen && (
                <p className="body-fun leading-relaxed text-white/70">
                  Please note this show is 14+ (under 16s must be accompanied by an 18+ adult).
                  Valid physical photo ID is required for entry.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                India Tour Dates
              </h2>
              <Link
                href={upcomingEvent.ticketLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/20"
              >
                View All Tickets
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tourStops.map((stop) => (
                <div key={stop.city} className="fun-card rounded-xl border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/85">{stop.date}</p>
                  <p className="mt-2 text-2xl uppercase tracking-tight text-white">{stop.city}</p>
                  <p className="mt-2 text-sm tracking-wide text-white/65">{stop.venue}</p>
                  <p className="mt-1 text-base text-white/90">{stop.price}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

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
