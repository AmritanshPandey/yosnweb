"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/shared/Reveal"

import {
  IconUsers,
  IconCalendarEvent,
  IconMicrophone,
  IconBrandStripe,
  IconMusic,
  IconMoodSmile,
  IconSparkles,
} from "@tabler/icons-react"

const stats = [
  { value: 100, label: "Events", icon: IconCalendarEvent },
  { value: 50, label: "Artists", icon: IconMicrophone },
  { value: 100, label: "Clients", icon: IconUsers },
  { value: 50, label: "Brands", icon: IconBrandStripe },
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
      className="text-[#2AAFFB]"
      style={{ textShadow: "0 0 14px rgba(42,175,251,0.6)" }}
    >
      {display}+
    </span>
  )
}

export default function Page() {
  return (
    <section className="bg-black text-white py-32">

      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <Reveal>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About us
            </h1>

            <p className="text-white/60 text-xl leading-relaxed">
              YOSN Innovations is an experiential entertainment company
              dedicated to creating unforgettable live experiences.
              From concerts and comedy tours to large-scale brand
              activations, we bring together artists, brands, and
              audiences through powerful moments.
            </p>
          </div>
        </Reveal>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-28">

          {stats.map((stat, i) => {
            const Icon = stat.icon

            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-8 rounded-xl border border-white/10 bg-white/5"
                >
                  <Icon size={32} className="text-[#2AAFFB] mb-4" />

                  <h3 className="text-4xl font-bold mb-1">
                    <Counter value={stat.value} />
                  </h3>

                  <p className="text-white/60 text-sm">
                    {stat.label}
                  </p>

                </motion.div>
              </Reveal>
            )
          })}

        </div>

        {/* WHAT WE DO */}
        <Reveal>
          <h2 className="text-4xl font-bold mb-14">
            What We Do
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10 mb-28">

          {services.map((service, i) => {
            const Icon = service.icon

            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="p-10 bg-white/5 border border-white/10 rounded-xl"
                >

                  <Icon size={36} className="text-[#2AAFFB] mb-6" />

                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    {service.description}
                  </p>

                </motion.div>
              </Reveal>
            )
          })}

        </div>

        {/* VISION */}
        <Reveal>
          <div className="">

            <h2 className="text-4xl font-bold mb-6">
              Our Vision
            </h2>

            <p className="text-white/60 text-lg leading-relaxed">
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