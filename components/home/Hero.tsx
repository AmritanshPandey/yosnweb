"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const slides = [
  { title: "UPCOMING EVENTS", desc: "Experience curated entertainment." },
  { title: "LIVE ARTISTS", desc: "Discover top performers." },
  { title: "BIZ AT YOSN", desc: "Partner for brand experiences." },
]

export function Hero() {
  return (
    <section className="relative h-[60svh] md:h-[70vh] bg-black text-white flex items-center overflow-hidden">

      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div className="relative h-[60svh] md:h-[70vh] flex items-center justify-center">

                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-700/40 via-purple-700/30 to-black"
                />

                <div className="relative text-center max-w-2xl px-6">
                  <Badge className="mb-4">YOSN</Badge>

                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-white/70 mb-6">
                    {slide.desc}
                  </p>

                  <Button size="lg">Explore</Button>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </section>
  )
}