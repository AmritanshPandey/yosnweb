"use client"

import { useEffect, useRef, useState } from "react"
import {
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/shared/Reveal"

const stats = [
  { value: 100, label: "Clients" },
  { value: 100, label: "Events" },
  { value: 50, label: "Artists" },
  { value: 50, label: "Brands" },
]

function Counter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    duration: 1500,
  })

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
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
        textShadow: "0 0 12px rgba(42,175,251,0.5)",
      }}
    >
      {display}+
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-20 bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-md text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-3xl font-bold">
                  <Counter value={stat.value} />
                </h3>
                <p className="text-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}