"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconMenu2, IconX } from "@tabler/icons-react"

const links = [
  { label: "One Night", href: "/one" },
  { label: "Artists", href: "/artists" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div
        className={`transition-all duration-500
        ${scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg h-20"
            : "bg-white/5 backdrop-blur-xl border-b border-white/10 h-24"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center h-full text-white relative">

          {/* Left spacer (keeps center alignment) */}
          <div className="hidden md:flex flex-1" />

          {/* Logo (Centered) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Link href="/">
              <img
                src="/assets/logos/logo.png"
                alt="YOSN Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 ml-auto">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/")

              return (
                <motion.div key={link.href} className="relative" whileHover="hover">
                  <Link
                    href={link.href}
                    className={`text-sm tracking-wide font-medium transition
            ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
                  >
                    {link.label}
                  </Link>

                  <motion.span
                    className="absolute left-0 -bottom-1 h-[1px] bg-[#2AAFFB]"
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setOpen(!open)}
          >
            {open ? <IconX size={28} /> : <IconMenu2 size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">

              {links.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/")

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition
                    ${isActive
                        ? "text-[#2AAFFB]"
                        : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}