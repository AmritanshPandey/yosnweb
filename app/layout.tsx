import type { Metadata } from "next"
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/shared/Navbar"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import { ScrollProgress } from "@/components/shared/ScrollProgress"
import { SiteEffects } from "@/components/shared/SiteEffects"
import { MotionProvider } from "@/components/shared/MotionProvider"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yosn.events"),
  title: {
    default: "YOSN Innovations | Live Events & Brand Experiences",
    template: "%s | YOSN Innovations",
  },
  description:
    "YOSN Innovations is a Mumbai-based event and experiential marketing company delivering live entertainment, artist management, and high-impact brand activations.",
  keywords: [
    "YOSN Innovations",
    "Event Management Mumbai",
    "Live Events India",
    "Artist Management",
    "Brand Activations",
    "Corporate Events",
  ],
  authors: [{ name: "YOSN Innovations" }],
  creator: "YOSN Innovations",
  openGraph: {
    title: "YOSN Innovations | Live Events & Brand Experiences",
    description:
      "Creating immersive entertainment experiences that elevate brands and energize audiences.",
    url: "https://www.yosn.events",
    siteName: "YOSN Innovations",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOSN Innovations",
    description:
      "Live events, artist management & experiential marketing.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable}`}
    >
      <body className="bg-black text-white antialiased">
        <MotionProvider>
          <SiteEffects />
          <ScrollProgress />
          <Navbar />
          <ScrollToTop />
          {children}
        </MotionProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          mobileOffset={{ bottom: 84 }}
          toastOptions={{
            style: {
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  )
}
