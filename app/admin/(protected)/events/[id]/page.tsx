"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { IconChevronLeft } from "@tabler/icons-react"
import { getEventById } from "@/lib/firebase/events"
import type { Event } from "@/types"
import { EventForm } from "@/components/admin/events/EventForm"

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    getEventById(id)
      .then((data) => {
        if (!data) setError(true)
        else setEvent(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
        <p className="text-sm text-red-300">Event not found or failed to load.</p>
        <Link
          href="/admin/events"
          className="mt-4 inline-block text-xs text-white/40 underline hover:text-white/70"
        >
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/events"
          className="mb-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/70"
        >
          <IconChevronLeft size={14} />
          Back to Events
        </Link>
        <h1 className="font-display text-5xl uppercase tracking-tight text-white">Edit Event</h1>
        <p className="body-fun mt-1 truncate">{event.name}</p>
      </div>

      <EventForm event={event} />
    </div>
  )
}
