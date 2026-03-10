import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFFB] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default dark button
        default:
          "rounded-md bg-white text-black hover:bg-white/90",

        // Premium Capsule (Primary Highlight)
        capsule:
          "rounded-full bg-[#2AAFFB] text-black shadow-[0_0_20px_rgba(42,175,251,0.35)] hover:bg-[#1e96d8] hover:shadow-[0_0_25px_rgba(42,175,251,0.6)] hover:scale-[1.04] active:scale-95",

        // Outline Capsule (Elegant Secondary CTA)
        "capsule-outline":
          "rounded-full border border-[#2AAFFB] text-[#2AAFFB] bg-transparent hover:bg-[#2AAFFB] hover:text-black hover:shadow-[0_0_20px_rgba(42,175,251,0.4)]",

        // Ghost minimal
        ghost:
          "rounded-md text-white hover:bg-white/10",

        // Link style
        link:
          "text-[#2AAFFB] underline-offset-4 hover:underline",
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