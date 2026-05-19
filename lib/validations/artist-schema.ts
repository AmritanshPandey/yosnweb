import { z } from "zod"

const optionalUrl = z
  .string()
  .optional()
  .refine(
    (val) => !val || val.length === 0 || z.url().safeParse(val).success,
    { message: "Must be a valid URL" },
  )

export const artistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  handle: z
    .string()
    .min(1, "Handle is required")
    .regex(/^@/, "Handle must start with @"),
  profileImage: z.string().min(1, "Profile image is required"),
  bio: z.string().optional(),
  instagram: optionalUrl,
  youtube: optionalUrl,
  spotify: optionalUrl,
  verified: z.boolean().default(false),
})

export type ArtistFormValues = z.infer<typeof artistSchema>
