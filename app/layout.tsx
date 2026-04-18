import type { Metadata } from "next"
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/shared/Navbar"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
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
  metadataBase: new URL("https://yosninnovations.com"), // update after domain
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
    url: "https://yosninnovations.com",
    siteName: "YOSN Innovations",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // place inside public/
        width: 1200,
        height: 630,
        alt: "YOSN Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOSN Innovations",
    description:
      "Live events, artist management & experiential marketing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
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
        <Navbar />
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
