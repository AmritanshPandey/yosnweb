export type UploadResult = {
  url: string
  publicId: string
}

async function uploadBlob(
  blob: Blob,
  folder: string,
  publicId: string,
): Promise<UploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !preset) {
    throw new Error("Cloudinary environment variables are not set.")
  }

  const formData = new FormData()
  formData.append("file", blob)
  formData.append("upload_preset", preset)
  formData.append("folder", folder)
  formData.append("public_id", publicId)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: { message?: string } }).error?.message ?? "Upload failed")
  }

  const data = await res.json() as { secure_url: string; public_id: string }
  return { url: data.secure_url, publicId: data.public_id }
}

export async function uploadEventHero(
  slug: string,
  blob: Blob,
): Promise<UploadResult> {
  return uploadBlob(blob, `yosn/events/${slug}`, "hero")
}

export async function uploadArtistProfile(
  slug: string,
  blob: Blob,
): Promise<UploadResult> {
  return uploadBlob(blob, `yosn/artists/${slug}`, "profile")
}
