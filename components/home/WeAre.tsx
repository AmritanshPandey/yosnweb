"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import {
  IconUsers,
  IconCalendarEvent,
  IconMicrophone,
  IconBrandStripe,
} from "@tabler/icons-react"

const images = [
  "/assets/banners/banner1.png",
  "/assets/banners/banner2.png",
  "/assets/banners/banner3.png",
  "/assets/banners/banner4.png",
  "/assets/banners/banner5.png",
  "/assets/banners/banner6.png",
  "/assets/banners/banner7.png",
  "/assets/banners/banner8.png",
  "/assets/banners/banner9.png",
]

const stats = [
  { value: 100, label: "Clients", icon: IconUsers },
  { value: 100, label: "Events", icon: IconCalendarEvent },
  { value: 50, label: "Artists", icon: IconMicrophone },
  { value: 50, label: "Brands", icon: IconBrandStripe },
]

function Counter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
  })

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.floor(latest))
    })
    return unsubscribe
  }, [spring])

  return (
    <span
      ref={ref}
      className="text-[#2AAFFB]"
      style={{
        textShadow: "0 0 18px rgba(42,175,251,0.6)",
      }}
    >
      {display}+
    </span>
  )
}

export function WeAre() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-28 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">

          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to YOSN INNOVATIONS
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/70 text-lg mb-12 leading-relaxed">
              The creators of India's most unforgettable live entertainment experiences. For the past seven years, we’ve been dedicated to curating unique and innovative trends and providing our clients with the best live entertainment experiences. With a strong focus on the live events sector in India, we’ve made a name for ourselves as the go-to for unique and cutting-edge live event producers.
            </p>
          </Reveal>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="flex items-center gap-4">

                    <div className="text-[#2AAFFB]">
                      <Icon size={32} stroke={1.5} />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold">
                        <Counter value={stat.value} />
                      </h3>

                      <p className="text-white/60 text-sm">
                        {stat.label}
                      </p>
                    </div>

                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.4}>
            <Link href="/events">
              <Button variant="capsule" size="lg">
                Explore Our Work
              </Button>
            </Link>
          </Reveal>

        </div>

        {/* RIGHT IMAGE SHOWCASE */}
        <div className="relative h-[520px] md:h-[620px]">

          {/* Main Image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">

            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt="Event"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          </div>

          {/* Floating image top */}
          <motion.img
            src={images[(index + 2) % images.length]}
            className="absolute -top-8 -right-8 w-48 h-48 object-cover rounded-xl shadow-lg"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />

          {/* Floating image bottom */}
          <motion.img
            src={images[(index + 4) % images.length]}
            className="absolute -bottom-8 -left-8 w-48 h-48 object-cover rounded-xl shadow-lg"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />

        </div>

      </div>
    </section>
  )
}