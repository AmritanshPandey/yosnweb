import { z } from "zod"

const citySchema = z.object({
  name: z.string().min(1, "City name is required"),
  date: z.string().min(1, "Date is required (e.g. Sat, 24 Oct 2026)"),
  ticketLink: z.union([z.string().url("Must be a full URL starting with https://"), z.literal("")]),
  soldOut: z.boolean().default(false),
})

export const eventSchema = z.object({
  name: z.string().min(2, "Event name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  featured: z.boolean().default(false),
  category: z.enum(["concert", "festival", "tour", "club", "comedy"], {
    message: "Please select a valid category",
  }),
  status: z.enum(["on-sale", "selling-fast", "sold-out", "coming-soon"], {
    message: "Please select a valid status",
  }),
  duration: z.string().min(1, "Duration is required"),
  genres: z.array(z.string().min(1)).min(1, "Add at least one genre — type it and press Enter"),
  ticketsFrom: z.string().min(1, "Ticket pricing is required (e.g. INR 999)"),
  artistId: z.string().min(1, "Select an artist — create one first if none exist"),
  heroImage: z.string().min(1, "Upload a hero image and click Confirm"),
  imageMeta: z.object({
    width: z.number(),
    height: z.number(),
  }),
  cities: z.array(citySchema).min(1, "Add at least one city with a name and date"),
})

export type EventFormValues = z.infer<typeof eventSchema>
