"use client"

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
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

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
        <div className="absolute inset-0 bg-black/70" />

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
              <img
                src="/assets/one/one.png"
                alt="One Night Event Logo"
                className="h-72 md:h-120 w-auto"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed"
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
      <section className="py-32">

        <div className="max-w-7xl mx-auto px-6">

          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-24">

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About One Night
              </h2>

              <p className="text-white/60 text-lg leading-relaxed">
                One Night is a signature live entertainment experience curated
                by YOSN Innovations, bringing together music, culture, and
                unforgettable performances for an electrifying evening that
                celebrates live entertainment.
              </p>

            </div>
          </Reveal>


          {/* EVENT DETAILS */}
          <div className="grid md:grid-cols-2 gap-20 mb-32">

            <Reveal>
              <div>

                <h3 className="text-3xl font-semibold mb-8">
                  Event Details
                </h3>

                <div className="space-y-5 text-white/70 text-lg">

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

                <h3 className="text-3xl font-semibold mb-8">
                  About the Event
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  Designed as a high-energy celebration of music and
                  entertainment, One Night creates a space where audiences
                  experience incredible performances, immersive production,
                  and an atmosphere that celebrates live culture.
                </p>

                <p className="text-white/70 leading-relaxed">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              Artist Lineup
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-32">

            {artists.map((artist, i) => (
              <Reveal key={i} delay={i * 0.1}>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative rounded-xl overflow-hidden border border-white/10 group"
                >

                  <img
                    src={artist.img}
                    alt={artist.name}
                    className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <p className="font-semibold">
                      {artist.name}
                    </p>
                  </div>

                </motion.div>

              </Reveal>
            ))}

          </div>



          {/* EVENT GALLERY */}
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              Event Gallery
            </h2>
          </Reveal>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">

            {gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.03}>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-xl border border-white/10 break-inside-avoid"
                >

                  <img
                    src={img.src}
                    alt="One Night Event"
                    className="w-full h-auto object-cover hover:scale-105 transition duration-500"
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