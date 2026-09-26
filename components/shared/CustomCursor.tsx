"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Fixed base sizes — animating `scale` (a transform) instead of `width`/`height`
// keeps every frame on the compositor thread instead of forcing layout+paint,
// which is what caused the visible lag, especially on Firefox/Safari.
const RING_SIZE = 44
const RING_IDLE_SCALE = 28 / RING_SIZE
const DOT_SIZE = 6
const DOT_IDLE_SCALE = 5 / DOT_SIZE

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
      setVisible(true)
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

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mouseout", onOut, { passive: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [rawX, rawY])

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
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="relative rounded-full border border-cyan-300/60"
          style={{
            width: RING_SIZE,
            height: RING_SIZE,
            boxShadow: "0 0 6px rgba(49,212,255,0.25)",
          }}
          animate={{ scale: hovering ? 1 : RING_IDLE_SCALE }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Stronger glow, faded in on hover — opacity-only so it stays compositor-only */}
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-300/60"
            style={{ boxShadow: "0 0 12px rgba(49,212,255,0.6)" }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-cyan-300"
          style={{ width: DOT_SIZE, height: DOT_SIZE }}
          animate={{ scale: hovering ? 1 : DOT_IDLE_SCALE, opacity: hovering ? 0.7 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
