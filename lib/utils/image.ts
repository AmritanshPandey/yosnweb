import imageCompression from "browser-image-compression"

export type ImageValidationError = "FILE_TOO_LARGE" | "INVALID_TYPE"

export type AllowedRatio = "4:5" | "16:9"

export type ImageValidationResult =
  | { ok: true; width: number; height: number }
  | { ok: false; error: ImageValidationError; message: string }

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

export async function validateImage(file: File): Promise<ImageValidationResult> {
  if (!file.type.startsWith("image/")) {
    return {
      ok: false,
      error: "INVALID_TYPE",
      message: "Please select an image file (JPEG, PNG, WebP, HEIC, etc.).",
    }
  }

  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      error: "FILE_TOO_LARGE",
      message: "Image must be under 10 MB.",
    }
  }

  const { width, height } = await getImageDimensions(file)
  return { ok: true, width, height }
}

export function getImageDimensions(file: File | Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load image"))
    }
    img.src = url
  })
}

export async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 2400,
    useWebWorker: true,
    fileType: "image/webp",
  })
}

export type CropArea = {
  x: number
  y: number
  width: number
  height: number
}

export async function cropImageToBlob(
  imageUrl: string,
  cropArea: CropArea,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Canvas context unavailable"))
        return
      }
      ctx.drawImage(img, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed"))
            return
          }
          resolve(blob)
        },
        "image/webp",
        0.9,
      )
    }
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = imageUrl
  })
}

// The "fit" display mode (letterboxed image over a blurred/dark/black backdrop)
// used to be baked into a static image via canvas here. That manual blur
// simulation never fully hid the backdrop, leaving a visible "ghost" of the
// photo behind the foreground. It's simpler and more reliable to keep the
// original image untouched and render the backdrop live with CSS wherever
// it's displayed — see EventHeroImage in components/home/PastEvents.tsx and
// the live preview in ImageCropper.tsx, which now share the same technique.
export type BgStyle = "blur" | "dark" | "black"

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
