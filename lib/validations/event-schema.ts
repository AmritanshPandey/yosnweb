import { z } from "zod"

const citySchema = z.object({
  name: z.string().min(1, "City name is required"),
  date: z.string().min(1, "Date is required"),
  ticketLink: z.string().url("Must be a valid URL"),
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
  genres: z.array(z.string().min(1)).min(1, "At least one genre is required"),
  ticketsFrom: z.string().min(1, "Ticket pricing is required"),
  artistId: z.string().min(1, "Please select an artist"),
  heroImage: z.string().min(1, "Hero image is required"),
  imageMeta: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  cities: z.array(citySchema).min(1, "At least one city is required"),
})

export type EventFormValues = z.infer<typeof eventSchema>
