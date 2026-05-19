import type { Timestamp } from "firebase/firestore"

export type EventCategory = "concert" | "festival" | "tour" | "club" | "comedy"

export type EventStatus = "on-sale" | "selling-fast" | "sold-out" | "coming-soon"

export type EventCity = {
  name: string
  date: string
  ticketLink: string
  soldOut?: boolean
}

export type EventImageMeta = {
  width: number
  height: number
}

export type Event = {
  id: string
  featured: boolean
  category: EventCategory
  name: string
  slug: string
  status: EventStatus
  heroImage: string
  imageMeta: EventImageMeta
  duration: string
  genres: string[]
  ticketsFrom: string
  cities: EventCity[]
  artistId: string
  createdAt: Timestamp
}

export type Artist = {
  id: string
  name: string
  slug: string
  handle: string
  profileImage: string
  bio?: string
  instagram?: string
  youtube?: string
  spotify?: string
  verified?: boolean
  createdAt: Timestamp
}

export const EVENT_CATEGORIES: EventCategory[] = ["concert", "festival", "tour", "club", "comedy"]

export const EVENT_STATUSES: EventStatus[] = ["on-sale", "selling-fast", "sold-out", "coming-soon"]

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  concert: "Concert",
  festival: "Festival",
  tour: "Tour",
  club: "Club",
  comedy: "Comedy",
}

export const STATUS_LABELS: Record<EventStatus, string> = {
  "on-sale": "On Sale",
  "selling-fast": "Selling Fast",
  "sold-out": "Sold Out",
  "coming-soon": "Coming Soon",
}

export const STATUS_COLORS: Record<EventStatus, string> = {
  "on-sale": "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  "selling-fast": "border-amber-300/35 bg-amber-300/10 text-amber-100",
  "sold-out": "border-red-400/35 bg-red-400/10 text-red-200",
  "coming-soon": "border-white/25 bg-white/8 text-white/70",
}
