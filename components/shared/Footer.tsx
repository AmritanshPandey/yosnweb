"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  IconMapPin,
  IconPhone,
  IconBrandInstagram,
  IconArrowUpRight,
} from "@tabler/icons-react"
import { MagneticButton } from "@/components/shared/MagneticButton"
import { SplitHeading } from "@/components/shared/SplitHeading"

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Artists", href: "/artists" },
  { label: "One Night", href: "/one" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Animated gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #31d4ff 30%, #ff4fd8 60%, #ffb347 80%, transparent 100%)",
        }}
      />

      {/* LET'S TALK CTA */}
      <div className="relative border-b border-white/10 py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow-fun mb-5">Ready to create something unforgettable?</p>

          <SplitHeading
            text="LET'S TALK"
            as="h2"
            className="font-display text-[18vw] uppercase leading-none tracking-tight text-transparent sm:text-[14vw] md:text-[12vw]"
            style={
              {
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              } as React.CSSProperties
            }
          />

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <MagneticButton strength={0.2}>
              <a
                href="tel:8850904733"
                className="inline-flex items-center gap-2 border border-white/20 bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-7 py-3.5 text-xs font-medium uppercase tracking-widest text-black shadow-[0_8px_40px_rgba(49,212,255,0.3)] transition-all duration-300 hover:shadow-[0_12px_50px_rgba(49,212,255,0.5)]"
              >
                <IconPhone size={15} />
                +91 88509 04733
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="https://www.instagram.com/yosn.events/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 px-7 py-3.5 text-xs uppercase tracking-widest text-white/60 transition-all duration-300 hover:border-fuchsia-300/50 hover:text-fuchsia-200"
              >
                <IconBrandInstagram size={15} />
                @yosn.events
                <IconArrowUpRight size={12} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl">
              YOSN
            </h3>
            <p className="body-fun mt-4 max-w-sm leading-relaxed">
              Mumbai&apos;s live entertainment studio. We produce shows that sell
              out, moments that trend, and nights people never stop talking
              about.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <IconMapPin size={16} className="mt-0.5 shrink-0 text-white/35" />
              <p className="leading-relaxed text-white/45">
                701, Glamcent, Central Ave Rd,<br />
                Chembur, Mumbai — 400071
              </p>
            </div>

            <div className="flex items-center gap-3">
              <IconPhone size={16} className="shrink-0 text-white/35" />
              <a
                href="tel:8850904733"
                className="text-white/45 transition-colors duration-200 hover:text-cyan-300"
              >
                +91 88509 04733
              </a>
            </div>

            <div className="flex items-center gap-3">
              <IconBrandInstagram size={16} className="shrink-0 text-white/35" />
              <a
                href="https://www.instagram.com/yosn.events/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 transition-colors duration-200 hover:text-fuchsia-300"
              >
                @yosn.events
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Quick Links
            </p>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/45 transition-colors duration-200 hover:text-cyan-300"
                  >
                    <span className="h-px w-4 bg-white/20 transition-all duration-200 group-hover:w-6 group-hover:bg-cyan-300" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-[10px] uppercase tracking-wide text-white/25">
            © {new Date().getFullYear()} YOSN Innovations. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-wide text-white/20">
            Mumbai · Delhi · London · Dubai
          </p>
        </div>
      </div>

      {/* Ghosted YOSN background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden"
      >
        <span
          className="select-none font-display text-[38vw] uppercase leading-none tracking-tight"
          style={{ color: "rgba(255,255,255,0.018)" }}
        >
          YOSN
        </span>
      </div>
    </footer>
  )
}
