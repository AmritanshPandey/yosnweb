"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[75vh] text-white overflow-hidden">

      {/* Background Video */}
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

      Cinematic Gradient Overlay
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Soft Edge Vignette
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_80%)]" /> */}

  

    </section>
  )
}