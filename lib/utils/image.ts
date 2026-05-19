import imageCompression from "browser-image-compression"

export type ImageValidationError =
  | "FILE_TOO_LARGE"
  | "INVALID_TYPE"
  | "BELOW_MIN_SIZE"
  | "INVALID_RATIO"

export type AllowedRatio = "4:5" | "16:9"

export type ImageValidationResult =
  | { ok: true; width: number; height: number; ratio: AllowedRatio }
  | { ok: false; error: ImageValidationError; message: string }

const ALLOWED_TYPES = ["image/webp", "image/jpeg", "image/png"]
const MAX_FILE_BYTES = 2 * 1024 * 1024 // 2 MB
const MIN_WIDTH = 1200
const MIN_HEIGHT = 1600

function detectRatio(width: number, height: number): AllowedRatio | null {
  const ratio = width / height
  if (Math.abs(ratio - 4 / 5) < 0.02) return "4:5"
  if (Math.abs(ratio - 16 / 9) < 0.02) return "16:9"
  return null
}

export async function validateImage(file: File): Promise<ImageValidationResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      ok: false,
      error: "INVALID_TYPE",
      message: "Only WebP, JPEG, and PNG images are allowed.",
    }
  }

  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      error: "FILE_TOO_LARGE",
      message: "Image must be under 2 MB.",
    }
  }

  const { width, height } = await getImageDimensions(file)

  if (width < MIN_WIDTH || height < MIN_HEIGHT) {
    return {
      ok: false,
      error: "BELOW_MIN_SIZE",
      message: `Image must be at least ${MIN_WIDTH}×${MIN_HEIGHT}px. Yours is ${width}×${height}px.`,
    }
  }

  const ratio = detectRatio(width, height)
  if (!ratio) {
    return {
      ok: false,
      error: "INVALID_RATIO",
      message: "Image must be in 4:5 or 16:9 aspect ratio.",
    }
  }

  return { ok: true, width, height, ratio }
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

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
