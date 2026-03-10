"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  ROOT                                      */
/* -------------------------------------------------------------------------- */

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>
) {
  return <SheetPrimitive.Trigger {...props} />
}

function SheetClose(
  props: React.ComponentProps<typeof SheetPrimitive.Close>
) {
  return <SheetPrimitive.Close {...props} />
}

function SheetPortal(
  props: React.ComponentProps<typeof SheetPrimitive.Portal>
) {
  return <SheetPrimitive.Portal {...props} />
}

/* -------------------------------------------------------------------------- */
/*                                  OVERLAY                                   */
/* -------------------------------------------------------------------------- */

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  CONTENT                                   */
/* -------------------------------------------------------------------------- */

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-black shadow-xl transition",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:duration-500 data-[state=closed]:duration-300",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l border-white/10 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r border-white/10 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          side === "top" &&
            "inset-x-0 top-0 border-b border-white/10 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
          side === "bottom" &&
            "inset-x-0 bottom-0 border-t border-white/10 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          className
        )}
        {...props}
      >
        {/* Accessibility Requirement */}
        <SheetPrimitive.Title className="sr-only">
          Navigation Menu
        </SheetPrimitive.Title>

        {children}

        {showCloseButton && (
          <SheetPrimitive.Close className="absolute top-5 right-5 opacity-70 hover:opacity-100 transition">
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/* -------------------------------------------------------------------------- */
/*                             OPTIONAL HELPERS                               */
/* -------------------------------------------------------------------------- */

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />
  )
}

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto p-6", className)} {...props} />
  )
}

function SheetDescription(
  props: React.ComponentProps<typeof SheetPrimitive.Description>
) {
  return (
    <SheetPrimitive.Description
      className="text-sm text-white/60"
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetDescription,
}