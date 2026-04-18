import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default dark button
        default:
          "rounded-md bg-gradient-to-r from-cyan-300 to-fuchsia-300 text-black shadow-[0_8px_24px_rgba(49,212,255,0.3)] hover:from-fuchsia-300 hover:to-amber-200",

        // Premium Capsule (Primary Highlight)
        capsule:
          "rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 text-black shadow-[0_0_24px_rgba(49,212,255,0.35)] hover:from-fuchsia-300 hover:to-amber-200 hover:shadow-[0_0_30px_rgba(255,79,216,0.5)] hover:scale-[1.04] active:scale-95",

        // Outline Capsule (Elegant Secondary CTA)
        "capsule-outline":
          "rounded-full border border-cyan-300 text-cyan-200 bg-transparent hover:bg-gradient-to-r hover:from-cyan-300 hover:to-fuchsia-300 hover:text-black hover:shadow-[0_0_24px_rgba(49,212,255,0.4)]",

        // Ghost minimal
        ghost:
          "rounded-md text-white hover:bg-white/10 hover:text-cyan-200",

        // Link style
        link:
          "text-cyan-200 underline-offset-4 hover:underline hover:text-fuchsia-200",
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"