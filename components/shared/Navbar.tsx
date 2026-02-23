"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import Yosn from "../../public/assets/logos/logo.png"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

const links = ["About", "Events", "Artists", "Contact"]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between text-white">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-semibold text-lg tracking-wide"
        >
          <img
            src={Yosn.src}
            alt="Yosn Logo"
            className="mt-8 md:mt-12 h-10 md:h-16 w-auto mx-8"
          />
        </motion.div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <motion.a
              key={link}
              href="#"
              className="relative text-sm tracking-wide"
              whileHover="hover"
            >
              {link}

              {/* Animated underline */}
              <motion.span
                variants={{
                  hover: { width: "100%" },
                }}
                initial={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 -bottom-1 h-[1px] bg-white"
              />
            </motion.a>
          ))}

          <Button size="sm">Book Now</Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black text-white border-white/10"
            >
              <div className="mt-12 flex flex-col gap-6">
                {links.map((link) => (
                  <a key={link} href="#" className="text-lg">
                    {link}
                  </a>
                ))}


              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}