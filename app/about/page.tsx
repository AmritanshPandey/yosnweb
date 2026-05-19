"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/shared/Reveal"
import { SplitHeading } from "@/components/shared/SplitHeading"

import {
  IconUsers,
  IconCalendarEvent,
  IconMicrophone,
  IconBrandStripe,
  IconMapPin,
  IconMusic,
  IconMoodSmile,
  IconSparkles,
} from "@tabler/icons-react"
import { House } from "lucide-react"

const stats = [
  { value: 250, label: "Events", icon: IconCalendarEvent },
  { value: 40, label: "Artists", icon: IconMicrophone },
  { value: 50, label: "Clients", icon: IconUsers },
  { value: 20, label: "Brands", icon: IconBrandStripe },
]

const services = [
  {
    title: "Concerts",
    description:
      "High-energy live music experiences featuring leading artists and unforgettable stage productions.",
    icon: IconMusic,
  },
  {
    title: "Comedy Shows",
    description:
      "Stand-up tours and curated comedy experiences featuring some of the most exciting performers.",
    icon: IconMoodSmile,
  },
  {
    title: "Brand Activations",
    description:
      "Creative experiential events that connect brands with audiences through culture and entertainment.",
    icon: IconSparkles,
  },
]

const venueGroups = [
  {
    city: "Mumbai",
    region: "India",
    venues: ["Nesco", "Rangmandir", "Royal Opera House", "NSCI", "NMACC", "NESCO", "NCPA", "Balgandharva Rang Mandir", "Sri Shanmukhananda Chandrasekarendra Saraswathi Auditorium", "Fine Arts Society"],
  },
  {
    city: "Delhi",
    region: "India",
    venues: ["Bharat Mandapam", "Yashobhoomi Convention Centre", "Epicentre Auditorium", "Studio XO", "Aiwan-e-Ghalib Auditorium"],
  },
  {
    city: "Bangalore",
    region: "India",
    venues: ["Good Shepherd Auditorium",  "Prestige Centre for Performing Arts", "Chowdiah Memorial Hall", "Bhartiya Mall of Bangalore", "Phoenix Mall of Asia"],
  },
  {
    city: "London",
    region: "UK",
    venues: ["Royal Festival Hall", "Indigo @O2", "Electric Ballroom", "The Garage"],
  },
  {
    city: "Manchester",
    region: "UK",
    venues: ["The Lowry"],
  },
  {
    city: "Birmingham",
    region: "UK",
    venues: ["Symphony Hall"],
  },
  {
    city: "Dubai",
    region: "UAE",
    venues: [],
  },
  {
    city: "Dublin",
    region: "Ireland",
    venues: [],
  },
  {
    city: "Amsterdam",
    region: "Netherlands",
    venues: [],
  },
]

function Counter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1500 })

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
      className="text-white"
    >
      {display}+
    </span>
  )
}

export default function Page() {
  return (
    <section className="bg-black text-white py-24 sm:py-32 page-fun">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HERO */}
        <Reveal>
          <div className="mb-16 sm:mb-20">
            <p className="eyebrow-fun mb-4 sm:mb-6">
              Who We Are
            </p>
            <SplitHeading
              text="About Us"
              as="h1"
              className="heading-fun text-5xl sm:text-6xl md:text-8xl"
            />

            <p className="body-fun mt-4 max-w-2xl leading-relaxed sm:text-base">
              YOSN Innovations is an experiential entertainment company
              dedicated to creating unforgettable live experiences.
              From concerts and comedy tours to large-scale brand
              activations, we bring together artists, brands, and
              audiences through powerful moments.
            </p>
          </div>
        </Reveal>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-20 sm:gap-6 md:grid-cols-4 md:gap-10 sm:mb-28">

          {stats.map((stat, i) => {
            const Icon = stat.icon

            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="fun-card p-5 sm:p-8"
                >
                  <Icon size={28} className="mb-3 text-cyan-200/75 sm:mb-4 sm:size-8" />

                  <h3 className="font-display text-4xl leading-none text-white sm:text-5xl">
                    <Counter value={stat.value} />
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-widest text-white/60">
                    {stat.label}
                  </p>

                </motion.div>
              </Reveal>
            )
          })}

        </div>

        {/* WHAT WE DO */}
        <SplitHeading
          text="What We Do"
          className="heading-fun mb-10 text-4xl sm:mb-14 sm:text-5xl md:text-7xl"
        />

        <div className="grid gap-6 mb-20 sm:gap-10 md:grid-cols-3 sm:mb-28">

          {services.map((service, i) => {
            const Icon = service.icon

            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="fun-card p-8 sm:p-10"
                >

                  <Icon size={32} className="mb-5 text-fuchsia-200/75 sm:mb-6 sm:size-9" />

                  <h3 className="heading-fun text-2xl tracking-wide sm:text-3xl">
                    {service.title}
                  </h3>

                  <p className="body-fun mt-3 leading-relaxed">
                    {service.description}
                  </p>

                </motion.div>
              </Reveal>
            )
          })}

        </div>

        {/* VENUES */}
        <div className="relative mb-20 overflow-hidden border border-white/10 bg-[#080808] p-4 sm:mb-28 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(49,212,255,0.15),_transparent_36%)]" />

          <div className="relative">
            <Reveal>
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 border border-white/10 bg-black px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 sm:px-4 sm:py-2 sm:text-[11px] sm:mb-5">
                  <IconMapPin size={14} className="text-white/50" />
                  Venues
                </div>

                <SplitHeading
                  text="Where We Show Up"
                  className="heading-fun text-4xl sm:text-5xl md:text-7xl"
                />

                <p className="body-fun mt-3">
                  Selected venues across India, the UK, and Dubai.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {venueGroups.map((group, i) => (
                <Reveal key={group.city} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="fun-card relative h-full overflow-hidden p-5 sm:p-6"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,79,216,0.15),_transparent_34%)]" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                          {group.region}
                        </p>

                        <div className="rounded-none border border-white/10 bg-[#080808] px-3 py-1.5 text-xs text-white/50">
                          {group.venues.length ? `${group.venues.length} venue${group.venues.length > 1 ? "s" : ""}` : "Destination"}
                        </div>
                      </div>

                      <h3 className="heading-fun text-3xl">
                        {group.city}
                      </h3>

                      {group.venues.length > 0 ? (
                        <ul className="mt-4 space-y-3 text-sm text-white/50">
                          {group.venues.map((venue) => (
                            <li
                              key={venue}
                              className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                            >
                              {venue}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-auto flex items-center gap-3 text-sm text-white/50">
                       
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* VISION */}
        <Reveal>
          <div className="border-t border-white/10 pt-12 sm:pt-16">

            <SplitHeading
              text="Our Vision"
              className="heading-fun text-4xl sm:text-5xl md:text-7xl"
            />

            <p className="body-fun mt-4 max-w-2xl leading-relaxed">
              Our vision is to elevate entertainment by creating
              experiences that inspire audiences, empower artists,
              and help brands connect with culture in meaningful
              ways. Every event we design is driven by creativity,
              precision, and the belief that live experiences have
              the power to bring people together.
            </p>

          </div>
        </Reveal>

      </div>

    </section>
  )
}
