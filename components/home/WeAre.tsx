"use client"
import { useEffect, useState, useRef } from "react"
import {
  animate,
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Reveal } from "@/components/shared/Reveal"

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
  { value: 15, label: "Clients" },
  { value: 50, label: "Events" },
  { value: 30, label: "Artists" },
  { value: 20, label: "Brands" },
]

const LIVE_TICKET_COUNT = 211585
const LIVE_TICKET_START = 211570
const ticketCountFormatter = new Intl.NumberFormat("en-IN")
const marqueeText = "CREATE · ELEVATE · CELEBRATE · YOSN · "

function Counter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 30,
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
    >
      {display}+
    </span>
  )
}

function TicketCounter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(LIVE_TICKET_START)
  const [display, setDisplay] = useState(LIVE_TICKET_START)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionValue, value, {
      duration: 9,
      ease: "easeOut",
    })

    return controls.stop
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.floor(latest))
    })
    return unsubscribe
  }, [motionValue])

  return (
    <span
      ref={ref}
      className="font-display text-4xl leading-none tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
    >
      {ticketCountFormatter.format(display)}
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
    <section
      id="about"
      className="overflow-hidden border-t border-white/10 bg-[#080808] py-12 text-white sm:py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl" />
        <div className="grid items-start gap-8 sm:gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/45">
                YOSN IN NUMBERS
              </p>
            </Reveal>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-6 sm:mt-10 sm:gap-x-8 sm:gap-y-12 md:gap-x-12 md:gap-y-16">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08} className="w-full min-w-0">
                  <div className="w-full min-w-0 border-t border-white/10 pt-3 sm:pt-6">
                    <h3 className="font-display text-5xl leading-none text-white sm:text-7xl md:text-9xl">
                      <Counter value={stat.value} />
                    </h3>

                    <p className="mt-2 text-[9px] sm:text-xs uppercase tracking-widest text-white/50">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <div className="mt-8 sm:mt-12 overflow-hidden border-t border-white/10 pt-6 sm:pt-8">
                <div className="flex w-max animate-marquee whitespace-nowrap text-[10px] sm:text-xs tracking-widest uppercase text-white/30">
                  <span className="pr-6 sm:pr-10">{marqueeText}</span>
                  <span aria-hidden="true" className="pr-6 sm:pr-10">{marqueeText}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[620px]">
            <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt="Event"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <motion.img
              src={images[(index + 2) % images.length]}
              className="hidden sm:block absolute -top-3 -right-3 h-20 w-20 border border-white/10 object-cover shadow-lg sm:-top-8 sm:-right-8 sm:h-40 sm:w-40 md:h-48 md:w-48"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />

            <motion.img
              src={images[(index + 4) % images.length]}
              className="hidden sm:block absolute -bottom-3 -left-3 h-20 w-20 border border-white/10 object-cover shadow-lg sm:-bottom-8 sm:-left-8 sm:h-40 sm:w-40 md:h-48 md:w-48"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
          </div>
        </div>

        <Reveal delay={0.5}>
          <div className="relative mt-16 sm:mt-20 overflow-hidden border-t border-white/10 pt-8 sm:pt-12 md:mt-24 md:pt-16">
            <div className="relative flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-3 border border-cyan-300/30 bg-black px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-cyan-100/70">
                  <motion.span
                    className="h-2 w-2 bg-cyan-200"
                    animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.55, 0.85, 0.55] }}
                    transition={{ duration: 16.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Live Ticket Counter
                </div>

                <h3 className="mt-4 font-display text-3xl uppercase tracking-tight text-white sm:mt-5 sm:text-4xl md:text-6xl">
                  Live tickets sold
                </h3>

                <p className="body-fun mt-3 max-w-md">
                  Across YOSN experiences.
                </p>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black px-5 py-5 md:px-7">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,79,216,0.14),_transparent_40%)]" />
                  <TicketCounter value={LIVE_TICKET_COUNT} />

                  <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/40">
                    <span>Tickets</span>
                    <span className="h-px w-10 bg-white/15" />
                    <span>And Counting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
