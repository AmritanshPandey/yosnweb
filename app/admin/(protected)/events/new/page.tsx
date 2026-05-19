import type { Metadata } from "next"
import Link from "next/link"
import { IconChevronLeft } from "@tabler/icons-react"
import { EventForm } from "@/components/admin/events/EventForm"

export const metadata: Metadata = { title: "New Event" }

export default function NewEventPage() {
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
        <h1 className="font-display text-5xl uppercase tracking-tight text-white">New Event</h1>
        <p className="body-fun mt-1">Fill in the details below to create a new event listing.</p>
      </div>

      <EventForm />
    </div>
  )
}
