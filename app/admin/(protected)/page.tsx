"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllEvents } from "@/lib/firebase/events"
import { getAllArtists } from "@/lib/firebase/artists"
import type { Event } from "@/types"
import {
  IconCalendarEvent,
  IconMicrophone2,
  IconStar,
  IconPlus,
  IconAlertTriangle,
  IconCircleCheck,
  IconChevronRight,
} from "@tabler/icons-react"

type DashboardData = {
  events: Event[]
  totalArtists: number
  loading: boolean
}

type Issue = { event: Event; problem: string }

// Things that would show up wrong on the public site.
function findIssues(events: Event[]): Issue[] {
  const issues: Issue[] = []
  for (const event of events) {
    const cities = event.cities ?? []
    const openCities = cities.filter((c) => !c.soldOut)
    if (!event.heroImage) issues.push({ event, problem: "No hero image" })
    if (cities.some((c) => !c.ticketLink)) issues.push({ event, problem: "A city has no ticket link" })
    if (cities.length > 0 && openCities.length === 0 && event.status !== "sold-out")
      issues.push({ event, problem: "Every city is sold out, but status isn't “Sold out”" })
    if (event.status === "sold-out" && openCities.length > 0)
      issues.push({ event, problem: "Status is “Sold out”, but some cities still have tickets" })
  }
  return issues
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>({ events: [], totalArtists: 0, loading: true })

  useEffect(() => {
    Promise.all([getAllEvents(), getAllArtists()])
      .then(([events, artists]) => setData({ events, totalArtists: artists.length, loading: false }))
      .catch(() => setData((d) => ({ ...d, loading: false })))
  }, [])

  const issues = findIssues(data.events)

  const statCards = [
    {
      label: "Total Events",
      value: data.events.length,
      icon: IconCalendarEvent,
      color: "text-cyan-300",
      bg: "bg-cyan-300/8 border-cyan-300/20",
      href: "/admin/events",
    },
    {
      label: "Featured",
      value: data.events.filter((e) => e.featured).length,
      icon: IconStar,
      color: "text-amber-300",
      bg: "bg-amber-300/8 border-amber-300/20",
      href: "/admin/events",
    },
    {
      label: "Artists",
      value: data.totalArtists,
      icon: IconMicrophone2,
      color: "text-fuchsia-300",
      bg: "bg-fuchsia-300/8 border-fuchsia-300/20",
      href: "/admin/artists",
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
          <Link
            key={card.label}
            href={card.href}
            className={`fun-card rounded-2xl border p-5 ${card.bg}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">{card.label}</p>
                {data.loading ? (
                  <div className="mt-2 h-8 w-12 animate-pulse rounded bg-white/10" />
                ) : (
                  <p className={`mt-1 font-display text-5xl uppercase ${card.color}`}>{card.value}</p>
                )}
              </div>
              <card.icon size={22} className={`${card.color} opacity-60`} />
            </div>
          </Link>
        ))}
      </div>

      {/* Needs attention */}
      <section className="fun-card rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl uppercase tracking-tight text-white">Needs attention</h2>
          {!data.loading && issues.length > 0 && (
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2 py-0.5 font-mono text-[11px] text-amber-200">
              {issues.length}
            </span>
          )}
        </div>

        {data.loading ? (
          <div className="mt-4 space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
            ))}
          </div>
        ) : issues.length === 0 ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-white/55">
            <IconCircleCheck size={16} className="text-cyan-300" />
            Every event has an image, ticket links and a status that matches its cities.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/8">
            {issues.map(({ event, problem }, i) => (
              <li key={`${event.id}-${i}`}>
                <Link
                  href={`/admin/events/edit?id=${event.id}`}
                  className="group flex items-center gap-3 py-3 text-sm"
                >
                  <IconAlertTriangle size={16} className="shrink-0 text-amber-300/80" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-white group-hover:text-cyan-200">{event.name}</span>
                    <span className="block text-xs text-white/45">{problem}</span>
                  </span>
                  <IconChevronRight size={16} className="shrink-0 text-white/30 group-hover:text-cyan-200" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/events/new"
          className="fun-card group flex items-center gap-4 rounded-2xl p-5"
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
          className="fun-card group flex items-center gap-4 rounded-2xl p-5"
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
    </div>
  )
}
