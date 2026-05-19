"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { IconPlus, IconEdit, IconTrash, IconStar, IconSearch, IconCalendarEvent } from "@tabler/icons-react"
import { getAllEvents, deleteEvent } from "@/lib/firebase/events"
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  CATEGORY_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/types"
import type { Event, EventCategory, EventStatus } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "all">("all")
  const [statusFilter, setStatusFilter] = useState<EventStatus | "all">("all")
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function loadEvents() {
    try {
      const data = await getAllEvents()
      setEvents(data)
    } catch {
      toast.error("Failed to load events.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteEvent(deleteTarget.id)
      setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id))
      toast.success("Event deleted.")
      setDeleteTarget(null)
    } catch {
      toast.error("Failed to delete event.")
    } finally {
      setDeleting(false)
    }
  }

  const filtered = events.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.slug.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || e.category === categoryFilter
    const matchStatus = statusFilter === "all" || e.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow-fun">Content</p>
          <h1 className="font-display text-5xl uppercase tracking-tight text-white">Events</h1>
        </div>
        <Link href="/admin/events/new">
          <Button size="md" className="gap-2">
            <IconPlus size={16} />
            New Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events…"
            className="pl-8"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as EventCategory | "all")}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-cyan-300/30"
        >
          <option value="all">All Categories</option>
          {EVENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as EventStatus | "all")}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-cyan-300/30"
        >
          <option value="all">All Statuses</option>
          {EVENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
          <IconCalendarEvent size={32} className="mx-auto text-white/20" />
          <p className="mt-3 text-sm text-white/40">
            {search || categoryFilter !== "all" || statusFilter !== "all"
              ? "No events match your filters."
              : "No events yet. Create your first event."}
          </p>
          {!search && categoryFilter === "all" && statusFilter === "all" && (
            <Link href="/admin/events/new" className="mt-4 inline-block">
              <Button size="sm" className="gap-2">
                <IconPlus size={14} />
                New Event
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Event list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="fun-card flex flex-wrap items-center gap-4 rounded-xl p-4"
            >
              {/* Thumbnail */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                {event.heroImage ? (
                  <Image
                    src={event.heroImage}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <IconCalendarEvent size={20} className="text-white/20" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">{event.name}</p>
                  {event.featured && (
                    <span className="flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/8 px-2 py-0.5 text-[10px] text-amber-200">
                      <IconStar size={9} />
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/40">
                  <span className="capitalize">{CATEGORY_LABELS[event.category]}</span>
                  <span>·</span>
                  <span>{event.cities?.length ?? 0} {event.cities?.length === 1 ? "city" : "cities"}</span>
                  <span>·</span>
                  <span className="font-mono">{event.slug}</span>
                </div>
              </div>

              {/* Status badge */}
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${STATUS_COLORS[event.status]}`}
              >
                {STATUS_LABELS[event.status]}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link href={`/admin/events/${event.id}`}>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/40 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/8 hover:text-cyan-200">
                    <IconEdit size={15} />
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteTarget(event)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/40 transition-colors hover:border-red-400/30 hover:bg-red-400/8 hover:text-red-300"
                >
                  <IconTrash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 text-white hover:bg-red-600 shadow-none"
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

