"use client"

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/shared/Reveal"
import { SplitHeading } from "@/components/shared/SplitHeading"

const featuredArtists = [
  { name: "Max Amini", img: "/assets/artists/16.png" },
  { name: "Lucky Ali", img: "/assets/artists/13.png" },
  { name: "Anuv Jain", img: "/assets/artists/12.png" },
  { name: "Vir Das", img: "/assets/artists/17.png" },
  { name: "Mohit Chauhan", img: "/assets/artists/10.png" },
  { name: "Javed Ali", img: "/assets/artists/2.png" },
]

export function ArtistsPreview() {
  return (
    <section
      className="border-t border-white/10 bg-[#080808] py-16 text-white sm:py-24 md:py-32 page-fun"
      id="artists"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SplitHeading
          text="ARTISTS WE'VE BROUGHT TO YOU"
          className="heading-fun text-4xl sm:text-6xl md:text-8xl"
        />

        <Reveal delay={0.2}>
          <p className="body-fun mt-3 max-w-2xl">
            From sold-out comedy nights to intimate acoustic sets — we&apos;ve
            worked with the artists India loves most.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {featuredArtists.map((artist, i) => (
            <Reveal key={artist.name} delay={i * 0.08}>
              <div className="fun-card group relative aspect-square overflow-hidden rounded-xl bg-black">
                <Image
                  src={artist.img}
                  alt={artist.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
                  <p className="heading-fun text-base tracking-wide sm:text-xl">
                    {artist.name}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10 sm:mt-14">
            <Link
              href="/artists"
              className="border-b border-cyan-300/40 pb-0.5 text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-fuchsia-300 hover:text-cyan-200"
            >
              View All Artists
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
