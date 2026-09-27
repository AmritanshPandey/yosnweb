import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"

// Link-preview card (WhatsApp, Instagram, X, iMessage…), rendered at build time.
export const dynamic = "force-static"
export const alt = "YOSN Innovations — live events, artist management and brand experiences"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/assets/logos/logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(49,212,255,0.32), transparent 45%), radial-gradient(circle at 88% 86%, rgba(255,79,216,0.28), transparent 45%)",
        }}
      >
        <img src={logoSrc} alt="" width={460} height={299} style={{ objectFit: "contain" }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.78)",
            textTransform: "uppercase",
          }}
        >
          Live events · Artist management · Brand experiences
        </div>
        <div style={{ marginTop: 16, fontSize: 22, letterSpacing: 4, color: "#31d4ff" }}>
          www.yosn.events
        </div>
      </div>
    ),
    size,
  )
}
