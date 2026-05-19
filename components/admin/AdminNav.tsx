"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { getClientAuth } from "@/lib/firebase/client"
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

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-56 flex-col border-r border-white/8 bg-black/80 backdrop-blur-xl sm:top-20 sm:h-[calc(100vh-5rem)] md:flex">
      <nav className="flex flex-col gap-1 p-3">
        <p className="mb-2 px-3 pt-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
          CMS
        </p>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-cyan-300/12 text-cyan-200"
                  : "text-white/55 hover:bg-white/6 hover:text-white",
              )}
            >
              <item.icon size={18} className={isActive ? "text-cyan-300" : "text-white/40"} />
              {item.label}
            </Link>
          )
        })}
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
  )
}
