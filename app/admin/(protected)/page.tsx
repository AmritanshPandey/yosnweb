"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllEvents } from "@/lib/firebase/events"
import { getAllArtists } from "@/lib/firebase/artists"
import { IconCalendarEvent, IconMicrophone2, IconStar, IconPlus } from "@tabler/icons-react"

type DashboardStats = {
  totalEvents: number
  featuredEvents: number
  totalArtists: number
  loading: boolean
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    featuredEvents: 0,
    totalArtists: 0,
    loading: true,
  })

  useEffect(() => {
    Promise.all([getAllEvents(), getAllArtists()])
      .then(([events, artists]) => {
        setStats({
          totalEvents: events.length,
          featuredEvents: events.filter((e) => e.featured).length,
          totalArtists: artists.length,
          loading: false,
        })
      })
      .catch(() => setStats((s) => ({ ...s, loading: false })))
  }, [])

  const statCards = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: IconCalendarEvent,
      color: "text-cyan-300",
      bg: "bg-cyan-300/8 border-cyan-300/20",
    },
    {
      label: "Featured",
      value: stats.featuredEvents,
      icon: IconStar,
      color: "text-amber-300",
      bg: "bg-amber-300/8 border-amber-300/20",
    },
    {
      label: "Artists",
      value: stats.totalArtists,
      icon: IconMicrophone2,
      color: "text-fuchsia-300",
      bg: "bg-fuchsia-300/8 border-fuchsia-300/20",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow-fun">Content Management</p>
        <h1 className="font-display text-5xl uppercase tracking-tight text-white">Dashboard</h1>
        <p className="body-fun mt-2">Manage events and artists from one place.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`fun-card rounded-2xl border p-5 ${card.bg}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{card.label}</p>
                {stats.loading ? (
                  <div className="mt-2 h-8 w-12 animate-pulse rounded bg-white/10" />
                ) : (
                  <p className={`mt-1 font-display text-5xl uppercase ${card.color}`}>
                    {card.value}
                  </p>
                )}
              </div>
              <card.icon size={22} className={`${card.color} opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/events/new"
          className="fun-card group flex items-center gap-4 rounded-2xl p-5 transition-all duration-200"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 transition-colors group-hover:bg-cyan-300/20">
            <IconPlus size={18} className="text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">New Event</p>
            <p className="text-xs text-white/45">Create a new event listing</p>
          </div>
        </Link>

        <Link
          href="/admin/artists/new"
          className="fun-card group flex items-center gap-4 rounded-2xl p-5 transition-all duration-200"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-300/10 transition-colors group-hover:bg-fuchsia-300/20">
            <IconPlus size={18} className="text-fuchsia-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">New Artist</p>
            <p className="text-xs text-white/45">Add an artist profile</p>
          </div>
        </Link>
      </div>

      {/* Nav shortcuts */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/events"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-sm text-white/60 transition-all hover:border-white/20 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <IconCalendarEvent size={16} className="text-cyan-300/70" />
            View All Events
          </span>
          <span>→</span>
        </Link>
        <Link
          href="/admin/artists"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-sm text-white/60 transition-all hover:border-white/20 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <IconMicrophone2 size={16} className="text-fuchsia-300/70" />
            View All Artists
          </span>
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
