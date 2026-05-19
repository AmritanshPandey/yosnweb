"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Reveal } from "@/components/shared/Reveal"

const artists = [
  { name: "Arham Fulfagar", img: "/assets/artists/1.png" },
  { name: "OAFF & Savera", img: "/assets/artists/3.png" },
  { name: "Anuv Jain", img: "/assets/artists/12.png" },
  { name: "Lucky Ali", img: "/assets/artists/13.png" },
  { name: "DJ Chetas", img: "/assets/artists/9.png" },
]

const gallery = Array.from({ length: 12 }, (_, i) => ({
  src: `/assets/one/one${i + 1}.png`,
}))

export default function Page() {
  return (
    <main className="bg-black text-white pt-20 sm:pt-24 page-fun">

      {/* HERO */}
      <section className="relative h-[calc(100vh-5rem)] overflow-hidden sm:h-[calc(100vh-6rem)]">

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/banners/banner.png"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoomHero_18s_linear_infinite]"
        >
          <source src="/assets/banners/banner.webm" type="video/webm" />
          <source src="/assets/banners/banner.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/42" />
        <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute -right-14 bottom-10 h-60 w-60 rounded-full bg-fuchsia-500/18 blur-3xl" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">

          <motion.div
            className="flex flex-col items-center text-center max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.25 } },
            }}
          >

            {/* Logo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/assets/one/one.png"
                alt="One Night Event Logo"
                width={480}
                height={480}
                className="h-72 md:h-120 w-auto"
                priority
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="body-fun text-base leading-relaxed md:text-xl"
            >
              A signature live entertainment experience curated by
              YOSN Innovations — bringing together music, culture,
              and unforgettable performances.
            </motion.p>

          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1 },
            y: {
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-sm"
        >
          <span>Scroll</span>
          <span className="text-xl">↓</span>
        </motion.div>

      </section>



      {/* ABOUT */}
      <section className="py-20 sm:py-32">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">

              <h2 className="heading-fun text-4xl sm:text-5xl md:text-7xl">
                About One Night
              </h2>

              <p className="body-fun mt-4 leading-relaxed">
                One Night is a signature live entertainment experience curated
                by YOSN Innovations, bringing together music, culture, and
                unforgettable performances for an electrifying evening that
                celebrates live entertainment.
              </p>

            </div>
          </Reveal>


          {/* EVENT DETAILS */}
          <div className="grid gap-12 mb-20 sm:gap-20 md:grid-cols-2 sm:mb-32">

            <Reveal>
              <div>

                <h3 className="heading-fun text-3xl sm:text-4xl">
                  Event Details
                </h3>

                <div className="body-fun mt-6 space-y-4 sm:mt-8 sm:space-y-5 sm:text-base">

                  <p>
                    <span className="text-white font-medium">Date:</span>
                    {" "}20th December 2024
                  </p>

                  <p>
                    <span className="text-white font-medium">Venue:</span>
                    {" "}Nesco Center
                  </p>

                  <p>
                    <span className="text-white font-medium">City:</span>
                    {" "}Mumbai
                  </p>

                  <p>
                    <span className="text-white font-medium">Gates Open:</span>
                    {" "}4:00 PM
                  </p>

                </div>

              </div>
            </Reveal>


            <Reveal delay={0.15}>
              <div>

                <h3 className="heading-fun text-3xl sm:text-4xl">
                  About the Event
                </h3>

                <p className="body-fun mt-6 leading-relaxed sm:mt-8">
                  Designed as a high-energy celebration of music and
                  entertainment, One Night creates a space where audiences
                  experience incredible performances, immersive production,
                  and an atmosphere that celebrates live culture.
                </p>

                <p className="body-fun mt-4 leading-relaxed">
                  With world-class artists, engaging storytelling, and
                  unforgettable stage experiences, One Night delivers a
                  powerful entertainment experience crafted for
                  passionate audiences.
                </p>

              </div>
            </Reveal>

          </div>



          {/* ARTIST LINEUP */}
          <Reveal>
            <h2 className="heading-fun mb-10 text-center text-4xl sm:mb-16 sm:text-5xl md:text-7xl">
              Artist Lineup
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 mb-20 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5 sm:mb-32">

            {artists.map((artist, i) => (
              <Reveal key={i} delay={i * 0.1}>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="fun-card relative h-[240px] overflow-hidden rounded-xl group sm:h-[280px]"
                >

                  <Image
                    src={artist.img}
                    alt={artist.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <p className="heading-fun text-base tracking-wide sm:text-lg">
                      {artist.name}
                    </p>
                  </div>

                </motion.div>

              </Reveal>
            ))}

          </div>



          {/* EVENT GALLERY */}
          <Reveal>
            <h2 className="heading-fun mb-10 text-center text-4xl sm:mb-16 sm:text-5xl md:text-7xl">
              Event Gallery
            </h2>
          </Reveal>

          <div className="columns-2 gap-3 space-y-3 sm:gap-6 sm:space-y-6 md:columns-3 lg:columns-4">

            {gallery.map((img, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="fun-card relative overflow-hidden rounded-xl break-inside-avoid"
                >

                  <Image
                    src={img.src}
                    alt="One Night event photo"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />

                </motion.div>

              </Reveal>
            ))}

          </div>

        </div>

      </section>

    </main>
  )
}
