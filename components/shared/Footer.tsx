"use client"

import Link from "next/link"
import {
  IconMapPin,
  IconPhone,
  IconBrandInstagram,
} from "@tabler/icons-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black py-8 text-white">
      <div className="pointer-events-none absolute -left-20 top-8 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 sm:gap-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl">
            YOSN Innovations
          </h3>
          <p className="body-fun mt-4 max-w-sm leading-relaxed">
            Mumbai&apos;s live entertainment studio. We produce shows that sell
            out, moments that trend, and nights people never stop talking
            about.
          </p>
        </div>

        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-3">
            <IconMapPin size={18} className="mt-1 text-white/50" />
            <p className="leading-relaxed text-white/50">
              701, Glamcent, Central Ave Rd,<br />
              Opposite OLPS Church,<br />
              Chembur, Mumbai, Maharashtra 400071
            </p>
          </div>

          <div className="flex items-center gap-3">
            <IconPhone size={18} className="text-white/50" />
            <a
              href="tel:8850904733"
              className="text-white/50 transition-all duration-300 hover:text-cyan-200"
            >
              +91 88509 04733
            </a>
          </div>

          <div className="flex items-center gap-3">
            <IconBrandInstagram size={18} className="text-white/50" />
            <a
              href="https://www.instagram.com/yosn.events/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition-all duration-300 hover:text-fuchsia-200"
            >
              @yosn.events
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
            Quick Links
          </h4>

          <div className="space-y-3">
            <Link
              href="/about"
              className="block text-xs uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-cyan-200"
            >
              About
            </Link>

            <Link
              href="/events"
              className="block text-xs uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-cyan-200"
            >
              Events
            </Link>

            <Link
              href="/artists"
              className="block text-xs uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-cyan-200"
            >
              Artists
            </Link>

            <Link
              href="/one"
              className="block text-xs uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-cyan-200"
            >
              One Night
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-2 border-t border-white/10 pt-6 text-center text-[10px] uppercase tracking-wide text-white/30 sm:mt-16 sm:text-xs">
        © {new Date().getFullYear()} YOSN Innovations. All rights reserved.
      </div>
    </footer>
  )
}
