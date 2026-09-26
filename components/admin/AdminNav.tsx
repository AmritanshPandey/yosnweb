"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { getClientAuth } from "@/lib/firebase/auth"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  IconCalendarEvent,
  IconMicrophone2,
  IconLayoutDashboard,
  IconLogout,
} from "@tabler/icons-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: IconLayoutDashboard, exact: true },
  { label: "Events", href: "/admin/events", icon: IconCalendarEvent },
  { label: "Artists", href: "/admin/artists", icon: IconMicrophone2 },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    try {
      await signOut(getClientAuth())
      router.replace("/admin/login")
    } catch {
      toast.error("Sign out failed. Please try again.")
    }
  }

  const isActive = (item: (typeof navItems)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <>
    {/* Phones: bottom tab bar (the sidebar below is desktop-only) */}
    <nav
      aria-label="Admin"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-white/10 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item) ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors",
            isActive(item) ? "text-cyan-200" : "text-white/50",
          )}
        >
          <item.icon size={20} className={isActive(item) ? "text-cyan-300" : "text-white/40"} />
          {item.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={handleSignOut}
        className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-white/50 transition-colors hover:text-red-300"
      >
        <IconLogout size={20} className="text-white/40" />
        Sign out
      </button>
    </nav>

    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-56 flex-col border-r border-white/8 bg-black/80 backdrop-blur-xl sm:top-20 sm:h-[calc(100vh-5rem)] md:flex">
      <nav className="flex flex-col gap-1 p-3">
        <p className="mb-2 px-3 pt-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
          CMS
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item) ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive(item)
                ? "bg-cyan-300/12 text-cyan-200"
                : "text-white/55 hover:bg-white/6 hover:text-white",
            )}
          >
            <item.icon size={18} className={isActive(item) ? "text-cyan-300" : "text-white/40"} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/8 p-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/45 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
        >
          <IconLogout size={18} />
          Sign Out
        </button>
      </div>
    </aside>
    </>
  )
}
