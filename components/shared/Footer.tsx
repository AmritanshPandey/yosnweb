"use client"

import Link from "next/link"
import {
  IconMapPin,
  IconPhone,
  IconBrandInstagram,
} from "@tabler/icons-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            YOSN Innovations
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Creating immersive entertainment experiences that elevate brands,
            energize audiences, and deliver unforgettable moments.
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-6 text-sm">

          <div className="flex items-start gap-3">
            <IconMapPin size={18} className="text-[#2AAFFB] mt-1" />
            <p className="text-white/60 leading-relaxed">
              701, Glamcent, Central Ave Rd,<br />
              Opposite OLPS Church,<br />
              Chembur, Mumbai, Maharashtra 400071
            </p>
          </div>

          <div className="flex items-center gap-3">
            <IconPhone size={18} className="text-[#2AAFFB]" />
            <a
              href="tel:8850904733"
              className="text-white/60 hover:text-white transition"
            >
              +91 88509 04733
            </a>
          </div>

          <div className="flex items-center gap-3">
            <IconBrandInstagram size={18} className="text-[#2AAFFB]" />
            <a
              href="https://www.instagram.com/yosn.events/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              @yosn.events
            </a>
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>

          <div className="space-y-3 text-sm text-white/60">

            <Link href="/about" className="block hover:text-white transition">
              About
            </Link>

            <Link href="/events" className="block hover:text-white transition">
              Events
            </Link>

            <Link href="/artists" className="block hover:text-white transition">
              Artists
            </Link>

            <Link href="/one" className="block hover:text-white transition">
              One Night
            </Link>

            <Link href="/contact" className="block hover:text-white transition">
              Contact
            </Link>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} YOSN Innovations. All rights reserved.
      </div>
    </footer>
  )
}