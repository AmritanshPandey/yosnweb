"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Outer ring follows with a gentle lag
  const ringX = useSpring(rawX, { stiffness: 140, damping: 20, mass: 0.5 })
  const ringY = useSpring(rawY, { stiffness: 140, damping: 20, mass: 0.5 })

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    // Event delegation — works for dynamically added elements
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], [data-cursor-hover]")) {
        setHovering(true)
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], [data-cursor-hover]")) {
        setHovering(false)
      }
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [rawX, rawY, visible])

  // Hide native cursor globally when custom one is active
  useEffect(() => {
    if (!visible) return
    document.body.classList.add("cursor-none-global")
    return () => document.body.classList.remove("cursor-none-global")
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Outer glowing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-cyan-300/60"
          animate={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            opacity: hovering ? 0.9 : 0.55,
            boxShadow: hovering
              ? "0 0 12px rgba(49,212,255,0.6)"
              : "0 0 6px rgba(49,212,255,0.25)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-cyan-300"
          animate={{
            width: hovering ? 6 : 5,
            height: hovering ? 6 : 5,
            opacity: hovering ? 0.7 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
