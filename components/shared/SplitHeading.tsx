"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitHeadingProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  as?: "h1" | "h2" | "h3"
}

export function SplitHeading({ text, className, style, delay = 0, as: Tag = "h2" }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" })

  const words = text.split(" ")

  return (
    <Tag ref={ref} className={cn("overflow-hidden", className)} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}
