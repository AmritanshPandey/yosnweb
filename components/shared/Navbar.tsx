"use client"

import { startTransition, useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconMenu2, IconX } from "@tabler/icons-react"

const links = [
  { label: "One Night", href: "/one" },
  { label: "Artists", href: "/artists" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  // { label: "Contact", href: "/contact" },
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

  useEffect(() => {
    startTransition(() => setOpen(false))
  }, [pathname])

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 z-50 w-full"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "h-16 border-b border-cyan-300/20 bg-black/70 shadow-lg backdrop-blur-xl sm:h-20"
            : "h-16 border-b border-fuchsia-300/20 bg-white/5 backdrop-blur-xl sm:h-20"
        }`}
      >
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 text-white sm:px-6">

          {/* Left spacer (keeps center alignment) */}
          <div className="hidden flex-1 md:flex" />

          {/* Logo (Centered) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Link href="/">
              <Image
                src="/assets/logos/logo.png"
                alt="YOSN Logo"
                width={112}
                height={56}
                className="h-10 w-auto sm:h-12 md:h-14"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden items-center gap-10 md:flex">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/")

              return (
                <motion.div key={link.href} className="relative" whileHover="hover">
                  <Link
                    href={link.href}
                    className={`text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                      isActive ? "text-cyan-200" : "text-white/60 hover:text-fuchsia-200"
                    }`}
                  >
                    {link.label}
                  </Link>

                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-300 to-fuchsia-300"
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
            className="ml-auto rounded-full p-2 text-white transition-colors duration-300 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconX size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconMenu2 size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </div>

      {/* Mobile Menu — compact dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-16 z-50 border-b border-white/10 bg-black/90 backdrop-blur-2xl sm:top-20 md:hidden"
          >
            <div className="mx-auto max-w-2xl px-5 py-4 sm:px-8">
              <nav>
                {links.map((link, idx) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/")

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.035, duration: 0.18 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-3.5 text-sm uppercase tracking-[0.18em] transition-colors duration-200 ${
                          isActive ? "text-cyan-200" : "text-white/55 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        )}
                      </Link>
                      {idx < links.length - 1 && (
                        <div className="h-px bg-white/8" />
                      )}
                    </motion.div>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
