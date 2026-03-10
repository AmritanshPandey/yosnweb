"use client"

import Link from "next/link"
import { Reveal } from "@/components/shared/Reveal"
import { Button } from "@/components/ui/button"

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
    <section className="py-28 bg-black text-white" id="artists">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Artists
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-14">
            From iconic performers to emerging talent, YOSN collaborates
            with artists who create unforgettable live experiences.
          </p>
        </Reveal>

        {/* Artist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {featuredArtists.map((artist, i) => (
            <Reveal key={artist.name} delay={i * 0.08}>
              <div className="relative aspect-square rounded-xl overflow-hidden group border border-white/10">

                <img
                  src={artist.img}
                  alt={artist.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#2AAFFB]/10" />

                {/* Artist Name */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-lg font-semibold">
                    {artist.name}
                  </p>
                </div>

              </div>
            </Reveal>
          ))}

        </div>

        {/* CTA */}
        <Reveal delay={0.4}>
          <div className="flex justify-center mt-14">
            <Link href="/artists">
              <Button variant="capsule" size="lg">
                View All Artists
              </Button>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  )
}